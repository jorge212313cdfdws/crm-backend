package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.Pago;
import com.crm.repository.PagoRepository;

@Service
public class PagoService {

    private final PagoRepository repository;

    public PagoService(PagoRepository repository) {
        this.repository = repository;
    }

    public List<Pago> findAll() { return repository.findAll(); }

    public Optional<Pago> findById(Integer id) { return repository.findById(id); }

    public Pago save(Pago obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}