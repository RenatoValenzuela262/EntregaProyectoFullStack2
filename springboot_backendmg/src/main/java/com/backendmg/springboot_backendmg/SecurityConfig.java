package com.backendmg.springboot_backendmg;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Habilita CORS usando el bean "corsConfigurationSource"
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // 2. Desactiva CSRF
            .csrf(csrf -> csrf.disable())
            
            // 3. Permite todas las peticiones (login, registro, productos, etc.)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/**").permitAll() // Permite todo en todas las rutas
                .anyRequest().authenticated()
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // La URL de tu frontend
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        
        // Los métodos que permites (GET, POST, PUT, DELETE, OPTIONS)
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Permite todos los headers (Content-Type, Authorization, etc)
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        // Permite credenciales (si usas cookies o sesiones)
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplica esta configuración a TODAS las rutas de tu backend
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}