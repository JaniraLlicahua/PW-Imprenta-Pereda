package com.imprenta.backend.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descripcion;
    private String estado;
    private String fechaEntrega;
    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean activo = true;

    @ManyToOne
    @JoinColumn(name = "cliente_id") 
    private Cliente cliente;

    // Constructor vacío
    public Pedido() {}

    // Constructor con parámetros (puedes agregar si lo necesitas)
    public Pedido(String descripcion, String estado, String fechaEntrega, Cliente cliente) {
        this.descripcion = descripcion;
        this.estado = estado;
        this.fechaEntrega = fechaEntrega;
        this.cliente = cliente;
        this.activo = true;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(String fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }
}
