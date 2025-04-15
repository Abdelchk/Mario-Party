import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CardDisplay({ board, isFinal }) {
  const cardRef = useRef();
  const textRef = useRef();
  const iconRef = useRef();

  useEffect(() => {
    if (board) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.5, rotateY: -180 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 0.8, ease: 'power3.out' }
      );

      if (isFinal) {
        gsap.to(iconRef.current, {
          rotateY: 360,
          duration: 4,
          ease: 'linear',
          repeat: -1,
          transformOrigin: 'center',
        });

        gsap.to(iconRef.current, {
          scale: 1.05,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: 'sine.inOut',
        });

        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
        );
      }
    }
  }, [board, isFinal]);

  if (!board) return null;

  return (
    <div ref={cardRef} className="card-container">
      <div>
        <img
          ref={iconRef}
          src={board.boardIcon}
          alt={board.name}
          className="icon"
        />
      </div>

      {isFinal && (
        <div ref={textRef}>
          <h2 className="card-title">
            {board.name}
          </h2>
          <p className="card-description">
            {board.description}
          </p>
          <p className="card-footer">
            Le choix ne vous plaît pas ?
          </p>
        </div>
      )}
    </div>
  );
}
