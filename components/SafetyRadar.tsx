
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { DashboardData } from '../types';

interface SafetyRadarProps {
  data: DashboardData;
}

const SafetyRadar: React.FC<SafetyRadarProps> = ({ data }) => {
  // Mapping some mock safety scores based on available data
  const chartData = [
    { subject: 'Location Security', A: 95, B: 80, fullMark: 100 },
    { subject: 'Battery Health', A: 70, B: 95, fullMark: 100 },
    { subject: 'SOS Readiness', A: 98, B: 90, fullMark: 100 },
    { subject: 'Network Stability', A: 85, B: 92, fullMark: 100 },
    { subject: 'Boundary Compliance', A: 60, B: 85, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Current Period"
          dataKey="A"
          stroke="#4f46e5"
          fill="#4f46e5"
          fillOpacity={0.6}
        />
        <Radar
          name="Previous Period"
          dataKey="B"
          stroke="#94a3b8"
          fill="#94a3b8"
          fillOpacity={0.3}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SafetyRadar;
