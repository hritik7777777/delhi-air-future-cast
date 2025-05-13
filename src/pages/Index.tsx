
import React from 'react';
import AQIDisplay from '@/components/AQIDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, CloudRain, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  // Mock predicted AQI for Delhi NCR
  const mockPredictedAQIDelhi = 255; // Example: Poor

  return (
    <div className="space-y-12">
      <section className="text-center py-8 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg shadow-xl text-white">
        <h1 className="text-5xl font-extrabold mb-4">Delhi NCR Air Quality Hub</h1>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Track, predict, and understand air quality in the National Capital Region.
        </p>
        <Link to="/calculator">
          <Button size="lg" className="bg-white text-blue-500 hover:bg-gray-100 font-semibold">
            Go to AQI Calculator
          </Button>
        </Link>
      </section>

      <section className="flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="md:w-1/2 flex justify-center">
          <AQIDisplay aqi={mockPredictedAQIDelhi} location="Delhi NCR (Predicted)" />
        </div>
        <div className="md:w-1/2 space-y-4 text-gray-700">
          <h2 className="text-3xl font-semibold text-primary mb-3">Understanding AQI</h2>
          <p>
            The Air Quality Index (AQI) is a numerical scale used to communicate how polluted the air
            currently is or how polluted it is forecast to become. As AQI increases, a larger
            percentage of the population is likely to experience adverse health effects.
          </p>
          <p>
            Our platform provides predicted AQI values and a calculator to help you make informed
            decisions for your health and daily activities.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-primary text-center mb-6">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">AQI Prediction</CardTitle>
              <Thermometer className="h-6 w-6 text-red-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View predicted AQI levels for Delhi NCR to plan your day. (Currently using mock data)
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">AQI Calculator</CardTitle>
              <Search className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Calculate AQI based on specific pollutant concentrations (e.g., PM2.5).
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Health Advisories</CardTitle>
              <CloudRain className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Understand the health implications associated with different AQI levels.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center py-6 bg-gray-100 rounded-lg">
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

