// cómo guardar, buscar y eliminar clientes automáticamente.
package com.imprenta.backend.repositorio;

import com.imprenta.backend.modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findByCorreo(String correo);
}