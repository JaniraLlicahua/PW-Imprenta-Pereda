package com.imprenta.backend.repositorio;

import com.imprenta.backend.modelo.SeguimientoPostEntrega;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeguimientoRepository extends JpaRepository<SeguimientoPostEntrega, Long> {
}
