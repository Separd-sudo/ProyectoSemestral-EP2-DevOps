package com.citt.exceptions.dto;

import org.springframework.http.HttpStatus;

/**
 * DTO utilizado para representar mensajes de error personalizados
 * que serán enviados desde el backend hacia el frontend o cliente API.
 *
 * Se decidió escribir constructores, getters y setters manualmente
 * para evitar problemas de compilación asociados a Lombok.
 */
public class ErrorMessage {

    /**
     * Estado HTTP asociado al error.
     * Ejemplos: 400 BAD_REQUEST, 404 NOT_FOUND, 500 INTERNAL_SERVER_ERROR.
     */
    private HttpStatus status;

    /**
     * Mensaje descriptivo del error ocurrido.
     * Este mensaje ayuda a entender el motivo de la respuesta fallida.
     */
    private String message;

    /**
     * Constructor vacío requerido por frameworks como Spring y Jackson.
     * Permite crear objetos ErrorMessage sin valores iniciales.
     */
    public ErrorMessage() {
    }

    /**
     * Constructor con parámetros.
     * Este constructor permite crear una respuesta de error indicando
     * directamente el estado HTTP y el mensaje descriptivo.
     *
     * @param status  estado HTTP asociado al error.
     * @param message mensaje descriptivo del error.
     */
    public ErrorMessage(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    /**
     * Retorna el estado HTTP asociado al error.
     *
     * @return estado HTTP del error.
     */
    public HttpStatus getStatus() {
        return status;
    }

    /**
     * Asigna el estado HTTP asociado al error.
     *
     * @param status estado HTTP que se desea guardar.
     */
    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    /**
     * Retorna el mensaje descriptivo del error.
     *
     * @return mensaje del error.
     */
    public String getMessage() {
        return message;
    }

    /**
     * Asigna el mensaje descriptivo del error.
     *
     * @param message mensaje que se desea guardar.
     */
    public void setMessage(String message) {
        this.message = message;
    }
}