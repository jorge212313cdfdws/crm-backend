package com.crm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.entity.PerfilCliente;
import com.crm.service.PerfilClienteService;

@RestController
@RequestMapping("/api/perfiles")
@CrossOrigin("*")
public class PerfilClienteController {

    private final PerfilClienteService service;

    public PerfilClienteController(PerfilClienteService service) {
        this.service = service;
    }

    @GetMapping
    public List<PerfilCliente> all(){
        return service.findAll();
    }

    @PostMapping
    public PerfilCliente create(@RequestBody PerfilCliente obj){
        return service.save(obj);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        service.delete(id);
    }
}