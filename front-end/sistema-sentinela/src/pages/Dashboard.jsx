import React, { useMemo } from "react";
import DashboardCard from "../components/DashboardCard";
import BarChartComponent from "../components/Charts/BarChart";
import LineChartComponent from "../components/Charts/LineChart";
import PieChartComponent from "../components/Charts/PieChartComponent";
import { Bar } from "recharts";

function Dashboard() {
  const dadosDashboard = useMemo(() => {
    const ocorrenciasMock = [
      {
        grau: "Alto",
        nome: "Maria Silva Santos",
        cpfCnpj: "123.456.789-00",
        email: "maria.santos@email.com",
        tipoFraude: "Compra suspeita",
        dataNascimento: "1990-05-15",
      },
      {
        grau: "Alto",
        nome: "TechCorp Ltda",
        cpfCnpj: "12.345.678/0001-90",
        email: "contato@techcorp.com",
        tipoFraude: "Phishing",
        dataNascimento: "1985-03-22",
      },
      {
        grau: "Médio",
        nome: "Carlos Eduardo Lima",
        cpfCnpj: "987.654.321-11",
        email: "carlos.lima@email.com",
        tipoFraude: "Ligação suspeita",
        dataNascimento: "1992-11-30",
      },
      {
        grau: "Médio",
        nome: "Fernanda Rodrigues",
        cpfCnpj: "456.789.123-22",
        email: "fernanda.rodrigues@email.com",
        tipoFraude: "SMS",
        dataNascimento: "1988-07-14",
      },
      {
        grau: "Baixo",
        nome: "Inovação S.A.",
        cpfCnpj: "98.765.432/0001-10",
        email: "financeiro@inovacao.com",
        tipoFraude: "Phishing",
        dataNascimento: "1975-01-01",
      },
      {
        grau: "Baixo",
        nome: "TechData Ltda",
        cpfCnpj: "33.456.789/0001-45",
        email: "suporte@techdata.com",
        tipoFraude: "Compra suspeita",
        dataNascimento: "1980-09-09",
      },
      {
        grau: "Alto",
        nome: "Ana Costa",
        cpfCnpj: "321.654.987-00",
        email: "ana.costa@email.com",
        tipoFraude: "Phishing",
        dataNascimento: "1995-02-20",
      },
      {
        grau: "Médio",
        nome: "Global Systems",
        cpfCnpj: "78.654.321/0001-22",
        email: "contato@globalsys.com",
        tipoFraude: "SMS",
        dataNascimento: "1990-11-11",
      },
      {
        grau: "Baixo",
        nome: "Roberto Mendes",
        cpfCnpj: "654.987.321-00",
        email: "roberto.mendes@email.com",
        tipoFraude: "Ligação suspeita",
        dataNascimento: "1982-03-30",
      },
      {
        grau: "Alto",
        nome: "SecureTech",
        cpfCnpj: "22.111.222/0001-33",
        email: "contato@securetech.com",
        tipoFraude: "Phishing",
        dataNascimento: "1993-08-08",
      },
      {
        grau: "Alto",
        nome: "Maria Silva Santos",
        cpfCnpj: "123.456.789-00",
        email: "maria.santos@email.com",
        tipoFraude: "Compra suspeita",
        dataNascimento: "2004-05-15",
      },
    ];

    const totalOcorrencias = ocorrenciasMock.length;

    const ocorrenciasAltoGrau = ocorrenciasMock.filter(
      (o) => o.grau === "Alto"
    ).length;

    // faz contagem por tipo de fraude
    const tiposFraudeCount = ocorrenciasMock.reduce((acc, o) => {
      acc[o.tipoFraude] = (acc[o.tipoFraude] || 0) + 1;
      return acc;
    }, {});

    // converter para formato usado no gráfico de pizza
    const tiposFraudeData = Object.entries(tiposFraudeCount).map(
      ([name, value]) => ({ name, value })
    );

    // faz contagem por grau para barras
    const grausCount = ocorrenciasMock.reduce((acc, o) => {
      acc[o.grau] = (acc[o.grau] || 0) + 1;
      return acc;
    }, {});

    const grausLabels = Object.keys(grausCount);
    const grausData = Object.values(grausCount);

    // idades médias
    const currentYear = new Date().getFullYear();
    const idades = ocorrenciasMock.map(
      (o) => currentYear - new Date(o.dataNascimento).getFullYear()
    );

    const idadesPorFaixa = {
      "18-29": idades.filter((i) => i >= 18 && i <= 29).length,
      "30-44": idades.filter((i) => i >= 30 && i <= 44).length,
      "45-59": idades.filter((i) => i >= 45 && i <= 59).length,
      "60+": idades.filter((i) => i >= 60).length,
    };

    return {
      totalOcorrencias,
      ocorrenciasAltoGrau,
      tiposFraudeData,
      grausLabels,
      grausData,
      idadesPorFaixa,
    };
  }, []);

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
            labels={["Sem 1", "Sem 2", "Sem 3", "Sem 4"]}
            data={[2, 4, 6, 10]} // Exemplo fixo, pois o mock não tem datas
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
