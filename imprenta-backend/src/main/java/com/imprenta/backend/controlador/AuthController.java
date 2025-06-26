package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Cliente;
import com.imprenta.backend.repositorio.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping
    public String login(@RequestBody Cliente loginData) {
        List<Cliente> resultados = clienteRepository.findByCorreo(loginData.getCorreo());

        for (Cliente c : resultados) {
            if (c.getContraseña().equals(loginData.getContraseña())) {
                return "✅ Login exitoso";
            }
        }
        return "❌ Usuario o contraseña incorrectos";
    }
}
