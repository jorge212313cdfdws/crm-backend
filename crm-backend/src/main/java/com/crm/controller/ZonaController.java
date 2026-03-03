package com.crm.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.entity.Zona;
import com.crm.service.ZonaService;

@RestController
@RequestMapping("/api/zonas")
@CrossOrigin("*")
public class ZonaController {

    private final ZonaService service;

    public ZonaController(ZonaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Zona> all(){ return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Zona> one(@PathVariable Integer id){
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Zona create(@RequestBody Zona obj){ return service.save(obj); }

    @PutMapping("/{id}")
    public ResponseEntity<Zona> update(@PathVariable Integer id,@RequestBody Zona obj){
        return service.findById(id)
                .map(e->{ obj.setId(id); return ResponseEntity.ok(service.save(obj)); })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ service.delete(id); }
}