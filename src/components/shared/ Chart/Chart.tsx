import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type ChartDatum = {
  name: string;
  value: number;
  fill?: string;
};

type ChartProps = {
  type: 'line' | 'bar' | 'pie' | 'donut';
  data: ChartDatum[];
  width?: number;
  height?: number;
};

const Chart = ({ type, data, width = 200, height = 120 }: ChartProps) => {
  switch (type) {
    case 'bar':
      return (
        <BarChart width={width} height={height} data={data}>
          <Bar dataKey="value" fill="#3b82f6" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </BarChart>
      );

    case 'line':
      return (
        <LineChart width={width} height={height} data={data}>
          <Line type="monotone" dataKey="value" stroke="#3b82f6" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      );

    case 'pie':
    case 'donut':
      return (
        <PieChart width={width} height={height}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={5}
            outerRadius={10}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.fill ?? '#8884d8'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      );

    default:
      return null;
  }
};

export default Chart;
