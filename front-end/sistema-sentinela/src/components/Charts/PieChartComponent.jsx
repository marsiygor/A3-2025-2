import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PieChartComponent = ({ title, data = [] }) => {

  const COLORS = ["#EF4444", "#6B7280", "#38B4A6", "#1E40AF", "#0EA5E9", "#FDE68A", "#A855F7", "#F97316"];

  return (
    <div className="card shadow-sm border-0 p-4">
      <h6 style={{ color: "#1E293B" }} className="fw-bold mb-4">
        {title}
      </h6>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
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
