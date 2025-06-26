// cómo guardar, buscar y eliminar clientes automáticamente.
package com.imprenta.backend.repositorio;

import com.imprenta.backend.modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // No necesitas escribir métodos aquí por ahora, JPA lo hace por ti
}