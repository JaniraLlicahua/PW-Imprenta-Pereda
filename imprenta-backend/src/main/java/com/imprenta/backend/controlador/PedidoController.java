package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Cliente;
import com.imprenta.backend.modelo.Pedido;
import com.imprenta.backend.repositorio.ClienteRepository;
import com.imprenta.backend.repositorio.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public Pedido crearPedido(@RequestBody Pedido pedido) {
        // Aquí cliente.id ya viene cargado automáticamente
        Cliente cliente = clienteRepository.findById(pedido.getCliente().getId())
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        pedido.setCliente(cliente);  // Aseguramos que el cliente esté bien conectado
        return pedidoRepository.save(pedido);
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Pedido> obtenerPorCliente(@PathVariable("clienteId") Long clienteId) {
        return pedidoRepository.findByCliente_Id(clienteId);
    }

    // Lista todos los pedidos
    @GetMapping
    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }
}
