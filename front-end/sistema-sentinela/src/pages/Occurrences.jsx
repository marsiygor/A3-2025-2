import React, { useState, useCallback, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import NewOccurrenceModal from "../components/NewOccurrenceModal";
import { Toast, ToastContainer } from "react-bootstrap";

const Occurrences = () => {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const itemsPerPage = 6;

  const fetchOcorrencias = useCallback(() => {
    fetch('/api/ocorrencias/')
      .then(response => response.json())
      .then(data => setOcorrencias(data))
      .catch(error => console.error('Error fetching occurrences:', error));
  }, []);

  useEffect(() => {
    fetchOcorrencias();
  }, [fetchOcorrencias]);

  const handleSuccess = () => {
    setShowToast(true);
    fetchOcorrencias();
  };

  const totalPages = Math.ceil(ocorrencias.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = ocorrencias.slice(
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
            <th style={{ color: "#6B7280", textAlign: "center" }}>ID</th>
            <th style={{ color: "#6B7280", textAlign: "center" }}>Assunto</th>
            <th style={{ color: "#6B7280", textAlign: "center" }}>CPF/CNPJ</th>
            <th style={{ color: "#6B7280", textAlign: "center" }}>Grau</th>
            <th style={{ color: "#6B7280", textAlign: "center" }}>Data</th>
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
              <td>{o.numero_ocorrencia}</td>
              <td>{o.assunto}</td>
              <td>{o.cpf_cnpj_relacionado}</td>
              <td>{o.grau_da_ocorrencia}</td>
              <td>{new Date(o.data_criacao).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-3 text-muted">
        <span>
          Mostrando {startIndex + 1} a{" "}
          {Math.min(startIndex + itemsPerPage, ocorrencias.length)} de{" "}
          {ocorrencias.length} ocorrências
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
        onSuccess={handleSuccess}
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
