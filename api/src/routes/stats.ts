import express from "express";
import { signer } from "../components/web3";
import env from "../env";

const router = express.Router();

router.get("/stats", async (req, res) => {
  res.json({ status: "operational", signer: signer.address });
});

export default router;
