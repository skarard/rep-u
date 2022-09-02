import { ethers, Wallet } from "ethers";
import env from "../env";
import secureStorage from "../abi/SecureStorage.json";

export const provider = new ethers.providers.JsonRpcProvider(
  env.ETHEREUM_RPC_PROVIDER,
);

export const contract = new ethers.Contract(
  env.CONTRACT_ADDRESS,
  secureStorage.abi,
  provider,
);

export const signer = new Wallet(env.SIGNER_PRIVATE_KEY, provider);
