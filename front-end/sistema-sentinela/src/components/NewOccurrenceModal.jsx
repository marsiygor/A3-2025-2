import React, { useState, useMemo, useCallback } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

// Constantes do formulário
const INITIAL_FORM_STATE = {
  nome: "",
  cpfCnpj: "",
  dataNascimento: "",
  telefone: "",
  email: "",
  assunto: "",
  tipoFraude: "",
  grau: "",
  descricao: "",
};

const FRAUD_TYPES = ["Phishing", "Compra suspeita", "SMS", "Ligação suspeita"];
const SEVERITY_LEVELS = ["Baixo", "Médio", "Alto"];

const maskCpfCnpj = (value) => {
  const digitsOnly = value.replace(/\D/g, "");
  
  if (digitsOnly.length <= 11) {
    return digitsOnly
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2")
      .slice(0, 14);
  }
  
  return digitsOnly
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18);
};

const maskTelefone = (value) =>
  value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);

const validators = {
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  cpfCnpj: (value) => value.length === 14 || value.length === 18,
  telefone: (value) => value.length === 15,
};

const NewOccurrenceModal = ({ show, onHide, onSuccess }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [touchedFields, setTouchedFields] = useState({});

  // Validação do formulário (memoizada para performance)
  const isFormValid = useMemo(() => {
    return (
      formData.nome.trim() &&
      formData.dataNascimento &&
      formData.assunto.trim() &&
      formData.tipoFraude &&
      formData.grau &&
      formData.descricao.trim() &&
      validators.email(formData.email) &&
      validators.cpfCnpj(formData.cpfCnpj) &&
      validators.telefone(formData.telefone)
    );
  }, [formData]);

  const handleChange = useCallback((fieldName, fieldValue) => {
    const fieldMasks = {
      cpfCnpj: maskCpfCnpj,
      telefone: maskTelefone,
    };

    const maskedValue = fieldMasks[fieldName] 
      ? fieldMasks[fieldName](fieldValue) 
      : fieldValue;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: maskedValue,
    }));
  }, []);

  const handleBlur = useCallback((fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setTouchedFields({});
  }, []);

  const handleSubmit = useCallback(() => {
    if (!isFormValid) return;

    onSuccess(formData);
    onHide();
    resetForm();
  }, [isFormValid, formData, onSuccess, onHide, resetForm]);

  const handleModalHide = useCallback(() => {
    resetForm();
    onHide();
  }, [resetForm, onHide]);

  const getFieldError = useCallback((fieldName) => {
    if (!touchedFields[fieldName]) return false;

    switch (fieldName) {
      case "email":
        return !validators.email(formData.email);
      case "cpfCnpj":
        return !validators.cpfCnpj(formData.cpfCnpj);
      case "telefone":
        return !validators.telefone(formData.telefone);
      case "nome":
      case "assunto":
      case "descricao":
        return !formData[fieldName].trim();
      default:
        return !formData[fieldName];
    }
  }, [touchedFields, formData]);

  return (
    <Modal show={show} onHide={handleModalHide} centered size="lg">
      <Modal.Header closeButton>
        <div className="d-flex flex-column">
          <Modal.Title>Nova Ocorrência</Modal.Title>
          <small className="text-muted">Cadastre uma nova ocorrência</small>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex align-items-center gap-2 mb-3">
         <i class="bi bi-person-fill" style={{ color: "#38B4A6", fontSize: "20px" }}></i>
          <h6 className="mb-0" style={{ color: "#0A2342" }}>Dados do Contato Envolvido</h6>
        </div>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Nome Completo *</Form.Label>
                <Form.Control
                  value={formData.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  onBlur={() => handleBlur("nome")}
                  isInvalid={getFieldError("nome")}
                  placeholder="Nome completo"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>CPF/CNPJ *</Form.Label>
                <Form.Control
                  value={formData.cpfCnpj}
                  onChange={(e) => handleChange("cpfCnpj", e.target.value)}
                  onBlur={() => handleBlur("cpfCnpj")}
                  isInvalid={getFieldError("cpfCnpj")}
                  placeholder="000.000.000-00"
                />
                <Form.Control.Feedback type="invalid">
                  Digite um CPF/CNPJ válido.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Data de Nascimento *</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => handleChange("dataNascimento", e.target.value)}
                  onBlur={() => handleBlur("dataNascimento")}
                  isInvalid={getFieldError("dataNascimento")}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Telefone *</Form.Label>
                <Form.Control
                  value={formData.telefone}
                  onChange={(e) => handleChange("telefone", e.target.value)}
                  onBlur={() => handleBlur("telefone")}
                  isInvalid={getFieldError("telefone")}
                  placeholder="(11) 99999-9999"
                />
                <Form.Control.Feedback type="invalid">
                  Digite um telefone válido.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex align-items-center gap-2 mb-3 mt-4">
           <i class="bi bi-exclamation-triangle-fill" style={{ color: "#38B4A6", fontSize: "20px" }}></i>
            <h6 className="mb-0" style={{ color: "#0A2342" }}>Detalhes do Golpe / Fraude</h6>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              isInvalid={getFieldError("email")}
              placeholder="email@exemplo.com"
            />
            <Form.Control.Feedback type="invalid">
              Digite um e-mail válido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Assunto *</Form.Label>
            <Form.Control
              value={formData.assunto}
              onChange={(e) => handleChange("assunto", e.target.value)}
              onBlur={() => handleBlur("assunto")}
              isInvalid={getFieldError("assunto")}
              placeholder="Assunto da ocorrência"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Tipo de Fraude *</Form.Label>
                <Form.Select
                  value={formData.tipoFraude}
                  onChange={(e) => handleChange("tipoFraude", e.target.value)}
                  onBlur={() => handleBlur("tipoFraude")}
                  isInvalid={getFieldError("tipoFraude")}
                >
                  <option value="">Selecione...</option>
                  {FRAUD_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Grau da Ocorrência *</Form.Label>
                <Form.Select
                  value={formData.grau}
                  onChange={(e) => handleChange("grau", e.target.value)}
                  onBlur={() => handleBlur("grau")}
                  isInvalid={getFieldError("grau")}
                >
                  <option value="">Selecione...</option>
                  {SEVERITY_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Descrição *</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={formData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              onBlur={() => handleBlur("descricao")}
              isInvalid={getFieldError("descricao")}
              placeholder="Descreva detalhadamente a ocorrência..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          style={{
            backgroundColor: isFormValid ? "#38B4A6" : "#9cd8d1",
            border: "none",
          }}
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          Registrar Ocorrência
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewOccurrenceModal;
