package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.Curso;
import com.crm.repository.CursoRepository;

@Service
public class CursoService {

    private final CursoRepository repository;

    public CursoService(CursoRepository repository) {
        this.repository = repository;
    }

    public List<Curso> findAll() { return repository.findAll(); }

    public Optional<Curso> findById(Integer id) { return repository.findById(id); }

    public Curso save(Curso obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}