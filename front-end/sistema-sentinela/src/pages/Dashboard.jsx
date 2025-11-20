import React, { useMemo } from "react";
import DashboardCard from "../components/DashboardCard";
import BarChartComponent from "../components/Charts/BarChart";
import LineChartComponent from "../components/Charts/LineChart";
import PieChartComponent from "../components/Charts/PieChartComponent";
import { Bar } from "recharts";

function Dashboard() {
  const [ocorrencias, setOcorrencias] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/ocorrencias/')
      .then(response => response.json())
      .then(data => setOcorrencias(data))
      .catch(error => console.error('Error fetching occurrences:', error));
  }, []);

  const dadosDashboard = useMemo(() => {
    const totalOcorrencias = ocorrencias.length;

    const ocorrenciasAltoGrau = ocorrencias.filter(
      (o) => o.grau_da_ocorrencia === "ALTO"
    ).length;

    // faz contagem por tipo de fraude (assunto)
    const tiposFraudeCount = ocorrencias.reduce((acc, o) => {
      const assunto = o.assunto || "Outros";
      acc[assunto] = (acc[assunto] || 0) + 1;
      return acc;
    }, {});

    // converter para formato usado no gráfico de pizza
    const tiposFraudeData = Object.entries(tiposFraudeCount).map(
      ([name, value]) => ({ name, value })
    );

    // faz contagem por grau para barras
    const grausCount = ocorrencias.reduce((acc, o) => {
      const grau = o.grau_da_ocorrencia || "N/A";
      acc[grau] = (acc[grau] || 0) + 1;
      return acc;
    }, {});

    const grausLabels = Object.keys(grausCount);
    const grausData = Object.values(grausCount);

    // Evolução temporal (agrupado por data de criação)
    const evolucaoCount = ocorrencias.reduce((acc, o) => {
      if (o.data_criacao) {
        const data = new Date(o.data_criacao).toLocaleDateString('pt-BR');
        acc[data] = (acc[data] || 0) + 1;
      }
      return acc;
    }, {});

    const evolucaoLabels = Object.keys(evolucaoCount);
    const evolucaoData = Object.values(evolucaoCount);

    // idades médias (Backend não tem data de nascimento no momento, usando mock ou removendo)
    // Como o backend não retorna data de nascimento na Ocorrencia, vamos remover ou adaptar.
    // Por enquanto, vamos deixar vazio para não quebrar, ou usar um dado fictício se necessário.
    // O ideal seria pedir para o usuário adicionar esse dado no backend, mas vamos manter simples.
    const idadesPorFaixa = {
      "18-29": 0,
      "30-44": 0,
      "45-59": 0,
      "60+": 0,
    };

    return {
      totalOcorrencias,
      ocorrenciasAltoGrau,
      tiposFraudeData,
      grausLabels,
      grausData,
      evolucaoLabels,
      evolucaoData,
      idadesPorFaixa,
    };
  }, [ocorrencias]);

  return (
    <div>
      <div className="d-flex flex-column mb-4">
        <h2 style={{ color: "#0A2342" }}>Dashboard</h2>
        <p style={{ color: "#4B5563" }}>Visão geral das atividades</p>
      </div>

      {/* Cards principais */}
      <div className="row mb-4">
        <div className="col-md-6 col-lg-4">
          <DashboardCard
            title="Total de Ocorrências Registradas"
            value={dadosDashboard.totalOcorrencias}
            icon="bi bi-shield-fill-check"
          />
        </div>
        <div className="col-md-6 col-lg-4">
          <DashboardCard
            title="Ocorrências de Alto Grau"
            value={dadosDashboard.ocorrenciasAltoGrau}
            color="#E53E3E"
            icon="bi bi-bell-fill"
          />
        </div>
      </div>

      {/* Gráficos */}
      <div className="row g-4">
        <div className="col-md-6">
          <BarChartComponent
            title="Ocorrências por Grau"
            labels={dadosDashboard.grausLabels}
            data={dadosDashboard.grausData}
            dataKey="Ocorrências"
          />
        </div>

        <div className="col-md-6">
          <LineChartComponent
            title="Evolução Temporal das Denúncias"
            labels={dadosDashboard.evolucaoLabels.length > 0 ? dadosDashboard.evolucaoLabels : ["Sem dados"]}
            data={dadosDashboard.evolucaoData.length > 0 ? dadosDashboard.evolucaoData : [0]}
          />
        </div>

        <div className="col-md-6">
          <PieChartComponent
            title="Tipos de golpe/fraude mais comuns"
            data={dadosDashboard.tiposFraudeData}
          />
        </div>
        <div className="col-md-6">
          <BarChartComponent
            title="Faixa etária das vítimas"
            labels={Object.keys(dadosDashboard.idadesPorFaixa)}
            data={Object.values(dadosDashboard.idadesPorFaixa)}
            dataKey="Idade"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
