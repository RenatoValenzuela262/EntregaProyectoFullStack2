package com.backendmg.springboot_backendmg.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backendmg.springboot_backendmg.entities.Orden;
import com.backendmg.springboot_backendmg.repository.OrdenRepository;

@Service
public class OrdenServiceImpl implements OrdenService{

    @Autowired
    private OrdenRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Orden> findByAll() {
        return (List<Orden>) repository.findAll();

    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Orden> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Orden save(Orden unOrden) {
        return repository.save(unOrden);
    }

    @Override
    @Transactional
    public Optional<Orden> delete(Orden unOrden) {
        Optional<Orden> ordenOptional = repository.findById(unOrden.getId());
        ordenOptional.ifPresent(ordenDb ->{
            repository.delete(unOrden);
        });
        return ordenOptional;
    }

}
