package com.crm.controller;

import com.crm.entity.Actividad;
import com.crm.service.ActividadService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/actividades")
@CrossOrigin("*")
public class ActividadController {

    private final ActividadService service;

    public ActividadController(ActividadService service) {
        this.service = service;
    }

    @GetMapping
    public List<Actividad> all(){ return service.findAll(); }

    @PostMapping
    public Actividad create(@RequestBody Actividad obj){ return service.save(obj); }
}