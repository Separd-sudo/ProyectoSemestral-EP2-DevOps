import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormNuevaVenta = ({ onVentaCreada }) => {
  const { register, handleSubmit, reset } = useForm({});

  const onSubmit = async (data) => {
    console.log("Insertando nueva venta desde el panel...");

    // Armamos el JSON con los campos exactos que espera tu VentaController
    const jsonData = {
      direccionCompra: data.direccionCompra,
      fechaCompra: data.fechaCompra, // Captura YYYY-MM-DD directamente del input
      valorCompra: parseInt(data.valorCompra, 10),
      despachoGenerated: false // Nace en false, el backend creará el despacho solo
    };

    try {
      // POST al microservicio de Ventas (Puerto 8081)
      await axios.post(
        `${import.meta.env.VITE_API_VENTAS_URL}/api/v1/ventas`,
        jsonData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      Swal.fire({
        title: "¡Venta Registrada! 💰",
        text: "La compra se guardó y el despacho se generó de forma automática.",
        icon: "success",
        confirmButtonText: "Excelente",
        confirmButtonColor: "#0d9488"
      });

      reset(); // Limpia los campos del formulario tras el éxito
      
      if (onVentaCreada) {
        onVentaCreada(); // Refresca la grilla del padre inmediatamente
      }

    } catch (error) {
      console.error("Error al registrar la venta:", error);
      Swal.fire({
        title: "Error de conexión ❌",
        text: "No se pudo comunicar con el servicio de ventas en AWS.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-left text-base">
        
        <div className="text-xl font-bold mb-4 text-teal-600 border-b pb-2 flex items-center gap-2">
          🛒 Registrar Nueva Venta (Simulador)
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección de Despacho / Compra</label>
            <input
              type="text"
              placeholder="Ej: Gran Avenida José Miguel Carrera 8500, El Bosque"
              className="border border-gray-300 focus:border-teal-500 rounded-lg block w-full p-2.5 text-sm focus:outline-none transition-colors"
              {...register("direccionCompra", { required: true })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de la Compra</label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]} // Fecha de hoy por defecto
                className="border border-gray-300 focus:border-teal-500 rounded-lg block w-full p-2.5 text-sm focus:outline-none transition-colors"
                {...register("fechaCompra", { required: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Total Compra ($)</label>
              <input
                type="number"
                placeholder="Ej: 65000"
                min="1"
                className="border border-gray-300 focus:border-teal-500 rounded-lg block w-full p-2.5 text-sm focus:outline-none transition-colors font-semibold"
                {...register("valorCompra", { required: true })}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-2.5 px-5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow transition-all flex justify-center items-center gap-2"
        >
          ➕ Insertar Orden y Disparar Flujo
        </button>

      </form>
    </div>
  );
};