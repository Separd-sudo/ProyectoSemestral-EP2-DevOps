import { useState, useEffect } from "react";
import axios from "axios";
import { CardComponent } from "./CardComponent";
import { TableCompras } from "./TableCompras";
import { TableDespachos } from "./TableDespachos";
import { FormNuevaVenta } from "./FormNuevaVenta"; // 👈 Importamos tu nuevo formulario

export const PruebaCards = () => {
  const [tablaCompras, setTablaCompras] = useState(false);
  const [tablaOrdenes, setTablaOrdenes] = useState(false);
  const [compras, setCompras] = useState([]);
  const [despachos, setDespachos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVentas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_VENTAS_URL}/api/v1/ventas`);
      setCompras(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error en Ventas:", error);
    } finally { setLoading(false); }
  };

  const fetchDespachos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_DESPACHOS_URL}/api/v1/despachos`);
      setDespachos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error en Despachos:", error);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchVentas();
    fetchDespachos();
  }, []);

  // Función combinada para actualizar todo cuando se crea una venta
  const handleVentaCreada = () => {
    fetchVentas();
    fetchDespachos();
  };

  return (
    <section className="p-4 max-w-6xl mx-auto">
      
      {loading && (
        <div className="text-center text-sm font-semibold text-teal-600 mb-2 animate-pulse">
          🔄 Sincronizando con instancias EC2 en AWS...
        </div>
      )}

      {/* 👈 ENTRADA DE DATOS: Formulario compacto de ventas visible en la parte superior */}
      <FormNuevaVenta onVentaCreada={handleVentaCreada} />

      {/* Bloque superior con las tarjetas de acceso modular */}
      <div className="flex justify-center gap-4 mb-6">
        <CardComponent
          title="Consultar Ordenes de compra 💰"
          description="Revisa las últimas oc realizadas para generar su despacho"
          buttonText="Consultar"
          onClick={() => {
            fetchVentas();
            setTablaCompras(true);
            setTablaOrdenes(false);
          }}
        />
        <CardComponent
          title="Revisar Ordenes de despacho 🚚"
          description="Consulta los despachos realizados, modifica los registros de intentos o cierra la orden"
          buttonText="Consultar"
          onClick={() => {
            fetchDespachos();
            setTablaCompras(false);
            setTablaOrdenes(true);
          }}
        />
      </div>

      <section className="mt-4">
        {tablaCompras && <TableCompras compras={compras} onRefresh={fetchVentas} />}
        {tablaOrdenes && <TableDespachos despachos={despachos} onRefresh={fetchDespachos} />}
      </section>
    </section>
  );
};