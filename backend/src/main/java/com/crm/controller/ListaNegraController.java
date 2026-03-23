package com.crm.controller;

import com.crm.entity.ListaNegra;
import com.crm.service.ListaNegraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/lista-negra")
@CrossOrigin("*")
public class ListaNegraController {

    private final ListaNegraService service;

    public ListaNegraController(ListaNegraService service) {
        this.service = service;
    }

    @GetMapping
    public List<ListaNegra> all() {
        return service.findAll();
    }

    @PostMapping
    public ListaNegra create(@RequestBody ListaNegra obj) {
        if (obj.getFechaBloqueo() == null) {
            obj.setFechaBloqueo(LocalDate.now());
        }
        obj.setActivo(true);
        return service.save(obj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListaNegra> update(@PathVariable Integer id, @RequestBody ListaNegra obj) {
        return service.findById(id)
                .map(e -> {
                    if (obj.getMotivo()       != null) e.setMotivo(obj.getMotivo());
                    if (obj.getActivo()       != null) e.setActivo(obj.getActivo());
                    return ResponseEntity.ok(service.save(e));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.deleteById(id);
    }
}
