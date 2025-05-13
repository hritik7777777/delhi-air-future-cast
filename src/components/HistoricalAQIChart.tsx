
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { getAQICategory } from '@/utils/aqiUtils';

const mockHistoricalData = [
  { day: '7 days ago', date: 'May 06', aqi: 175 }, // Moderate
  { day: '6 days ago', date: 'May 07', aqi: 210 }, // Poor
  { day: '5 days ago', date: 'May 08', aqi: 255 }, // Poor
  { day: '4 days ago', date: 'May 09', aqi: 190 }, // Moderate
  { day: '3 days ago', date: 'May 10', aqi: 120 }, // Moderate
  { day: '2 days ago', date: 'May 11', aqi: 85 },  // Satisfactory
  { day: 'Yesterday', date: 'May 12', aqi: 110 }, // Moderate
];

const chartConfig = {
  aqi: {
    label: 'AQI',
    color: 'hsl(var(--primary))', // Default line color, can be dynamic
  },
};

const HistoricalAQIChart: React.FC = () => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Historical AQI Trend</CardTitle>
        <CardDescription>Last 7 days (mock data for Delhi NCR)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockHistoricalData}
              margin={{
                top: 5,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 6)} // Show "May 06"
                className="text-xs"
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8} 
                domain={[0, 'dataMax + 50']}
                className="text-xs"
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name, props) => {
                      const category = getAQICategory(props.payload.aqi as number);
                      return (
                        <div className="flex flex-col">
                           <span className={`font-bold ${category.textColorClass}`} style={{ color: category.textColorClass === 'text-black' ? 'black': 'white', backgroundColor: `var(--theme-aqi-${category.level.toLowerCase().replace(' ', '')})`}}>
                            AQI: {value} ({category.level})
                          </span>
                          <span className="text-xs text-muted-foreground">{props.payload.date}</span>
                        </div>
                      );
                    }}
                    indicator="dot"
                    nameKey="aqi" 
                    labelKey="day"
                    hideLabel // Using custom formatter for label appearance
                  />
                }
              />
               <Line
                dataKey="aqi"
                type="monotone"
                strokeWidth={3}
                stroke="var(--color-aqi, hsl(var(--primary)))" // Default if not overridden by points
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  if (!payload || typeof payload.aqi !== 'number') {
                    return null;
                  }
                  const category = getAQICategory(payload.aqi);
                  let dotColor = 'hsl(var(--primary))'; // Default
                  if (category.level === 'Good') dotColor = 'var(--theme-aqi-good)';
                  else if (category.level === 'Satisfactory') dotColor = 'var(--theme-aqi-satisfactory)';
                  else if (category.level === 'Moderate') dotColor = 'var(--theme-aqi-moderate)';
                  else if (category.level === 'Poor') dotColor = 'var(--theme-aqi-poor)';
                  else if (category.level === 'Very Poor') dotColor = 'var(--theme-aqi-verypoor)';
                  else if (category.level === 'Severe') dotColor = 'var(--theme-aqi-severe)';
                  
                  return <circle cx={cx} cy={cy} r={5} fill={dotColor} stroke={dotColor} strokeWidth={2} />;
                }}
                activeDot={(props) => {
                   const { cx, cy, payload } = props;
                   if (!payload || typeof payload.aqi !== 'number') {
                    return null;
                  }
                  const category = getAQICategory(payload.aqi);
                  let dotColor = 'hsl(var(--primary))'; // Default
                  if (category.level === 'Good') dotColor = 'var(--theme-aqi-good)';
                  else if (category.level === 'Satisfactory') dotColor = 'var(--theme-aqi-satisfactory)';
                  else if (category.level === 'Moderate') dotColor = 'var(--theme-aqi-moderate)';
                  else if (category.level === 'Poor') dotColor = 'var(--theme-aqi-poor)';
                  else if (category.level === 'Very Poor') dotColor = 'var(--theme-aqi-verypoor)';
                  else if (category.level === 'Severe') dotColor = 'var(--theme-aqi-severe)';
                  return <circle cx={cx} cy={cy} r={7} fill={dotColor} stroke="hsl(var(--background))" strokeWidth={2} />;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default HistoricalAQIChart;
