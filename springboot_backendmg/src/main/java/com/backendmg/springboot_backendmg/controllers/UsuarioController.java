package com.backendmg.springboot_backendmg.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backendmg.springboot_backendmg.entities.Usuario;
import com.backendmg.springboot_backendmg.services.UsuarioService;

@RestController
@RequestMapping("api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public List<Usuario> List(){
        return service.findByAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> verUsuario (@PathVariable Long id){
        Optional<Usuario> usuarioOptional = service.findById(id);
        if (usuarioOptional.isPresent()){
            return ResponseEntity.ok(usuarioOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Usuario> crear(@RequestBody Usuario unUsuario){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(unUsuario));
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> modificar(@PathVariable Long id, @RequestBody Usuario unUsuario){ 
        Optional<Usuario> usuarioOptional = service.findById(id);
        if (usuarioOptional.isPresent()){
            Usuario usuarioExistente = usuarioOptional.get();
            
            usuarioExistente.setNombreCompleto(unUsuario.getNombreCompleto());
            usuarioExistente.setCorreo(unUsuario.getCorreo());
            usuarioExistente.setRegion(unUsuario.getRegion());
            usuarioExistente.setComuna(unUsuario.getComuna());
            usuarioExistente.setTelefono(unUsuario.getTelefono());
            usuarioExistente.setEstado(unUsuario.getEstado());
            
            if (unUsuario.getContrasenia() != null && !unUsuario.getContrasenia().isEmpty()) {
                usuarioExistente.setContrasenia(unUsuario.getContrasenia());
            }
            
            Usuario usuarioModificado = service.save(usuarioExistente);
            return ResponseEntity.ok(usuarioModificado);
        }
        return ResponseEntity.notFound().build();
    }

      @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        Usuario unUsuario = new Usuario();
        unUsuario.setId(id);
        Optional<Usuario> usuarioOptional = service.delete(unUsuario);
        if(usuarioOptional.isPresent()){
            return ResponseEntity.ok(usuarioOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }




}
