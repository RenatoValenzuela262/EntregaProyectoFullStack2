package com.backendmg.springboot_backendmg.repository;



import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.backendmg.springboot_backendmg.entities.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Long>{

    Optional<Usuario> findByCorreo(String correo);



}
