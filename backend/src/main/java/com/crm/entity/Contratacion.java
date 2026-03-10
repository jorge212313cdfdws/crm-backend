package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "contrataciones")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Contratacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String estado;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
}
