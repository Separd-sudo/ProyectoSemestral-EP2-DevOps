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
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((response) => {
        console.log("Datos recibidos de Ventas:", response.data);

        // CONTROL DE SEGURIDAD: Validamos que la API devuelva un formato de Lista/Array válido
        if (Array.isArray(response.data)) {
          setVentas(response.data); // Si es un arreglo legítimo, actualizamos el estado
        } else {
          // Si el backend responde con un objeto de error u otra estructura, resguardamos la app
          console.error("El backend de ventas no retornó un array. Datos recibidos:", response.data);
          setVentas([]); // Forzamos un arreglo vacío para evitar que falle el .map()
        }
      })
      .catch((error) => {
        // Bloque de contingencia si el servidor está apagado o hay problemas de red/CORS
        console.error("Error crítico de conexión con el backend de ventas:", error);
        setVentas([]); // Vaciamos el estado para que la interfaz se mantenga en pie
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
                  <th className="pr-10 py-3">ID Venta</th>
                  <th className="pr-10 py-3">Cliente</th>
                  <th className="pr-10 py-3">Dirección</th>
                  <th className="pr-10 py-3">Total</th>
                  <th className="pr-10 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* CONTROL EN EL RENDERIZADO: 
                  Evaluamos que exista la variable, que sea un Array y que contenga elementos antes de mapear.
                */}
                {ventas && Array.isArray(ventas) && ventas.length > 0 ? (
                  ventas.map((venta) => (
                    <tr key={venta.idVenta || venta.id} className="border-b">
                      <td className="pr-10 py-4 text-center">{venta.idVenta || venta.id}</td>
                      <td className="pr-10 py-4 text-center">{venta.nombreCliente || "No registrado"}</td>
                      <td className="pr-10 py-4 text-center">{venta.direccionEntrega || v.direccion}</td>
                      <td className="pr-10 py-4 text-center">${venta.totalVenta || venta.total}</td>
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