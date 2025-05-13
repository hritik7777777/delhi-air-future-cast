
import React from 'react';
import { AQICategory, getAQICategory } from '@/utils/aqiUtils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface AQIDisplayProps {
  aqi: number | null;
  location?: string;
}

const AQIDisplay: React.FC<AQIDisplayProps> = ({ aqi, location }) => {
  const category = getAQICategory(aqi);
  const IconComponent = category.icon;

  return (
    <Card className={`w-full max-w-md shadow-lg transition-all duration-300 ease-in-out ${category.colorClass} ${category.textColorClass}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {location ? `${location} AQI` : 'Current AQI'}
        </CardTitle>
        <CardDescription className={`${category.textColorClass === 'text-black' ? 'text-gray-700' : 'text-gray-200'}`}>
          Air Quality Index
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-6xl font-extrabold mb-2">{aqi !== null ? aqi : 'N/A'}</div>
        <div className="flex items-center justify-center text-3xl font-semibold mb-2">
          {IconComponent && <IconComponent className="mr-2 h-8 w-8" />}
          <span>{category.level}</span>
        </div>
        <p className="text-sm mb-1">{category.healthImplications}</p>
        <p className="text-xs italic">{category.cautionaryStatement}</p>
      </CardContent>
    </Card>
  );
};

export default AQIDisplay;
