import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormDespacho = ({ venta, onClose }) => {
  const { register, handleSubmit } = useForm();

  // Función encargada de procesar el envío del formulario
  const onSubmit = async (data) => {
    console.log("onSubmit ejecutado");
    
    // Mapeo del objeto JSON requerido por el Microservicio de Despachos
    const jsonData = {
      fechaDespacho: data.fechaDespacho,
      patenteCamion: data.patenteCamion,
      intento: 0,
      entregado: false,
      idCompra: venta.idVenta,
      direccionCompra: venta.direccionCompra,
      valorCompra: venta.valorCompra,
    };

    // Objeto para actualizar el estado del pedido en el Microservicio de Ventas
    const jsonDataSales = {
      despachoGenerado: true,
    };

    console.log("Datos del formulario a enviar:", jsonData);

    try {
      // 1. ACTUALIZACIÓN EN VENTAS: Consumimos la URL inyectada por Docker a través de Vite
      await axios.put(
        `${import.meta.env.VITE_API_VENTAS_URL}/api/v1/ventas/${venta.idVenta}`,
        jsonDataSales,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      // 2. CREACIÓN DEL DESPACHO: Registramos la nueva orden logística utilizando su variable correspondiente
      await axios.post(
        `${import.meta.env.VITE_API_DESPACHOS_URL}/api/v1/despachos`, 
        jsonData, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      // Alerta de éxito si ambas promesas Axios se resuelven de forma correcta
      Swal.fire({
        title: "Despacho registrado 🛻!",
        text: "El despacho ha sido generado con éxito en la base de datos",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      
      // Cerramos el modal solo si el flujo fue exitoso
      onClose();

    } catch (error) {
      // Captura y mitigación de errores en caso de caída de microservicios o problemas de red
      console.error("Error crítico en la solicitud de asignación:", error);
      Swal.fire({
        title: "Error en la operación ❌",
        text: "No se pudo conectar con los microservicios en AWS. Verifica los contenedores.",
        icon: "error",
        confirmButtonText: "Entendido",
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
          Ingreso de orden de despacho
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Fecha de despacho</label>
          <input
            type="date"
            placeholder="Ingresa fecha de despacho"
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("fechaDespacho", { required: true })}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Patente de camión</label>
          <input
            type="text"
            placeholder="Elige patente de camión"
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("patenteCamion", { required: true })}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">
            Orden de compra asociado
          </label>
          <input
            type="number"
            disabled={true}
            value={venta.idVenta}
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Dirección de entrega</label>
          <input
            type="text"
            disabled={true}
            value={venta.direccionCompra}
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Valor de compra</label>
          <input
            type="number"
            value={venta.valorCompra}
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
            disabled={true}
          />
        </div>

        <button
          className="py-6 px-14 rounded-lg bg-teal-600 text-white font-bold mb-14"
          type="submit"
        >
          Asignar despacho
        </button>
      </form>
    </>
  );
};