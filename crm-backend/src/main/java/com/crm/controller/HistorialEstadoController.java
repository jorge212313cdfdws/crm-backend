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

import com.crm.entity.HistorialEstado;
import com.crm.service.HistorialEstadoService;

@RestController
@RequestMapping("/api/historial-estados")
@CrossOrigin("*")
public class HistorialEstadoController {

    private final HistorialEstadoService service;

    public HistorialEstadoController(HistorialEstadoService service){
        this.service = service;
    }

    @GetMapping
    public List<HistorialEstado> all(){
        return service.findAll();
    }

    @PostMapping
    public HistorialEstado save(@RequestBody HistorialEstado obj){
        return service.save(obj);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        service.delete(id);
    }
}