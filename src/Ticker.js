import React from "react";

const Ticker = ({ message }) => {
  return (
    <div style={{
      position: "relative",
      overflow: "hidden",
      whiteSpace: "nowrap",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      fontSize: "1.5rem",
      padding: "10px 0",
    }}>
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "scroll 25s linear infinite",
        }}
      >
        {message} &nbsp;&nbsp;|&nbsp;&nbsp; {/* Repetir para continuidad */}
        {message} &nbsp;&nbsp;|&nbsp;&nbsp;
        {message}
      </div>
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Ticker;
