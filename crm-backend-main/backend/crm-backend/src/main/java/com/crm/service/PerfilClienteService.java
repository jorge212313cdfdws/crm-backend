package com.crm.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.crm.entity.PerfilCliente;
import com.crm.repository.PerfilClienteRepository;

@Service
public class PerfilClienteService {

    private final PerfilClienteRepository repo;

    public PerfilClienteService(PerfilClienteRepository repo) {
        this.repo = repo;
    }

    public List<PerfilCliente> findAll(){
        return repo.findAll();
    }

    public PerfilCliente save(PerfilCliente obj){
        return repo.save(obj);
    }

    public void delete(Integer id){
        repo.deleteById(id);
    }
}