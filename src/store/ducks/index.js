import { combineReducers } from "redux";
import { reducer as auth } from "./auth";
import { reducer as cadastro } from "./cadastro";
import { reducer as confirmar } from "./confirma";
import { reducer as produtosList } from "./produtos-list";
import { reducer as produtosCadastro } from "./produtos-cadastro";
import { reducer as bannerList } from "./banner-list";
import { reducer as bannerCadastro } from "./banner-cadastro";
import { reducer as curriculosList } from "./curriculos-list";
import { reducer as arquitetosList } from "./arquitetos-list";
import { reducer as arquitetosCadastro } from "./arquitetos-cadastro";
import { reducer as ambientesList } from "./ambientes-list";
import { reducer as ambientesCadastro } from "./ambientes-cadastro";

const reducers = combineReducers({
  auth,
  cadastro,
  confirmar,
  produtosList,
  produtosCadastro,
  bannerList,
  bannerCadastro,
  curriculosList,
  arquitetosList,
  arquitetosCadastro,
  ambientesList,
  ambientesCadastro,
});

export default reducers;
