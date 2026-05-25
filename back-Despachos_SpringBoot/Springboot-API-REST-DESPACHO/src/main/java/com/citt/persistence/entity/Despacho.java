package com.citt.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Table(name = "despacho")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Despacho {

    /*
     * ID principal del despacho.
     * Utiliza una secuencia PostgreSQL.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "despacho_seq_generator")
    @SequenceGenerator(
            name = "despacho_seq_generator",
            sequenceName = "despacho_seq",
            allocationSize = 1
    )
    @Column(name = "id_despacho")
    private Long idDespacho;

    /*
     * Fecha del despacho.
     */
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "fecha_despacho")
    private LocalDate fechaDespacho;

    /*
     * Patente del camión.
     */
    @Column(name = "patente_camion")
    private String patenteCamion;

    /*
     * Cantidad de intentos.
     */
    private int intento;

    /*
     * ID de la compra asociada.
     */
    @Column(name = "id_compra")
    private Long idCompra;

    /*
     * Dirección de la compra.
     */
    @Column(name = "direccion_compra")
    private String direccionCompra;

    /*
     * Valor de la compra.
     */
    @Column(name = "valor_compra")
    private Long valorCompra;

    /*
     * Estado del despacho.
     */
    private boolean despachado = false;
}