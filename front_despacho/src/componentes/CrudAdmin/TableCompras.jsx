import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FormNuevaVenta } from "./FormNuevaVenta";

export const TableCompras = ({ compras, onRefresh }) => {
  const [showFormNuevaVenta, setShowFormNuevaVenta] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Estados locales para controlar el formulario de edición
  const [editDireccion, setEditDireccion] = useState("");
  const [editValor, setEditValor] = useState("");

  // Al presionar "Ver detalle" abrimos el modal en modo lectura por defecto
  const handleVerDetalle = (venta) => {
    setSelectedVenta(venta);
    setEditDireccion(venta.direccionCompra);
    setEditValor(venta.valorCompra);
    setIsEditing(false); 
  };

  // 🔄 FUNCIÓN: ACTUALIZAR VENTA (PUT)
  const handleActualizarVenta = async () => {
    try {
      const updatedData = {
        ...selectedVenta,
        direccionCompra: editDireccion,
        valorCompra: parseInt(editValor, 10),
      };

      await axios.put(
        `${import.meta.env.VITE_API_VENTAS_URL}/api/v1/ventas/${selectedVenta.idVenta}`,
        updatedData
      );

      Swal.fire({
        title: "¡Venta Actualizada! 📝",
        text: "Los cambios se guardaron correctamente en la base de datos.",
        icon: "success",
        confirmButtonColor: "#0d9488"
      });

      setSelectedVenta(null); 
      onRefresh(); 
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire("Error ❌", "No se pudo modificar el registro en AWS.", "error");
    }
  };

  // 🗑️ FUNCIÓN: ELIMINAR VENTA (DELETE)
  const handleEliminarVenta = async (idVenta) => {
    Swal.fire({
      title: "¿Estás completamente seguro?",
      text: `Vas a eliminar la Orden de Compra #${idVenta} permanentemente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar de todas formas",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_VENTAS_URL}/api/v1/ventas/${idVenta}`);
          Swal.fire("¡Eliminado! 🗑️", "La venta ha sido borrada con éxito.", "success");
          setSelectedVenta(null); 
          onRefresh(); 
        } catch (error) {
          console.error("Error al eliminar:", error);
          Swal.fire("Error ❌", "No se pudo eliminar el registro de la EC2.", "error");
        }
      }
    });
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-2">
      
      {/* Encabezado de la tabla con el BOTÓN DE COMPRA REPARADO */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Órdenes de Compra Activas</h3>
        <button
          onClick={() => setShowFormNuevaVenta(true)} // 👈 AQUÍ: Ahora sí abre el modal
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-5 rounded-lg text-sm transition-all shadow-sm flex items-center gap-1"
        >
          🛒 Registrar Nueva Venta
        </button>
      </div>

      {/* Grilla Principal */}
      <div className="relative overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-900">ID Venta</th>
              <th className="px-6 py-4 text-center">Dirección de Entrega</th>
              <th className="px-6 py-4 text-center">Fecha de Compra</th>
              <th className="px-6 py-4 text-center">Total ($)</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((venta) => (
              <tr key={venta.idVenta} className="bg-white border-b hover:bg-gray-50/70 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900">{venta.idVenta}</td>
                <td className="px-6 py-4 text-gray-700 max-w-xs truncate">{venta.direccionCompra}</td>
                <td className="px-6 py-4 text-center text-gray-600">{venta.fechaCompra}</td>
                <td className="px-6 py-4 text-center font-semibold text-gray-900">${venta.valorCompra}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleVerDetalle(venta)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-1.5 px-4 rounded-lg text-xs transition-all shadow-xs"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: FORMULARIO FLOTANTE PARA REGISTRAR VENTA */}
      {showFormNuevaVenta && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative animate-in zoom-in-95 duration-100">
            <button 
              onClick={() => setShowFormNuevaVenta(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold"
            >✕</button>
            <FormNuevaVenta onVentaCreada={() => { setShowFormNuevaVenta(false); onRefresh(); }} />
          </div>
        </div>
      )}

      {/* MODAL 2: VISTA DETALLE + BOTÓN ACTUALIZAR Y ELIMINAR */}
      {selectedVenta && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative animate-in zoom-in-95 duration-100">
            <button 
              onClick={() => setSelectedVenta(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold"
            >✕</button>
            
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
              🔎 Detalle de la Orden #{selectedVenta.idVenta}
            </h3>

            <div className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dirección de Entrega</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={editDireccion}
                  onChange={(e) => setEditDireccion(e.target.value)}
                  className={`w-full p-2.5 text-sm border rounded-lg focus:outline-none transition-all ${isEditing ? 'border-teal-500 bg-white ring-2 ring-teal-100' : 'border-gray-200 bg-gray-50 text-gray-600'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Fecha de Compra</label>
                  <input
                    type="text"
                    disabled
                    value={selectedVenta.fechaCompra}
                    className="w-full p-2.5 text-sm border border-gray-200 bg-gray-50 text-gray-400 rounded-lg cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Total Monto ($)</label>
                  <input
                    type="number"
                    disabled={!isEditing}
                    value={editValor}
                    onChange={(e) => setEditValor(e.target.value)}
                    className={`w-full p-2.5 text-sm border rounded-lg font-semibold focus:outline-none transition-all ${isEditing ? 'border-teal-500 bg-white ring-2 ring-teal-100' : 'border-gray-200 bg-gray-50 text-gray-600'}`}
                  />
                </div>
              </div>
            </div>

            {/* BARRA DE ACCIONES: ELIMINAR Y ACTUALIZAR */}
            <div className="mt-6 pt-4 border-t flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleActualizarVenta}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg text-sm transition-all shadow-sm"
                  >
                    💾 Confirmar Cambios
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm transition-all"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-lg text-sm transition-all shadow-sm flex justify-center items-center gap-1"
                  >
                    ✏️ Actualizar Venta
                  </button>
                  <button
                    onClick={() => handleEliminarVenta(selectedVenta.idVenta)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all shadow-sm flex justify-center items-center gap-1"
                  >
                    🗑️ Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};