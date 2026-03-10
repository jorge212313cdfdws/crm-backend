package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.Contratacion;
import com.crm.repository.ContratacionRepository;

@Service
public class ContratacionService {

    private final ContratacionRepository repository;

    public ContratacionService(ContratacionRepository repository) {
        this.repository = repository;
    }

    public List<Contratacion> findAll() { return repository.findAll(); }

    public Optional<Contratacion> findById(Integer id) { return repository.findById(id); }

    public Contratacion save(Contratacion obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}