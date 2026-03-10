package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "pagos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Pago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "contratacion_id")
    private Contratacion contratacion;

    private Double monto;
    private LocalDate fechaPago;
    private String metodoPago;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
}
