package com.crm.controller;

import com.crm.entity.Maquina;
import com.crm.repository.MaquinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maquinas")
@CrossOrigin(origins = "*") // Para que tu React no tenga problemas de CORS
public class MaquinaController {

    @Autowired
    private MaquinaRepository maquinaRepository;

    // 1. Obtener todas las máquinas (General)
    @GetMapping
    public List<Maquina> getAll() {
        return maquinaRepository.findAll();
    }

    // 2. Obtener las máquinas de un centro específico
    // GET /api/maquinas/centro/1
    @GetMapping("/centro/{centroId}")
    public List<Maquina> getByCentro(@PathVariable Integer centroId) {
        return maquinaRepository.findByCentroId(centroId);
    }

    // 3. Crear una nueva máquina
    @PostMapping
    public Maquina save(@RequestBody Maquina maquina) {
        return maquinaRepository.save(maquina);
    }

    // 4. Actualizar una máquina (por si cambia de nombre o grupo de entrada)
    @PutMapping("/{id}")
    public ResponseEntity<Maquina> update(@PathVariable Integer id, @RequestBody Maquina detalles) {
        return maquinaRepository.findById(id)
            .map(maquina -> {
                maquina.setNombre(detalles.getNombre());
                maquina.setTipo(detalles.getTipo());
                maquina.setGrupoEntrada(detalles.getGrupoEntrada());
                maquina.setCentro(detalles.getCentro());
                return ResponseEntity.ok(maquinaRepository.save(maquina));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // 5. Borrar una máquina
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        maquinaRepository.deleteById(id);
    }
}