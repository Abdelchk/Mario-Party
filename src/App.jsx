import { useState } from 'react'
import { useBoardStore } from './store/useStore'
import CardDisplay from './components/CardDisplay'
import AllCards from './components/AllCards'
import ButtonAnimate from './components/ButtonAnimate'
import Music from './components/Music'
import './App.css'
import gsap from 'gsap'
import cardRevealSound from './assets/sounds/smb_pause.wav'
import rouletteSound from './assets/sounds/item_box.mp3'

function App() {
  const { data, selectedBoard, selectBoard } = useBoardStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [tempBoard, setTempBoard] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showAllCards, setShowAllCards] = useState(false);
  const [isHidingAllCards, setIsHidingAllCards] = useState(false);
  const audio = new Audio(cardRevealSound);
  const rouletteAudio = new Audio(rouletteSound);

  const startRoulette = () => {
    if (isAnimating || isTransitioning) return;

    setIsTransitioning(true);

    const elements = ['.card-container', '.img'];
    elements.forEach(selector => {
      gsap.to(selector, {
        opacity: 0,
        scale: 0.7,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          selectBoard(null);
          launchRoulette();
        }
      });
    });
  };

  const launchRoulette = () => {
    setIsAnimating(true);
    let steps = 20;
    let delay = 0.03;
    let tl = gsap.timeline({
      onComplete: () => {
        const finalBoard = data[Math.floor(Math.random() * data.length)];
        audio.play();
        rouletteAudio.pause();

        setTempBoard(finalBoard);
        setTimeout(() => {
          selectBoard(finalBoard);
          setTempBoard(null);
          setIsAnimating(false);
          setIsTransitioning(false);

          gsap.fromTo(
            '.img',
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
          );
        }, 500);
      }
    });

    for (let i = 0; i < steps; i++) {
      const random = data[Math.floor(Math.random() * data.length)];
      tl.to({}, {
        duration: delay,
        onStart: () => {
          setTempBoard(random);
          rouletteAudio.volume = 0.2;
          rouletteAudio.play();
        }
      });
      delay += 0.02;
    }
  };

  return (
    <div className={`${showAllCards ? 'overflow-hidden' : ''}`}>
      <button
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          fontFamily: 'ShinGoProMedium'
        }}
        onClick={() => {
          showAllCards ? setIsHidingAllCards(true) : setShowAllCards(!showAllCards);
        }}        
      >
        {showAllCards ? 'Masquer les cartes' : 'Afficher toutes les cartes'}
      </button>

      {showAllCards && (
        <div>
        <AllCards data={data} onHide={() => {
          setShowAllCards(false);
          setIsHidingAllCards(false);
        }} isHiding={isHidingAllCards} />
        </div>
      )}

      <div className={`${showAllCards ? 'hidden' : ''}`}>
        <Music />
        {!isAnimating && (
          <img className='img' src='src/assets/Super_Mario_Party_Jamboree_Logo.png' alt="Logo" height={500} />
        )}
        <CardDisplay board={tempBoard || selectedBoard} isFinal={!!selectedBoard && !tempBoard} />
        <br />
        <ButtonAnimate onClick={startRoulette} text={isAnimating ? "Recherche en cours..." : selectedBoard ? "Rejouer 🎮" : "Chercher une carte 🎲"} />
      </div>
    </div>
  );
}

export default App;
