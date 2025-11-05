package com.backendmg.springboot_backendmg.dto;

import java.util.List;

public class CrearOrdenRequest {
    private String nombreCliente;
    private List<DetalleOrdenRequest> detalles;

    public String getNombreCliente() { return nombreCliente; }
    public void setNombreCliente(String nombreCliente) { this.nombreCliente = nombreCliente; }
    public List<DetalleOrdenRequest> getDetalles() { return detalles; }
    public void setDetalles(List<DetalleOrdenRequest> detalles) { this.detalles = detalles; }
}