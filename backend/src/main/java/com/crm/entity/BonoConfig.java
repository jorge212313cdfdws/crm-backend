package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "bonos_config")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BonoConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "centro_id")
    private Centro centro;

    private String nombre;
    private LocalDate expirationMax;
}