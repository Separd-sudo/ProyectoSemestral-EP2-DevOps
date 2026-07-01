import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";

export const TableDespachos = () => {
  const [despachos, setDespachos] = useState([]);

  const despacho = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_DESPACHOS_URL}/api/v1/despachos`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((response) => {
        console.log(response.data);
        // Nos aseguramos de guardar solo si es un arreglo, si no, dejamos un arreglo vacío
        if (Array.isArray(response.data)) {
          setDespachos(response.data);
        } else {
          setDespachos([]);
        }
      })
      .catch((error) => {
        console.error("Error de conexión con el backend de despachos:", error);
        setDespachos([]); // En caso de error, reseteamos a array vacío para que no explote
      });
  };

  // Llamada a la función para obtener los datos cuando el componente se monta
  useEffect(() => {
    despacho();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  const handleAbrirModal = (despacho) => {
    setDespachoSeleccionado(despacho);
    setOpenModal(true);
  };

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white h-full overflow-hidden">
            <table className="table-fixed w-full">
              <thead>
                <tr className="py-10">
                  <th className="pr-10">Orden de despacho</th>
                  <th className="pr-10">Orden de compra</th>
                  <th className="pr-10">Dirección de entrega</th>
                  <th className="pr-10">Fecha despacho</th>
                  <th className="pr-10">Patente Camión</th>
                  <th className="pr-10">Entregado</th>
                  <th className="pr-10">Intentos de entrega</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {/* 💡 CORRECCIÓN AQUÍ: Validamos que sea un arreglo válido con datos */}
                {Array.isArray(despachos) && despachos.length > 0 ? (
                  despachos.map((despacho) => (
                    <tr key={despacho.idDespacho}>
                      <td className="pr-10 py-10 items-center">{despacho.idDespacho}</td>
                      <td className="pr-10 py-10 items-center">
                        {despacho.idCompra}
                      </td>
                      <td className="pr-10 py-10 items-center">
                        {despacho.direccionCompra}
                      </td>
                      <td className="pr-10 py-10 items-center">
                        {despacho.fechaDespacho}
                      </td>
                      <td className="pr-10 py-10 items-center">
                        {despacho.patenteCamion}
                      </td>
                      <td className="pr-10 py-10 items-center">
                        {despacho.despachado
                          ? "Despacho entregado"
                          : "Despacho pendiente"}
                      </td>
                      <td className="pr-10 py-10 items-center">
                        {despacho.intento}
                      </td>
                      <td>
                        <button
                          onClick={() => handleAbrirModal(despacho)}
                          className="py-1 bg-orange-200 px-8 rounded-xl shadow-md hover:bg-orange-300/70 transition-all duration-300"
                        >
                          Cerrar despacho
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  /* 📦 Mensaje alternativo si la base de datos está vacía */
                  <tr>
                    <td colSpan="8" className="py-10 text-center text-gray-500 italic">
                      No hay órdenes de despacho registradas en este momento... 📦
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Modal
        onClose={() => {
          setOpenModal(false);
        }}
        open={openModal}
      >
        {despachoSeleccionado && (
          <FormCierreDespacho
            despacho={despachoSeleccionado}
            onClose={() => {
              setOpenModal(false);
              despacho();
            }}
          />
        )}
      </Modal>
    </>
  );
};