package com.crm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.entity.Curso;
import com.crm.service.CursoService;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin("*")
public class CursoController {

    private final CursoService service;

    public CursoController(CursoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Curso> all(){ return service.findAll(); }

    @PostMapping
    public Curso create(@RequestBody Curso obj){ return service.save(obj); }
}