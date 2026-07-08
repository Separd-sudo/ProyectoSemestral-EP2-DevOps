import { useState, useEffect } from "react";
import axios from "axios";
import { CardComponent } from "./CardComponent";
import { TableCompras } from "./TableCompras";
import { TableDespachos } from "./TableDespachos";
import { FormNuevaVenta } from "./FormNuevaVenta"; // 👈 Importamos tu nuevo formulario

export const PruebaCards = ({ activeTab, setActiveTab }) => {
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

      {/* Bloque superior con las tarjetas de acceso modular (solo en Inicio) */}
      {activeTab === "inicio" && (
        <div className="flex justify-center gap-4 mb-6">
          <CardComponent
            title="Consultar Ordenes de compra 💰"
            description="Revisa las últimas oc realizadas para generar su despacho"
            buttonText="Consultar"
            onClick={() => {
              fetchVentas();
              setActiveTab("compras");
            }}
          />
          <CardComponent
            title="Revisar Ordenes de despacho 🚚"
            description="Consulta los despachos realizados, modifica los registros de intentos o cierra la orden"
            buttonText="Consultar"
            onClick={() => {
              fetchDespachos();
              setActiveTab("despachos");
            }}
          />
        </div>
      )}

      {/* Vista de Ordenes de Compra */}
      {activeTab === "compras" && (
        <section className="mt-4">
          <FormNuevaVenta onVentaCreada={handleVentaCreada} />
          <TableCompras compras={compras} onRefresh={fetchVentas} />
        </section>
      )}

      {/* Vista de Ordenes de Despachos */}
      {activeTab === "despachos" && (
        <section className="mt-4">
          <TableDespachos despachos={despachos} onRefresh={fetchDespachos} />
        </section>
      )}
    </section>
  );
};