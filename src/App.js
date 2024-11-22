import React, { useState, useEffect, useRef } from "react";
import Animals from "./Animals";
import Ticker from "./Ticker";

const CONFIG = {
  INITIAL_CONTAMINATION: 3000,
  CONTAMINATION_SPEED: 1,
  CONTAMINATION_INTERVAL: 20,
  CONTAMINATION_STEPS: [500, 1000, 1500, 2000],
  COLORS: {
    CLEAN: [64, 224, 208], // Turquesa
    POLLUTED: [101, 67, 33], // Marrón oscuro
  },
};

const App = () => {
  const [contamination, setContamination] = useState(CONFIG.INITIAL_CONTAMINATION);
  const intervalRef = useRef(null);

  const getMessage = () => {
    if (contamination > 5500) return "Este pantano necesita su ayuda urgente. ¡Empecemos a actuar ya!";
    if (contamination > 5000) return "La situación es crítica. El pantano está lleno de malaria y plagas.";
    if (contamination > 4500) return "Secar los pantanos es clave para proteger la salud de los habitantes del ishuv.";
    if (contamination > 4000) return "El pantano todavía está lleno de peligro.";
    if (contamination > 3500) return "¡Buen trabajo! Vamos mejorando, pero todavía queda mucho por hacer.";
    if (contamination > 3000) return "Cada acción cuenta. Sigamos trabajando para darle vida a este lugar.";
    if (contamination > 2500) return "Estoy seguro de que juntos podemos lograrlo. ¡Un esfuerzo más y los resultados serán enormes!";
    if (contamination > 2000) return "El pantano comienza a mostrar signos de mejora. ¡Sigamos trabajando por la vida!";
    if (contamination > 1500) return "¡Excelente! El agua está más clara y menos plagas sobreviven. ¡Vamos!";
    if (contamination > 1000) return "Cada paso importa. Esto es más que limpiar un pantano, ¡es salvar vidas!";
    if (contamination > 800) return "Podemos ver el futuro de este lugar más limpio y saludable. ¡Vamos, no aflojemos!";
    if (contamination > 500) return "El trabajo de Hilel Yaffe fue inspirador. ¡Hoy estás haciendo historia limpiando este lugar!";
    if (contamination > 200) return "¡Impresionante! El pantano casi está listo para volver a ser un lugar lleno de vida.";
    return "¡Felicidades! El pantano está limpio. Es un espacio seguro y lleno de naturaleza, gracias a vos.";
  };
  

  useEffect(() => {
    startContamination();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startContamination = () => {
    intervalRef.current = setInterval(() => {
      setContamination((prev) => {
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
    const r =
      CONFIG.COLORS.CLEAN[0] +
      normalizedValue * (CONFIG.COLORS.POLLUTED[0] - CONFIG.COLORS.CLEAN[0]);
    const g =
      CONFIG.COLORS.CLEAN[1] +
      normalizedValue * (CONFIG.COLORS.POLLUTED[1] - CONFIG.COLORS.CLEAN[1]);
    const b =
      CONFIG.COLORS.CLEAN[2] +
      normalizedValue * (CONFIG.COLORS.POLLUTED[2] - CONFIG.COLORS.CLEAN[2]);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const cleanSwamp = (amount) => {
    setContamination((prev) => {
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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: getBackgroundColor(),
        transition: "background-color 0.3s ease",
        color: "white",
        textAlign: "center",
      }}
    >
      <Ticker message={getMessage()} />

      <h1 style={{ fontSize: "4rem" }}>Nivel de Contaminación</h1>
      <h2 style={{ fontSize: "9rem" }}>{contamination}</h2>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {CONFIG.CONTAMINATION_STEPS.map((step) => (
          <button
            key={step}
            onClick={() => cleanSwamp(step)}
            style={{
              padding: "10px 20px",
              fontSize: "1.2rem",
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              border: "2px solid white",
              borderRadius: "5px",
            }}
          >
            Limpiar {step} unidades
          </button>
        ))}
      </div>

      <Animals contamination={contamination} />
    </div>
  );
};

export default App;
