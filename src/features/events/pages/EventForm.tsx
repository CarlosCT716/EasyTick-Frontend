import { useState } from 'react';
import { createEvent } from '@/features/events/api/EventsService';

const CreateEventForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: '',
    price: '',
    capacity: '',
    eventStatus: 'Activo',
    imageFile: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  if ('files' in e.target && e.target.files) {
    const file = e.target.files[0];
    setForm({ ...form, imageFile: file });
    setPreview(URL.createObjectURL(file));
  } else {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Crear objeto que cumpla CreateEventRequest
    const eventPayload = {
      title: form.title,
      description: form.description,
      eventDate: form.eventDate,
      location: form.location,
      price: Number(form.price),
      capacity: Number(form.capacity),
      eventStatus: form.eventStatus,
    };

    // Llamar al servicio
    const newEvent = await createEvent(eventPayload, form.imageFile ?? undefined);

    console.log('Evento creado:', newEvent);

    // Opcional: mostrar mensaje de éxito o redirigir
    alert('Evento creado correctamente!');
    // Resetear formulario
    setForm({
      title: '',
      description: '',
      eventDate: '',
      location: '',
      price: '',
      capacity: '',
      eventStatus: 'Activo',
      imageFile: null,
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
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título del Evento</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nombre del evento"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción del evento"
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
            <input
              type="datetime-local"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Lugar del evento"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (S/)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              min={0}
              required
            />
          </div>

          {/* Capacidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              placeholder="Número de asistentes"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              min={1}
              required
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              name="eventStatus"
              value={form.eventStatus}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
            >
              <option>Activo</option>
              <option>Borrador</option>
              <option>Inactivo</option>
            </select>
          </div>
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del Evento</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
          />
          {preview && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-1">Vista previa:</p>
              <img src={preview} alt="preview" className="w-full h-64 object-cover rounded-lg border border-gray-200 shadow-sm" />
            </div>
          )}
        </div>

        {/* Botón */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-[#0B4D6C] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-cyan-500 transition"
          >
            Crear Evento
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;