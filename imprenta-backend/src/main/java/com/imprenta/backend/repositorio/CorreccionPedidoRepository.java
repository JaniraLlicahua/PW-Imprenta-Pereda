package com.imprenta.backend.repositorio;

import com.imprenta.backend.modelo.CorreccionPedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CorreccionPedidoRepository extends JpaRepository<CorreccionPedido, Long> {
    List<CorreccionPedido> findByPedidoIdOrderByFechaRegistroDesc(Long pedidoId);
    List<CorreccionPedido> findByPedido_Cliente_IdOrderByFechaRegistroDesc(Long clienteId);
}
