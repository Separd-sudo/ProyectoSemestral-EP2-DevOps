import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormCierreDespacho = ({ despacho, onClose }) => {
  const { register, handleSubmit } = useForm();

  // Función para procesar la actualización del despacho
  const onSubmit = async (data) => {
    console.log("onSubmit ejecutado en Cierre Despacho");
    
    // Armamos el JSON con los datos capturados en el formulario
    // Ajustado a 'entregado' para mantener consistencia con el modelo de datos de la tabla
    const jsonData = {
      intento: parseInt(data.intento), // Aseguramos que viaje como número entero
      entregado: data.entregado === "true", // Convertimos el string del select a un booleano real
    };

    console.log("Datos a enviar para actualizar despacho:", jsonData);

    try {
      // ACTUALIZACIÓN DE DESPACHO: Apuntamos dinámicamente a la URL del microservicio de Despachos
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

      // Mensaje de éxito interactivo utilizando SweetAlert2
      Swal.fire({
        title: "Despacho modificado 🛻!",
        text: "El despacho ha sido modificado exitosamente en los registros",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Cerramos la ventana modal para refrescar la grilla principal
      onClose();

    } catch (error) {
      // Captura de excepciones si falla la comunicación con la instancia EC2
      console.error("Error crítico al actualizar el despacho:", error);
      Swal.fire({
        title: "Error al actualizar ❌",
        text: "Hubo un inconveniente al conectar con el servicio de despacho en AWS.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center text-center px-24 text-xl"
      >
        <div className="mx-auto text-3xl font-bold mb-10 text-teal-600">
          Editar y cierre de despacho
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">ID despacho</label>
          <input
            disabled={true}
            type="text"
            className="border border-gray-300 rounded-lg block w-full p-1 text-slate-400"
            value={despacho.idDespacho}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Fecha despacho</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
            value={despacho.fechaDespacho}
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Patente Camión</label>
          <input
            type="text"
            disabled={true}
            value={despacho.patenteCamion}
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Intentos de entrega</label>
          <input
            type="number"
            defaultValue={despacho.intento}
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("intento", { required: true })}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Despacho entregado</label>
          <select
            defaultValue={despacho.entregado}
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("entregado", { required: true })}
          >
            <option value="false">Despacho abierto (Pendiente)</option>
            <option value="true">Cerrar despacho (Entregado)</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">ID Compra</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
            disabled={true}
            value={despacho.idCompra}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Dirección Compra</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
            disabled={true}
            value={despacho.direccionCompra}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Valor Compra</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
            disabled={true}
            value={despacho.valorCompra}
          />
        </div>

        <button
          className="py-6 px-14 rounded-lg bg-teal-600 text-white font-bold mb-14"
          type="submit"
        >
          Modificar Despacho
        </button>
      </form>
    </>
  );
};