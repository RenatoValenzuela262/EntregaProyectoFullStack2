package com.backendmg.springboot_backendmg.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backendmg.springboot_backendmg.dto.CrearOrdenRequest;
import com.backendmg.springboot_backendmg.dto.DetalleOrdenRequest;
import com.backendmg.springboot_backendmg.entities.DetalleOrden;
import com.backendmg.springboot_backendmg.entities.Orden;
import com.backendmg.springboot_backendmg.services.OrdenService;

@RestController
@RequestMapping("api/orden")
public class OrdenController {

    @Autowired
    private OrdenService service;

    @GetMapping
    public List<Orden> List(){
        return service.findByAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> verOrden(@PathVariable Long id){
        Optional<Orden> ordenOptional = service.findById(id);
        if (ordenOptional.isPresent()){
            return ResponseEntity.ok(ordenOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Orden> crear(@RequestBody Orden unOrden){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(unOrden));
    }

    @PostMapping("/desde-carrito")
    public ResponseEntity<?> crearDesdeCarrito(@RequestBody CrearOrdenRequest request) {
        try {
            Orden orden = new Orden();
            orden.setNombreCliente(request.getNombreCliente());
            orden.setEstado("Pendiente");
            orden.setFecha(LocalDate.now());
            
            List<DetalleOrden> detalles = request.getDetalles().stream()
                .map(detalleRequest -> {
                    DetalleOrden detalle = new DetalleOrden();
                    detalle.setNombreProducto(detalleRequest.getNombreProducto());
                    detalle.setCantidad(detalleRequest.getCantidad());
                    detalle.setPrecioUnitario(detalleRequest.getPrecioUnitario());
                    detalle.setSubTotal(detalleRequest.getCantidad() * detalleRequest.getPrecioUnitario());
                    return detalle;
                })
                .collect(Collectors.toList());
            
            orden.setDetalles(detalles);
            
            Integer total = detalles.stream()
                .mapToInt(DetalleOrden::getSubTotal)
                .sum();
            orden.setTotal(total);
            
            Orden ordenCreada = service.save(orden);
            return ResponseEntity.status(HttpStatus.CREATED).body(ordenCreada);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al crear la orden: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modificar(@PathVariable Long id, @RequestBody Orden unOrden){
        Optional<Orden> ordenOptional = service.findById(id);
        if (ordenOptional.isPresent()){
            Orden ordenExistente = ordenOptional.get();
            ordenExistente.setNombreCliente(unOrden.getNombreCliente());
            ordenExistente.setEstado(unOrden.getEstado());
            ordenExistente.setFecha(unOrden.getFecha());
            ordenExistente.setTotal(unOrden.getTotal());
            Orden ordenModificado = service.save(ordenExistente);
            return ResponseEntity.ok(ordenModificado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        Orden unOrden = new Orden();
        unOrden.setId(id);
        Optional<Orden> ordenOptional = service.delete(unOrden);
        if(ordenOptional.isPresent()){
            return ResponseEntity.ok(ordenOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
}