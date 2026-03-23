package com.crm.repository;

import com.crm.entity.Maquina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MaquinaRepository extends JpaRepository<Maquina, Integer> {
    
    // Para listar máquinas disponibles en un centro específico
    List<Maquina> findByCentroId(Integer centroId);
    
    // Para filtrar máquinas por tipo (Pilates/Bodyroll) dentro de un centro
    List<Maquina> findByCentroIdAndTipo(Integer centroId, Maquina.TipoMaquina tipo);
}