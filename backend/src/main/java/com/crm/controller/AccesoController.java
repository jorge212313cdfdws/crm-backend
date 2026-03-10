package com.crm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.entity.Acceso;
import com.crm.service.AccesoService;

@RestController
@RequestMapping("/api/accesos")
@CrossOrigin("*")
public class AccesoController {

    private final AccesoService service;

    public AccesoController(AccesoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Acceso> all(){ return service.findAll(); }

    @PostMapping
    public Acceso create(@RequestBody Acceso obj){ return service.save(obj); }
}