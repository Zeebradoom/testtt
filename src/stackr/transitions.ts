import { Transitions, SolidityType } from "@stackr/sdk/machine";

import { BridgeState } from "./state";

const transferToken = BridgeState.STF({
  schema: {
    address: SolidityType.ADDRESS,
    amount: SolidityType.UINT,
    encryptedIntent: SolidityType.STRING,
  },
  handler: ({ state, inputs }) => {
    const accountIdx = state.findIndex(
      (account) => account.address === inputs.address
    );

    if (accountIdx === -1) {
      state.push({
        address: inputs.address,
        balance: inputs.amount,
        encryptedIntent: inputs.encryptedIntent,
      });
    } else {
      state[accountIdx].balance += inputs.amount;
    }

    return state;
  },
});

const saveIntent = BridgeState.STF({
  schema: {
    address: SolidityType.ADDRESS,
    amount: SolidityType.UINT,
    encryptedIntent: SolidityType.STRING,
  },
  handler: ({ state, inputs }) => {
    // Add new account with intent if not found
    state.push({
      address: inputs.address,
      balance: inputs.amount,
      encryptedIntent: inputs.encryptedIntent,
    });

    return state;
  },
});

const removeIntent = BridgeState.STF({
  schema: {
    address: SolidityType.ADDRESS,
  },
  handler: ({ state, inputs }) => {
    const accountIdx = state.findIndex(
      (account) => account.address === inputs.address
    );

    if (accountIdx !== -1) {
      // Remove the encryptedIntent for the account if found
      state[accountIdx].encryptedIntent = "";
    }

    return state;
  },
});

export const transitions: Transitions<BridgeState> = {
  transferToken,
  saveIntent,
  removeIntent,
};
