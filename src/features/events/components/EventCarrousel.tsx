import { useRef, useEffect } from 'react';
import type { EventListResponse } from '@/features/events/models/Event';
import { Link } from 'react-router-dom';

interface EventCarouselProps {
  events: EventListResponse[];
}

const EventCarousel = ({ events }: EventCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.85;
      carouselRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll(1);
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#0B4D6C] py-8 relative group">
      <div className="container mx-auto px-4 relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 hide-scroll-bar scroll-smooth"
        >
          {events.map(event => (
            <Link
              to={`/event/${event.id}`}
              key={event.id}
              className="snap-center shrink-0 w-[85%] md:w-150 h-75 bg-gray-800 rounded-2xl relative overflow-hidden shadow-lg group cursor-pointer"
            >
              <img
                src={event.imageUrl}
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-500"
                alt={event.title}
              />
              <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/90 to-transparent p-6">
                
                <h3 className="text-2xl font-bold text-white mb-1">{event.title}</h3>
                <p className="text-gray-300 text-sm">
                  <i className="fa-regular fa-calendar mr-2"></i>
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-r-xl text-white hover:bg-white/30 hidden md:block z-10"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-l-xl text-white hover:bg-white/30 hidden md:block z-10"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default EventCarousel;