import { ethers } from "ethers";
import express from "express";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { contract } from "../components/web3";
import { Claim } from "../types/claim";

const router = express.Router();

router.post("/proof", async (req, res) => {
  const { sig, claims, operator, question } = req.body;

  const msg = "";
  const address = ethers.utils.verifyMessage(msg, sig);

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
  const root = await contract.getRoot(address);

  if (merkleTree.getHexRoot() !== root) return res.status(401);

  const proof = merkleTree.getHexProof(
    ethers.utils.solidityKeccak256(["address", "bytes"], [operator, question]),
  );

  res.json({ proof });
});

export default router;
