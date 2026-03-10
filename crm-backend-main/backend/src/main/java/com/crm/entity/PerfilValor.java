package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "perfiles_valores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PerfilValor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "perfil_id")
    private PerfilCliente perfil;

    private String valor;
}