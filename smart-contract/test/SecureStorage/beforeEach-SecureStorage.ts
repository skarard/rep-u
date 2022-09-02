import { ethers } from "hardhat";

beforeEach(async function () {
  const ctx = this.test?.ctx;
  if (!ctx) return;

  this.secureStorageContract = await ctx.secureStorageFactory.deploy(
    "secureStorage",
    "SECSTOR"
  );
});
