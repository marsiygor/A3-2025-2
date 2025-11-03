import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const NewOccurrenceModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <div className="d-flex flex-column">
          <Modal.Title>Nova Ocorrência</Modal.Title>
          <span>Cadastre uma nova ocorrência</span>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-fill"
            viewBox="0 0 16 16"
            color="#38B4A6"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <h6 className="text-[#0A2342]">Dados do Contato Envolvido</h6>
        </div>

        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome completo"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>CPF/CNPJ</Form.Label>
                <Form.Control type="text" placeholder="000.000.000-00" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Telefone</Form.Label>
                <Form.Control type="text" placeholder="(11) 99999-9999" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="email@exemplo.com" />
          </Form.Group>

          <div className="d-flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-exclamation-triangle-fill"
              viewBox="0 0 16 16"
            color="#38B4A6"
            >
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <h6 className="text-[#0A2342]">Detalhes do Golpe / Fraude</h6>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Assunto</Form.Label>
            <Form.Control
              type="text"
              maxLength={100}
              placeholder="Resumo da ocorrência (máx. 100 caracteres)"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Tipo de Fraude</Form.Label>
                <Form.Select>
                  <option>Selecione...</option>
                  <option>Phishing</option>
                  <option>Compra suspeita</option>
                  <option>SMS</option>
                  <option>Ligação suspeita</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Grau da Ocorrência</Form.Label>
                <Form.Select>
                  <option>Selecione...</option>
                  <option>Baixo</option>
                  <option>Médio</option>
                  <option>Alto</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Descrição do Contato sobre o Golpe</Form.Label>
            <Form.Control as="textarea" rows={4} maxLength={4000} placeholder="Descreva detalhadamente o relato do contato sobre o golpe ou fraude (máx. 4000 caracteres)" />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button style={{ backgroundColor: "#38B4A6", border: "none" }} onClick={onHide}>
          Registrar Ocorrência
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewOccurrenceModal;
