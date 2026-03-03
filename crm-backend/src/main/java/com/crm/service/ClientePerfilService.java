package com.crm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crm.entity.ClientePerfil;
import com.crm.repository.ClientePerfilRepository;

@Service
public class ClientePerfilService {

    private final ClientePerfilRepository repository;

    public ClientePerfilService(ClientePerfilRepository repository) {
        this.repository = repository;
    }

    public List<ClientePerfil> findAll() { return repository.findAll(); }

    public Optional<ClientePerfil> findById(Integer id) { return repository.findById(id); }

    public ClientePerfil save(ClientePerfil obj) { return repository.save(obj); }

    public void delete(Integer id) { repository.deleteById(id); }
}