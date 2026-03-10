package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "perfiles_cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PerfilCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
}