package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "bonos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bono {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "config_id")
    private BonoConfig config;

    private Integer sesiones;
    private LocalDate fechaCaducidad;
}