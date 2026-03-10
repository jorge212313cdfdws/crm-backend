package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.Centro;
import com.crm.repository.CentroRepository;

@Service
public class CentroService {

    private final CentroRepository centroRepository;

    public CentroService(CentroRepository centroRepository) {
        this.centroRepository = centroRepository;
    }

    public List<Centro> findAll() {
        return centroRepository.findAll();
    }

    public Optional<Centro> findById(Integer id) {
        return centroRepository.findById(id);
    }

    public Centro save(Centro centro) {
        return centroRepository.save(centro);
    }

    public void deleteById(Integer id) {
        centroRepository.deleteById(id);
    }
}