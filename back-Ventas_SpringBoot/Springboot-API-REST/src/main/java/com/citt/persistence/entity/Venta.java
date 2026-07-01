package com.citt.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/*
 * =========================================================
 * ENTITY: Venta
 * =========================================================
 * Representa las ventas realizadas por clientes.
 * =========================================================
 */

@Entity
@Table(name = "venta")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Venta {

    /*
     * =====================================================
     * ID DE LA VENTA
     * =====================================================
     */

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "venta_seq_gen")
    @SequenceGenerator(
            name = "venta_seq_gen",
            sequenceName = "venta_seq",
            allocationSize = 1
    )
    @Column(name = "id_venta")
    private Long idVenta;

    /*
     * Dirección asociada a la compra
     */
    @Column(name = "direccion_compra")
    private String direccionCompra;

    /*
     * Fecha de la compra
     */
    @Column(name = "fecha_compra")
    private LocalDate fechaCompra;

    /*
     * Valor total
     */
    @Column(name = "valor_compra")
    private Integer valorCompra;

    /*
     * Indica si ya se generó despacho
     */
    @Column(name = "despacho_generado")
    private boolean despachoGenerado;

    /*
     * Patente del camión asignado
     */
    @Column(name = "patente_camion")
    private String patenteCamion;   

}