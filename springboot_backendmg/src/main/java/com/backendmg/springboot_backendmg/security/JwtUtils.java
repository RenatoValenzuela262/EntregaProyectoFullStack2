package com.backendmg.springboot_backendmg.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.token.validity}")
    private long jwtTokenValidity;

    // Obtiene el nombre de usuario (o Subject) del token
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    // Obtiene la fecha de expiración del token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    // Método genérico para obtener cualquier Claim
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    // Resuelve y parsea todos los Claims del token
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey()) // Usa la clave secreta para verificar la firma
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    

    // Genera el token principal
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // Aquí podrías añadir roles u otra información del usuario a los Claims
        return doGenerateToken(claims, userDetails.getUsername());
    }

    // Lógica para construir el token
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject) // Generalmente el username o correo
                .setIssuedAt(new Date(System.currentTimeMillis()))
                // Define la fecha de expiración sumando el tiempo de validez
                .setExpiration(new Date(System.currentTimeMillis() + jwtTokenValidity)) 
                .signWith(getSigningKey(), SignatureAlgorithm.HS512) // Firma con la clave secreta y algoritmo
                .compact();
    }
    

    // Verifica si el token expiró
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
    
    // Valida que el token no haya expirado y que el username coincida
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    // Obtiene la clave de firma decodificada
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(this.secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}