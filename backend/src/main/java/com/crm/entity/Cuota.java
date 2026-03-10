package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "cuotas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Cuota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "contratacion_id")
    private Contratacion contratacion;

    private LocalDate fechaDesde;
    private LocalDate fechaHasta;
    private Boolean pagada;

    // Métodos manuales para asegurar la compilación
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
}
