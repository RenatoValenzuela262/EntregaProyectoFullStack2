package com.backendmg.springboot_backendmg.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backendmg.springboot_backendmg.dto.JwtResponse;
import com.backendmg.springboot_backendmg.dto.LoginRequest;
import com.backendmg.springboot_backendmg.security.JwtUtils;

@RestController
@RequestMapping("/auth") // Ruta separada para autenticación
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // 1. Validar credenciales (esto verifica el hash BCrypt internamente)
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getCorreo(), loginRequest.getContrasenia())
            );

            // 2. Cargar usuario y generar token
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getCorreo());
            String token = jwtUtils.generateToken(userDetails);

            // 3. Devolver token
            return ResponseEntity.ok(new JwtResponse(token));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }
}