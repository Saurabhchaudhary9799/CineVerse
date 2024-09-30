// components/CircularProgressBar.tsx
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressBarProps {
  value: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ value }) => {
  return (
    <div className="w-16 h-16">
      <CircularProgressbar
        value={value}
        text={`${value}`}
        styles={buildStyles({
          pathColor: value > 5 ? "green" : "red", 
          trailColor: "transparent",
          textSize: "30px",
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
