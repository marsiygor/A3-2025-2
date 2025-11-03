
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function LineChartComponent({ title, labels, data }) {
  const chartData = labels.map((label, i) => ({ name: label, Denúncias: data[i] }));

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h6 style={{ color: "#1E293B" }} className="fw-bold mb-4">{title}</h6>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Denúncias" stroke="#1E40AF" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChartComponent;
