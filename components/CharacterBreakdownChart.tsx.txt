import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from 'recharts';

interface CharacterBreakdown {
  uppercase: number;
  lowercase: number;
  numbers: number;
  symbols: number;
}

interface CharacterBreakdownChartProps {
  breakdown: CharacterBreakdown;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function CharacterBreakdownChart({ breakdown }: CharacterBreakdownChartProps) {
  const data = [
    { name: 'Uppercase', value: breakdown.uppercase },
    { name: 'Lowercase', value: breakdown.lowercase },
    { name: 'Numbers', value: breakdown.numbers },
    { name: 'Symbols', value: breakdown.symbols },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

