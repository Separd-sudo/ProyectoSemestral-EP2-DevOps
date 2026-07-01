import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormCierreDespacho = ({ despacho, onClose }) => {
  // Inicializamos react-hook-form con los valores por defecto del despacho original
  const { register, handleSubmit } = useForm({
    defaultValues: {
      patenteCamion: despacho?.patenteCamion || "PENDIENTE",
      intento: despacho?.intento || 1,
      despachado: despacho?.despachado ? "true" : "false"
    }
  });

  const onSubmit = async (data) => {
    console.log("onSubmit ejecutado en Cierre Despacho");
    
    // Capturamos el select de estado para saber si el usuario marcó "Cerrar despacho"
    const estaDespachado = data.despachado === "true";

    // Armamos el objeto COMPLETO blindado y limpio
    const jsonData = {
      idDespacho: despacho?.idDespacho,
      fechaDespacho: despacho?.fechaDespacho, 
      idCompra: despacho?.idCompra,
      direccionCompra: despacho?.direccionCompra,
      valorCompra: despacho?.valorCompra,
      
      // Capturamos los campos editables del formulario de forma segura
      patenteCamion: data.patenteCamion || despacho?.patenteCamion || "PENDIENTE",
      intento: parseInt(data.intento, 10) || 1, 

      // Mapeo masivo de estados según lo seleccionado en el combobox
      despachado: estaDespachado,
      entregado: estaDespachado,
      isEntregado: estaDespachado,
      isDespachado: estaDespachado,
      estado: estaDespachado
    };

    console.log("Datos completos a enviar al backend:", jsonData);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_DESPACHOS_URL}/api/v1/despachos/${despacho.idDespacho}`,
        jsonData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      Swal.fire({
        title: "Despacho modificado 🛻!",
        text: "El registro ha sido actualizado con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#0d9488"
      });

      // Ejecución segura de onClose para evitar pantallas en blanco si no viene la prop
      if (typeof onClose === "function") {
        onClose();
      }

    } catch (error) {
      console.error("Error crítico al actualizar el despacho:", error);
      Swal.fire({
        title: "Error al actualizar ❌",
        text: "Hubo un inconveniente con el servicio de despacho (Status 500).",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-left text-base">
        
        {/* Título Compacto */}
        <div className="text-2xl font-bold mb-6 text-center text-teal-600 border-b pb-2">
          ⚙️ Gestión y Cierre de Despacho
        </div>

        {/* CONTENEDOR EN REJILLA DE 2 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">ID Despacho</label>
            <input
              disabled
              type="text"
              className="bg-gray-50 border border-gray-200 rounded-lg block w-full p-2 text-gray-400 font-mono text-sm cursor-not-allowed"
              value={despacho?.idDespacho || ""}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">ID Compra Asociada</label>
            <input
              disabled
              type="text"
              className="bg-gray-50 border border-gray-200 rounded-lg block w-full p-2 text-gray-400 font-mono text-sm cursor-not-allowed"
              value={despacho?.idCompra || ""}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha Despacho</label>
            <input
              disabled
              type="text"
              className="bg-gray-50 border border-gray-200 rounded-lg block w-full p-2 text-gray-400 text-sm cursor-not-allowed"
              value={despacho?.fechaDespacho || ""}
            />
          </div>

          {/* 💡 CORREGIDO: Input de Patente enlazado a react-hook-form y totalmente editable */}
          <div>
            <label className="block text-sm font-bold text-teal-700 mb-1">Patente Vehículo</label>
            <input
              type="text"
              className="border-2 border-teal-200 focus:border-teal-500 rounded-lg block w-full p-2 text-sm focus:outline-none transition-colors font-semibold uppercase"
              placeholder="Ej: AB-CD-12"
              {...register("patenteCamion", { required: true })}
            />
          </div>     

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección de Entrega</label>
            <input
              disabled
              type="text"
              className="bg-gray-50 border border-gray-200 rounded-lg block w-full p-2 text-gray-400 text-sm cursor-not-allowed"
              value={despacho?.direccionCompra || ""}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Valor de la Compra</label>
            <input
              disabled
              type="text"
              className="bg-gray-50 border border-gray-200 rounded-lg block w-full p-2 text-gray-400 text-sm cursor-not-allowed"
              value={`$${despacho?.valorCompra?.toLocaleString('es-CL') || 0}`}
            />
          </div>

          {/* Intentos de Entrega */}
          <div>
            <label className="block text-sm font-bold text-teal-700 mb-1">Intentos de Entrega</label>
            <input
              type="number"
              min="1"
              className="border-2 border-teal-200 focus:border-teal-500 rounded-lg block w-full p-2 text-sm focus:outline-none transition-colors font-semibold"
              {...register("intento", { required: true })}
            />
          </div>

          {/* Estado de Entrega */}
          <div className="md:col-span-2 mt-2">
            <label className="block text-sm font-bold text-teal-700 mb-1">Estado de Entrega</label>
            <select
              className="border-2 border-teal-200 focus:border-teal-500 rounded-lg block w-full p-2 text-sm focus:outline-none transition-colors font-semibold bg-white"
              {...register("despachado", { required: true })}
            >
              <option value="false">🔴 Despacho abierto (Pendiente)</option>
              <option value="true">🟢 Cerrar despacho (Entregado con éxito)</option>
            </select>
          </div>

        </div>

        {/* Botones de Acción */}
        <div className="flex gap-3 justify-end mt-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-lg border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 text-sm transition-colors"
          >
            Cancelar
          </button>
          <button
            className="py-2 px-6 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            type="submit"
          >
            Guardar Cambios
          </button>
        </div>

      </form>
    </div>
  );
};