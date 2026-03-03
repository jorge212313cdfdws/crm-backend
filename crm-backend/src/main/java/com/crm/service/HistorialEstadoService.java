package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.HistorialEstado;
import com.crm.repository.HistorialEstadoRepository;

@Service
public class HistorialEstadoService {

    private final HistorialEstadoRepository repository;

    public HistorialEstadoService(HistorialEstadoRepository repository) {
        this.repository = repository;
    }

    public List<HistorialEstado> findAll() { return repository.findAll(); }

    public Optional<HistorialEstado> findById(Integer id) { return repository.findById(id); }

    public HistorialEstado save(HistorialEstado obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}