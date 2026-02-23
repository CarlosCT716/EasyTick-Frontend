import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEventById, updateEvent, getAllCategories } from '@/features/events/api/EventsService';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { EventCategory } from '@/features/events/models/Event';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { sweetAlertError, sweetAlertInfo, sweetImageUrl, sweetConfirm } from '@/shared/utils/alerts';

const LocationPicker = ({ position, setPosition }: { position: any, setPosition: any }) => {
  useMapEvents({
    click(e: any) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  const customIcon = L.divIcon({
    className: 'custom-leaflet-icon',
    html: '<i class="fa-solid fa-location-dot text-4xl text-[#0B4D6C] drop-shadow-lg" style="transform: translate(-30%, -80%);"></i>',
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
};

const EventEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const defaultCenter = { lat: -12.046374, lng: -77.042793 };
  const [mapPosition, setMapPosition] = useState<{lat: number, lng: number} | null>(null);
  const [minDateTime, setMinDateTime] = useState<string>('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: '',
    price: 0,
    capacity: 0,
    categoryId: '',
    imageUrl: '', 
    imageFile: null as File | null, 
  });

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    // Configurar la fecha mínima (fecha y hora actual)
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setMinDateTime(now.toISOString().slice(0, 16));

    const loadData = async () => {
      try {
        setLoading(true);
        const [eventData, categoriesData] = await Promise.all([
          getEventById(id!),
          getAllCategories()
        ]);

        setCategories(categoriesData);
        
        const date = new Date(eventData.eventDate);
        const formattedDate = date.toISOString().slice(0, 16);

        if (eventData.latitud && eventData.longitud) {
          setMapPosition({ 
            lat: Number(eventData.latitud), 
            lng: Number(eventData.longitud) 
          });
        }

        setForm({
          title: eventData.title,
          description: eventData.description || '',
          eventDate: formattedDate,
          location: eventData.location,
          price: eventData.price,
          capacity: eventData.capacity || (eventData as any).availableSlots || 0,
          categoryId: eventData.categoryId?.toString() || '',
          imageUrl: eventData.imageUrl || '',
          imageFile: null
        });
        
        if (eventData.imageUrl) setPreview(eventData.imageUrl);

      } catch (err) {
        console.error(err);
        sweetAlertError('No se pudo cargar la información del evento.');
        navigate('/my-events');
      } finally {
        setLoading(false);
      }
    };

    if (id && user) loadData();
  }, [id, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if ('files' in e.target && (e.target as HTMLInputElement).files) {
      const file = (e.target as HTMLInputElement).files![0];
      setForm(prev => ({ ...prev, imageFile: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      const { name, value } = e.target;
      setForm(prev => ({ 
        ...prev, 
        [name]: ['price', 'capacity'].includes(name) ? Number(value) : value 
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
        sweetAlertError("Sesión no válida. Por favor, inicia sesión.");
        return;
    }

    if (!mapPosition) {
        sweetAlertInfo("Selecciona una ubicación en el mapa para el evento.");
        return;
    }

    // Validación de fecha futura
    const selectedDate = new Date(form.eventDate);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
        sweetAlertInfo("La fecha y hora del evento no pueden estar en el pasado.");
        return;
    }

    // Validación de imagen (debe haber una imagen subida o una existente en preview)
    if (!form.imageFile && !preview) {
      sweetAlertInfo("El afiche o imagen del evento es obligatorio.");
      return;
    }

    // Confirmación antes de actualizar
    const confirmation = await sweetConfirm(
      '¿Actualizar Evento?', 
      '¿Estás seguro de que deseas guardar estos cambios?', 
      'Sí, actualizar'
    );

    if (!confirmation.isConfirmed) return;

    setSubmitting(true);

    const eventPayload = {
      title: form.title,
      description: form.description,
      eventDate: form.eventDate,
      location: form.location,
      latitud: mapPosition.lat.toString(),
      longitud: mapPosition.lng.toString(),
      price: Number(form.price),
      capacity: Number(form.capacity),
      categoryId: Number(form.categoryId),
      organizerId: user.id,
      imageUrl: form.imageUrl 
    };

    try {

      await updateEvent(id!, eventPayload, form.imageFile);
      
      await sweetImageUrl(
        '¡Actualizado!', 
        'Los cambios en el evento se guardaron correctamente.', 
        preview!
      );
      
      navigate('/my-events');
    } catch (err: any) {
      console.error(err);
      sweetAlertError("Error al actualizar: Verifica los datos e inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/my-events" className="text-sm font-semibold text-gray-500 hover:text-[#0B4D6C] flex items-center gap-2">
          <i className="fa-solid fa-arrow-left"></i> Volver
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-[#002940] mb-8 border-b pb-4">Editar Evento</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input type="text" name="title" required value={form.title} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B4D6C] outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select name="categoryId" required value={form.categoryId} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B4D6C] outline-none bg-white">
                  <option value="">Seleccione...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
                <input type="datetime-local" name="eventDate" required value={form.eventDate} onChange={handleChange}
                  min={minDateTime}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B4D6C] outline-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio (S/)</label>
              <input type="number" name="price" step="0.01" required value={form.price} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B4D6C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
              <input type="number" name="capacity" required value={form.capacity} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B4D6C] outline-none" />
            </div>
          </div>

          <div className="bg-cyan-50/50 p-6 rounded-xl border border-cyan-100">
            <label className="block text-sm font-medium text-[#0B4D6C] mb-2 font-bold">Ubicación en el Mapa</label>
            <div className="h-64 rounded-xl overflow-hidden mb-4 relative z-0 border-2 border-white shadow-inner">
               <MapContainer center={mapPosition || defaultCenter} zoom={13} className="h-full w-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationPicker position={mapPosition} setPosition={setMapPosition} />
                </MapContainer>
            </div>
            <input type="text" name="location" placeholder="Nombre del Local" required value={form.location} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B4D6C] bg-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Evento <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
               <input type="file" accept="image/*" onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-[#0B4D6C] hover:file:bg-cyan-100" />
               
               {preview && (
                 <div className="relative">
                   <img src={preview} alt="Preview" className="h-32 w-full object-cover rounded-xl border border-gray-200 shadow-sm" />
                   <span className="absolute top-2 right-2 bg-white/80 px-2 py-1 text-xs font-bold text-gray-700 rounded shadow">Vista Previa</span>
                 </div>
               )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea name="description" rows={4} required value={form.description} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B4D6C] outline-none resize-none bg-white"></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button type="button" onClick={() => navigate('/my-events')}
              className="px-6 py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 transition">
              Cancelar
            </button>
            <button type="submit" disabled={submitting}
              className="px-10 py-3 bg-[#0B4D6C] text-white rounded-xl font-bold shadow-lg hover:bg-[#083a52] transition disabled:opacity-50 flex items-center gap-2">
              {submitting ? <><i className="fa-solid fa-spinner fa-spin"></i> Guardando...</> : <><i className="fa-solid fa-check"></i> Actualizar Evento</>}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EventEditPage;