package com.crm.service;

import com.crm.entity.Recurso;
import com.crm.repository.RecursoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecursoService {

    private final RecursoRepository recursoRepository;

    public RecursoService(RecursoRepository recursoRepository) {
        this.recursoRepository = recursoRepository;
    }

    public List<Recurso> findAll() {
        return recursoRepository.findAll();
    }

    public Optional<Recurso> findById(Integer id) {
        return recursoRepository.findById(id);
    }

    public Recurso save(Recurso recurso) {
        return recursoRepository.save(recurso);
    }

    public void deleteById(Integer id) {
        recursoRepository.deleteById(id);
    }
}