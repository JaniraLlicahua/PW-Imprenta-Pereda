//GET /api/clientes → lista todos los clientes
//POST /api/clientes → registra un nuevo cliente
package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Cliente;
import com.imprenta.backend.modelo.LoginRequest;
import com.imprenta.backend.repositorio.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // GET → /api/clientes
    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    // Obtener cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> obtenerCliente(@PathVariable Long id) {
        return clienteRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar cliente
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCliente(@PathVariable Long id, @RequestBody Cliente clienteActualizado) {
        Cliente cliente = clienteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        cliente.setNombre(clienteActualizado.getNombre());
        cliente.setApellido(clienteActualizado.getApellido());
        cliente.setCorreo(clienteActualizado.getCorreo());
        cliente.setDireccion(clienteActualizado.getDireccion());
        cliente.setTelefono(clienteActualizado.getTelefono());
        cliente.setDniRuc(clienteActualizado.getDniRuc());

        clienteRepository.save(cliente);
        return ResponseEntity.ok("Cliente actualizado");
    }

    // Eliminar cliente
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCliente(@PathVariable Long id) {
        clienteRepository.deleteById(id);
        return ResponseEntity.ok("Cliente eliminado");
    }

    // POST → /api/clientes (registrar cliente con contraseña encriptada)
    @PostMapping
    public Cliente guardarCliente(@RequestBody Cliente cliente) {
        String contraseñaEncriptada = passwordEncoder.encode(cliente.getContraseña());
        cliente.setContraseña(contraseñaEncriptada);
        return clienteRepository.save(cliente);
    }

        // POST → /api/clientes/login (comparar con contraseña encriptada)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginData) {
        List<Cliente> resultados = clienteRepository.findByCorreo(loginData.getCorreo());

        if (!resultados.isEmpty()) {
            Cliente cliente = resultados.get(0);
            boolean coincide = passwordEncoder.matches(loginData.getContraseña(), cliente.getContraseña());

            if (coincide) {
                Map<String, Object> response = new HashMap<>();
                response.put("mensaje", "Login exitoso");
                response.put("rol", cliente.getRol());
                response.put("clienteId", cliente.getId());
                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario o contraseña incorrectos");
    }
}
