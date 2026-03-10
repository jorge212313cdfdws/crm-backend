package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Table(name = "cursos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "actividad_id")
    private Actividad actividad;

    private String nombre;
    private Integer semanaInicio;
    private Integer semanaFin;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private Integer edadDesde;
    private Integer edadHasta;
    private String nivel;
}