import { useState, useEffect } from 'react';
import { createEvent, getAllCategories } from '@/features/events/api/EventsService';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { EventCategory } from '@/features/events/models/Event';

const CreateEventForm = () => {
  const { user } = useAuth(); // 👈 Obtenemos el usuario autenticado actual
  const [categories, setCategories] = useState<EventCategory[]>([]);

  const [form, setForm] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: '',
    price: '',
    capacity: '',
    categoryId: '', // 👈 Ahora controlamos la categoría
    imageFile: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  // Cargar categorías al abrir el formulario
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

    try {
      const eventPayload = {
        title: form.title,
        description: form.description,
        eventDate: form.eventDate,
        location: form.location,
        price: Number(form.price),
        capacity: Number(form.capacity),
        categoryId: Number(form.categoryId), // 👈 Mandamos la categoría
        organizerId: user.id,                // 🚀 MANDAMOS EL ID 2 (O el que tengas)
      };

      const newEvent = await createEvent(eventPayload, form.imageFile ?? undefined);
      console.log('Evento creado:', newEvent);

      alert('¡Evento creado correctamente!');
      
      // Resetear
      setForm({
        title: '', description: '', eventDate: '', location: '', price: '', capacity: '', 
        categoryId: categories[0]?.id.toString() || '', imageFile: null
      });
      setPreview(null);

    } catch (error) {
      console.error('Error al crear evento:', error);
      alert('Hubo un error al crear el evento.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 my-10">
      <h2 className="text-3xl font-bold text-[#0B4D6C] mb-6">Crear Nuevo Evento</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título del Evento</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
            <input type="datetime-local" name="eventDate" value={form.eventDate} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (S/)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} min={0} required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
            <input type="number" name="capacity" value={form.capacity} onChange={handleChange} min={1} required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select name="categoryId" value={form.categoryId} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500">
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del Evento</label>
          <input type="file" accept="image/*" onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          {preview && (
            <div className="mt-3">
              <img src={preview} alt="preview" className="w-full h-64 object-cover rounded-lg border border-gray-200 shadow-sm" />
            </div>
          )}
        </div>

        <div className="text-right">
          <button type="submit" className="bg-[#0B4D6C] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-cyan-500 transition">
            Crear Evento
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;