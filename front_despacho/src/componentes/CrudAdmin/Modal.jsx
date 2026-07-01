export const Modal = ({ open, onClose, children }) => {
  return (
    /* Contenedor principal que cubre toda la pantalla con un fondo semitransparente */
    <div
      className={`fixed inset-0 z-10 flex justify-center items-center transition-all ${
        open ? "visible bg-black/50" : "invisible"
      }`}
      onClick={onClose} // Si hacen clic en el fondo negro, se cierra el modal
    >
      {/* Cuerpo del cuadro de diálogo (Modal) */}
      <div
        onClick={(e) => {
          // CORRECCIÓN CRÍTICA: Añadidos los paréntesis (). 
          // Detiene la propagación del clic hacia el fondo para que no se cierre al usar el formulario
          e.stopPropagation(); 
        }}
        className={`flex flex-col items-end bg-white transition-all rounded-lg p-6 ${
          open ? "scale-90 opacity-100" : "scale-100 opacity-0"
        }`}
      >
        {/* Botón de cierre superior (X) */}
        <button
          type="button"
          onClick={onClose}
          className="z-20 -mt-2 mb-2 bg-teal-600 text-white font-bold text-xl rounded-full w-10 h-10 hover:bg-teal-700 transition-all"
        >
          X
        </button>
        {/* Renderizado dinámico del formulario hijo (FormDespacho o FormCierreDespacho) */}
        {children}
      </div>
    </div>
  );
};