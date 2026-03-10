package com.crm.controller;

import com.crm.entity.Recurso;
import com.crm.service.RecursoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recursos")
@CrossOrigin("*")
public class RecursoController {

    private final RecursoService service;

    public RecursoController(RecursoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Recurso> all(){ return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Recurso> one(@PathVariable Integer id){
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Recurso create(@RequestBody Recurso obj){ return service.save(obj); }

    @PutMapping("/{id}")
    public ResponseEntity<Recurso> update(@PathVariable Integer id,@RequestBody Recurso obj){
        return service.findById(id)
                .map(e->{
                    obj.setId(id);
                    return ResponseEntity.ok(service.save(obj));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ service.deleteById(id); }
}