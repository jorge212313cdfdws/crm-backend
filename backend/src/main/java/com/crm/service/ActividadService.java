package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.Actividad;
import com.crm.repository.ActividadRepository;

@Service
public class ActividadService {

    private final ActividadRepository repository;

    public ActividadService(ActividadRepository repository) {
        this.repository = repository;
    }

    public List<Actividad> findAll() { return repository.findAll(); }

    public Optional<Actividad> findById(Integer id) { return repository.findById(id); }

    public Actividad save(Actividad obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}