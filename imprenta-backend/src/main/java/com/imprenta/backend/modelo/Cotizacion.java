package com.imprenta.backend.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "cotizacion")
public class Cotizacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descripcion;
    private double precioEstimado;

    // Constructor vacío
    public Cotizacion() {}

    // Constructor con parámetros
    public Cotizacion(String descripcion, double precioEstimado) {
        this.descripcion = descripcion;
        this.precioEstimado = precioEstimado;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecioEstimado() {
        return precioEstimado;
    }

    public void setPrecioEstimado(double precioEstimado) {
        this.precioEstimado = precioEstimado;
    }
}
