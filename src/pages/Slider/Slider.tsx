import React, { useState } from 'react';
import './Slider.css'; // Arquivo CSS para estilizar o slider

interface SliderProps {
  images: string[]; // Lista de URLs das imagens
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="slider">
      <button onClick={handlePrev} className="slider-button">Previous</button>
      <div className="slider-content">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="slider-image" />
      </div>
      <button onClick={handleNext} className="slider-button">Next</button>
    </div>
  );
};

export default Slider;
