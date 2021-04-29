import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import ListAmbienteActions from "../../store/ducks/ambientes-list";
import CadastroAmbienteActions from "../../store/ducks/ambientes-cadastro";
import api from "../../services/api";

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
  NomeAmbiente,
  DescricaoAmbiente,
  DropzoneExt,
  ContainerInputFile,
  Arquivo,
  DivFotos,
} from "./styles";

import TableScrollbar from "react-table-scrollbar";

import Sidebar from "../../components/Sidebar";

export default function Ambientes({ history }) {
  const [showCadastro, setShowCadastro] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [deleteIdAmbiente, setDeleteIdAmbiente] = useState(null);
  const [nomeAmbiente, setNomeAmbiente] = useState("");
  const [nomeAmbienteSearch, setNomeAmbienteSearch] = useState("");
  const [descricaoAmbiente, setDescricaoAmbiente] = useState("");
  const [ambienteEdit, setAmbienteEdit] = useState(null);
  const [filesCadastro, setFilesCadastro] = useState([]);
  const [attach, setAttach] = useState(undefined);
  const [attachEdit, setAttachEdit] = useState(undefined);
  const [decisao, setDecisao] = useState("");
  const inputRef = useRef(null);
  const inputRefEdit = useRef(null);

  const [arquitetos, setArquitetos] = useState([]);
  const [arquitetoSearch, setArquitetoSearch] = useState(null);
  const [arquiteto, setArquiteto] = useState(null);
  const [arquitetoEdit, setArquitetoEdit] = useState(null);
  const [fotos, setFotos] = useState([]);

  const handleClose = () => setShowCadastro(false);
  const handleCloseEdit = () => setShowEditConfirm(false);
  const handleCloseView = () => setShowView(false);
  const handleShow = () => setShowCadastro(true);
  const dispatch = useDispatch();
  const { data: dataAmbientes } = useSelector((state) => state.ambientesList);
  const { loading, success, successDelete, successEdit } = useSelector(
    (state) => state.ambientesCadastro
  );

  async function handleSearchData() {
    dispatch(ListAmbienteActions.listAmbienteRequest());
  }

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      setFilesCadastro(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    padding: 20,
  };

  const thumb = {
    position: "relative",
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const thumbs = filesCadastro.map((file, index) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      filesCadastro.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [filesCadastro]
  );

  useEffect(() => {
    handleSearchData();
  }, [successEdit, successDelete, success, showDeleteConfirm]);

  let listaFiltrada = dataAmbientes?.filter(function (value) {
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

    let semAcento = removerAcentos(value.nome_ambiente);

    if (nomeAmbienteSearch.match(/^.*[^a-zA-Z 0-9]+.*$/g)) {
      return value.nome_ambiente
        ?.toUpperCase()
        .includes(nomeAmbienteSearch?.toUpperCase());
    } else {
      return semAcento
        ?.toUpperCase()
        .includes(nomeAmbienteSearch?.toUpperCase());
    }
  });

  function handleChange(event) {
    setAttach(event.target.files[0]);
  }

  function handleFile() {
    return inputRef.current.click();
  }

  function handleChangeEdit(event) {
    setAttachEdit(event.target.files[0]);
  }

  function handleFileEdit() {
    return inputRef.current.click();
  }

  async function handleSubmit() {
    try {
      const formData = new FormData();

      formData.append("nome", nomeAmbiente);
      formData.append("descricao", descricaoAmbiente);
      for (var x = 0; x < filesCadastro.length; x++) {
        formData.append("fileToUpload[]", filesCadastro[x]);
      }
      formData.append(
        "id_arquiteto",
        history?.location?.state?.idArquiteto
          ? history?.location?.state?.idArquiteto
          : arquiteto
      );
      formData.append("fotoCapa", attach);

      dispatch(CadastroAmbienteActions.cadastroAmbienteRequest(formData));
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleSubmitEdit() {
    try {
      const formData = new FormData();
      formData.append("id_ambiente", ambienteEdit.id_ambiente);
      formData.append("nome", ambienteEdit.nome_ambiente);
      formData.append("descricao", ambienteEdit.descricao_ambiente);
      for (var x = 0; x < filesCadastro.length; x++) {
        formData.append("fileToUpload[]", filesCadastro[x]);
      }
      formData.append(
        "id_arquiteto",
        history?.location?.state?.idArquiteto
          ? history?.location?.state?.idArquiteto
          : arquitetoEdit
          ? arquitetoEdit
          : ambienteEdit?.id_arquiteto
      );
      formData.append("fotoCapa", attachEdit);
      formData.append("decisao", decisao);

      dispatch(CadastroAmbienteActions.editAmbienteRequest(formData));
    } catch (err) {
      console.log(err.message);
    }
  }

  const getArquitetos = async () => {
    try {
      const res = await api.get("/arquiteto");
      setArquitetos(res?.data?.data);
    } catch (error) {
      console.log("arquitetos error", error?.response?.data);
    }
  };

  const getFotos = async () => {
    try {
      const res = await api.get(
        `/ambiente/fotos?idAmbiente=${ambienteEdit.id_ambiente}`
      );
      setFotos(res?.data?.data);
    } catch (error) {
      console.log("arquitetos error", error?.response?.data);
    }
  };

  useEffect(() => {
    getArquitetos();
  }, []);

  function handleEditConfirm(ambiente) {
    setAmbienteEdit(ambiente);
    setShowEditConfirm(true);
  }

  function handleDeleteConfirm(id) {
    setDeleteIdAmbiente(id);
    setShowDeleteConfirm(true);
  }

  function handleView(ambiente) {
    setAmbienteEdit(ambiente);
    setShowView(true);
  }

  useEffect(() => {
    getFotos();
  }, [ambienteEdit]);

  async function handleDelete(id) {
    try {
      dispatch(CadastroAmbienteActions.deleteAmbienteRequest(id));
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (success === true) {
      setShowCadastro(false);
    }
  }, [success]);

  useEffect(() => {
    if (successDelete === true) {
      setShowDeleteConfirm(false);
    }
  }, [successDelete]);

  useEffect(() => {
    if (successEdit === true) {
      setShowEditConfirm(false);
    }
  }, [successEdit]);

  function handleEditInfo(text, chave) {
    text.persist();
    setAmbienteEdit((state) => ({
      ...state,
      [chave]: text.target.value,
    }));
  }

  const ambientesFiltrados = listaFiltrada?.filter((lista) =>
    arquitetoSearch && arquitetoSearch !== "Selecione..."
      ? lista.id_arquiteto === parseInt(arquitetoSearch)
      : lista.id_arquiteto !== arquitetos.length
  );
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
                onChange={(text) => setNomeAmbienteSearch(text.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ width: "30%" }}>
              <Form.Label style={{ color: "#000" }}>Arquiteto</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) => setArquitetoSearch(event.target.value)}>
                <option>Selecione...</option>
                {arquitetos.map((arquiteto) => (
                  <option
                    key={arquiteto.id_arquiteto}
                    value={arquiteto.id_arquiteto}>
                    {arquiteto.nome}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <Button variant="primary" onClick={handleShow}>
            Novo Ambiente
          </Button>
        </TableHeader>
        <TableScrollbar rows={8} className="scrollTable">
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {ambientesFiltrados?.map((ambiente, index) => (
                <tr key={index}>
                  <td>{ambiente.nome_ambiente}</td>
                  <td>{ambiente.descricao_ambiente}</td>
                  <td>
                    <div>
                      <AiOutlineEdit
                        size={25}
                        style={{ cursor: "pointer", marginLeft: "7px" }}
                        onClick={() => handleEditConfirm(ambiente)}
                      />
                      <AiOutlineDelete
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteConfirm(ambiente.id_ambiente)
                        }
                      />
                      <AiOutlineEye
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleView(ambiente)}
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
          <NomeAmbiente>{ambienteEdit?.nome_ambiente}</NomeAmbiente>
          <img src={ambienteEdit?.foto} alt="" />
          <DescricaoAmbiente>
            {ambienteEdit?.descricao_ambiente}
          </DescricaoAmbiente>
          <DivFotos>
            {fotos.map((foto, index) => (
              <img key={index} src={foto.foto} alt="" />
            ))}
          </DivFotos>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseView}>
            Close
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
            Tem certeza que deseja deletar esse Ambiente?
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
            onClick={() => handleDelete(deleteIdAmbiente)}>
            {loading ? "Deletando.." : "Sim"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCadastro} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>Novo Ambiente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnForm onSubmit={handleSubmit} encType="multipart/form-data">
            {history?.location?.state?.idArquiteto ? (
              <p>ID do Arquiteto: {history?.location?.state?.idArquiteto}</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}>
                <Form.Group style={{ width: "48%" }}>
                  <Form.Label style={{ color: "#000" }}>Arquiteto</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(event) => setArquiteto(event.target.value)}>
                    <option>Selecione...</option>
                    {arquitetos.map((arquiteto) => (
                      <option
                        key={arquiteto.id_arquiteto}
                        value={arquiteto.id_arquiteto}>
                        {arquiteto.nome}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
            )}
            <Form.Group controlId="formBasicPassword">
              <ContainerInputFile>
                <label htmlFor={"aquivo"}>{"Foto de Capa"}</label>
                <Arquivo>
                  <span>
                    {attach ? attach.name : "Nenhum arquivo selecionado"}
                  </span>
                  <input
                    className="arquivo"
                    type="file"
                    id={"aquivo"}
                    name={"aquivo"}
                    ref={inputRef}
                    defaultValue={""}
                    onChange={handleChange}
                    accept=".jpg,.jpeg,.png"
                  />
                  <button type="button" onClick={handleFile}>
                    Selecionar
                  </button>
                </Arquivo>
              </ContainerInputFile>
            </Form.Group>
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
                  onChange={(text) => setNomeAmbiente(text.target.value)}
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
                  rows={6}
                  onChange={(text) => setDescricaoAmbiente(text.target.value)}
                />
              </Form.Group>
            </div>
            <DropzoneExt className="dropzoneExt">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                {acceptedFiles.length ? (
                  <aside style={thumbsContainer}>{thumbs}</aside>
                ) : (
                  <>
                    <p>
                      Arraste arquivos para esta área ou click aqui para
                      selecionar os arquivos
                    </p>
                    <em>(Somente images *.jpeg e *.png serão aceitas)</em>
                  </>
                )}
              </div>
            </DropzoneExt>
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
          <Modal.Title style={{ color: "#000" }}>Editar Ambiente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnForm onSubmit={handleSubmitEdit} encType="multipart/form-data">
            {history?.location?.state?.idArquiteto ? (
              <p>{history?.location?.state?.idArquiteto}</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}>
                <Form.Group style={{ width: "48%" }}>
                  <Form.Label style={{ color: "#000" }}>Arquiteto</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(event) => setArquitetoEdit(event.target.value)}>
                    {ambienteEdit && (
                      <option value={ambienteEdit?.id_arquiteto}>
                        {ambienteEdit?.nome_arquiteto}
                      </option>
                    )}
                    <option>Selecione...</option>
                    {arquitetos.map((arquiteto) => (
                      <option
                        key={arquiteto.id_arquiteto}
                        value={arquiteto.id_arquiteto}>
                        {arquiteto.nome}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
            )}
            <Form.Group controlId="formBasicPassword">
              <ContainerInputFile>
                <label htmlFor={"aquivo"}>{"Foto de Capa"}</label>
                <Arquivo>
                  <span>
                    {attachEdit
                      ? attachEdit.name
                      : "Nenhum arquivo selecionado"}
                  </span>
                  <input
                    className="arquivo"
                    type="file"
                    id={"aquivo"}
                    name={"aquivo"}
                    ref={inputRefEdit}
                    defaultValue={""}
                    onChange={handleChangeEdit}
                    accept=".jpg,.jpeg,.png"
                  />
                  <button type="button" onClick={handleFileEdit}>
                    Selecionar
                  </button>
                </Arquivo>
              </ContainerInputFile>
              {ambienteEdit && attachEdit === undefined ? (
                <img
                  style={{
                    color: "#000",
                    width: "150px",
                    backgroundColor: "#eee",
                    marginTop: "16px",
                    borderRadius: "5px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                  alt=""
                  src={ambienteEdit.foto}
                />
              ) : (
                ""
              )}
            </Form.Group>
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
                  value={ambienteEdit?.nome_ambiente}
                  onChange={(text) => handleEditInfo(text, "nome_ambiente")}
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
                  value={ambienteEdit?.descricao_ambiente}
                  rows={6}
                  onChange={(text) =>
                    handleEditInfo(text, "descricao_ambiente")
                  }
                />
              </Form.Group>
            </div>
            <DropzoneExt className="dropzoneExt">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                {acceptedFiles.length ? (
                  <aside style={thumbsContainer}>{thumbs}</aside>
                ) : (
                  <>
                    <p>
                      Arraste arquivos para esta área ou click aqui para
                      selecionar os arquivos
                    </p>
                    <em>(Somente images *.jpeg e *.png serão aceitas)</em>
                  </>
                )}
              </div>
            </DropzoneExt>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}>
              <Form.Group style={{ width: "48%" }}>
                <Form.Label style={{ color: "#000" }}>
                  Deseja adicionar mais fotos ou trocá-las?
                </Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) => setDecisao(event.target.value)}>
                  <option>Selecione...</option>
                  <option value="adicionar">Adicionar</option>
                  <option value="trocar">Trocar</option>
                </Form.Control>
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
