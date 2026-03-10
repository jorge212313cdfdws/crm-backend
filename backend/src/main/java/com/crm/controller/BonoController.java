package com.crm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.entity.Bono;
import com.crm.service.BonoService;

@RestController
@RequestMapping("/api/bonos")
@CrossOrigin("*")
public class BonoController {
    private final BonoService service;
    public BonoController(BonoService service){this.service=service;}
    @GetMapping public List<Bono> all(){return service.findAll();}
    @PostMapping public Bono create(@RequestBody Bono o){return service.save(o);}
}