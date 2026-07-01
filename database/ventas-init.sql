-- =========================================================
-- SCRIPT DE INICIALIZACIÓN - BASE DE DATOS VENTAS
-- =========================================================

-- =========================================================
-- SEQUENCE PARA IDs
-- =========================================================

CREATE SEQUENCE IF NOT EXISTS venta_seq
START WITH 1
INCREMENT BY 1;

-- =========================================================
-- TABLA: venta
-- =========================================================

CREATE TABLE IF NOT EXISTS venta (

    -- ID principal
    id_venta BIGINT PRIMARY KEY
    DEFAULT nextval('venta_seq'),

    -- Dirección de compra
    direccion_compra VARCHAR(255) NOT NULL,

    -- Fecha de compra
    fecha_compra DATE NOT NULL,

    -- Valor compra
    valor_compra INTEGER NOT NULL,

    -- Estado despacho
    despacho_generado BOOLEAN NOT NULL DEFAULT FALSE
);