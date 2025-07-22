package com.imprenta.backend.modelo;

public class CotizacionDTO {
    private Long id;
    private String descripcion;
    private double precioEstimado;
    private String tipo;
    private int cantidad;
    private String estado;

    public CotizacionDTO(Long id, String descripcion, double precioEstimado, String tipo, int cantidad, String estado) {
        this.id = id;
        this.descripcion = descripcion;
        this.precioEstimado = precioEstimado;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.estado = estado;
    }

    // Getters
    public Long getId() { return id; }
    public String getDescripcion() { return descripcion; }
    public double getPrecioEstimado() { return precioEstimado; }
    public String getTipo() { return tipo; }
    public int getCantidad() { return cantidad; }
    public String getEstado() { return estado; }
}
