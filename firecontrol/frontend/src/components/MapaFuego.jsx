import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';


// Arreglo para que los iconos de Leaflet se vean bien (a veces fallan en React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapaFuego = ({ incendios }) => {
  const posicionInicial = [-34.6037, -58.3816]; // Buenos Aires como centro, por ahora

  return (
    <MapContainer center={posicionInicial} zoom={3} style={{ height: "500px", width: "100%", borderRadius: '15px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {incendios?.map((incendio) => {
  const coords = incendio.geometry[0].coordinates;
  const latLng = [coords[1], coords[0]];
  
  // Lógica de color: Rojo para incendios, Naranja para quemas controladas
  const esPrescripto = incendio.title.toLowerCase().includes('prescribed') || incendio.title.includes('RX');
  const colorFuego = esPrescripto ? '#f39c12' : '#e74c3c';

  return (
    <CircleMarker 
      key={incendio.id} 
      center={latLng} 
      pathOptions={{ color: colorFuego, fillOpacity: 0.6 }}
      radius={8}
    >
      <Popup>
        <div style={{ fontFamily: 'Arial' }}>
          <h4 style={{ margin: '0 0 5px 0', color: colorFuego }}>{incendio.title}</h4>
          <p><b>Tipo:</b> {esPrescripto ? 'Quema Controlada' : 'Incendio Forestal'}</p>
          <p><b>Fecha:</b> {new Date(incendio.geometry[0].date).toLocaleDateString()}</p>
          <a href={incendio.link} target="_blank" rel="noreferrer">Ver en NASA EONET</a>
        </div>
      </Popup>
    </CircleMarker>
  );
})}
    </MapContainer>
  );
};

export default MapaFuego;