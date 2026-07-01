package com.citt.exceptions.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.http.HttpStatus;

/**
 * DTO utilizado para representar respuestas de error personalizadas
 * enviadas desde el backend hacia el cliente.
 *
 * Esta clase se utiliza principalmente dentro de los handlers de excepciones
 * para retornar mensajes de error estructurados en formato JSON.
 *
 * Lombok se utiliza para reducir código repetitivo:
 *
 * @Data
 * Genera automáticamente:
 * - Getters
 * - Setters
 * - toString()
 * - equals()
 * - hashCode()
 *
 * @AllArgsConstructor
 * Genera un constructor con todos los atributos.
 *
 * @NoArgsConstructor
 * Genera un constructor vacío.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorMessage {

    /**
     * Estado HTTP asociado al error.
     *
     * Ejemplos:
     * - 400 BAD_REQUEST
     * - 404 NOT_FOUND
     * - 500 INTERNAL_SERVER_ERROR
     */
    private HttpStatus status;

    /**
     * Mensaje descriptivo del error ocurrido.
     */
    private String message;
}