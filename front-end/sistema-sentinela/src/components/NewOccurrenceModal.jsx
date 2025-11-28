import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import InputMask from "react-input-mask";
import { useRef } from "react";

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
/>;

const NewOccurrenceModal = ({ show, onHide, onSuccess, mode, data }) => {
  const [step, setStep] = useState(1);
  const [unidades, setUnidades] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isCreate = mode === "create";
  const disabled = isView;
  const url = isEdit ? `/api/ocorrencias/${data.guid}/` : `/api/ocorrencias/`;
  const method = isEdit ? "PUT" : "POST";
  const dateInputRef = useRef(null);

  const [formData, setFormData] = useState({
    nome: "",
    cpfCnpj: "",
    email: "",
    telefone: "",
    assunto: "",
    tipoFraude: "",
    dataNascimento: "",
    descricao: "",
    grau: "BAIXO",
    arquivos: [],
  });

  useEffect(() => {
    if (isCreate) {
      setFormData({
        nome: "",
        cpfCnpj: "",
        email: "",
        telefone: "",
        assunto: "",
        tipoFraude: "",
        dataNascimento: "",
        descricao: "",
        grau: "BAIXO",
        arquivos: [],
      });
      setStep(1);
      return;
    }

    if ((isView || isEdit) && data) {
      setFormData({
        nome: data.nome || "",
        cpfCnpj: data.cpf_cnpj_relacionado || "",
        email: data.email || "",
        telefone: data.telefone || "",
        assunto: data.assunto || "",
        tipoFraude: data.tipo_fraude || "",
        dataNascimento: data.data_nascimento || "",
        descricao: data.descricao || "",
        grau: data.grau_da_ocorrencia || "BAIXO",
        arquivos: [],
      });
    }

    setStep(1);
  }, [show, mode, data]);

  useEffect(() => {
    if (show) {
      fetch("/api/unidadedenegocio/")
        .then((res) => res.json())
        .then((data) => setUnidades(data))
        .catch((err) => console.error("Erro ao buscar unidades:", err));
    }
  }, [show]);

  const handleChange = (e) => {
    if (disabled) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, arquivos: files }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Validação básica
      if (!formData.assunto || !formData.descricao) {
        alert("Por favor, preencha os campos obrigatórios.");
        setIsSubmitting(false);
        return;
      }

      if (!formData.tipoFraude) {
        alert("Por favor, selecione o tipo de fraude.");
        setIsSubmitting(false);
        return;
      }

      // Payload para o backend
      const payload = {
        unidade_de_negocio: unidades.length > 0 ? unidades[0].guid : null,
        cpf_cnpj_relacionado: formData.cpfCnpj.replace(/\D/g, ""),
        assunto: formData.assunto,
        tipo_fraude: formData.tipoFraude,
        data_nascimento: formData.dataNascimento || null,
        grau_da_ocorrencia: formData.grau,
        descricao: formData.descricao,
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        fraudante_utilizou_ia: false,
      };

      if (!payload.unidade_de_negocio) {
        alert(
          "Nenhuma Unidade de Negócio encontrada para vincular a ocorrência."
        );
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        if (onSuccess) onSuccess();
        onHide();
        // Reset form
        setFormData({
          nome: "",
          cpfCnpj: "",
          email: "",
          telefone: "",
          assunto: "",
          tipoFraude: "",
          dataNascimento: "",
          descricao: "",
          grau: "BAIXO",
          arquivos: [],
        });
        setStep(1);
      } else {
        const errorData = await response.json();
        console.error("Erro ao salvar:", errorData);
        alert("Erro ao salvar ocorrência. Verifique o console.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão ao salvar ocorrência.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#0A2342" }}>
          {isView && "Visualizar Ocorrência"}
          {isEdit && "Editar Ocorrência"}
          {isCreate && "Nova Ocorrência"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Stepper visual simples */}
        <div className="d-flex justify-content-between mb-4 position-relative">
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "0",
              right: "0",
              height: "2px",
              backgroundColor: "#E5E7EB",
              zIndex: 0,
            }}
          />
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: step >= s ? "#38B4A6" : "#fff",
                border: step >= s ? "none" : "2px solid #E5E7EB",
                color: step >= s ? "#fff" : "#6B7280",
                fontWeight: "bold",
                zIndex: 1,
              }}
            >
              {s}
            </div>
          ))}
        </div>

        <Form>
          {step === 1 && (
            <>
              <h5 className="mb-3" style={{ color: "#0A2342" }}>
                Dados do Denunciante
              </h5>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formNome">
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Seu nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      disabled={disabled}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCpfCnpj">
                    <Form.Label>CPF/CNPJ</Form.Label>
                    <InputMask
                      mask="999.999.999-99"
                      value={formData.cpfCnpj}
                      onChange={handleChange}
                      disabled={disabled}
                    >
                      {(inputProps) => (
                        <Form.Control
                          {...inputProps}
                          type="text"
                          placeholder="000.000.000-00"
                          name="cpfCnpj"
                          disabled={disabled}
                        />
                      )}
                    </InputMask>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="exemplo@email.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={disabled}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formTelefone">
                    <Form.Label>Telefone</Form.Label>
                    <InputMask
                      mask="(99) 99999-9999"
                      value={formData.telefone}
                      onChange={handleChange}
                      disabled={disabled}
                    >
                      {(inputProps) => (
                        <Form.Control
                          {...inputProps}
                          type="text"
                          placeholder="(00) 00000-0000"
                          name="telefone"
                          disabled={disabled}
                        />
                      )}
                    </InputMask>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formDataNascimento">
                    <Form.Label>Data de Nascimento</Form.Label>

                    <div style={{ position: "relative" }}>
                      <Form.Control
                        type="date"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        disabled={disabled}
                        ref={dateInputRef}
                      />

                      <i
                        className="bi bi-calendar-date"
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: disabled ? "#b1b4baff" : "#646766ff",
                        }}
                        onClick={() => dateInputRef.current.showPicker()}
                      ></i>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          {step === 2 && (
            <>
              <h5 className="mb-3" style={{ color: "#0A2342" }}>
                Detalhes da Ocorrência
              </h5>
              <Form.Group className="mb-3" controlId="formAssunto">
                <Form.Label>Assunto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Resumo do ocorrido"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTipoFraude">
                <Form.Label>Tipo de Fraude</Form.Label>
                <Form.Select
                  name="tipoFraude"
                  value={formData.tipoFraude}
                  onChange={handleChange}
                  disabled={disabled}
                >
                  <option value="">Selecione...</option>
                  <option value="Phishing">Phishing</option>
                  <option value="Roubo de Identidade">
                    Roubo de Identidade
                  </option>
                  <option value="Cartão Clonado">Cartão Clonado</option>
                  <option value="Boleto Falso">Boleto Falso</option>
                  <option value="Engenharia Social">Engenharia Social</option>
                  <option value="Invasão de Conta">Invasão de Conta</option>
                  <option value="Fraude no Pix">Fraude no Pix</option>
                  <option value="Outros">Outros</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescricao">
                <Form.Label>Descrição Detalhada</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Descreva o que aconteceu..."
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGrau">
                <Form.Label>Grau de Severidade</Form.Label>
                <div className="d-flex gap-3">
                  {["BAIXO", "MEDIO", "ALTO"].map((g) => (
                    <Form.Check
                      key={g}
                      type="radio"
                      label={g.charAt(0) + g.slice(1).toLowerCase()}
                      name="grau"
                      value={g}
                      checked={formData.grau === g}
                      onChange={handleChange}
                      id={`radio-${g}`}
                      disabled={disabled}
                    />
                  ))}
                </div>
              </Form.Group>
            </>
          )}

          {step === 3 && (
            <>
              <h5 className="mb-3" style={{ color: "#0A2342" }}>
                Anexos (Opcional)
              </h5>
              <div
                className="d-flex flex-column align-items-center justify-content-center p-5 border rounded"
                style={{
                  borderStyle: "dashed",
                  borderColor: "#D1D5DB",
                  backgroundColor: "#F9FAFB",
                }}
              >
                <i
                  className="bi bi-cloud-upload"
                  style={{ fontSize: "2rem", color: "#9CA3AF" }}
                ></i>
                <p className="text-muted mt-2">
                  Arraste arquivos ou clique para selecionar
                </p>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="fileInput"
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => document.getElementById("fileInput").click()}
                  disabled={disabled}
                >
                  Selecionar Arquivos
                </Button>
                {formData.arquivos.length > 0 && (
                  <div className="mt-3 w-100">
                    <h6>Arquivos selecionados:</h6>
                    <ul className="list-unstyled">
                      {formData.arquivos.map((file, index) => (
                        <li key={index} className="text-sm text-muted">
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: "none" }}>
        {step > 1 && (
          <Button variant="light" onClick={handleBack}>
            Voltar
          </Button>
        )}
        {isView ? (
          step < 3 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              style={{ backgroundColor: "#38B4A6", border: "none" }}
            >
              Próximo
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: "#38B4A6", border: "none" }}
              onClick={onHide}
            >
              Fechar
            </Button>
          )
        ) : step < 3 ? (
          <Button
            onClick={handleNext}
            style={{
              backgroundColor: "#38B4A6",
              border: "none",
            }}
          >
            Próximo
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              backgroundColor: "#38B4A6",
              border: "none",
            }}
          >
            {isSubmitting
              ? "Enviando..."
              : isEdit
              ? "Salvar"
              : "Enviar Denúncia"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default NewOccurrenceModal;
