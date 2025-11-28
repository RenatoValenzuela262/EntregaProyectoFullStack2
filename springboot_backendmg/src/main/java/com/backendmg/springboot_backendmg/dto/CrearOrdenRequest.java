package com.backendmg.springboot_backendmg.dto;

import java.util.List;

public class CrearOrdenRequest {
    private String nombreCliente;
    private String correo;
    private List<DetalleOrdenRequest> detalles;
    private Integer total; // Total con IVA incluido

    public String getNombreCliente() { return nombreCliente; }
    public void setNombreCliente(String nombreCliente) { this.nombreCliente = nombreCliente; }
    
    public List<DetalleOrdenRequest> getDetalles() { return detalles; }
    public void setDetalles(List<DetalleOrdenRequest> detalles) { this.detalles = detalles; }
    
    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
}