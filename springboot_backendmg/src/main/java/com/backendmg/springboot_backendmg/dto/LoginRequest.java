package com.backendmg.springboot_backendmg.dto;

public class LoginRequest {
    private String correo, contrasenia;

    public LoginRequest() {
    }

    public LoginRequest(String correo, String contrasenia) {
        this.correo = correo;
        this.contrasenia = contrasenia;
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

    

}
