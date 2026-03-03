package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.Bono;
import com.crm.repository.BonoRepository;

@Service
public class BonoService {

    private final BonoRepository repository;

    public BonoService(BonoRepository repository) {
        this.repository = repository;
    }

    public List<Bono> findAll() { return repository.findAll(); }

    public Optional<Bono> findById(Integer id) { return repository.findById(id); }

    public Bono save(Bono obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}