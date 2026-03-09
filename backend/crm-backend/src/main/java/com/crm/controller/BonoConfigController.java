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

import com.crm.entity.BonoConfig;
import com.crm.service.BonoConfigService;

@RestController
@RequestMapping("/api/bonos-config")
@CrossOrigin("*")
public class BonoConfigController {

    private final BonoConfigService service;

    public BonoConfigController(BonoConfigService service){
        this.service = service;
    }

    @GetMapping
    public List<BonoConfig> all(){
        return service.findAll();
    }

    @PostMapping
    public BonoConfig save(@RequestBody BonoConfig obj){
        return service.save(obj);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        service.delete(id);
    }
}