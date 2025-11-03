function DashboardCard({ title, value, color = '#1E40AF'}) {
  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-body">
          <h6 className="text-muted">{title}</h6>
          <h3 style={{ color }}>{value}</h3>
      </div>
    </div>
  );
}

export default DashboardCard;
