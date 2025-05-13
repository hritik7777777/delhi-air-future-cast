
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AQIDisplay from '@/components/AQIDisplay';
import { calculatePM25AQI } from '@/utils/aqiUtils';
import { AlertCircle } from 'lucide-react';

const AQICalculatorPage: React.FC = () => {
  const [pm25Input, setPm25Input] = useState<string>('');
  const [calculatedAqi, setCalculatedAqi] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    setCalculatedAqi(null);
    const pm25Value = parseFloat(pm25Input);
    if (isNaN(pm25Value) || pm25Value < 0) {
      setError('Please enter a valid non-negative PM2.5 concentration.');
      return;
    }
    const aqi = calculatePM25AQI(pm25Value);
    setCalculatedAqi(aqi);
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary">AQI Calculator</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Calculate Air Quality Index based on PM2.5 concentration.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Note: This is a simplified calculator using only PM2.5. Official AQI considers multiple pollutants.
        </p>
      </header>

      <Card className="max-w-lg mx-auto shadow-xl">
        <CardHeader>
          <CardTitle>Enter Pollutant Value</CardTitle>
          <CardDescription>Input the 24-hour average PM2.5 concentration (in µg/m³).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="pm25" className="block text-sm font-medium text-gray-700 mb-1">
              PM2.5 Concentration (µg/m³)
            </label>
            <Input
              id="pm25"
              type="number"
              value={pm25Input}
              onChange={(e) => setPm25Input(e.target.value)}
              placeholder="e.g., 75"
              className="w-full"
            />
          </div>
          {error && (
            <div className="flex items-center text-sm text-destructive bg-red-100 border border-destructive p-3 rounded-md">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}
          <Button onClick={handleCalculate} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Calculate AQI
          </Button>
        </CardContent>
      </Card>

      {calculatedAqi !== null && (
        <div className="mt-8 flex justify-center">
          <AQIDisplay aqi={calculatedAqi} location="Calculated" />
        </div>
      )}
    </div>
  );
};

export default AQICalculatorPage;
