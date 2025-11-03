import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarChartComponent({ title, labels, data, dataKey }) {
  const chartData = labels.map((label, i) => ({ name: label, [dataKey]: data[i] }));

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h6 style={{ color: "#1E293B" }} className="fw-bold mb-4">{title}</h6>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill="#38B4A6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartComponent;
