package com.backendmg.springboot_backendmg.services;

import java.util.List;
import java.util.Optional;

import com.backendmg.springboot_backendmg.entities.Orden;


public interface OrdenService {

    List<Orden> findByAll();

    Optional<Orden> findById(Long id);

    Orden save (Orden ordenExistente);

    Optional<Orden> delete(Orden unOrden);

}
