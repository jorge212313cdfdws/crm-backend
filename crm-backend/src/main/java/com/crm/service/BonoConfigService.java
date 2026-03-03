package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.BonoConfig;
import com.crm.repository.BonoConfigRepository;

@Service
public class BonoConfigService {

    private final BonoConfigRepository repository;

    public BonoConfigService(BonoConfigRepository repository) {
        this.repository = repository;
    }

    public List<BonoConfig> findAll() { return repository.findAll(); }

    public Optional<BonoConfig> findById(Integer id) { return repository.findById(id); }

    public BonoConfig save(BonoConfig obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}