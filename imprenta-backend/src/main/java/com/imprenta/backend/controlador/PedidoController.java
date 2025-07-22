package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Cliente;
import com.imprenta.backend.modelo.CorreccionPedido;
import com.imprenta.backend.modelo.Cotizacion;
import com.imprenta.backend.modelo.Pedido;
import com.imprenta.backend.repositorio.ClienteRepository;
import com.imprenta.backend.repositorio.CorreccionPedidoRepository;
import com.imprenta.backend.repositorio.CotizacionRepository;
import com.imprenta.backend.repositorio.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private CotizacionRepository cotizacionRepository;

    @Autowired
    private CorreccionPedidoRepository correccionPedidoRepository;

    // Crear pedido validando cotización aprobada
    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody Pedido pedido) {
        Cliente cliente = clienteRepository.findById(pedido.getCliente().getId())
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        List<Cotizacion> cotizaciones = cotizacionRepository.findByClienteIdAndEstado(cliente.getId(), "Aprobada");
        boolean tieneAprobada = cotizaciones.stream().anyMatch(c -> "Aprobada".equals(c.getEstado()));

        if (!tieneAprobada) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("No se puede generar pedido sin una cotización aprobada");
        }

        pedido.setCliente(cliente);
        return ResponseEntity.ok(pedidoRepository.save(pedido));
    }

    // Obtener pedidos por cliente
    @GetMapping("/cliente/{cliente_Id}")
    public List<Pedido> obtenerPorCliente(@PathVariable("cliente_Id") Long cliente_Id) {
        return pedidoRepository.findByCliente_Id(cliente_Id);
    }

    // Listar pedidos activos
    @GetMapping
    public List<Pedido> listarPedidos() {
        return pedidoRepository.findByActivoTrue();
    }

    // Listar todos (sin importar estado)
    @GetMapping("/todos")
    public List<Pedido> obtenerTodosPedidos() {
        return pedidoRepository.findAll();
    }

    // Listar pedidos eliminados (soft delete)
    @GetMapping("/inactivos")
    public List<Pedido> listarPedidosInactivos() {
        return pedidoRepository.findByActivoFalse();
    }

    // Filtrar por fecha (solo activos)
    @GetMapping("/filtrar")
    public List<Pedido> filtrarPorFecha(@RequestParam String fecha) {
        return pedidoRepository.findByFechaEntregaAndActivoTrue(fecha);
    }

    // Actualizar estado desde string plano
    @PutMapping("/{id}/estado")
    public ResponseEntity<?> actualizarEstadoPlano(@PathVariable Long id, @RequestBody String nuevoEstado) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        pedido.setEstado(nuevoEstado.replace("\"", ""));
        pedidoRepository.save(pedido);
        return ResponseEntity.ok("Estado actualizado correctamente");
    }

    // Actualizar estado desde objeto JSON { estado: "..." }
    @PutMapping("/estado/{id}")
    public ResponseEntity<?> actualizarEstadoJSON(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String nuevoEstado = body.get("estado");
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        pedido.setEstado(nuevoEstado);
        pedidoRepository.save(pedido);
        return ResponseEntity.ok("Estado actualizado correctamente");
    }

    // Actualizar etapa final
    @PutMapping("/{id}/etapa-final")
    public ResponseEntity<?> actualizarEtapaFinal(@PathVariable Long id, @RequestBody String etapa) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        pedido.setEtapaFinal(etapa.replace("\"", ""));
        pedidoRepository.save(pedido);
        return ResponseEntity.ok().build();
    }

    // Eliminar pedido (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPedido(@PathVariable Long id) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        pedido.setActivo(false);
        pedidoRepository.save(pedido);
        return ResponseEntity.ok("Pedido desactivado (soft delete)");
    }

    @GetMapping("/pedido/{id}")
    public List<CorreccionPedido> obtenerPorPedido(@PathVariable Long id) {
        return correccionPedidoRepository.findByPedidoIdOrderByFechaRegistroDesc(id);
    }
}
