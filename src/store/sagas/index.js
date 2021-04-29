import { all, takeLatest } from "redux-saga/effects";

// auth
import { AuthTypes } from "../ducks/auth";
import { login, logout } from "./auth";

//cadastro
import { CadastroTypes } from "../ducks/cadastro";
import { cadastro } from "./cadastro";

//confirma
import { ConfirmaTypes } from "../ducks/confirma";
import { confirma } from "./confirma";

//produtos
import { ListTypes } from "../ducks/produtos-list";
import { CadastroProdutoTypes } from "../ducks/produtos-cadastro";
import { list, cadastroProduto, deleteProduto, editProduto } from "./produtos";

//ambientes
import { ListAmbienteTypes } from "../ducks/ambientes-list";
import { CadastroAmbienteTypes } from "../ducks/ambientes-cadastro";
import {
  listAmbiente,
  cadastroAmbiente,
  deleteAmbiente,
  editAmbiente,
} from "./ambientes";

//arquitetos
import { ListArquitetoTypes } from "../ducks/arquitetos-list";
import { CadastroArquitetoTypes } from "../ducks/arquitetos-cadastro";
import {
  listArquiteto,
  cadastroArquiteto,
  deleteArquiteto,
  editArquiteto,
} from "./arquitetos";

//banner
import { ListBannerTypes } from "../ducks/banner-list";
import { CadastroBannerTypes } from "../ducks/banner-cadastro";
import { listBanner, cadastroBanner, deleteBanner, editBanner } from "./banner";

//contatos-list
import { ListContatosTypes } from "../ducks/contatos-list";
import { listContatos, deleteContatos } from "./contatos";

export default function* rootSaga() {
  yield all([
    // auth
    takeLatest(AuthTypes.LOGIN_REQUEST, login),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logout),

    //cadastro
    takeLatest(CadastroTypes.CADASTRO_REQUEST, cadastro),

    //confirma
    takeLatest(ConfirmaTypes.CONFIRMA_REQUEST, confirma),

    //produtos
    takeLatest(ListTypes.LIST_REQUEST, list),
    takeLatest(CadastroProdutoTypes.CADASTRO_PRODUTO_REQUEST, cadastroProduto),
    takeLatest(CadastroProdutoTypes.DELETE_PRODUTO_REQUEST, deleteProduto),
    takeLatest(CadastroProdutoTypes.EDIT_PRODUTO_REQUEST, editProduto),

    //arquitetos
    takeLatest(ListArquitetoTypes.LIST_ARQUITETO_REQUEST, listArquiteto),
    takeLatest(
      CadastroArquitetoTypes.CADASTRO_ARQUITETO_REQUEST,
      cadastroArquiteto
    ),
    takeLatest(
      CadastroArquitetoTypes.DELETE_ARQUITETO_REQUEST,
      deleteArquiteto
    ),
    takeLatest(CadastroArquitetoTypes.EDIT_ARQUITETO_REQUEST, editArquiteto),

    //ambientes
    takeLatest(ListAmbienteTypes.LIST_AMBIENTE_REQUEST, listAmbiente),
    takeLatest(
      CadastroAmbienteTypes.CADASTRO_AMBIENTE_REQUEST,
      cadastroAmbiente
    ),
    takeLatest(CadastroAmbienteTypes.DELETE_AMBIENTE_REQUEST, deleteAmbiente),
    takeLatest(CadastroAmbienteTypes.EDIT_AMBIENTE_REQUEST, editAmbiente),

    //banner
    takeLatest(ListBannerTypes.LIST_BANNER_REQUEST, listBanner),
    takeLatest(CadastroBannerTypes.CADASTRO_BANNER_REQUEST, cadastroBanner),
    takeLatest(CadastroBannerTypes.DELETE_BANNER_REQUEST, deleteBanner),
    takeLatest(CadastroBannerTypes.EDIT_BANNER_REQUEST, editBanner),

    //curriculos
    takeLatest(ListContatosTypes.LIST_CONTATOS_REQUEST, listContatos),
    takeLatest(ListContatosTypes.DELETE_CONTATOS_REQUEST, deleteContatos),
  ]);
}
