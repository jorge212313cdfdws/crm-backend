package com.crm.controller;

import com.crm.entity.Cliente;
import com.crm.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin("*")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Cliente> all(){ return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> one(@PathVariable Integer id){
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cliente create(@RequestBody Cliente obj){ return service.save(obj); }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> update(@PathVariable Integer id,@RequestBody Cliente obj){
        return service.findById(id)
                .map(e->{
                    obj.setId(id);
                    return ResponseEntity.ok(service.save(obj));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ service.deleteById(id); }
}