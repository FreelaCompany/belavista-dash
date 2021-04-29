import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import ListActions from "../../store/ducks/produtos-list";
import CadastroProdutoActions from "../../store/ducks/produtos-cadastro";

import { useDispatch, useSelector } from "react-redux";
import { Form as UnForm } from "@unform/web";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import api from "../../services/api";

import { PageContainer } from "../../styles/components";

import {
  Container,
  TableHeader,
  ContainerInputFile,
  Arquivo,
  DivProdutos,
  Produto,
  ProdutoFunctions,
} from "./styles";

import Sidebar from "../../components/Sidebar";

export default function Produtos() {
  const [showCadastro, setShowCadastro] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [deleteIdProduto, setDeleteIdProduto] = useState(null);
  const [attach, setAttach] = useState(undefined);
  const [attachEdit, setAttachEdit] = useState(undefined);
  const [nomeProduto, setNomeProduto] = useState("");
  const [nomeProdutoSearch, setNomeProdutoSearch] = useState("");
  const inputRef = useRef(null);
  const inputRefEdit = useRef(null);
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [categoriaEdit, setCategoriaEdit] = useState(null);
  const [categoriaSearch, setCategoriaSearch] = useState(null);
  const [produtoEdit, setProdutoEdit] = useState(null);
  const [viewImage, setViewImage] = useState(null);

  const handleClose = () => setShowCadastro(false);
  const handleCloseEdit = () => setShowEditConfirm(false);
  const handleCloseView = () => setShowView(false);
  const handleShow = () => setShowCadastro(true);
  const dispatch = useDispatch();
  const { data: dataProdutos } = useSelector((state) => state.produtosList);
  const { loading, success, successDelete, successEdit } = useSelector(
    (state) => state.produtosCadastro
  );

  async function handleSearchData() {
    dispatch(ListActions.listRequest());
  }

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
    return inputRefEdit.current.click();
  }

  useEffect(() => {
    handleSearchData();
  }, [successEdit, successDelete, success, showDeleteConfirm]);

  function handleCategoria(id) {
    switch (id) {
      case 1:
        return "Sala de Jantar";
      case 2:
        return "Sala de Estar";
      case 3:
        return "Quarto";
      case 4:
        return "Iluminação";
      case 5:
        return "Escritório";
      case 6:
        return "Varanda";
      default:
        break;
    }
  }

  let listaFiltrada = dataProdutos?.filter(function (value) {
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

    if (nomeProdutoSearch.match(/^.*[^a-zA-Z 0-9]+.*$/g)) {
      return value.nome
        ?.toUpperCase()
        .includes(nomeProdutoSearch?.toUpperCase());
    } else {
      return semAcento
        ?.toUpperCase()
        .includes(nomeProdutoSearch?.toUpperCase());
    }
  });

  async function handleSubmit() {
    try {
      const formData = new FormData();

      formData.append("foto", attach);
      formData.append("nome", nomeProduto);
      formData.append("id_categoria", categoria);

      dispatch(CadastroProdutoActions.cadastroProdutoRequest(formData));
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleSubmitEdit() {
    try {
      const formData = new FormData();
      formData.append("id", produtoEdit.id_produto);
      formData.append("foto", attachEdit ? attachEdit : null);
      formData.append("nome", produtoEdit.nome);
      formData.append(
        "id_categoria",
        categoriaEdit ? categoriaEdit : produtoEdit.id_categoria
      );

      dispatch(CadastroProdutoActions.editProdutoRequest(formData));
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleEditConfirm(produto) {
    setProdutoEdit(produto);
    setShowEditConfirm(true);
  }

  function handleDeleteConfirm(id) {
    setDeleteIdProduto(id);
    setShowDeleteConfirm(true);
  }

  function handleView(img) {
    setViewImage(img);
    setShowView(true);
  }

  async function handleDelete(id) {
    try {
      dispatch(CadastroProdutoActions.deleteProdutoRequest(id));
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (success === true) {
      setShowCadastro(false);
      setAttach(undefined);
      dispatch(CadastroProdutoActions.initialState());
    }
  }, [success]);

  useEffect(() => {
    if (successDelete === true) {
      setShowDeleteConfirm(false);
      dispatch(CadastroProdutoActions.initialState());
    }
  }, [successDelete]);

  useEffect(() => {
    if (successEdit === true) {
      setShowEditConfirm(false);
      dispatch(CadastroProdutoActions.initialState());
    }
  }, [successEdit]);

  const getCategorias = async () => {
    try {
      const res = await api.get("/produtos/categorias");
      setCategorias(res?.data?.data);
    } catch (error) {
      console.log("categorias error", error?.response?.data);
    }
  };

  useEffect(() => {
    getCategorias();
  }, []);

  function handleEditInfo(text, chave) {
    text.persist();
    setProdutoEdit((state) => ({
      ...state,
      [chave]: text.target.value,
    }));
  }

  const produtosFiltrados = listaFiltrada?.filter((lista) =>
    categoriaSearch && categoriaSearch !== "Selecione..."
      ? lista.id_categoria === parseInt(categoriaSearch)
      : lista.id_categoria !== 7
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
                onChange={(text) => setNomeProdutoSearch(text.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ width: "30%" }}>
              <Form.Label style={{ color: "#000" }}>Categoria</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) => setCategoriaSearch(event.target.value)}>
                <option>Selecione...</option>
                {categorias.map((categoria) => (
                  <option
                    key={categoria.id_categoria}
                    value={categoria.id_categoria}>
                    {handleCategoria(categoria.id_categoria)}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <Button variant="primary" onClick={handleShow}>
            Novo Produto
          </Button>
        </TableHeader>
        <DivProdutos
          alinha={
            listaFiltrada?.length < 4 || produtosFiltrados?.length < 4
              ? "flex-start"
              : "space-between"
          }>
          {produtosFiltrados?.map((produto, index) => (
            <Produto
              margin={
                listaFiltrada?.length < 4 || produtosFiltrados?.length < 4
                  ? "7px 18px"
                  : "7px 0"
              }
              foto={produto.foto}>
              <ProdutoFunctions className="produtoFunctions">
                <AiOutlineEdit
                  size={30}
                  onClick={() => handleEditConfirm(produto)}
                />
                <AiOutlineDelete
                  size={30}
                  onClick={() => handleDeleteConfirm(produto.id_produto)}
                />
                <AiOutlineEye
                  size={30}
                  onClick={() => handleView(produto.foto)}
                />
              </ProdutoFunctions>
            </Produto>
          ))}
        </DivProdutos>
      </Container>

      <Modal show={showView} onHide={handleCloseView} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>Vizualização</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img style={{ margin: "0 auto" }} src={viewImage} alt="" />
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
            Tem certeza que deseja deletar esse Produto?
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
            onClick={() => handleDelete(deleteIdProduto)}>
            {loading ? "Deletando.." : "Sim"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCadastro} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>Novo Produto</Modal.Title>
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
                  onChange={(text) => setNomeProduto(text.target.value)}
                />
              </Form.Group>
            </div>
            <Form.Group controlId="formBasicPassword">
              <ContainerInputFile>
                <label htmlFor={"aquivo"}>{"Imagem do Produto"}</label>
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
                justifyContent: "space-between",
              }}>
              <Form.Group style={{ width: "48%" }}>
                <Form.Label style={{ color: "#000" }}>Categoria</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) => setCategoria(event.target.value)}>
                  <option>Selecione...</option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.id_categoria}
                      value={categoria.id_categoria}>
                      {categoria.nome}
                    </option>
                  ))}
                </Form.Control>
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
          <Modal.Title style={{ color: "#000" }}>Editar Produto</Modal.Title>
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
                  value={produtoEdit?.nome}
                  onChange={(text) => handleEditInfo(text, "nome")}
                />
              </Form.Group>
            </div>
            <Form.Group controlId="formBasicPassword">
              <ContainerInputFile>
                <label htmlFor={"aquivo"}>{"Imagem do Produto"}</label>
                <Arquivo>
                  <span>
                    {attachEdit
                      ? attachEdit.name
                      : produtoEdit
                      ? produtoEdit.foto
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
              {produtoEdit && attachEdit === undefined ? (
                <img
                  style={{
                    color: "#000",
                    width: "150px",
                    backgroundColor: "#eee",
                    marginTop: "16px",
                    borderRadius: "5px",
                    height: "150px",
                  }}
                  alt=""
                  src={produtoEdit.foto}
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
                justifyContent: "space-between",
              }}>
              <Form.Group style={{ width: "48%" }}>
                <Form.Label style={{ color: "#000" }}>Categoria</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) => setCategoriaEdit(event.target.value)}>
                  {produtoEdit ? (
                    <option>{handleCategoria(produtoEdit.id_categoria)}</option>
                  ) : (
                    ""
                  )}
                  <option>Selecione...</option>
                  {categorias
                    .filter(
                      (cat) => cat.id_categoria !== produtoEdit?.id_categoria
                    )
                    .map((categoria) => (
                      <option
                        key={categoria.id_categoria}
                        value={categoria.id_categoria}>
                        {handleCategoria(categoria.id_categoria)}
                      </option>
                    ))}
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
