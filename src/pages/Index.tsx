
import React from 'react';
import AQIDisplay from '@/components/AQIDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, CloudRain, Search, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import HistoricalAQIChart from '@/components/HistoricalAQIChart';

const Index: React.FC = () => {
  const mockPredictedAQIDelhi = 255; // Example: Poor

  return (
    <div className="space-y-12">
      <section className="text-center py-8 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg shadow-xl text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Delhi NCR Air Quality Hub</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Track, predict, and understand air quality in the National Capital Region.
        </p>
        <Link to="/calculator">
          <Button size="lg" className="bg-white text-blue-500 hover:bg-gray-100 font-semibold">
            Go to AQI Calculator
          </Button>
        </Link>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-start">
        <div className="flex justify-center">
          <AQIDisplay aqi={mockPredictedAQIDelhi} location="Delhi NCR (Predicted Sample)" />
        </div>
        <div className="space-y-4 text-gray-700 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-primary mb-3">Understanding AQI</h2>
          <p>
            The Air Quality Index (AQI) is a numerical scale used to communicate how polluted the air
            currently is or how polluted it is forecast to become. As AQI increases, a larger
            percentage of the population is likely to experience adverse health effects.
          </p>
          <p>
            Our platform provides predicted AQI values (currently using sample data), historical trends, and a calculator to help you make informed
            decisions for your health and daily activities.
          </p>
        </div>
      </section>

      <section>
        <HistoricalAQIChart />
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-primary text-center mb-8">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow flex flex-col">
            <CardHeader className="flex-grow">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-red-100 rounded-full">
                  <Thermometer className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <CardTitle className="text-xl font-medium text-center">AQI Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                View predicted AQI levels for Delhi NCR.
                <span className="block text-xs mt-1 italic">(Currently uses sample data. Future updates aim to integrate live API data.)</span>
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow flex flex-col">
            <CardHeader className="flex-grow">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <Search className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <CardTitle className="text-xl font-medium text-center">AQI Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Calculate AQI based on specific pollutant concentrations (e.g., PM2.5).
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow flex flex-col">
            <CardHeader className="flex-grow">
               <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <CloudRain className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <CardTitle className="text-xl font-medium text-center">Health Advisories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Understand the health implications associated with different AQI levels.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center py-6 bg-gray-100 rounded-lg shadow">
        <h3 className="text-2xl font-semibold text-primary mb-3">Stay Informed, Stay Healthy</h3>
        <p className="text-gray-600 max-w-xl mx-auto">
          Regularly checking the AQI can help you take precautionary measures, especially if you belong to
          sensitive groups. Reduce exposure during high pollution days.
        </p>
      </section>
    </div>
  );
};

export default Index;
