package com.backendmg.springboot_backendmg.services;

import com.backendmg.springboot_backendmg.entities.Usuario;
import com.backendmg.springboot_backendmg.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UsuarioDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        
        // 1. Buscar el usuario en tu base de datos usando el correo
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el correo: " + correo));

        // 2. Retornar un objeto 'User' de Spring Security con los datos de tu 'Usuario'
        // Formato: new User(username, password, authorities)
        return new User(
                usuario.getCorreo(),          // Usamos el correo como nombre de usuario
                usuario.getContrasenia(),     // La contraseña encriptada de la BD
                new ArrayList<>()             // Lista vacía de roles (si no tienes roles implementados)
        );
    }
}
