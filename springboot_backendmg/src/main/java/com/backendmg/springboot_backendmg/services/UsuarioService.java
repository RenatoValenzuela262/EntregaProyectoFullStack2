package com.backendmg.springboot_backendmg.services;

import java.util.List;
import java.util.Optional;

import com.backendmg.springboot_backendmg.entities.Usuario;

public interface UsuarioService {

    List<Usuario> findByAll();

    Optional<Usuario> findById(Long idUsuario);

    Usuario save(Usuario usuarioExistente);

    Optional<Usuario> delete(Usuario unUsuario);

    Optional<Usuario> login(String correo, String contrasenia);



}
