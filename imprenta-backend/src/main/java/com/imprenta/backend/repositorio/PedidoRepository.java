package com.imprenta.backend.repositorio;

import com.imprenta.backend.modelo.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByCliente_Id(Long clienteId);
    List<Pedido> findByActivoTrue();
    List<Pedido> findByActivoFalse();

    @Query("SELECT p FROM Pedido p WHERE p.activo = true AND p.fechaEntrega = :fecha")
    List<Pedido> findByFechaEntregaAndActivoTrue(@Param("fecha") String fecha);

    @Query("SELECT p FROM Pedido p WHERE p.activo = true ORDER BY p.fechaEntrega DESC")
    List<Pedido> findAllActivosOrderByFecha();

    //List<Correccion> findByPedidoIdOrderByFechaRegistroDesc(Long pedidoId);

}
