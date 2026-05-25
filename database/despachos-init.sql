-- =========================================================
-- SCRIPT DE INICIALIZACIÓN - BASE DE DATOS DESPACHOS
-- =========================================================

-- =========================================================
-- SEQUENCE PARA IDs
-- =========================================================

CREATE SEQUENCE IF NOT EXISTS despacho_seq
START WITH 1
INCREMENT BY 1;

-- =========================================================
-- TABLA: despacho
-- =========================================================

CREATE TABLE IF NOT EXISTS despacho (

    -- ID principal
    id_despacho BIGINT PRIMARY KEY
    DEFAULT nextval('despacho_seq'),

    -- Fecha del despacho
    fecha_despacho DATE NOT NULL,

    -- Patente del camión
    patente_camion VARCHAR(100),

    -- Intentos de despacho
    intento INTEGER NOT NULL,

    -- ID de la compra asociada
    id_compra BIGINT NOT NULL,

    -- Dirección de compra
    direccion_compra VARCHAR(255),

    -- Valor compra
    valor_compra BIGINT,

    -- Estado despacho
    despachado BOOLEAN NOT NULL DEFAULT FALSE
);