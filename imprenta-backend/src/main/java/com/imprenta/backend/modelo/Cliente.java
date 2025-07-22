package com.imprenta.backend.modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //private Long cliente_Id;
    private String nombre;
    private String apellido;
    private String dniRuc;       // 🆕 Documento nacional o RUC
    private String telefono;
    private String direccion;    // 🆕 Dirección física
    private String correo;
    @JsonIgnore
    private String contraseña;
    private String rol = "cliente";

    public Cliente() {}

    public Cliente(String nombre, String apellido, String dniRuc, String telefono, String direccion, String correo, String contraseña, String rol, Long cliente_Id, Long id) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dniRuc = dniRuc;
        this.telefono = telefono;
        this.direccion = direccion;
        this.correo = correo;
        this.contraseña = contraseña;
        this.rol = rol;
        //this.cliente_Id = cliente_Id;
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    //public Long getClienteId() {
    //    return cliente_Id;
    //}
    //public void setClienteId(Long cliente_Id) {
    //    this.cliente_Id = cliente_Id;
    //}
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