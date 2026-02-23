import { useState, useEffect } from 'react';
import { createEvent, getAllCategories } from '@/features/events/api/EventsService';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { EventCategory } from '@/features/events/models/Event';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const LocationPicker = ({ position, setPosition }: { position: any, setPosition: any }) => {
  useMapEvents({
    click(e: any) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  const customIcon = L.divIcon({
    className: 'custom-leaflet-icon',
    html: '<i class="fa-solid fa-location-dot text-4xl text-red-500 drop-shadow-lg" style="transform: translate(-30%, -80%);"></i>',
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
};

const CreateEventForm = () => {
  const { user } = useAuth(); 
  const [categories, setCategories] = useState<EventCategory[]>([]);
  
  const defaultCenter = { lat: -12.046374, lng: -77.042793 };
  const [mapPosition, setMapPosition] = useState<{lat: number, lng: number} | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: '',
    price: '',
    capacity: '',
    categoryId: '',
    imageFile: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
        if (data.length > 0) {
          setForm(prev => ({ ...prev, categoryId: data[0].id.toString() }));
        }
      } catch (err) {
        console.error('Error cargando categorías', err);
      }
    };
    fetchCats();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if ('files' in e.target && (e.target as HTMLInputElement).files) {
      const file = (e.target as HTMLInputElement).files![0];
      setForm({ ...form, imageFile: file });
      setPreview(URL.createObjectURL(file));
    } else {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Error: Sesión no encontrada.");
      return;
    }

    if (!mapPosition) {
      alert("Por favor, selecciona una ubicación en el mapa haciendo clic en él.");
      return;
    }

    try {
      const eventPayload = {
        title: form.title,
        description: form.description,
        eventDate: form.eventDate,
        location: form.location,
        latitud: mapPosition.lat,
        longitud: mapPosition.lng,
        price: Number(form.price),
        capacity: Number(form.capacity),
        categoryId: Number(form.categoryId), 
        organizerId: user.id,                
      };

      const newEvent = await createEvent(eventPayload, form.imageFile ?? undefined);
      console.log('Evento creado:', newEvent);

      alert('¡Evento creado correctamente!');
      
      setForm({
        title: '', description: '', eventDate: '', location: '', price: '', capacity: '', 
        categoryId: categories[0]?.id.toString() || '', imageFile: null
      });
      setPreview(null);
      setMapPosition(null);

    } catch (error) {
      console.error('Error al crear evento:', error);
      alert('Hubo un error al crear el evento.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 my-10 border border-gray-100">
      <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
        <div className="w-12 h-12 bg-cyan-50 text-[#0B4D6C] rounded-full flex items-center justify-center text-2xl">
          <i className="fa-regular fa-calendar-plus"></i>
        </div>
        <h2 className="text-3xl font-bold text-[#0B4D6C]">Crear Nuevo Evento</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
          <h3 className="font-bold text-gray-700 border-b border-gray-200 pb-2"><i className="fa-solid fa-circle-info mr-2 text-[#0B4D6C]"></i>Información Principal</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título del Evento</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0B4D6C] bg-white" placeholder="Ej. Concierto de Rock 2026" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0B4D6C] bg-white" placeholder="Detalles del evento..."></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
            <input type="datetime-local" name="eventDate" value={form.eventDate} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0B4D6C]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (S/)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} min={0} step="0.01" required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0B4D6C]" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aforo / Capacidad</label>
            <input type="number" name="capacity" value={form.capacity} onChange={handleChange} min={1} required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0B4D6C]" placeholder="Ej. 1000" />
          </div>
        </div>

        <div className="bg-cyan-50/50 p-6 rounded-xl border border-cyan-100 space-y-4">
          <h3 className="font-bold text-[#0B4D6C] border-b border-cyan-100 pb-2"><i className="fa-solid fa-map-location-dot mr-2"></i>Ubicación del Evento</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Lugar (Local)</label>
                <input type="text" name="location" value={form.location} onChange={handleChange} required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0B4D6C] bg-white" placeholder="Ej. Estadio Nacional, Explanada Costa Verde..." />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría del Evento</label>
                <select name="categoryId" value={form.categoryId} onChange={handleChange} required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0B4D6C] bg-white">
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {mapPosition && (
                <div className="bg-white p-3 rounded-lg border border-green-200 flex items-center gap-3">
                  <i className="fa-solid fa-check-circle text-green-500 text-xl"></i>
                  <div className="text-sm">
                    <p className="font-bold text-gray-700">Coordenadas capturadas</p>
                    <p className="text-gray-500 text-xs">{mapPosition.lat.toFixed(6)}, {mapPosition.lng.toFixed(6)}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Haz clic en el mapa para marcar el punto exacto <span className="text-red-500">*</span></label>
              <div className="h-64 rounded-xl overflow-hidden border-2 border-dashed border-cyan-300 relative z-0">
                <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom={true} className="h-full w-full leaflet-container">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  <LocationPicker position={mapPosition} setPosition={setMapPosition} />
                </MapContainer>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Afiche / Imagen del Evento</label>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <input type="file" accept="image/*" onChange={handleChange}
              className="w-full sm:w-1/2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0B4D6C] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-[#0B4D6C] hover:file:bg-cyan-100 transition" />
            
            {preview && (
              <div className="w-full sm:w-1/2">
                <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Vista Previa</p>
                <img src={preview} alt="preview" className="w-full h-40 object-cover rounded-lg border border-gray-200 shadow-sm" />
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="flex justify-end pt-2">
          <button type="submit" className="bg-[#0B4D6C] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:bg-[#093d56] transition transform active:scale-95 flex items-center gap-2">
            <i className="fa-solid fa-cloud-arrow-up"></i> Publicar Evento
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;