package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.Zona;
import com.crm.repository.ZonaRepository;

@Service
public class ZonaService {

    private final ZonaRepository repository;

    public ZonaService(ZonaRepository repository) {
        this.repository = repository;
    }

    public List<Zona> findAll() { return repository.findAll(); }

    public Optional<Zona> findById(Integer id) { return repository.findById(id); }

    public Zona save(Zona obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}