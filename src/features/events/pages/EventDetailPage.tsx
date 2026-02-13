import { useParams, Link } from 'react-router-dom';

const EventDetailPage = () => {
  const { id } = useParams();
  const event = {
    id: id,
    title: "Tech Summit Lima 2026",
    description: "El evento de tecnología más grande del año. Aprende sobre IA, Cloud Computing y Desarrollo Web con los mejores expertos de la industria. Incluye networking y coffee break.",
    image: "https://picsum.photos/seed/tech/1200/600",
    date: "15 de Febrero, 2026",
    time: "09:00 AM - 06:00 PM",
    location: "Centro de Convenciones de Lima",
    price: 150.00,
    organizer: "Tech Community Peru",
    category: "Tecnología"
  };

  return (
    <>
      <div className="relative h-100 w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-50"
          style={{ backgroundImage: `url(${event.image})` }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

        <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
          <div className="text-white max-w-3xl">
            <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition text-sm font-semibold">
              <i className="fa-solid fa-arrow-left mr-2"></i> Volver a eventos
            </Link>
            <div className="flex items-center gap-3 mb-3">
               <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {event.category}
               </span>
               <span className="text-gray-300 text-sm font-medium">
                  <i className="fa-regular fa-user mr-1"></i> Por {event.organizer}
               </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{event.title}</h1>
            <p className="text-lg text-gray-200 flex items-center gap-4">
               <span><i className="fa-regular fa-calendar mr-2"></i> {event.date}</span>
               <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
               <span><i className="fa-regular fa-clock mr-2"></i> {event.time}</span>
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
               <h2 className="text-2xl font-bold text-[#0B4D6C] mb-4">Sobre el evento</h2>
               <p className="text-gray-600 leading-relaxed text-lg">
                  {event.description}
               </p>
               <p className="text-gray-600 leading-relaxed text-lg mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
               </p>

               <h3 className="text-xl font-bold text-[#0B4D6C] mt-8 mb-4">Ubicación</h3>
               <div className="bg-gray-100 h-64 rounded-xl flex items-center justify-center text-gray-400">
                  <div className="text-center">
                      <i className="fa-solid fa-map-location-dot text-4xl mb-2"></i>
                      <p>Mapa de Google Maps aquí</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-1">
             <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-24">
                <div className="flex justify-between items-end mb-6">
                   <div>
                      <p className="text-gray-500 text-sm mb-1">Precio por entrada</p>
                      <span className="text-3xl font-bold text-gray-800">S/ {event.price.toFixed(2)}</span>
                   </div>
                   <div className="text-right">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Disponibles</span>
                   </div>
                </div>

                <Link to="/checkout"className="w-full bg-[#0B4D6C] hover:bg-[#093d56] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-95 flex justify-center items-center gap-2 text-lg">
                   <i className="fa-solid fa-ticket"></i> Comprar Entradas
                </Link>

                <p className="text-center text-gray-400 text-xs mt-4">
                   <i className="fa-solid fa-lock mr-1"></i> Pago 100% seguro con EasyTicket
                </p>

                <hr className="my-6 border-gray-100"/>

                <div className="space-y-3">
                   <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-[#0B4D6C] shrink-0">
                         <i className="fa-solid fa-share-nodes"></i>
                      </div>
                      <div>
                         <p className="text-sm font-bold text-gray-700">Comparte el evento</p>
                         <p className="text-xs text-gray-500">Invita a tus amigos</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default EventDetailPage;