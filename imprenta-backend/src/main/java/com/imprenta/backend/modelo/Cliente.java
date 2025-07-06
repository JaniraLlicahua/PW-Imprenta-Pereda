package com.imprenta.backend.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long clienteId;
    private String nombre;
    private String apellido;
    private String dniRuc;       // 🆕 Documento nacional o RUC
    private String telefono;
    private String direccion;    // 🆕 Dirección física
    private String correo;
    private String contraseña;
    private String rol = "cliente";

    public Cliente() {}

    public Cliente(String nombre, String apellido, String dniRuc, String telefono, String direccion, String correo, String contraseña, String rol, Long clienteId, Long id) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dniRuc = dniRuc;
        this.telefono = telefono;
        this.direccion = direccion;
        this.correo = correo;
        this.contraseña = contraseña;
        this.rol = rol;
        this.clienteId = clienteId;
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getClienteId() {
        return clienteId;
    }
    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getApellido() {
        return apellido;
    }
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }
    public String getDniRuc() {
        return dniRuc;
    }
    public void setDniRuc(String dniRuc) {
        this.dniRuc = dniRuc;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public String getDireccion() {
        return direccion;
    }
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getContraseña() {
        return contraseña;
    }
    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }
    public String getRol() {
        return rol;
    }
    public void setRol(String rol) {
        this.rol = rol;
    }
}