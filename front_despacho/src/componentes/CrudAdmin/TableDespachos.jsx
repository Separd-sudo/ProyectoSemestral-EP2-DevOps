import { useState } from "react";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";

export const TableDespachos = ({ despachos, onRefresh }) => {
  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  const handleAbrirModal = (despacho) => {
    setDespachoSeleccionado(despacho);
    setOpenModal(true);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-2">
      
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Órdenes de Despacho Activas</h3>
      </div>

      {/* Grilla Principal */}
      <div className="relative overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-900">ID Despacho</th>
              <th className="px-6 py-4 text-center">ID Compra</th>
              <th className="px-6 py-4 text-center">Dirección de Entrega</th>
              <th className="px-6 py-4 text-center">Fecha Despacho</th>
              <th className="px-6 py-4 text-center">Patente Camión</th>
              <th className="px-6 py-4 text-center">Estado</th>
              <th className="px-6 py-4 text-center">Intentos</th>
              <th className="px-6 py-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(despachos) && despachos.length > 0 ? (
              despachos.map((despacho) => (
                <tr key={despacho.idDespacho} className="bg-white border-b hover:bg-gray-50/70 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{despacho.idDespacho}</td>
                  <td className="px-6 py-4 text-center font-semibold text-teal-600">#{despacho.idCompra}</td>
                  <td className="px-6 py-4 text-gray-700 max-w-xs truncate">{despacho.direccionCompra}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{despacho.fechaDespacho}</td>
                  <td className="px-6 py-4 text-center font-mono text-gray-700 font-semibold uppercase">{despacho.patenteCamion || "PENDIENTE"}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      despacho.despachado 
                        ? "bg-green-100 text-green-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {despacho.despachado ? "Entregado" : "Pendiente"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-700">{despacho.intento}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleAbrirModal(despacho)}
                      className="bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold py-1.5 px-4 rounded-lg text-xs transition-all shadow-xs"
                    >
                      Cerrar despacho
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center text-gray-500 italic">
                  No hay órdenes de despacho registradas en este momento... 📦
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
              onRefresh();
            }}
          />
        )}
      </Modal>
    </div>
  );
};