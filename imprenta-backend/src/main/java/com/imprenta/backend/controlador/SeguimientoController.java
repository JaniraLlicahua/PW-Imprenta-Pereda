package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.SeguimientoPostEntrega;
import com.imprenta.backend.repositorio.SeguimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seguimiento")
@CrossOrigin(origins = "*")
public class SeguimientoController {

    @Autowired
    private SeguimientoRepository seguimientoRepository;

    @PostMapping
    public SeguimientoPostEntrega registrarSeguimiento(@RequestBody SeguimientoPostEntrega seguimiento) {
        return seguimientoRepository.save(seguimiento);
    }
}
