package com.backendmg.springboot_backendmg.repository;

import org.springframework.data.repository.CrudRepository;

import com.backendmg.springboot_backendmg.entities.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Long>{

}
