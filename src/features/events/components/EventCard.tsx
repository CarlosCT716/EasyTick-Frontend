import { Link } from 'react-router-dom';

interface EventCardProps {
  id: string | number; 
  image: string;
  category: string;
  title: string;
  date: string;
  location: string;
  price: number;
  month: string;
  day: string;
}

const EventCard = ({ id, image, category, title, location, price, month, day }: EventCardProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition group">

      <Link to={`/event/${id}`} className="block h-40 bg-gray-200 relative overflow-hidden">
        <img src={image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={title} />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-center shadow-sm">
          <p className="text-xs font-bold text-red-500">{month}</p>
          <p className="text-lg font-black text-gray-800 leading-none">{day}</p>
        </div>
      </Link>

      <div className="p-5">
        <span className="text-[10px] font-bold text-[#0B4D6C] bg-cyan-50 px-2 py-1 rounded uppercase tracking-wide">{category}</span>

        <h3 className="font-bold text-lg text-gray-800 mt-2 mb-1 truncate">
          <Link to={`/event/${id}`} className="hover:text-[#0B4D6C] transition">
            {title}
          </Link>
        </h3>

        <p className="text-sm text-gray-500 mb-4"><i className="fa-solid fa-location-dot text-gray-400 mr-1"></i> {location}</p>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-sm font-medium text-green-600">S/ {price.toFixed(2)}</span>
          <button className="text-[#0B4D6C] hover:bg-cyan-50 p-2 rounded-full transition"><i className="fa-regular fa-bookmark"></i></button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;