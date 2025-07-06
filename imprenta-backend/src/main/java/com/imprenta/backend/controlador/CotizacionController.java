package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Cliente;
import com.imprenta.backend.modelo.Cotizacion;
import com.imprenta.backend.repositorio.ClienteRepository;
import com.imprenta.backend.repositorio.CotizacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @GetMapping("/cliente/{clienteId}/aprobadas")
    public List<Cotizacion> obtenerAprobadas(@PathVariable Long clienteId) {
        return cotizacionRepository.findByCliente_IdAndEstado(clienteId, "Aprobada");
    }

    // Listar todas las cotizaciones (opcional)
    @GetMapping
    public List<Cotizacion> listarTodas() {
        return cotizacionRepository.findAll();
    }

    // Obtener cotizaciones por cliente
    @GetMapping("/cliente/{clienteId}")
    public List<Cotizacion> obtenerPorCliente(@PathVariable Long clienteId) {
        return cotizacionRepository.findByCliente_Id(clienteId);
    }

    // Obtener una cotización por ID
    @PutMapping("/{id}")
    public ResponseEntity<?> editarCotizacion(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        Cotizacion cot = cotizacionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));

        if (!"Pendiente".equalsIgnoreCase(cot.getEstado())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Solo se pueden editar cotizaciones pendientes.");
        }

        cot.setDescripcion(payload.get("descripcion").toString());
        cot.setPrecioEstimado(Double.parseDouble(payload.get("precioEstimado").toString()));

        cotizacionRepository.save(cot);
        return ResponseEntity.ok("Cotización actualizada");
    }

    // Actualizar una cotización
    @PutMapping("/{id}/aprobar")
    public ResponseEntity<?> aprobarCotizacion(@PathVariable Long id) {
        Cotizacion cot = cotizacionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));

        cot.setEstado("Aprobada");
        cotizacionRepository.save(cot);

        return ResponseEntity.ok("Cotización aprobada");
    }

    // Rechazar una cotización
    @PutMapping("/{id}/rechazar")
    public Cotizacion rechazarCotizacion(@PathVariable Long id) {
        Cotizacion cotizacion = cotizacionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));
        cotizacion.setEstado("Rechazada");
        return cotizacionRepository.save(cotizacion);
    }

    // Eliminar una cotización
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        cotizacionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
