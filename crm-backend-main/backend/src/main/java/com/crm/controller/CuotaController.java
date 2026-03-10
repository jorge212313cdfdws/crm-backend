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

import com.crm.entity.Cuota;
import com.crm.service.CuotaService;

@RestController
@RequestMapping("/api/cuotas")
@CrossOrigin("*")
public class CuotaController {

    private final CuotaService service;

    public CuotaController(CuotaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Cuota> all(){ return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Cuota> one(@PathVariable Integer id){
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cuota create(@RequestBody Cuota obj){ return service.save(obj); }

    @PutMapping("/{id}")
    public ResponseEntity<Cuota> update(@PathVariable Integer id,@RequestBody Cuota obj){
        return service.findById(id)
                .map(e->{ obj.setId(id); return ResponseEntity.ok(service.save(obj)); })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ service.delete(id); }
}