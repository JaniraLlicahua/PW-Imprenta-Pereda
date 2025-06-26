package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Cliente;
import com.imprenta.backend.repositorio.ClienteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteRepository repo;

    public ClienteController(ClienteRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Cliente> listar() {
        return repo.findAll();
    }

    @PostMapping
    public Cliente registrar(@RequestBody Cliente cliente) {
        return repo.save(cliente);
    }
}