package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Cliente;
import com.imprenta.backend.modelo.Cotizacion;
import com.imprenta.backend.modelo.Pedido;
import com.imprenta.backend.repositorio.ClienteRepository;
import com.imprenta.backend.repositorio.CotizacionRepository;
import com.imprenta.backend.repositorio.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    // Inyectar repositorio de cotizaciones
    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody Pedido pedido) {
        Cliente cliente = clienteRepository.findById(pedido.getCliente().getId())
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        // Buscar cotizaciones aprobadas de ese cliente
        List<Cotizacion> cotizaciones = cotizacionRepository.findByCliente_IdAndEstado(cliente.getId(), "Aprobada");
        boolean tieneAprobada = cotizaciones.stream().anyMatch(c -> "Aprobada".equals(c.getEstado()));

        if (!tieneAprobada) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("No se puede generar pedido sin una cotización aprobada");
        }

        pedido.setCliente(cliente);
        return ResponseEntity.ok(pedidoRepository.save(pedido));
    }

    // Obtener pedidos por cliente
    @GetMapping("/cliente/{clienteId}")
    public List<Pedido> obtenerPorCliente(@PathVariable("clienteId") Long clienteId) {
        return pedidoRepository.findByCliente_Id(clienteId);
    }

    // Lista todos los pedidos
    @GetMapping("/todos")
    public List<Pedido> obtenerTodosPedidos() {
        return pedidoRepository.findAll(); // sin filtro por activo
    }

    // Obtener un pedido por ID
    @GetMapping
    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }

    // Editar estado del pedido
    @PutMapping("/{id}/estado")
    public ResponseEntity<?> actualizarEstado(@PathVariable Long id, @RequestBody String nuevoEstado) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        pedido.setEstado(nuevoEstado.replace("\"", "")); // elimina comillas dobles
        pedidoRepository.save(pedido);
        return ResponseEntity.ok("Estado actualizado correctamente");
    }

    // Filtrar pedidos por fecha
    @GetMapping("/filtrar")
    public List<Pedido> filtrarPorFecha(@RequestParam String fecha) {
        return pedidoRepository.findByFechaEntregaAndActivoTrue(fecha);  // ✅ Este sí existe
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
}
