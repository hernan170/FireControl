import { useEffect, useState } from "react";
import MapaFuego from "./components/MapaFuego";
function App() {
  const [incendios, setIncendios] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/incendios')
    .then(response => response.json())
    .then(data => {
      console.log("Datos recibidos de la NASA:", data);
      setIncendios(data);
    })
    .catch(err => console.error("Error al conectar con el backend:", err));
    }, []);

    return (
    <div style={{ padding: '20px' }}>
      <h1>FireControl - Monitoreo Global</h1>
      <p>Conexión con NASA: {incendios ? '✅ Activa' : '⏳ Conectando...'}</p>
      {incendios && <MapaFuego incendios={incendios} />}
    </div>
  )
}

export default App;