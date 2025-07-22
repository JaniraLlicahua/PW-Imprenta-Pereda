package com.imprenta.backend.repositorio;

import com.imprenta.backend.modelo.Cotizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CotizacionRepository extends JpaRepository<Cotizacion, Long> {
    List<Cotizacion> findByClienteId(Long clienteId); // ya lo estás usando
    
    List<Cotizacion> findByClienteIdAndEstado(Long clienteId, String estado); // ⚠️ este es el necesario
}
