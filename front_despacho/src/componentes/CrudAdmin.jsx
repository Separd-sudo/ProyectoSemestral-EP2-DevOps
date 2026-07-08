import { useState } from "react";
import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer";

import { PruebaCards } from "./CrudAdmin/PruebaCards";
import Reviews from "./Layouts/Reviews";

export const CrudAdmin = () => {
  const [activeTab, setActiveTab] = useState("inicio");

  return (
    <>
      <div className="grid grid-cols-[auto_1fr] min-h-screen bg-gray-50 font-sans">
        <div className="col-span-1">
          {/* Columna 1: Navbar (ancho fijo) */}
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Columna 2: Contenido principal (ocupa el espacio restante) */}
        <div className="overflow-y-auto p-6 flex flex-col justify-between">
          <div className="flex-grow">
            <PruebaCards activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {activeTab === "inicio" && (
              <>
                {/* Sección Quiénes Somos */}
                <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-left">
                  <h3 className="text-2xl font-extrabold text-teal-600 mb-4 flex items-center gap-2">
                    👥 ¿Quiénes Somos?
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base mb-4">
                    Somos **Innovatech**, una empresa de vanguardia especializada en la automatización de procesos logísticos y de distribución. 
                    Nuestra misión es conectar de manera inteligente e instantánea cada transacción comercial con su correspondiente orden de despacho,
                    eliminando cuellos de botella y asegurando la entrega perfecta a nuestros clientes.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-base">
                    Gracias a nuestra arquitectura robusta integrada en la nube y el uso de tecnologías devops avanzadas,
                    ofrecemos una alta disponibilidad y resiliencia en todo el ciclo operativo de despachos de tu negocio.
                  </p>
                </div>
                
                <Reviews />
              </>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
