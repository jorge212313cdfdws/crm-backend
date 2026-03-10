package com.crm.controller;

import com.crm.entity.Empleado;
import com.crm.service.EmpleadoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin("*")
public class EmpleadoController {

    private final EmpleadoService service;

    public EmpleadoController(EmpleadoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Empleado> all(){ return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Empleado> one(@PathVariable Integer id){
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Empleado create(@RequestBody Empleado obj){ return service.save(obj); }

    @PutMapping("/{id}")
    public ResponseEntity<Empleado> update(@PathVariable Integer id,@RequestBody Empleado obj){
        return service.findById(id)
                .map(e->{
                    obj.setId(id);
                    return ResponseEntity.ok(service.save(obj));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ service.deleteById(id); }
}