
export interface AQICategory {
  level: string;
  healthImplications: string;
  cautionaryStatement: string;
  colorClass: string; // Tailwind background color class
  textColorClass: string; // Tailwind text color class
}

export const getAQICategory = (aqi: number | null): AQICategory => {
  if (aqi === null || isNaN(aqi)) {
    return {
      level: "Unknown",
      healthImplications: "Data not available.",
      cautionaryStatement: "Ensure you have valid input.",
      colorClass: "bg-aqi-unknown",
      textColorClass: "text-black",
    };
  }
  if (aqi >= 0 && aqi <= 50) {
    return {
      level: "Good",
      healthImplications: "Minimal impact.",
      cautionaryStatement: "Enjoy outdoor activities!",
      colorClass: "bg-aqi-good",
      textColorClass: "text-white",
    };
  }
  if (aqi >= 51 && aqi <= 100) {
    return {
      level: "Satisfactory",
      healthImplications: "Minor breathing discomfort to sensitive people.",
      cautionaryStatement: "Sensitive individuals should limit prolonged outdoor exertion.",
      colorClass: "bg-aqi-satisfactory",
      textColorClass: "text-white",
    };
  }
  if (aqi >= 101 && aqi <= 200) {
    return {
      level: "Moderate",
      healthImplications: "Breathing discomfort to people with lung disease such as asthma, and discomfort to people with heart disease, children and older adults.",
      cautionaryStatement: "People with respiratory or heart conditions, children, and older adults should limit prolonged outdoor exertion.",
      colorClass: "bg-aqi-moderate",
      textColorClass: "text-black",
    };
  }
  if (aqi >= 201 && aqi <= 300) {
    return {
      level: "Poor",
      healthImplications: "Breathing discomfort to most people on prolonged exertion.",
      cautionaryStatement: "Everyone, especially children, older adults, and people with respiratory or heart conditions, should reduce prolonged or heavy outdoor exertion.",
      colorClass: "bg-aqi-poor",
      textColorClass: "text-white",
    };
  }
  if (aqi >= 301 && aqi <= 400) {
    return {
      level: "Very Poor",
      healthImplications: "Respiratory illness on prolonged exertion. Effect may be more pronounced in people with lung and heart diseases.",
      cautionaryStatement: "Everyone should avoid prolonged or heavy outdoor exertion. People with respiratory or heart conditions, children, and older adults should remain indoors and keep activity levels low.",
      colorClass: "bg-aqi-veryPoor",
      textColorClass: "text-white",
    };
  }
  // AQI > 400
  return {
    level: "Severe",
    healthImplications: "Affects healthy people and seriously impacts those with existing diseases.",
    cautionaryStatement: "Everyone should avoid all outdoor physical activity. People with respiratory or heart conditions, children, and older adults should remain indoors and keep activity levels low.",
    colorClass: "bg-aqi-severe",
    textColorClass: "text-white",
  };
};

// Simplified PM2.5 AQI Calculation (Indian Standards for 24-hour concentration)
// This is a very simplified version. Real AQI calculation involves multiple pollutants and sub-indices.
export const calculatePM25AQI = (pm25Concentration: number): number => {
  if (pm25Concentration < 0) return 0;
  if (pm25Concentration <= 30) return Math.round((pm25Concentration / 30) * 50);
  if (pm25Concentration <= 60) return Math.round(50 + ((pm25Concentration - 30) / 30) * 50);
  if (pm25Concentration <= 90) return Math.round(100 + ((pm25Concentration - 60) / 30) * 100);
  if (pm25Concentration <= 120) return Math.round(200 + ((pm25Concentration - 90) / 30) * 100);
  if (pm25Concentration <= 250) return Math.round(300 + ((pm25Concentration - 120) / 130) * 100);
  return Math.round(400 + ((pm25Concentration - 250) / 250) * 100); // Capped at 500 for > 250, simplified
};

