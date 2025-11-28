package com.backendmg.springboot_backendmg.security;



import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;


@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private UserDetailsService userDetailsService; // Necesario para cargar el usuario
    
    @Autowired
    private JwtUtils jwtUtils; // La utilidad que acabas de crear

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7); // Quitar "Bearer "
            try {
                username = jwtUtils.getUsernameFromToken(jwtToken); // Obtener el correo/username
            } catch (IllegalArgumentException e) {
                logger.error("No se pudo obtener el token JWT.");
            } catch (ExpiredJwtException e) {
                logger.error("El token JWT ha expirado.");
            }
        } else {
            logger.warn("El token JWT no comienza con Bearer String o está ausente.");
        }

        // 2. Validar el token y autenticar: solo si el username no es nulo y no hay autenticación previa
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // Si el token es válido (no expirado y coincide el usuario)
            if (jwtUtils.validateToken(jwtToken, userDetails)) {

                // Crea el objeto de autenticación de Spring Security
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Establece la autenticación en el contexto de seguridad (el usuario está logueado)
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        chain.doFilter(request, response);
    }



}
