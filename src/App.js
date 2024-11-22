import React, { useState, useEffect, useRef  } from 'react';
import * as THREE from 'three';


const CONFIG = {
  INITIAL_CONTAMINATION: 3000,
  CONTAMINATION_SPEED: 1, // 1: 20 segundos = 500 unidades
  CONTAMINATION_INTERVAL: 20,
  CONTAMINATION_STEPS: [500, 1000, 1500, 2000],
  COLORS: {
    CLEAN: [64, 224, 208],      // Turquesa
    POLLUTED: [101, 67, 33]     // Marrón oscuro
  }
};

const App = () => {
  const [contamination, setContamination] = useState(CONFIG.INITIAL_CONTAMINATION);
  const intervalRef = useRef(null);

  useEffect(() => {
    startContamination();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startContamination = () => {
    intervalRef.current = setInterval(() => {
      setContamination(prev => {
        if (prev <= 0) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev + CONFIG.CONTAMINATION_SPEED;
      });
    }, CONFIG.CONTAMINATION_INTERVAL);
  };

  const getBackgroundColor = () => {
    const normalizedValue = Math.min(contamination / 5000, 1);
    const r = CONFIG.COLORS.CLEAN[0] + 
              normalizedValue * (CONFIG.COLORS.POLLUTED[0] - CONFIG.COLORS.CLEAN[0]);
    const g = CONFIG.COLORS.CLEAN[1] + 
              normalizedValue * (CONFIG.COLORS.POLLUTED[1] - CONFIG.COLORS.CLEAN[1]);
    const b = CONFIG.COLORS.CLEAN[2] + 
              normalizedValue * (CONFIG.COLORS.POLLUTED[2] - CONFIG.COLORS.CLEAN[2]);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const cleanSwamp = (amount) => {
    setContamination(prev => {
      const newValue = Math.max(0, prev - amount);
      if (newValue === 0) {
        clearInterval(intervalRef.current);
      }
      return newValue;
    });
  };

  return (
    <div 
      style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: getBackgroundColor(),
        transition: 'background-color 0.3s ease',
        color: 'white',
        textAlign: 'center'
      }}
    >
      <h1 style={{fontSize: '5rem'}}>Nivel de Contaminación</h1>
      <h2 style={{fontSize: '8rem'}}>{contamination}</h2>
      
      <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
        {CONFIG.CONTAMINATION_STEPS.map(step => (
          <button 
            key={step} 
            onClick={() => cleanSwamp(step)}
            style={{
              padding: '10px 20px', 
              fontSize: '1.2rem', 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white', 
              border: '2px solid white',
              borderRadius: '5px'
            }}
          >
            Limpiar {step} unidades
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;