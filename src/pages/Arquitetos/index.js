import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import ListArquitetoActions from "../../store/ducks/arquitetos-list";
import CadastroArquitetoActions from "../../store/ducks/arquitetos-cadastro";

import { useDispatch, useSelector } from "react-redux";
import { Form as UnForm } from "@unform/web";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import { PageContainer } from "../../styles/components";

import {
  Container,
  TableHeader,
  NomeArquiteto,
  RedesSociais,
  DescricaoArquiteto,
} from "./styles";

import TableScrollbar from "react-table-scrollbar";

import Sidebar from "../../components/Sidebar";
import { useHistory } from "react-router";

export default function Arquitetos() {
  const [showCadastro, setShowCadastro] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [showArquitetoConfirm, setShowArquitetoConfirm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [deleteIdArquiteto, setDeleteIdArquiteto] = useState(null);
  const [nomeArquiteto, setNomeArquiteto] = useState("");
  const [instagramArquiteto, setInstagramArquiteto] = useState("");
  const [facebookArquiteto, setFacebookArquiteto] = useState("");
  const [nomeArquitetoSearch, setNomeArquitetoSearch] = useState("");
  const [descricaoArquiteto, setDescricaoArquiteto] = useState("");
  const [arquitetoEdit, setArquitetoEdit] = useState(null);

  const history = useHistory();

  const handleClose = () => setShowCadastro(false);
  const handleCloseEdit = () => setShowEditConfirm(false);
  const handleCloseView = () => setShowView(false);
  const handleShow = () => setShowCadastro(true);
  const dispatch = useDispatch();
  const { data: dataArquitetos } = useSelector((state) => state.arquitetosList);
  const { data: idArquitetoCadastrado } = useSelector(
    (state) => state.arquitetosCadastro
  );
  const { loading, success, successDelete, successEdit } = useSelector(
    (state) => state.arquitetosCadastro
  );

  async function handleSearchData() {
    dispatch(ListArquitetoActions.listArquitetoRequest());
  }

  useEffect(() => {
    handleSearchData();
  }, [successEdit, successDelete, success, showDeleteConfirm]);

  let listaFiltrada = dataArquitetos?.filter(function (value) {
    function removerAcentos(newStringComAcento) {
      var string = newStringComAcento;
      var mapaAcentosHex = {
        a: /[\xE0-\xE6]/g,
        e: /[\xE8-\xEB]/g,
        i: /[\xEC-\xEF]/g,
        o: /[\xF2-\xF6]/g,
        u: /[\xF9-\xFC]/g,
        c: /\xE7/g,
        n: /\xF1/g,
      };

      for (var letra in mapaAcentosHex) {
        var expressaoRegular = mapaAcentosHex[letra];
        string = string?.replace(expressaoRegular, letra);
      }

      return string;
    }

    let semAcento = removerAcentos(value.nome);

    if (nomeArquitetoSearch.match(/^.*[^a-zA-Z 0-9]+.*$/g)) {
      return value.nome
        ?.toUpperCase()
        .includes(nomeArquitetoSearch?.toUpperCase());
    } else {
      return semAcento
        ?.toUpperCase()
        .includes(nomeArquitetoSearch?.toUpperCase());
    }
  });

  async function handleSubmit() {
    try {
      const formData = new FormData();

      formData.append("nome", nomeArquiteto);
      formData.append("instagram", instagramArquiteto);
      formData.append("facebook", facebookArquiteto);
      formData.append("descricao", descricaoArquiteto);

      dispatch(CadastroArquitetoActions.cadastroArquitetoRequest(formData));
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleSubmitEdit() {
    try {
      const formData = new FormData();
      formData.append("id", arquitetoEdit.id_arquiteto);
      formData.append("nome", arquitetoEdit.nome);
      formData.append("instagram", arquitetoEdit.instagram);
      formData.append("facebook", arquitetoEdit.facebook);
      formData.append("descricao", arquitetoEdit.descricao);

      dispatch(CadastroArquitetoActions.editArquitetoRequest(formData));
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleEditConfirm(arquiteto) {
    setArquitetoEdit(arquiteto);
    setShowEditConfirm(true);
  }

  function handleArquiteto() {
    setShowArquitetoConfirm(false);
    history.push("/ambientes", { idArquiteto: idArquitetoCadastrado });
  }

  function handleDeleteConfirm(id) {
    setDeleteIdArquiteto(id);
    setShowDeleteConfirm(true);
  }

  function handleView(arquiteto) {
    setArquitetoEdit(arquiteto);
    setShowView(true);
  }

  async function handleDelete(id) {
    try {
      dispatch(CadastroArquitetoActions.deleteArquitetoRequest(id));
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (success === true) {
      setShowCadastro(false);
      dispatch(CadastroArquitetoActions.initialState());
    }
  }, [success]);

  useEffect(() => {
    if (idArquitetoCadastrado !== null) {
      setShowArquitetoConfirm(true);
    }
  }, [idArquitetoCadastrado]);

  useEffect(() => {
    if (successDelete === true) {
      setShowDeleteConfirm(false);
      dispatch(CadastroArquitetoActions.initialState());
    }
  }, [successDelete]);

  useEffect(() => {
    if (successEdit === true) {
      setShowEditConfirm(false);
      dispatch(CadastroArquitetoActions.initialState());
    }
  }, [successEdit]);

  function handleEditInfo(text, chave) {
    text.persist();
    setArquitetoEdit((state) => ({
      ...state,
      [chave]: text.target.value,
    }));
  }

  return (
    <PageContainer>
      <Sidebar />
      <Container>
        <TableHeader>
          <div style={{ display: "flex", flexDirection: "row", width: "80%" }}>
            <Form.Group style={{ width: "30%", marginRight: 20 }}>
              <Form.Label style={{ color: "#000" }}>Busca:</Form.Label>
              <Form.Control
                type="text"
                onChange={(text) => setNomeArquitetoSearch(text.target.value)}
              />
            </Form.Group>
          </div>
          <Button variant="primary" onClick={handleShow}>
            Novo Arquiteto
          </Button>
        </TableHeader>
        <TableScrollbar rows={8} className="scrollTable">
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Instagram</th>
                <th>Facebook</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada?.map((arquiteto, index) => (
                <tr key={index}>
                  <td>{arquiteto.nome}</td>
                  <td>{arquiteto.instagram}</td>
                  <td>{arquiteto.facebook}</td>
                  <td>
                    <div>
                      <AiOutlineEdit
                        size={25}
                        style={{ cursor: "pointer", marginLeft: "7px" }}
                        onClick={() => handleEditConfirm(arquiteto)}
                      />
                      <AiOutlineDelete
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteConfirm(arquiteto.id_arquiteto)
                        }
                      />
                      <AiOutlineEye
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleView(arquiteto)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableScrollbar>
      </Container>

      <Modal show={showView} onHide={handleCloseView} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>Vizualização</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NomeArquiteto>{arquitetoEdit?.nome}</NomeArquiteto>
          <RedesSociais>
            Instagram:{" "}
            <a href={arquitetoEdit?.instagram} target="_blank">
              {arquitetoEdit?.instagram}
            </a>
            - Facebook:
            <a href={arquitetoEdit?.facebook} target="_blank">
              {arquitetoEdit?.facebook}
            </a>
          </RedesSociais>
          <DescricaoArquiteto>{arquitetoEdit?.descricao}</DescricaoArquiteto>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showArquitetoConfirm}
        onHide={() => setShowArquitetoConfirm(false)}
        centered
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>
            Deseja cadastrar um ambiente para esse Arquiteto?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowArquitetoConfirm(false)}>
            Não
          </Button>
          <Button variant="primary" onClick={() => handleArquiteto()}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        centered
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>
            Tem certeza que deseja deletar esse Arquiteto?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}>
            Não
          </Button>
          <Button
            variant="primary"
            onClick={() => handleDelete(deleteIdArquiteto)}>
            {loading ? "Deletando.." : "Sim"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCadastro} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>Novo Arquiteto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnForm onSubmit={handleSubmit} encType="multipart/form-data">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}>
              <Form.Group style={{ width: "100%" }}>
                <Form.Label style={{ color: "#000" }}>Nome</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(text) => setNomeArquiteto(text.target.value)}
                />
              </Form.Group>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}>
              <Form.Group style={{ width: "100%" }}>
                <Form.Label style={{ color: "#000" }}>Instagram</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(text) => setInstagramArquiteto(text.target.value)}
                />
              </Form.Group>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}>
              <Form.Group style={{ width: "100%" }}>
                <Form.Label style={{ color: "#000" }}>Facebook</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(text) => setFacebookArquiteto(text.target.value)}
                />
              </Form.Group>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}>
              <Form.Group style={{ width: "100%" }}>
                <Form.Label style={{ color: "#000" }}>Descricao</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={(text) => setDescricaoArquiteto(text.target.value)}
                />
              </Form.Group>
            </div>
          </UnForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            {loading ? "Enviando.." : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditConfirm} onHide={handleCloseEdit} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>Editar Arquiteto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnForm onSubmit={handleSubmit} encType="multipart/form-data">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}>
              <Form.Group style={{ width: "100%" }}>
                <Form.Label style={{ color: "#000" }}>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={arquitetoEdit?.nome}
                  onChange={(text) => handleEditInfo(text, "nome")}
                />
              </Form.Group>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}>
              <Form.Group style={{ width: "100%" }}>
                <Form.Label style={{ color: "#000" }}>Instagram</Form.Label>
                <Form.Control
                  type="text"
                  value={arquitetoEdit?.instagram}
                  onChange={(text) => handleEditInfo(text, "instagram")}
                />
              </Form.Group>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}>
              <Form.Group style={{ width: "100%" }}>
                <Form.Label style={{ color: "#000" }}>Facebook</Form.Label>
                <Form.Control
                  type="text"
                  value={arquitetoEdit?.facebook}
                  onChange={(text) => handleEditInfo(text, "facebook")}
                />
              </Form.Group>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}>
              <Form.Group style={{ width: "100%" }}>
                <Form.Label style={{ color: "#000" }}>Descricao</Form.Label>
                <Form.Control
                  as="textarea"
                  value={arquitetoEdit?.descricao}
                  onChange={(text) => handleEditInfo(text, "descricao")}
                />
              </Form.Group>
            </div>
          </UnForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitEdit()}>
            {loading ? "Enviando.." : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </PageContainer>
  );
}
