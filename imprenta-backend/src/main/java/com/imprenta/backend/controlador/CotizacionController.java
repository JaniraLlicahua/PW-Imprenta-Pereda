package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Cliente;
import com.imprenta.backend.modelo.Cotizacion;
import com.imprenta.backend.repositorio.ClienteRepository;
import com.imprenta.backend.repositorio.CotizacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cotizaciones")
@CrossOrigin(origins = "*")
public class CotizacionController {

    @Autowired
    private CotizacionRepository cotizacionRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    // Crear nueva cotización
    @PostMapping
    public Cotizacion crearCotizacion(@RequestBody Map<String, Object> payload) {
        Long clienteId = Long.valueOf(payload.get("clienteId").toString());
        String descripcion = payload.get("descripcion").toString();
        double precioEstimado = Double.parseDouble(payload.get("precioEstimado").toString());

        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Cotizacion cotizacion = new Cotizacion();
        cotizacion.setDescripcion(descripcion);
        cotizacion.setPrecioEstimado(precioEstimado);
        cotizacion.setCliente(cliente);

        return cotizacionRepository.save(cotizacion);
    }

    // Obtener cotizaciones por cliente
    @GetMapping("/cliente/{clienteId}")
    public List<Cotizacion> obtenerPorCliente(@PathVariable Long clienteId) {
        return cotizacionRepository.findByCliente_Id(clienteId);
    }

    // Listar todas las cotizaciones (opcional)
    @GetMapping
    public List<Cotizacion> listarTodas() {
        return cotizacionRepository.findAll();
    }
}
