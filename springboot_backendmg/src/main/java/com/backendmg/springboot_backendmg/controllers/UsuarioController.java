package com.backendmg.springboot_backendmg.controllers;

import java.util.List;
import java.util.Optional;


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

import com.backendmg.springboot_backendmg.dto.LoginRequest;
import com.backendmg.springboot_backendmg.entities.Usuario;
import com.backendmg.springboot_backendmg.services.UsuarioService;

@RestController
@RequestMapping("api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
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

      @DeleteMapping("/{idUsuario}")
    public ResponseEntity<?> eliminar(@PathVariable Long idUsuario){
        Usuario unUsuario = new Usuario();
        unUsuario.setIdUsuario(idUsuario);;
        Optional<Usuario> usuarioOptional = service.delete(unUsuario);
        if(usuarioOptional.isPresent()){
            return ResponseEntity.ok(usuarioOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> log(@RequestBody LoginRequest loginRequest) {
        
        // Llama al servicio con el correo y la contraseña del DTO
        Optional<Usuario> authenticatedUser = service.login(
            loginRequest.getCorreo(),
            loginRequest.getContrasenia()
        );

        if (authenticatedUser.isPresent()) {
            // Éxito: Retorna el usuario autenticado con código 200 OK
            return new ResponseEntity<>(authenticatedUser.get(), HttpStatus.OK);
        } else {
            // Fallo: Retorna 401 Unauthorized con un mensaje de error
            String errorMessage = "Credenciales inválidas. Correo o Contraseña incorrectos.";
            return new ResponseEntity<>(errorMessage, HttpStatus.UNAUTHORIZED);
        }
    }






}
