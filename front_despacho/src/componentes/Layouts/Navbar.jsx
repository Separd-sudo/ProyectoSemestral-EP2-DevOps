function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="rounded-xl w-[250px] min-h-[880px] bg-teal-600 text-white sticky top-0 p-4 m-4">
      {/* Logo o título */}
      <h2 className="text-xl font-bold mb-8">Despacho Dashboard</h2>

      {/* Menú de navegación */}
      <ul className="space-y-3">
        <li>
          <button
            onClick={() => setActiveTab("inicio")}
            className={`w-full text-left font-bold py-2 px-3 rounded transition-colors ${
              activeTab === "inicio" ? "bg-teal-800" : "hover:bg-teal-700"
            }`}
          >
            Inicio
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("compras")}
            className={`w-full text-left font-bold py-2 px-3 rounded transition-colors ${
              activeTab === "compras" ? "bg-teal-800" : "hover:bg-teal-700"
            }`}
          >
            Ordenes de Compra
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("despachos")}
            className={`w-full text-left font-bold py-2 px-3 rounded transition-colors ${
              activeTab === "despachos" ? "bg-teal-800" : "hover:bg-teal-700"
            }`}
          >
            Ordenes de Despachos
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
