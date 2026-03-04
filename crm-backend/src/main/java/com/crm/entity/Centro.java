package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "centros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Centro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    private String apiUrl;
    private String clientCode;
    private String password;

    @OneToMany(mappedBy = "centro", cascade = CascadeType.ALL)
    private List<Cliente> clientes;

    public void setId(Integer id) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}