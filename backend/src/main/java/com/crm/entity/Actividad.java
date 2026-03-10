package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "actividades")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "centro_id")
    private Centro centro;

    private String nombre;
    private String color;
    private String imagen;
    private Integer grupoId;
}