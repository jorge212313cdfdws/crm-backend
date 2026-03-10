package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.PerfilValor;
import com.crm.repository.PerfilValorRepository;

@Service
public class PerfilValorService {

    private final PerfilValorRepository repository;

    public PerfilValorService(PerfilValorRepository repository) {
        this.repository = repository;
    }

    public List<PerfilValor> findAll() { return repository.findAll(); }

    public Optional<PerfilValor> findById(Integer id) { return repository.findById(id); }

    public PerfilValor save(PerfilValor obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}