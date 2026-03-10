package com.crm.controller;

import com.crm.entity.InscripcionCurso;
import com.crm.service.InscripcionCursoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/inscripciones")
@CrossOrigin("*")
public class InscripcionCursoController {

    private final InscripcionCursoService service;

    public InscripcionCursoController(InscripcionCursoService service) {
        this.service = service;
    }

    @GetMapping
    public List<InscripcionCurso> all(){ return service.findAll(); }

    @PostMapping
    public InscripcionCurso create(@RequestBody InscripcionCurso obj){ return service.save(obj); }
}