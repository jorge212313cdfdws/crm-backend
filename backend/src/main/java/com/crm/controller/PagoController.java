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

import com.crm.entity.Pago;
import com.crm.service.PagoService;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin("*")
public class PagoController {

    private final PagoService service;

    public PagoController(PagoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pago> all(){ return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> one(@PathVariable Integer id){
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pago create(@RequestBody Pago obj){ return service.save(obj); }

    @PutMapping("/{id}")
    public ResponseEntity<Pago> update(@PathVariable Integer id,@RequestBody Pago obj){
        return service.findById(id)
                .map(e->{ obj.setId(id); return ResponseEntity.ok(service.save(obj)); })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ service.delete(id); }
}