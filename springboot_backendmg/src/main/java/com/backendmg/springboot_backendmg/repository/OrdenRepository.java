package com.backendmg.springboot_backendmg.repository;

import org.springframework.data.repository.CrudRepository;

import com.backendmg.springboot_backendmg.entities.Orden;
import java.util.List;

public interface OrdenRepository extends CrudRepository<Orden, Long> {
	List<Orden> findByCorreoCliente(String correoCliente);

    

}
