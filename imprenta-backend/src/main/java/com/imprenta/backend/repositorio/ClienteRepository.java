package com.imprenta.backend.repositorio;

import com.imprenta.backend.modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}