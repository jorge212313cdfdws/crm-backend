package com.crm.repository;

import com.crm.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository // Solo esto. QUITA los @RestController y @RequestMapping de aquí.
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    
    List<Reserva> findByFecha(String fecha);

}