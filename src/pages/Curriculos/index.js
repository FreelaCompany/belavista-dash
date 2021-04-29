import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import ListCurriculosActions from "../../store/ducks/curriculos-list";

import { useDispatch, useSelector } from "react-redux";

import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { format, parseISO } from "date-fns";

import TableScrollbar from "react-table-scrollbar";

import { PageContainer } from "../../styles/components";

import { Container, TableHeader } from "./styles";

import Sidebar from "../../components/Sidebar";

export default function Banner() {
  const dispatch = useDispatch();
  const { data: dataCurriculos, successDelete, loadingDelete } = useSelector(
    (state) => state.curriculosList
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [curriculoId, setCurriculoId] = useState(null);

  async function handleListCurriculos() {
    dispatch(ListCurriculosActions.listCurriculosRequest());
  }

  useEffect(() => {
    handleListCurriculos();
  }, [successDelete]);

  function handleDeleteConfirm(news) {
    setCurriculoId(news);
    setShowDeleteConfirm(true);
  }

  async function handleDelete(id) {
    try {
      dispatch(ListCurriculosActions.deleteCurriculosRequest(id));
    } catch (err) {
      console.log(err.message);
    }
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
              {dataCurriculos?.map((curriculo, index) => (
                <tr key={index}>
                  <td>{curriculo.nome}</td>
                  <td>{curriculo.email}</td>
                  <td>{curriculo.telefone}</td>
                  <td>
                    {format(parseISO(curriculo.data_cadastro), "dd/MM/yyyy")}
                  </td>
                  <td>
                    <div>
                      <Button>
                        <a
                          href={curriculo.curriculo}
                          target="_blank"
                          rel="noopener noreferrer">
                          Baixar currículo
                        </a>
                      </Button>
                      <AiOutlineDelete
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteConfirm(curriculo.id_curriculo)
                        }
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
            Tem certeza que deseja deletar esse currículo?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}>
            Não
          </Button>
          <Button variant="primary" onClick={() => handleDelete(curriculoId)}>
            {loadingDelete ? "Deletando.." : "Sim"}
          </Button>
        </Modal.Footer>
      </Modal>
    </PageContainer>
  );
}
