package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "clientes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "centro_id")
    private Centro centro;

    private String nombre;
    private String apellidos;
    private String numeroCliente;
    private LocalDate fechaNacimiento;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    private String email;
    private Boolean activo;
    private Boolean pagador;
    private String direccion;

    @OneToMany(mappedBy = "cliente")
    private List<Pago> pagos;

    public void setId(Integer id) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}