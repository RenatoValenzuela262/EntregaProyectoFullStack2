package com.backendmg.springboot_backendmg.repository;

import org.springframework.data.repository.CrudRepository;

import com.backendmg.springboot_backendmg.entities.Producto;


public interface ProductoRepository extends CrudRepository<Producto, Long> {

}
