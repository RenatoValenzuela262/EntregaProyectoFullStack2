package com.backendmg.springboot_backendmg.services;

import java.util.List;
import java.util.Optional;

import com.backendmg.springboot_backendmg.entities.Usuario;

public interface UsuarioService {

    List<Usuario> findByAll();

    Optional<Usuario> findById(Long id);

    Usuario save(Usuario usuarioExistente);

    Optional<Usuario> delete(Usuario unUsuario);

}
