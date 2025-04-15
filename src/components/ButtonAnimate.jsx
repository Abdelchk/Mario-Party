import { useRef } from 'react';

export default function ButtonAnimate({ onClick, text }) {
  const btnRef = useRef();

  return (
    <button
      style={{ fontFamily: 'ShinGoProBold' }}
      ref={btnRef}
      onClick={onClick}
      className="play"
    >
      {text}
    </button>
  );
}
