package com.crm.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "maquinas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Maquina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    
    @Enumerated(EnumType.STRING)
    private TipoMaquina tipo;
    
    @Enumerated(EnumType.STRING)
    private GrupoEntrada grupoEntrada;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "centro_id")
    @JsonIgnoreProperties("maquinas")
    private Centro centro;

    public GrupoEntrada getGrupoEntrada() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public enum TipoMaquina { PILATES, BODYROLL }
    public enum GrupoEntrada { GRUPO_10_MIN, GRUPO_5_MIN }
}