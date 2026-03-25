package com.crm.service;

import com.crm.entity.ListaNegra;
import com.crm.repository.ListaNegraRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ListaNegraService {

    private final ListaNegraRepository repository;

    public ListaNegraService(ListaNegraRepository repository) {
        this.repository = repository;
    }

    public List<ListaNegra> findAll() {
        return repository.findAll();
    }

    public Optional<ListaNegra> findById(Integer id) {
        return repository.findById(id);
    }

    public ListaNegra save(ListaNegra listaNegra) {
        return repository.save(listaNegra);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
