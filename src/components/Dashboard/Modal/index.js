import React, { useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import ConfirmaActions from "../../../store/ducks/confirma";

import { format, parseISO } from "date-fns";

import { Button as Botao } from "../../globals";

import {
  ModalContent,
  Button,
  overlayStyle,
  contentStyle,
  User,
  Avatar,
  Infos,
  Name,
  Phone,
  Address,
  Parts,
  ShopBox,
  Price,
  DivAdress,
} from "./styles";

export default function DashboardModal({
  closeModal,
  openModal,
  data,
  dataPeca,
}) {
  const dispatch = useDispatch();
  const { data: mensagemConfirma } = useSelector((state) => state.confirmar);

  async function handleConfirma() {
    dispatch(ConfirmaActions.confirmaRequest(data?.cod_reserva));
  }

  useEffect(() => {
    if (mensagemConfirma !== null) {
      alert(mensagemConfirma);
      closeModal();
    }
  }, [mensagemConfirma]);

  return (
    <Modal
      onRequestClose={closeModal}
      isOpen={openModal}
      style={{
        overlay: overlayStyle,
        content: contentStyle,
      }}>
      <Button onClick={closeModal}>X</Button>
      <ModalContent>
        <User>
          <Avatar>
            <AiOutlineUser size={60} color="#000000" />
          </Avatar>
          <Infos>
            <Name>{data?.name}</Name>
            <Phone>Celular: {data?.celular}</Phone>
            <Phone>CPF: {data?.cpf}</Phone>
            <DivAdress>
              <Phone>Endereço</Phone>
              <Address>
                {data?.rua}, nº {data?.numero},{" "}
                {data?.complemento !== null ? `${data?.complemento}, ` : " "}
                {data?.bairro}
              </Address>
              <Address>
                {data?.cidade}, {data?.uf} - CEP: {data?.cep}
              </Address>
            </DivAdress>
          </Infos>
        </User>
        <Parts>
          <table>
            <thead>
              <tr>
                <th />
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th>Marca</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {dataPeca &&
                dataPeca.data.map((peca) => (
                  <tr key={peca.id}>
                    <td>
                      <img src={peca.foto} alt="" />
                    </td>
                    <td>{peca.titulo}</td>
                    <td>{peca.quantidade_reserva}</td>
                    <td>R$ {peca.valor}</td>
                    <td>{peca.marca}</td>
                    <td>R$ {peca.valor_reserva}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ShopBox>
            <Price>
              <h1>Total</h1>
              <h3>R$ {data?.total_reserva}</h3>
            </Price>
            {data?.confirma_venda !== 1 ? (
              <Botao
                btType="fuelYellow"
                label="CONFIRMAR"
                full
                action={() => handleConfirma()}
              />
            ) : (
              <Price>
                <h3>Venda Efetuada em:</h3>
                <h5>
                  {format(parseISO(data?.updated_at), "dd/MM/yyyy hh:mm:ss")}
                </h5>
              </Price>
            )}
          </ShopBox>
        </Parts>
      </ModalContent>
    </Modal>
  );
}
