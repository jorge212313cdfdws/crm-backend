package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reservas")
@Data
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String actividad;
    private String fecha; 

    @Column(name = "hora_inicio") // Fuerza a Java a buscar "hora_inicio" en SQL
    private String horaInicio;

    @Column(name = "hora_fin")    // Fuerza a Java a buscar "hora_fin" en SQL
    private String horaFin;

    private String sala;
    private String monitor;
}