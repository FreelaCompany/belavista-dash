import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import ListContatoActions from "../../store/ducks/contatos-list";

import { useDispatch, useSelector } from "react-redux";

import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { format, parseISO } from "date-fns";

import TableScrollbar from "react-table-scrollbar";

import { PageContainer } from "../../styles/components";

import {
  Container,
  TableHeader,
  NomeMensagem,
  DivContatos,
  Mensagem,
} from "./styles";

import Sidebar from "../../components/Sidebar";

export default function Contatos() {
  const dispatch = useDispatch();
  const { data: dataContatos, successDelete, loadingDelete } = useSelector(
    (state) => state.contatosList
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [contatoId, setContatoId] = useState(null);
  const [showView, setShowView] = useState(false);
  const [contatoView, setContatoView] = useState(null);

  const handleCloseView = () => setShowView(false);

  async function handleListContatos() {
    dispatch(ListContatoActions.listContatosRequest());
  }

  useEffect(() => {
    handleListContatos();
  }, [successDelete]);

  function handleDeleteConfirm(id) {
    setContatoId(id);
    setShowDeleteConfirm(true);
  }

  async function handleDelete(id) {
    try {
      dispatch(ListContatoActions.deleteContatosRequest(id));
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleView(contato) {
    setContatoView(contato);
    setShowView(true);
  }

  useEffect(() => {
    if (successDelete === true) {
      setShowDeleteConfirm(false);
    }
  }, [successDelete]);

  return (
    <PageContainer>
      <Sidebar />
      <Container>
        <TableHeader></TableHeader>
        <TableScrollbar rows={8} className="scrollTable">
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dataContatos?.map((contato, index) => (
                <tr key={index}>
                  <td>{contato.nome}</td>
                  <td>{contato.email}</td>
                  <td>{contato.telefone}</td>
                  <td>
                    {format(parseISO(contato.data_cadastro), "dd/MM/yyyy")}
                  </td>
                  <td>
                    <div>
                      <AiOutlineEye
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleView(contato)}
                      />
                      <AiOutlineDelete
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteConfirm(contato.id_contato)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableScrollbar>
      </Container>

      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        centered
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>
            Tem certeza que deseja deletar esse contato?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}>
            Não
          </Button>
          <Button variant="primary" onClick={() => handleDelete(contatoId)}>
            {loadingDelete ? "Deletando.." : "Sim"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showView} onHide={handleCloseView} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>Vizualização</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NomeMensagem>{contatoView?.nome}</NomeMensagem>
          <DivContatos>
            E-mail: {contatoView?.email} - Telefone: {contatoView?.telefone}
          </DivContatos>
          <Mensagem>{contatoView?.mensagem}</Mensagem>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </PageContainer>
  );
}
