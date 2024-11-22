import React, { useEffect, useState } from "react";
const ANIMALS = [
  { name: "Rana", emoji: "🐸", returnLevel: 3000 },
  { name: "Libélula", emoji: "🐞", returnLevel: 2200 },
  { name: "Pez", emoji: "🐟", returnLevel: 1500 },
  { name: "Pato", emoji: "🦆", returnLevel: 500 },
  { name: "Tortuga", emoji: "🐢", returnLevel: 0 },
];

const BAD_ANIMALS = [
  { name: "Mosquito", emoji: "🦟", appearLevel: 3000 },
  { name: "Rata", emoji: "🐀", appearLevel: 2000 },
  { name: "Serpiente", emoji: "🐍", appearLevel: 500 },
];




const Animals = ({ contamination }) => {
  const [visibleGoodAnimals, setVisibleGoodAnimals] = useState([]);
  const [visibleBadAnimals, setVisibleBadAnimals] = useState([]);

  // Filtra animales buenos que regresan cuando la contaminación baja
  useEffect(() => {
    const newVisibleGoodAnimals = ANIMALS.filter(
      (animal) => contamination <= animal.returnLevel
    );
    setVisibleGoodAnimals(newVisibleGoodAnimals);
  }, [contamination]);

  // Filtra bichos malos que aparecen cuando la contaminación es alta
  useEffect(() => {
    const newVisibleBadAnimals = BAD_ANIMALS.filter(
      (animal) => contamination >= animal.appearLevel
    );
    setVisibleBadAnimals(newVisibleBadAnimals);
  }, [contamination]);

  return (
    <div style={{ marginTop: "30px" }}>
      <div>
        <h3>Animales que vuelven al pantano...</h3>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          {visibleGoodAnimals.map((animal, i) => (
            <div
              key={i}
              style={{
                padding: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "10px",
                textAlign: "center",
                width: "80px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{animal.emoji}</div>
              <div style={{ marginTop: "5px", fontSize: "1rem" }}>
                {animal.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Bichos que llegan al pantano...</h3>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          {visibleBadAnimals.map((animal, i) => (
            <div
              key={i}
              style={{
                padding: "10px",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                borderRadius: "10px",
                textAlign: "center",
                width: "80px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{animal.emoji}</div>
              <div style={{ marginTop: "5px", fontSize: "1rem" }}>
                {animal.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Animals;