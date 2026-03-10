package com.crm.repository;

import com.crm.entity.Contratacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContratacionRepository extends JpaRepository<Contratacion, Integer> {
}