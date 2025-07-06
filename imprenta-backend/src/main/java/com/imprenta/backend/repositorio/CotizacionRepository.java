package com.imprenta.backend.repositorio;

import com.imprenta.backend.modelo.Cotizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CotizacionRepository extends JpaRepository<Cotizacion, Long> {
    List<Cotizacion> findByCliente_Id(Long clienteId);
    List<Cotizacion> findByCliente_IdAndEstado(Long clienteId, String estado);
}
