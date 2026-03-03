package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "cliente_perfiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientePerfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "perfil_id")
    private PerfilCliente perfil;

    @ManyToOne
    @JoinColumn(name = "valor_id")
    private PerfilValor valor;

    private LocalDate fechaAlta;
    private LocalDate fechaBaja;
}