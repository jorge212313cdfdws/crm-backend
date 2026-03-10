package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "contrataciones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contratacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "recurso_id")
    private Recurso recurso;

    private LocalDate fechaDesde;
    private LocalDate fechaHasta;
}