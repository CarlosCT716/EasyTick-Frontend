const MyBookingsPage = () => {
  // Datos simulados
  const tickets = [
    {
      id: "TK-8829",
      event: "Tech Summit Lima 2026",
      date: "15 Feb, 2026",
      time: "09:00 AM",
      location: "Centro de Convenciones",
      image: "https://picsum.photos/seed/tech/200/200",
      status: "CONFIRMED",
      price: 150.00,
      seats: "General"
    },
    {
      id: "TK-9931",
      event: "Concierto Rock 80s",
      date: "28 Feb, 2026",
      time: "08:00 PM",
      location: "Arena 1, Costa Verde",
      image: "https://picsum.photos/seed/rock/200/200",
      status: "PENDING",
      price: 45.00,
      seats: "VIP - Fila 4"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="flex items-center justify-between mb-8">
           <h1 className="text-2xl font-bold text-[#002940]">Mis Tickets</h1>
           <div className="flex bg-gray-100 rounded-lg p-1">
               <button className="px-4 py-1.5 bg-white text-[#0B4D6C] text-sm font-semibold rounded shadow-sm">Próximos</button>
               <button className="px-4 py-1.5 text-gray-500 text-sm font-medium hover:text-gray-700">Pasados</button>
           </div>
       </div>

       <div className="space-y-6">
           {tickets.map((ticket) => (
             <div key={ticket.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition">
                 
                 <div className="md:w-48 bg-gray-100 relative group">
                     <img src={ticket.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                     <div className="absolute top-3 left-3">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md text-white ${
                            ticket.status === 'CONFIRMED' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}>
                            {ticket.status === 'CONFIRMED' ? 'CONFIRMADO' : 'PENDIENTE'}
                        </span>
                     </div>
                 </div>
                 <div className="flex-1 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-200 border-dashed relative">
                     <div className="absolute -top-3 -right-3 w-6 h-6 bg-gray-50 rounded-full hidden md:block border border-gray-200"></div>
                     <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gray-50 rounded-full hidden md:block border border-gray-200"></div>
                     
                     <h3 className="text-xl font-bold text-gray-800 mb-2">{ticket.event}</h3>
                     <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                         <div className="flex items-center gap-2">
                             <i className="fa-regular fa-calendar text-[#0B4D6C]"></i> {ticket.date}
                         </div>
                         <div className="flex items-center gap-2">
                             <i className="fa-regular fa-clock text-[#0B4D6C]"></i> {ticket.time}
                         </div>
                         <div className="flex items-center gap-2 col-span-2">
                             <i className="fa-solid fa-location-dot text-[#0B4D6C]"></i> {ticket.location}
                         </div>
                     </div>
                     <div className="flex items-center gap-4 text-xs font-semibold">
                         <span className="bg-gray-100 px-3 py-1 rounded text-gray-600">ID: {ticket.id}</span>
                         <span className="bg-gray-100 px-3 py-1 rounded text-gray-600">{ticket.seats}</span>
                     </div>
                 </div>

                 <div className="w-full md:w-64 p-6 bg-gray-50 flex flex-col items-center justify-center gap-4">
                     <div className="bg-white p-2 rounded-lg shadow-sm">
                         <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${ticket.id}`} alt="QR Ticket" className="w-24 h-24" />
                     </div>
                     <button className="w-full bg-[#0B4D6C] text-white text-sm font-bold py-2 rounded-lg hover:bg-[#093d56] transition flex items-center justify-center gap-2">
                         <i className="fa-solid fa-download"></i> Descargar
                     </button>
                 </div>

             </div>
           ))}
       </div>
    </div>
  );
};

export default MyBookingsPage;