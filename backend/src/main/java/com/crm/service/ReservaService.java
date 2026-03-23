package com.crm.service;

import com.crm.entity.Reserva;
import com.crm.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReservaService {

    @Autowired 
    private ReservaRepository reservaRepository;

    public List<Reserva> listarPorFecha(String fecha) {
        return reservaRepository.findByFecha(fecha);
    }

    public Reserva guardar(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public void eliminar(Integer id) {
        reservaRepository.deleteById(id);
    }

}