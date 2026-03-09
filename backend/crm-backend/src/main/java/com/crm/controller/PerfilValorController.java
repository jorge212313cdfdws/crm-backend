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

import com.crm.entity.PerfilValor;
import com.crm.service.PerfilValorService;

@RestController
@RequestMapping("/api/perfil-valores")
@CrossOrigin("*")
public class PerfilValorController {

    private final PerfilValorService service;

    public PerfilValorController(PerfilValorService service){
        this.service = service;
    }

    @GetMapping
    public List<PerfilValor> all(){
        return service.findAll();
    }

    @PostMapping
    public PerfilValor save(@RequestBody PerfilValor obj){
        return service.save(obj);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        service.delete(id);
    }
}