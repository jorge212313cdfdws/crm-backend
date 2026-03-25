package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "lista_negra")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ListaNegra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private String motivo;

    @Column(name = "fecha_bloqueo")
    private LocalDate fechaBloqueo;

    @ManyToOne
    @JoinColumn(name = "autor_empleado_id")
    private Empleado autorEmpleado;

    private Boolean activo;
}
