import { combineReducers } from "redux";
import { loadContractsReducer } from "./slices/loadContracts/loadContracts";

const parentReducer = combineReducers({
  loadContractsReducer,
});

export default parentReducer;
