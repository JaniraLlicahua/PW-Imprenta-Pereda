//GET /api/clientes → lista todos los clientes
//POST /api/clientes → registra un nuevo cliente
package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Cliente;
import com.imprenta.backend.repositorio.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clientes") // todas las rutas comienzan con /api/clientes
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    // GET → /api/clientes
    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    // POST → /api/clientes (para registrar cliente)
    @PostMapping
    public Cliente guardarCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // POST → /api/clientes/login (login de cliente)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Cliente loginData) {
        List<Cliente> resultados = clienteRepository.findByCorreo(loginData.getCorreo());

        if (!resultados.isEmpty() && resultados.get(0).getContraseña().equals(loginData.getContraseña())) {
            Cliente cliente = resultados.get(0);
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Login exitoso");
            response.put("rol", cliente.getRol());
            response.put("clienteId", cliente.getId());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario o contraseña incorrectos");
        }
    }
}
