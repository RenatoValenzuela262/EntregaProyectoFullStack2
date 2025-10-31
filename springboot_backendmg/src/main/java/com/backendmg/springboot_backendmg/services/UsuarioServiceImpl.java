package com.backendmg.springboot_backendmg.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backendmg.springboot_backendmg.entities.Usuario;
import com.backendmg.springboot_backendmg.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    

    public UsuarioServiceImpl(UsuarioRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Usuario> findByAll(){
        return (List<Usuario>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Usuario> findById(Long idUsuario){
        return repository.findById(idUsuario);
    }


    @Override
    @Transactional
    public Usuario save(Usuario unUsuario) {
        
        if (unUsuario.getContrasenia() != null && !unUsuario.getContrasenia().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(unUsuario.getContrasenia());
            unUsuario.setContrasenia(encodedPassword);
            
        } else if (unUsuario.getIdUsuario() != null) {

            // se recupera el hash antiguo para no sobreescribirlo con null/vacío.
            repository.findById(unUsuario.getIdUsuario()).ifPresent(usuarioDb -> {
                unUsuario.setContrasenia(usuarioDb.getContrasenia());
            });
        }
        
        return repository.save(unUsuario);
    }

    @Override
    @Transactional
    public Optional<Usuario> delete(Usuario unUsuario) {
        Optional<Usuario> usuarioOptional = repository.findById(unUsuario.getIdUsuario());
        usuarioOptional.ifPresent(usuarioDb -> {
            repository.delete(unUsuario);
        });
        return usuarioOptional;
    }

    
    @Override
    @Transactional(readOnly = true)
    public Optional<Usuario> login(String correo, String contrasenia) {
        
      
        Optional<Usuario> usuarioOptional = repository.findByCorreo(correo);

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();

        
            if (passwordEncoder.matches(contrasenia, usuario.getContrasenia())) {
             
                return Optional.of(usuario);
            }
        }
        
       
        return Optional.empty();
    }
}


