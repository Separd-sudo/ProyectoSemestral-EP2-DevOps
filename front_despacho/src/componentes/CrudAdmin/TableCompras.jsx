import { useState, useEffect } from "react";
import axios from "axios";

export const TableCompras = () => {
  // Inicializamos el estado siempre como un arreglo vacío para evitar errores de renderizado previos
  const [ventas, setVentas] = useState([]);

  // Función asíncrona para consultar el microservicio de Ventas
  const compras = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_VENTAS_URL}/api/v1/ventas`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("Datos recibidos de Ventas:", response.data);

        // CONTROL DE SEGURIDAD: Validamos que la API devuelva un formato de Lista/Array válido
        if (Array.isArray(response.data)) {
          // Si es un arreglo legítimo, actualizamos el estado
          setVentas(response.data); 
        } else {
          // Si el backend responde con un objeto de error u otra estructura, resguardamos la app
          console.error("El backend de ventas no retornó un array. Datos recibidos:", response.data);
          // Forzamos un arreglo vacío para evitar que falle el .map()
          setVentas([]); 
        }
      })
      .catch((error) => {
        // Bloque de contingencia si el servidor está apagado o hay problemas de red/CORS
        console.error("Error crítico de conexión con el backend de ventas:", error);
        // Vaciamos el estado para que la interfaz se mantenga en pie sin romperse
        setVentas([]); 
      });
  };

  // Hook useEffect para ejecutar la consulta de manera automática al cargar el componente
  useEffect(() => {
    compras();
  }, []);

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow h-full overflow-hidden">
            <table className="table-fixed w-full">
              <thead>
                <tr className="py-10 bg-gray-50">
                  {/* ENCABEZADOS CORREGIDOS: Alineados con los datos reales que envía el Backend */}
                  <th className="pr-10 py-3">ID Venta</th>
                  <th className="pr-10 py-3">Dirección de Entrega</th>
                  <th className="pr-10 py-3">Fecha de Compra</th>
                  <th className="pr-10 py-3">Total ($)</th>
                  <th className="pr-10 py-3">Acciones</th>
                </tr>
              </thead>
              
              <tbody>
                {/* CONTROL EN EL RENDERIZADO:
                  Evaluamos que exista la variable, que sea un Array y que contenga elementos antes de mapear.
                */}
                {ventas && Array.isArray(ventas) && ventas.length > 0 ? (
                  ventas.map((venta) => (
                    <tr key={venta.idVenta} className="border-b">
                      {/* 1. ID de la Venta */}
                      <td className="pr-10 py-4 text-center">
                        {venta.idVenta}
                      </td>

                      {/* 2. Dirección de Compra (Usamos el campo exacto del Backend) */}
                      <td className="pr-10 py-4 text-center">
                        {venta.direccionCompra || "Sin dirección"}
                      </td>

                      {/* 3. Fecha de Compra */}
                      <td className="pr-10 py-4 text-center">
                        {venta.fechaCompra || "Sin fecha"}
                      </td>

                      {/* 4. Valor de la Compra (Usamos el campo exacto del Backend) */}
                      <td className="pr-10 py-4 text-center">
                        ${venta.valorCompra || 0}
                      </td>

                      {/* 5. Botón de Acción */}
                      <td className="pr-10 py-4 text-center">
                        <button className="py-1 bg-blue-200 px-4 rounded-xl shadow-md hover:bg-blue-300 transition-all duration-300">
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  /* Renderizado alternativo seguro: Si no hay datos, muestra una fila informativa en lugar de romper el HTML */
                  <tr>
                    <td colSpan="5" className="py-12 text-gray-500 font-medium">
                      ⚠️ No se encontraron órdenes de compra disponibles o el microservicio no responde.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};