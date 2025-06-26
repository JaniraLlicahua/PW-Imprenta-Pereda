package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Cotizacion;
import com.imprenta.backend.repositorio.CotizacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cotizaciones")
@CrossOrigin(origins = "*")
public class CotizacionController {

    @Autowired
    private CotizacionRepository cotizacionRepository;

    // POST: Crear nueva cotización
    @PostMapping
    public Cotizacion crearCotizacion(@RequestBody Cotizacion cotizacion) {
        return cotizacionRepository.save(cotizacion);
    }

    // GET: Listar cotizaciones
    @GetMapping
    public List<Cotizacion> listarCotizaciones() {
        return cotizacionRepository.findAll();
    }
}
