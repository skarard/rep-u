import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { SecureStorage, SecureStorage__factory } from "../../typechain";

declare module "mocha" {
  export interface Context {
    owner: SignerWithAddress;
    signer: SignerWithAddress;
    approved: SignerWithAddress;
    admin: SignerWithAddress;
    mod: SignerWithAddress;
    user1: SignerWithAddress;
    user2: SignerWithAddress;
    user3: SignerWithAddress;
    user4: SignerWithAddress;
    user5: SignerWithAddress;
    user6: SignerWithAddress;
    user7: SignerWithAddress;
    user8: SignerWithAddress;
    user9: SignerWithAddress;
    nullAddress: string;
    secureStorageFactory: SecureStorage__factory;
    secureStorageContract: SecureStorage;
  }
}
