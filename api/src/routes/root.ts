import { ethers } from "ethers";
import express from "express";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { contract, signer } from "../components/web3";
import { Claim } from "../types/claim";

const router = express.Router();

router.post("/root", async (req, res) => {
  const { sig, claims } = req.body;

  const msg = "";
  const address = ethers.utils.verifyMessage(msg, sig);

  const invalidClaims =
    claims
      .map((claim: Claim) => verifyClaim(address, claim))
      .filter((valid: boolean) => !valid) > 0;

  if (invalidClaims) res.status(401).send();

  const leaves = [].concat(
    ...claims.map((claim: Claim) =>
      claim.operators.map(operator =>
        ethers.utils.solidityKeccak256(
          ["address", "bytes"],
          [operator, claim.data],
        ),
      ),
    ),
  );

  const merkleTree = new MerkleTree(leaves, keccak256);

  const tx = await contract.connect(signer).setRoot(merkleTree.getHexRoot());
  res.json({ txHash: tx.txHash });
});

function verifyClaim(address: string, claim: Claim): boolean {
  if (!address || !claim?.data) return false;
  return true;
}

export default router;
