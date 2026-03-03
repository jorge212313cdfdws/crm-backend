package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recursos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recurso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "centro_id")
    private Centro centro;

    private String nombre;
}