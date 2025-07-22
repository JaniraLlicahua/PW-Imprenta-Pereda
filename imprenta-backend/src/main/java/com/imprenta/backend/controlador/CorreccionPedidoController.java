package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.CorreccionPedido;
import com.imprenta.backend.modelo.Pedido;
import com.imprenta.backend.repositorio.CorreccionPedidoRepository;
import com.imprenta.backend.repositorio.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/correcciones")
@CrossOrigin(origins = "*")
public class CorreccionPedidoController {

    @Autowired
    private CorreccionPedidoRepository correccionRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @PostMapping
    public CorreccionPedido registrar(@RequestBody CorreccionPedido entrada) {
        Pedido pedido = pedidoRepository.findById(entrada.getPedido().getId())
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        entrada.setPedido(pedido);
        entrada.setEstado("Pendiente");
        return correccionRepository.save(entrada);
    }

    @GetMapping("/pedido/{pedidoId}")
    public List<CorreccionPedido> historial(@PathVariable Long pedidoId) {
        return correccionRepository.findByPedidoIdOrderByFechaRegistroDesc(pedidoId);
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<CorreccionPedido>> getCorreccionesPorCliente(@PathVariable Long clienteId) {
        List<CorreccionPedido> lista = correccionRepository.findByPedido_Cliente_IdOrderByFechaRegistroDesc(clienteId);
        return ResponseEntity.ok(lista);
    }
}
