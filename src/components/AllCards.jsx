import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AllCards({ data, isHiding, onHide }) {
  const containerRef = useRef();

  useEffect(() => {
    if (!isHiding) {
      const cards = containerRef.current.querySelectorAll('.card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [isHiding]);

  useEffect(() => {
    if (isHiding) {
      const cards = containerRef.current.querySelectorAll('.card');
      gsap.to(cards, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.in',
        onComplete: () => {
          onHide();
        }
      });
    }
  }, [isHiding, onHide]);

  return (
    <div ref={containerRef} className="card-container">
      {data.map((board) => (
        <div
          key={board.id}
          className="card"
        >
          <img src={board.boardView} alt={board.name} className="rounded" />
          <h3 className="card-title">{board.name}</h3>
          <p className="card-description">{board.description}</p>
        </div>
      ))}
    </div>
  );
}