import { createSlice } from "@reduxjs/toolkit";
import {} from "../../../types/ethers-contracts/index";

interface IInitialState {
  
}

const initialState: IInitialState = {

};

const loadContracts = createSlice({
  name: "LoadContracts",
  initialState,
  reducers: {
    loadContract(state, action) {
      console.log("payload", action.payload);
      const {
        payload: {
          contractA,
         
        },
      } = action;
      if (contractA) {

      }
    },
  },
});

export const loadContractsReducer = loadContracts.reducer;
export const { loadContract } = loadContracts.actions;
