import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ListBannerActions from "../../store/ducks/banner-list";
import CadastroBannerActions from "../../store/ducks/banner-cadastro";

import { useDispatch, useSelector } from "react-redux";
import { Form as UnForm } from "@unform/web";

import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { format, parseISO } from "date-fns";

import TableScrollbar from "react-table-scrollbar";

import { PageContainer } from "../../styles/components";

import { Container, TableHeader, ContainerInputFile, Arquivo } from "./styles";

import Sidebar from "../../components/Sidebar";

export default function Banner() {
  const [showCadastro, setShowCadastro] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [deleteIdBanner, setDeleteIdBanner] = useState(null);
  const [attach, setAttach] = useState(undefined);
  const [attachMobile, setAttachMobile] = useState(undefined);
  const [attachEdit, setAttachEdit] = useState(undefined);
  const [attachMobileEdit, setAttachMobileEdit] = useState(undefined);
  const [linkBanner, setLinkBanner] = useState("");
  const [linkBannerEdit, setLinkBannerEdit] = useState("");
  const [bannerId, setBannerId] = useState(null);
  const [bannerEdit, setBannerEdit] = useState(null);
  const inputRef = useRef(null);
  const inputRefMobile = useRef(null);
  const inputRefEdit = useRef(null);
  const inputRefMobileEdit = useRef(null);

  const handleClose = () => setShowCadastro(false);
  const handleShow = () => setShowCadastro(true);
  const handleCloseEdit = () => setShowEditConfirm(false);
  const handleShowEdit = () => setShowEditConfirm(true);
  const dispatch = useDispatch();
  const { data: dataBanner } = useSelector((state) => state.bannerList);
  const { loading, success, successDelete, successEdit } = useSelector(
    (state) => state.bannerCadastro
  );

  async function handleListBanner() {
    dispatch(ListBannerActions.listBannerRequest());
  }

  useEffect(() => {
    handleListBanner();
  }, [successEdit, successDelete, success]);

  function handleChange(event) {
    setAttach(event.target.files[0]);
  }

  function handleFile() {
    return inputRef.current.click();
  }

  function handleChangeMobile(event) {
    setAttachMobile(event.target.files[0]);
  }

  function handleFileMobile() {
    return inputRefMobile.current.click();
  }

  function handleChangeEdit(event) {
    setAttachEdit(event.target.files[0]);
  }

  function handleFileEdit() {
    return inputRef.current.click();
  }

  function handleChangeMobileEdit(event) {
    setAttachMobileEdit(event.target.files[0]);
  }

  function handleFileMobileEdit() {
    return inputRefMobile.current.click();
  }

  async function handleSubmit() {
    try {
      const formData = new FormData();

      formData.append("banner", attach);
      formData.append("banner_mobile", attachMobile);
      formData.append("link", linkBanner);

      dispatch(CadastroBannerActions.cadastroBannerRequest(formData));
    } catch (err) {
      return err.message;
    }
  }

  async function handleSubmitEdit() {
    try {
      const formData = new FormData();

      formData.append("id", bannerId);
      formData.append("banner", attachEdit ? attachEdit : null);
      formData.append(
        "banner_mobile",
        attachMobileEdit ? attachMobileEdit : null
      );
      formData.append(
        "link",
        linkBannerEdit !== "" ? linkBannerEdit : bannerEdit.link
      );

      dispatch(CadastroBannerActions.editBannerRequest(formData));
    } catch (err) {
      return err.message;
    }
  }

  function handleEditConfirm(banner) {
    setLinkBanner(banner.link);
    setBannerId(banner.id_banner);
    setBannerEdit(banner);
    setShowEditConfirm(true);
  }

  function handleDeleteConfirm(id) {
    setDeleteIdBanner(id);
    setShowDeleteConfirm(true);
  }

  async function handleDelete(id) {
    try {
      dispatch(CadastroBannerActions.deleteBannerRequest(id));
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

  return (
    <PageContainer>
      <Sidebar />
      <Container>
        <TableHeader>
          <Button variant="primary" onClick={handleShow}>
            Novo Banner
          </Button>
        </TableHeader>
        <TableScrollbar rows={8} className="scrollTable">
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Banner</th>
                <th style={{ textAlign: "center" }}>Banner Mobile</th>
                <th>Link</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dataBanner?.map((banner, index) => (
                <tr key={index}>
                  <td className="tdImage">
                    <img src={banner.banner} alt="" />
                  </td>
                  <td className="tdImage">
                    <img src={banner.banner_mobile} alt="" />
                  </td>
                  <td>{banner.link === "null" ? "-" : banner.link}</td>
                  <td>
                    {format(parseISO(banner.data_cadastro), "dd/MM/yyyy")}
                  </td>
                  <td>
                    <div>
                      <AiOutlineEdit
                        size={25}
                        style={{ cursor: "pointer", marginLeft: "7px" }}
                        onClick={() => handleEditConfirm(banner)}
                      />
                      <AiOutlineDelete
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteConfirm(banner.id_banner)}
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
            Tem certeza que deseja deletar esse banner?
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
            onClick={() => handleDelete(deleteIdBanner)}>
            {loading ? "Deletando.." : "Sim"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCadastro} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>Novo Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnForm onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="formBasicPassword">
              <ContainerInputFile>
                <label htmlFor={"aquivo"}>{"Banner"}</label>
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
            <Form.Group controlId="formBasicPassword">
              <ContainerInputFile>
                <label htmlFor={"aquivoMobile"}>{"Banner Mobile"}</label>
                <Arquivo>
                  <span>
                    {attachMobile
                      ? attachMobile.name
                      : "Nenhum arquivo selecionado"}
                  </span>
                  <input
                    className="arquivo"
                    type="file"
                    id={"aquivoMobile"}
                    name={"aquivoMobile"}
                    ref={inputRefMobile}
                    defaultValue={""}
                    onChange={handleChangeMobile}
                    accept=".jpg,.jpeg,.png"
                  />
                  <button type="button" onClick={handleFileMobile}>
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
                <Form.Label style={{ color: "#000" }}>Link</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(text) => setLinkBanner(text.target.value)}
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
          <Modal.Title style={{ color: "#000" }}>Editar Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnForm onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="formBasicPassword">
              <ContainerInputFile>
                <label htmlFor={"aquivo"}>{"Banner"}</label>
                <Arquivo>
                  <span>
                    {attachEdit
                      ? attachEdit.name
                      : bannerEdit
                      ? bannerEdit.banner
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
              {bannerEdit && attachEdit === undefined ? (
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
                  src={bannerEdit.banner}
                />
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <ContainerInputFile>
                <label htmlFor={"aquivoMobile"}>{"Banner Mobile"}</label>
                <Arquivo>
                  <span>
                    {attachMobileEdit
                      ? attachMobileEdit.name
                      : bannerEdit
                      ? bannerEdit.banner_mobile
                      : "Nenhum arquivo selecionado"}
                  </span>
                  <input
                    className="arquivo"
                    type="file"
                    id={"aquivoMobile"}
                    name={"aquivoMobile"}
                    ref={inputRefMobileEdit}
                    defaultValue={""}
                    onChange={handleChangeMobileEdit}
                    accept=".jpg,.jpeg,.png"
                  />
                  <button type="button" onClick={handleFileMobileEdit}>
                    Selecionar
                  </button>
                </Arquivo>
              </ContainerInputFile>
              {bannerEdit && attachMobileEdit === undefined ? (
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
                  src={bannerEdit.banner_mobile}
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
                <Form.Label style={{ color: "#000" }}>Link</Form.Label>
                <Form.Control
                  type="text"
                  value={bannerEdit?.link === "null" ? "-" : bannerEdit?.link}
                  onChange={(text) => setLinkBannerEdit(text.target.value)}
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
