package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.Cuota;
import com.crm.repository.CuotaRepository;

@Service
public class CuotaService {

    private final CuotaRepository repository;

    public CuotaService(CuotaRepository repository) {
        this.repository = repository;
    }

    public List<Cuota> findAll() { return repository.findAll(); }

    public Optional<Cuota> findById(Integer id) { return repository.findById(id); }

    public Cuota save(Cuota obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}