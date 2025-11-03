import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PieChartComponent = ({ title }) => {
  const data = [
    { name: "Phishing", value: 45 },
    { name: "Compra Suspeita", value: 45 },
    { name: "SMS", value: 10 },
    { name: "Ligação Suspeita", value: 10 },
  ];

  const COLORS = ["#111827", "#6B7280", "#38B4A6", "#1E40AF"];

  return (
    <div className="card shadow-sm border-0 p-4">
      <h6 style={{ color: "#1E293B" }} className="fw-bold mb-4">
        {title}
      </h6>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;
