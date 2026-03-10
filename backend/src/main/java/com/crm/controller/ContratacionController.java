package com.crm.controller;

import com.crm.entity.Contratacion;
import com.crm.service.ContratacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contrataciones")
@CrossOrigin("*")
public class ContratacionController {

    private final ContratacionService service;

    public ContratacionController(ContratacionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Contratacion> all(){ return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Contratacion> one(@PathVariable Integer id){
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Contratacion create(@RequestBody Contratacion obj){ return service.save(obj); }

    @PutMapping("/{id}")
    public ResponseEntity<Contratacion> update(@PathVariable Integer id,@RequestBody Contratacion obj){
        return service.findById(id)
                .map(e->{ obj.setId(id); return ResponseEntity.ok(service.save(obj)); })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ service.delete(id); }
}