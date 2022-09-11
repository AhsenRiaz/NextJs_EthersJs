import { createSlice } from "@reduxjs/toolkit";
import { NFT } from "../../../types/ethers-contracts/index";

interface IInitialState {
  nftRevealContract: NFT | null;
}

const initialState: IInitialState = {
  nftRevealContract: null,
};

const loadContracts = createSlice({
  name: "LoadContracts",
  initialState,
  reducers: {
    loadContract(state, action) {
      console.log("payload", action.payload);
      const {
        payload: { nftRevealContract },
      } = action;
      if (nftRevealContract) {
        state.nftRevealContract = nftRevealContract;
      }
    },
  },
});

export const loadContractsReducer = loadContracts.reducer;
export const { loadContract } = loadContracts.actions;
