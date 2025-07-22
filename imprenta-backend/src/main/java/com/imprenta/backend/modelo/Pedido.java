package com.imprenta.backend.modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private String etapaFinal; // Ejemplo: "Control de calidad", "Empaquetado", "Listo para entrega"

    @ManyToOne
    @JoinColumn(name = "cliente_id") 
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Cliente cliente;

    // Constructor vacío
    public Pedido() {}

    // Constructor con parámetros (puedes agregar si lo necesitas)
    public Pedido(String descripcion, String estado, String fechaEntrega, Cliente cliente, boolean activo, String etapaFinal) {
        this.descripcion = descripcion;
        this.estado = estado;
        this.fechaEntrega = fechaEntrega;
        this.cliente = cliente;
        this.activo = true;
        this.etapaFinal = etapaFinal;
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

    public String getEtapaFinal() {
        return etapaFinal;
    }

    public void setEtapaFinal(String etapaFinal) {
        this.etapaFinal = etapaFinal;
    }
}
