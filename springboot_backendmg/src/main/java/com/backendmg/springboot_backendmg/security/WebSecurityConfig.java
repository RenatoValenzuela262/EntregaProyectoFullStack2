package com.backendmg.springboot_backendmg.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class WebSecurityConfig {


    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    // 1. Define el codificador de contraseñas (BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    // 2. Define el administrador de autenticación (necesario para el login)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // 3. Define la cadena de filtros de seguridad
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        
        http
            // Deshabilita CSRF (necesario para API REST sin cookies de sesión)
            .csrf(csrf -> csrf.disable())

            // Define la política de gestión de sesión como STATELESS (sin sesiones, usando tokens)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // Manejo de errores de autenticación
            .exceptionHandling(handling -> handling.authenticationEntryPoint((request, response, authException) -> {
                // Configura una respuesta 401 Unauthorized cuando el acceso es denegado
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized - Acceso no autorizado.");
            }))
            
            // Definición de reglas de autorización para endpoints
            .authorizeHttpRequests(authorize -> authorize
                // Permite el acceso sin autenticación al endpoint de login y registro
                .requestMatchers("/auth/login", "/api/usuarios").permitAll()
                
                // TODAS las demás solicitudes deben estar autenticadas
                .anyRequest().authenticated()
            );

        // 4. Agrega tu filtro JWT ANTES del filtro de autenticación estándar de Spring
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
