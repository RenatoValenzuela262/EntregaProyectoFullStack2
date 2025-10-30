package com.backendmg.springboot_backendmg.controllers;

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

import com.backendmg.springboot_backendmg.services.ProductoService;
import com.backendmg.springboot_backendmg.entities.Producto;

import java.util.List;
import java.util.Optional;




@RestController
@RequestMapping("api/productos")
public class ProductoController {

    @Autowired
    private ProductoService service;

    @GetMapping
    public List<Producto> List(){
        return service.findByAll();
    }

    @GetMapping("/{idProducto}")
    public ResponseEntity<?> verProducto(@PathVariable Long idProducto) {
        Optional<Producto> productoOptional = service.findById(idProducto);
        if (productoOptional.isPresent()){
            return ResponseEntity.ok(productoOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto unProducto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(unProducto));
    }

    @PutMapping("/{idProducto}")
    public ResponseEntity<?> modifica(@PathVariable Long idProducto, @RequestBody Producto unProducto){
        Optional<Producto> productoOptional = service.findById(idProducto);
        if (productoOptional.isPresent()){
            Producto productoExistente = productoOptional.get();
            productoExistente.setNombre(unProducto.getNombre());
            productoExistente.setDescripcion(unProducto.getDescripcion());
            productoExistente.setPrecio(unProducto.getPrecio());
            productoExistente.setStock(unProducto.getStock());
            productoExistente.setCategoria(unProducto.getCategoria());
            productoExistente.setImagen(unProducto.getImagen());
            productoExistente.setFecha(unProducto.getFecha());
            Producto productoModificado = service.save(productoExistente);
            return ResponseEntity.ok(productoModificado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{idProducto}")
    public ResponseEntity<?> eliminar(@PathVariable Long idProducto){
        Producto unProducto = new Producto();
        unProducto.setIdProducto(idProducto);
        Optional<Producto> productoOptional = service.delete(unProducto);
        if(productoOptional.isPresent()){
            return ResponseEntity.ok(productoOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

}
