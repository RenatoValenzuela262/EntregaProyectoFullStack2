package com.backendmg.springboot_backendmg.services;

import java.util.List;
import java.util.Optional;

import com.backendmg.springboot_backendmg.entities.Producto;

public interface ProductoService {

    List<Producto> findByAll();

    Optional<Producto> findById(Long idProducto);

    Producto save(Producto productoExistente);

    Optional<Producto> delete(Producto unProducto);

}
