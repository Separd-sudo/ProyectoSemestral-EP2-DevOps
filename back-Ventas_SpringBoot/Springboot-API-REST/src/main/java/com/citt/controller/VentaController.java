package com.citt.controller;

import com.citt.exceptions.VentaNotFoundException;
import com.citt.persistence.entity.Venta;
import com.citt.persistence.services.VentaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/v1/ventas")
@Tag(name = "Venta", description = "Controlador para gestionar ventas")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    @Operation(summary = "Crear una nueva venta", description = "Crea una nueva venta en el sistema y genera su despacho automático")
    @PostMapping
    public ResponseEntity<Venta> crearVenta(@Valid @RequestBody Venta venta) {

        // 1. Guardamos la venta PRIMERO para que la base de datos genere el ID real
        Venta ventaGuardada = ventaService.saveVenta(venta);

        // 2. Construimos la URI de respuesta con el ID real ya asignado
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{idVenta}")
                .buildAndExpand(ventaGuardada.getIdVenta())
                .toUri();

        // 3. FLUJO AUTOMÁTICO: Enviar los datos al microservicio de Despachos (Puerto
        // 8082)
        // 💡 REEMPLAZA ESTE BLOQUE INTERNO EN TU VENTACONTROLLER:
        try {
            RestTemplate restTemplate = new RestTemplate();
            String urlDespachos = "http://backend-despachos:8080/api/v1/despachos";

            // Validamos si el objeto Venta trae una patente informada desde React
            String patenteAsignada = (ventaGuardada.getPatenteCamion() != null
                    && !ventaGuardada.getPatenteCamion().trim().isEmpty())
                            ? ventaGuardada.getPatenteCamion().trim().toUpperCase()
                            : "PENDIENTE";

            Map<String, Object> despachoPayload = new HashMap<>();
            despachoPayload.put("idCompra", ventaGuardada.getIdVenta());
            despachoPayload.put("direccionCompra", ventaGuardada.getDireccionCompra());
            despachoPayload.put("valorCompra", ventaGuardada.getValorCompra());
            despachoPayload.put("fechaDespacho", LocalDate.now().toString());

            // 🛻 Ahora mapea dinámicamente la patente del formulario
            despachoPayload.put("patenteCamion", patenteAsignada);
            despachoPayload.put("intento", 1);
            despachoPayload.put("despachado", false); // Inicia abierto

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(despachoPayload, headers);

            restTemplate.postForObject(urlDespachos, request, String.class);
            System.out.println(
                    "🚀 [AUTOMATIZACIÓN] Despacho creado con éxito para la compra ID: " + ventaGuardada.getIdVenta());

        } catch (Exception e) {
            System.err.println("⚠️ [ALERTA] No se pudo generar el despacho automático: " + e.getMessage());
        }
        // Retornamos la respuesta HTTP 201 Created con el objeto guardado
        return ResponseEntity.created(location).body(ventaGuardada);
    }

    @PutMapping("/{idVenta}")
    @Operation(summary = "Actualizar una venta existente", description = "Actualiza los detalles de una venta existente")
    public ResponseEntity<Venta> actualizarVenta(@Valid @PathVariable Long idVenta, @RequestBody Venta venta)
            throws VentaNotFoundException {
        Venta ventaActualizada = ventaService.updateVenta(idVenta, venta);
        return ResponseEntity.ok(ventaActualizada);
    }

    @GetMapping
    @Operation(summary = "Obtener todas las ventas", description = "Devuelve una lista de todas las ventas")
    public ResponseEntity<List<Venta>> getVentas() {
        return ResponseEntity.ok(ventaService.findAllVentas());
    }

    @GetMapping("/{idVenta}")
    @Operation(summary = "Obtener una venta por ID", description = "Devuelve los detalles de una venta específica")
    public ResponseEntity<Venta> obtenerVenta(@PathVariable Long idVenta) throws VentaNotFoundException {
        Venta venta = ventaService.findById(idVenta);
        return ResponseEntity.ok(venta);
    }

    @DeleteMapping("/{idVenta}")
    @Operation(summary = "Eliminar una venta", description = "Elimina una venta del sistema")
    public ResponseEntity<Void> eliminarVenta(@PathVariable Long idVenta) throws VentaNotFoundException {
        ventaService.deleteVenta(idVenta);
        return ResponseEntity.noContent().build();
    }
}