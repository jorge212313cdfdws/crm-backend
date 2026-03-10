package com.crm.controller;

import com.crm.entity.Centro;
import com.crm.service.CentroService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/centros")
@CrossOrigin("*")
public class CentroController {

    private final CentroService service;

    public CentroController(CentroService service) {
        this.service = service;
    }

    @GetMapping
    public List<Centro> all() { return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Centro> one(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Centro create(@RequestBody Centro obj) {
        return service.save(obj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Centro> update(@PathVariable Integer id,@RequestBody Centro obj){
        return service.findById(id)
                .map(e->{
                    obj.setId(id);
                    return ResponseEntity.ok(service.save(obj));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        service.deleteById(id);
    }
}