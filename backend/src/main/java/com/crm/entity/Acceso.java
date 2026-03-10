package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "accesos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Acceso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "zona_id")
    private Zona zona;

    @Enumerated(EnumType.STRING)
    private TipoAcceso tipo;

    private LocalDateTime fecha;
}