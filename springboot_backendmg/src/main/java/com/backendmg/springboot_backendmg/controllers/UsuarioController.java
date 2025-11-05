package com.backendmg.springboot_backendmg.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backendmg.springboot_backendmg.dto.LoginRequest;
import com.backendmg.springboot_backendmg.entities.Usuario;
import com.backendmg.springboot_backendmg.services.UsuarioService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<Usuario> List(){
        return service.findByAll();
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<?> verUsuario (@PathVariable Long idUsuario){
        Optional<Usuario> usuarioOptional = service.findById(idUsuario);
        if (usuarioOptional.isPresent()){
            return ResponseEntity.ok(usuarioOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Usuario> crear(@RequestBody Usuario unUsuario){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(unUsuario));
    }

    @PutMapping("/{idUsuario}")
    public ResponseEntity<?> modificar(@PathVariable Long idUsuario, @RequestBody Usuario unUsuario, @RequestHeader("Usuario-Logueado") String usuarioLogueadoJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Usuario usuarioLogueado = mapper.readValue(usuarioLogueadoJson, Usuario.class);
            
            Optional<Usuario> usuarioOptional = service.findById(idUsuario);
            
            if (usuarioOptional.isPresent()) {
                Usuario usuarioTarget = usuarioOptional.get();
                
                if (!tienePermisosEdicion(usuarioLogueado, usuarioTarget)) {
                    return new ResponseEntity<>("No tiene permisos para editar este usuario", HttpStatus.FORBIDDEN);
                }
                
                Usuario usuarioExistente = usuarioOptional.get();
                usuarioExistente.setNombreCompleto(unUsuario.getNombreCompleto());
                usuarioExistente.setCorreo(unUsuario.getCorreo());
                usuarioExistente.setTelefono(unUsuario.getTelefono());
                usuarioExistente.setRegion(unUsuario.getRegion());
                usuarioExistente.setComuna(unUsuario.getComuna());
                usuarioExistente.setEstado(unUsuario.getEstado());
                usuarioExistente.setTipo(unUsuario.getTipo());

                // SOLO actualizar contraseña si se proporciona y NO está vacía
                if (unUsuario.getContrasenia() != null && 
                    !unUsuario.getContrasenia().trim().isEmpty()) {
                    usuarioExistente.setContrasenia(unUsuario.getContrasenia());
                }
                // Si está vacía o null, NO se actualiza y se mantiene la contraseña actual
                
                Usuario usuarioModificado = service.save(usuarioExistente);
                return ResponseEntity.ok(usuarioModificado);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return new ResponseEntity<>("Error al procesar la solicitud", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{idUsuario}")
    public ResponseEntity<?> eliminar(@PathVariable Long idUsuario, @RequestHeader("Usuario-Logueado") String usuarioLogueadoJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Usuario usuarioLogueado = mapper.readValue(usuarioLogueadoJson, Usuario.class);
            
            Optional<Usuario> usuarioOptional = service.findById(idUsuario);
            
            if (usuarioOptional.isPresent()) {
                Usuario usuarioTarget = usuarioOptional.get();
                
                if (!tienePermisosEliminacion(usuarioLogueado, usuarioTarget)) {
                    return new ResponseEntity<>("No tiene permisos para eliminar este usuario", HttpStatus.FORBIDDEN);
                }
                
                Usuario unUsuario = new Usuario();
                unUsuario.setIdUsuario(idUsuario);
                Optional<Usuario> usuarioEliminado = service.delete(unUsuario);
                if(usuarioEliminado.isPresent()){
                    return ResponseEntity.ok(usuarioEliminado.orElseThrow());
                }
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return new ResponseEntity<>("Error al procesar la solicitud", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> log(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> authenticatedUser = service.login(
            loginRequest.getCorreo(),
            loginRequest.getContrasenia()
        );

        if (authenticatedUser.isPresent()) {
            return new ResponseEntity<>(authenticatedUser.get(), HttpStatus.OK);
        } else {
            String errorMessage = "Credenciales inválidas. Correo o Contraseña incorrectos.";
            return new ResponseEntity<>(errorMessage, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/existe")
    public boolean existeUsuarioPorCorreo(@RequestParam String correo) {
        return service.findByCorreo(correo).isPresent();
    }

    private boolean tienePermisosEdicion(Usuario usuarioLogueado, Usuario usuarioTarget) {
        if ("ADMIN+".equals(usuarioLogueado.getTipo())) {
            return true;
        }
        
        if ("ADMIN".equals(usuarioLogueado.getTipo()) && "CLIENTE".equals(usuarioTarget.getTipo())) {
            return true;
        }
        
        return false;
    }

    private boolean tienePermisosEliminacion(Usuario usuarioLogueado, Usuario usuarioTarget) {
        if (usuarioLogueado.getIdUsuario().equals(usuarioTarget.getIdUsuario())) {
            return false;
        }
        
        if ("ADMIN+".equals(usuarioLogueado.getTipo())) {
            return true;
        }
        
        if ("ADMIN".equals(usuarioLogueado.getTipo()) && "CLIENTE".equals(usuarioTarget.getTipo())) {
            return true;
        }
        
        return false;
    }
}