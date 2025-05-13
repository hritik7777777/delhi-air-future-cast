import { LucideIcon, CloudSun, Cloud, Gauge, Thermometer, CloudRain } from 'lucide-react';

export interface AQICategory {
  level: string;
  range: string;
  healthImplications: string;
  cautionaryStatement: string;
  colorClass: string; // Tailwind background color class
  textColorClass: string; // Tailwind text color class
  icon: LucideIcon;
}

const aqiBreakpoints: { conc: [number, number]; aqi: [number, number] }[] = [
  { conc: [0.0, 12.0], aqi: [0, 50] },
  { conc: [12.1, 35.4], aqi: [51, 100] },
  { conc: [35.5, 55.4], aqi: [101, 150] },
  { conc: [55.5, 150.4], aqi: [151, 200] },
  { conc: [150.5, 250.4], aqi: [201, 300] },
  { conc: [250.5, 350.4], aqi: [301, 400] },
  { conc: [350.5, 500.4], aqi: [401, 500] },
];

export function calculatePM25AQI(pm25: number): number {
  if (pm25 < 0) return 0; // Or handle as an error

  const breakpoint = aqiBreakpoints.find(
    (bp) => pm25 >= bp.conc[0] && pm25 <= bp.conc[1]
  );

  if (!breakpoint) {
    // If PM2.5 is higher than the highest breakpoint, cap at 500 or handle as per guidelines
    if (pm25 > 500.4) return 500;
    // For values between defined breakpoints, a more complex formula might be needed,
    // but for simplicity, we can find the closest one or use the last one if it exceeds all.
    // This simplified version uses the last defined breakpoint if above 350.5 and <= 500.4
    // A more robust solution would use the EPA formula C = ((I_high - I_low) / (BP_high - BP_low)) * (C_p - BP_low) + I_low
    // For now, this is a simplified approach.
    const lastBreakpoint = aqiBreakpoints[aqiBreakpoints.length - 1];
     if (pm25 > lastBreakpoint.conc[1]) { // If concentration is higher than the highest defined range
        // This part needs a clear rule for values beyond the table.
        // CIRAQ gives specific formula, for now, let's assume it caps or requires extension of table.
        // For simplicity, if it's very high, it will fall into the > 400 AQI category generally.
        // Let's return a high AQI value like 500 if it exceeds the scale.
        return 500; // Max AQI value
    }
    // Fallback if somehow no breakpoint is found within range (should not happen with current logic)
    return 0;
  }

  const Ih = breakpoint.aqi[1];
  const Il = breakpoint.aqi[0];
  const BPh = breakpoint.conc[1];
  const BPl = breakpoint.conc[0];

  // Linear interpolation formula
  const aqi = ((Ih - Il) / (BPh - BPl)) * (pm25 - BPl) + Il;
  return Math.round(aqi);
}

export const getAQICategory = (aqi: number | null): AQICategory => {
  if (aqi === null || isNaN(aqi)) {
    return {
      level: 'Unknown',
      range: 'N/A',
      healthImplications: 'AQI data is not available.',
      cautionaryStatement: 'Cannot determine air quality.',
      colorClass: 'bg-aqi-unknown',
      textColorClass: 'text-black',
      icon: Gauge, // Default icon
    };
  }
  if (aqi <= 50) {
    return {
      level: 'Good',
      range: '0-50',
      healthImplications: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
      cautionaryStatement: 'None.',
      colorClass: 'bg-aqi-good',
      textColorClass: 'text-white',
      icon: CloudSun,
    };
  }
  if (aqi <= 100) {
    return {
      level: 'Satisfactory',
      range: '51-100',
      healthImplications: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
      cautionaryStatement: 'Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.',
      colorClass: 'bg-aqi-satisfactory',
      textColorClass: 'text-black',
      icon: Cloud,
    };
  }
  if (aqi <= 200) {
    return {
      level: 'Moderate',
      range: '101-200',
      healthImplications: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
      cautionaryStatement: 'Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.',
      colorClass: 'bg-aqi-moderate',
      textColorClass: 'text-black',
      icon: Gauge,
    };
  }
  if (aqi <= 300) {
    return {
      level: 'Poor',
      range: '201-300',
      healthImplications: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
      cautionaryStatement: 'Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion.',
      colorClass: 'bg-aqi-poor',
      textColorClass: 'text-white',
      icon: CloudRain,
    };
  }
  if (aqi <= 400) {
    return {
      level: 'Very Poor',
      range: '301-400',
      healthImplications: 'Health warnings of emergency conditions. The entire population is more likely to be affected.',
      cautionaryStatement: 'Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.',
      colorClass: 'bg-aqi-veryPoor',
      textColorClass: 'text-white',
      icon: Thermometer, // Representing high pollution stress
    };
  }
  // AQI > 400
  return {
    level: 'Severe',
    range: '401-500+',
    healthImplications: 'Health alert: everyone may experience more serious health effects.',
    cautionaryStatement: 'Everyone should avoid all outdoor exertion.',
    colorClass: 'bg-aqi-severe',
    textColorClass: 'text-white',
    icon: CloudRain, // Re-using CloudRain for severe, implying very bad conditions
  };
};
