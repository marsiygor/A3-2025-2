import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import NewOccurrenceModal from "../components/NewOccurrenceModal";
import { Toast, ToastContainer } from "react-bootstrap";

const Occurrences = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const itemsPerPage = 6;

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
      nome: "Maria Silva Santos",
      cpfCnpj: "123.456.789-00",
      email: "maria.santos@email.com",
      tipoFraude: "Compra suspeita",
      dataNascimento: "2004-05-15",
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
  ];

  const totalPages = Math.ceil(ocorrenciasMock.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = ocorrenciasMock.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div>
      <div className="d-flex flex-column mb-4">
        <h2 style={{ color: "#0A2342" }}>Lista de Ocorrências</h2>
        <span style={{ color: "#4B5563" }}>Visualize todas as ocorrências</span>
      </div>
      <div className="d-flex justify-content-end mb-3">
        <Button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: "#38B4A6",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          Nova Ocorrência
        </Button>
      </div>

      <Table
        striped
        bordered={false}
        hover
        responsive
        className="align-middle text-start"
      >
        <thead>
          <tr>
            <th style={{ color: "#6B7280", textAlign: "center" }}>Grau</th>
            <th style={{ color: "#6B7280", textAlign: "center" }}>Nome</th>
            <th style={{ color: "#6B7280", textAlign: "center" }}>CPF/CNPJ</th>
            <th style={{ color: "#6B7280", textAlign: "center" }}>Email</th>
            <th style={{ color: "#6B7280", textAlign: "center" }}>
              Tipo Fraude
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map((o, i) => (
            <tr
              key={i}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <td>{o.grau}</td>
              <td>{o.nome}</td>
              <td>{o.cpfCnpj}</td>
              <td>{o.email}</td>
              <td>{o.tipoFraude}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-3 text-muted">
        <span>
          Mostrando {startIndex + 1} a{" "}
          {Math.min(startIndex + itemsPerPage, ocorrenciasMock.length)} de{" "}
          {ocorrenciasMock.length} contatos
        </span>

        <div>
          <button
            className="btn btn-light btn-sm me-1"
            onClick={goToPrevious}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`btn btn-sm me-1`}
              style={{
                backgroundColor: currentPage === i + 1 ? "#38B4A6" : "#fff",
                color: currentPage === i + 1 ? "#fff" : "#000",
                border: currentPage === i + 1 ? "none" : "1px solid #ccc",
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-light btn-sm"
            onClick={goToNext}
            disabled={currentPage === totalPages}
          >
            Próximo
          </button>
        </div>
      </div>

      <NewOccurrenceModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSuccess={() => setShowToast(true)}
      />
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">
            Ocorrência registrada com sucesso!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Occurrences;
