package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.Acceso;
import com.crm.repository.AccesoRepository;

@Service
public class AccesoService {

    private final AccesoRepository repository;

    public AccesoService(AccesoRepository repository) {
        this.repository = repository;
    }

    public List<Acceso> findAll() { return repository.findAll(); }

    public Optional<Acceso> findById(Integer id) { return repository.findById(id); }

    public Acceso save(Acceso obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}