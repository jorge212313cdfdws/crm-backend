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
                    if (obj.getNombre()          != null) e.setNombre(obj.getNombre());
                    if (obj.getApellidos()       != null) e.setApellidos(obj.getApellidos());
                    if (obj.getEmail()           != null) e.setEmail(obj.getEmail());
                    if (obj.getActivo()          != null) e.setActivo(obj.getActivo());
                    if (obj.getPagador()         != null) e.setPagador(obj.getPagador());
                    if (obj.getDireccion()       != null) e.setDireccion(obj.getDireccion());
                    if (obj.getFechaNacimiento() != null) e.setFechaNacimiento(obj.getFechaNacimiento());
                    if (obj.getTipoAcceso()      != null) e.setTipoAcceso(obj.getTipoAcceso());
                    if (obj.getEnListaNegra()    != null) e.setEnListaNegra(obj.getEnListaNegra());
                    if (obj.getCentro()          != null) e.setCentro(obj.getCentro());
                    return ResponseEntity.ok(service.save(e));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ service.deleteById(id); }
}