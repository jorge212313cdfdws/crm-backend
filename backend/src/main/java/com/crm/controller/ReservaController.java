package com.crm.controller;

import com.crm.entity.Reserva;
import com.crm.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:5173") // Para evitar problemas de permisos
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @GetMapping
    public List<Reserva> getByFecha(@RequestParam String fecha) {
        return reservaRepository.findByFecha(fecha);
    }

    @PostMapping
    public Reserva create(@RequestBody Reserva reserva) {
        return reservaRepository.save(reserva);
    }
}