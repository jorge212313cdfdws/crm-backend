package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "zonas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Zona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    private String descripcion;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
}
