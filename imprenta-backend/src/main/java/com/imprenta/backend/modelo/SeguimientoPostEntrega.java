package com.imprenta.backend.modelo;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SeguimientoPostEntrega {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String comentario;
    private String canalContacto; // Ej: WhatsApp, Email

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    private LocalDate fecha = LocalDate.now();

    // Constructor vacío
    public SeguimientoPostEntrega() {}

    // Constructor con parámetros

    public SeguimientoPostEntrega(String comentario, String canalContacto, Pedido pedido, LocalDate fecha) {
        this.comentario = comentario;
        this.canalContacto = canalContacto;
        this.pedido = pedido;
        this.fecha = fecha;
    }
    // Getters y Setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getComentario() {
        return comentario;
    }
    public void setComentario(String comentario) {
        this.comentario = comentario;
    }
    public String getCanalContacto() {
        return canalContacto;
    }
    public void setCanalContacto(String canalContacto) {
        this.canalContacto = canalContacto;
    }
    public Pedido getPedido() {
        return pedido;
    }
    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }
    public LocalDate getFecha() {
        return fecha;
    }
    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
}
