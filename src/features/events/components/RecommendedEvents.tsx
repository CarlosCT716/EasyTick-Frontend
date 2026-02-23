import { useRef } from 'react';
import EventCard from './EventCard';
import type { EventListResponse } from '@/features/events/models/Event';

interface RecommendedEventsProps {
  events: EventListResponse[];
}

const shuffleArray = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const RecommendedEvents = ({ events }: RecommendedEventsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const recommended = shuffleArray(events).slice(0, 6);

  const scrollRecommended = (direction: number) => {
    if (!containerRef.current) return;
    const firstCard = containerRef.current.firstElementChild as HTMLElement;
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 300;
    const gap = 16;
    containerRef.current.scrollBy({ left: direction * (cardWidth + gap), behavior: 'smooth' });
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
        <h2 className="font-bold text-2xl text-[#002940]">Te podrían gustar</h2>
      </div>

      <div ref={containerRef} className="flex gap-4 overflow-x-auto hide-scroll-bar scroll-smooth">
        {recommended.map(event => (
          <div key={event.id} className="shrink-0 w-[85%] md:w-[45%] lg:w-[30%]">
            <EventCard event={event} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button onClick={() => scrollRecommended(-1)} className="btn-scroll">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button onClick={() => scrollRecommended(1)} className="btn-scroll">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default RecommendedEvents;