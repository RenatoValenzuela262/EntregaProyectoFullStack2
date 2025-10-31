package com.backendmg.springboot_backendmg.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id")
    private Long idUsuario;

    @Column(name = "nombre_completo")
    private String nombreCompleto;

    private String correo, contrasenia, region, comuna, tipo;
    private Integer telefono;
    private Boolean estado;

    
    public Usuario() {
    }


    public Usuario(Long idUsuario, String nombreCompleto, String correo, String contrasenia, String region,
            String comuna, String tipo, Integer telefono, Boolean estado) {
        this.idUsuario = idUsuario;
        this.nombreCompleto = nombreCompleto;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.region = region;
        this.comuna = comuna;
        this.tipo = tipo;
        this.telefono = telefono;
        this.estado = estado;
    }


    public Long getIdUsuario() {
        return idUsuario;
    }


    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }


    public String getNombreCompleto() {
        return nombreCompleto;
    }


    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }


    public String getCorreo() {
        return correo;
    }


    public void setCorreo(String correo) {
        this.correo = correo;
    }


    public String getContrasenia() {
        return contrasenia;
    }


    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }


    public String getRegion() {
        return region;
    }


    public void setRegion(String region) {
        this.region = region;
    }


    public String getComuna() {
        return comuna;
    }


    public void setComuna(String comuna) {
        this.comuna = comuna;
    }


    public String getTipo() {
        return tipo;
    }


    public void setTipo(String tipo) {
        this.tipo = tipo;
    }


    public Integer getTelefono() {
        return telefono;
    }


    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }


    public Boolean getEstado() {
        return estado;
    }


    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    
    

}
