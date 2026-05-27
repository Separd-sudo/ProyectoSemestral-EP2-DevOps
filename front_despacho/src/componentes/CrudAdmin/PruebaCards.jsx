import { useState } from "react";
import { CardComponent } from "./CardComponent";
import { TableCompras } from "./TableCompras";
import { TableDespachos } from "./TableDespachos";

export const PruebaCards = () => {
  // Estados booleanos para controlar qué tabla renderizar dinámicamente
  const [tablaCompras, setTablaCompras] = useState(false);
  const [tablaOrdenes, setTablaOrdenes] = useState(false);

  return (
    <section>
      {/* Bloque superior con las tarjetas de acceso modular */}
      <div className="flex justify-center">
        {/* Tarjeta para activar la administración de Ventas */}
        <CardComponent
          title="Consultar Ordenes de compra 💰"
          description="Revisa las últimas oc realizadas para generar su despacho"
          buttonText="Consultar"
          onClick={() => {
            setTablaCompras(true);
            setTablaOrdenes(false); // Ocultamos despachos para evitar superposición
          }}
        />
        {/* Tarjeta para activar el seguimiento de Despachos */}
        <CardComponent
          title="Revisar Ordenes de despacho 🚚"
          description="Consulta los despachos realizados, modifica los registros de intentos o cierra la orden"
          buttonText="Consultar"
          onClick={() => {
            setTablaCompras(false); // Ocultamos ventas para mantener la UI limpia
            setTablaOrdenes(true);
          }}
        />
      </div>

      {/* Renderizado Condicional: Se inyecta el componente en el DOM según la tarjeta seleccionada */}
      <section>
        {tablaCompras && <TableCompras />}
        {tablaOrdenes && <TableDespachos />}
      </section>
    </section>
  );
};