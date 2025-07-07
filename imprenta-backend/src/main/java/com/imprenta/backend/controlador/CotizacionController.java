package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Cliente;
import com.imprenta.backend.modelo.Cotizacion;
import com.imprenta.backend.repositorio.ClienteRepository;
import com.imprenta.backend.repositorio.CotizacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Cotizacion> crearCotizacionConArchivo(
        @RequestParam("clienteId") Long clienteId,
        @RequestParam("tipo") String tipo,
        @RequestParam("descripcion") String descripcion,
        @RequestParam("cantidad") int cantidad,
        @RequestParam(value = "archivo", required = false) MultipartFile archivo
    ) throws IOException {
        Cliente cliente = clienteRepository.findById(clienteId)
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Cotizacion cot = new Cotizacion();
        cot.setCliente(cliente);
        cot.setTipo(tipo);
        cot.setDescripcion(descripcion);
        cot.setCantidad(cantidad);
        cot.setEstado("Pendiente");

        if (archivo != null && !archivo.isEmpty()) {
            cot.setArchivo(archivo.getBytes());
            cot.setNombreArchivo(archivo.getOriginalFilename());
        }

        cotizacionRepository.save(cot);
        return ResponseEntity.ok(cot);
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

    // Obtener cotizaciones pendientes
    @GetMapping("/archivo/{id}")
    public ResponseEntity<byte[]> obtenerArchivo(@PathVariable Long id) {
        Cotizacion cot = cotizacionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));

        byte[] datosArchivo = cot.getArchivo();
        if (datosArchivo == null) {
            return ResponseEntity.notFound().build();
        }

        // Detecta tipo MIME
        String nombreArchivo = cot.getNombreArchivo();
        String extension = nombreArchivo.substring(nombreArchivo.lastIndexOf(".") + 1).toLowerCase();
        MediaType tipoMedia;

        switch (extension) {
            case "jpg":
            case "jpeg":
                tipoMedia = MediaType.IMAGE_JPEG;
                break;
            case "png":
                tipoMedia = MediaType.IMAGE_PNG;
                break;
            case "pdf":
                tipoMedia = MediaType.APPLICATION_PDF;
                break;
            default:
                tipoMedia = MediaType.APPLICATION_OCTET_STREAM;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(tipoMedia);

        // Si quieres que el archivo se vea en el navegador:
        headers.setContentDisposition(ContentDisposition.inline().filename(nombreArchivo).build());

        return new ResponseEntity<>(datosArchivo, headers, HttpStatus.OK);
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
    public ResponseEntity<?> rechazarCotizacion(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Cotizacion cotizacion = cotizacionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));

        cotizacion.setEstado("Rechazada");
        cotizacion.setComentarioRechazo(payload.get("comentario"));
        cotizacionRepository.save(cotizacion);

        return ResponseEntity.ok("Cotización rechazada con comentario");
    }

    // Eliminar una cotización
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        cotizacionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
