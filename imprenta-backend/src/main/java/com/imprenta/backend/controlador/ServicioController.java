package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Servicio;
import com.imprenta.backend.repositorio.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@CrossOrigin(origins = "*")
public class ServicioController {

    @Autowired
    private ServicioRepository servicioRepository;

    @PostMapping
    public Servicio crearServicio(@RequestBody Servicio servicio) {
        return servicioRepository.save(servicio);
    }

    @GetMapping
    public List<Servicio> obtenerServicios() {
        return servicioRepository.findAll();
    }
}
