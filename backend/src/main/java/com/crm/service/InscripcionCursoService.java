package com.crm.service;

import com.crm.entity.InscripcionCurso;
import com.crm.repository.InscripcionCursoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class InscripcionCursoService {

    private final InscripcionCursoRepository repository;

    public InscripcionCursoService(InscripcionCursoRepository repository) {
        this.repository = repository;
    }

    public List<InscripcionCurso> findAll() { return repository.findAll(); }

    public Optional<InscripcionCurso> findById(Integer id) { return repository.findById(id); }

    public InscripcionCurso save(InscripcionCurso obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}