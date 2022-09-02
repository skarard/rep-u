import { ethers } from "hardhat";

export default function suite() {
  let ctx: Mocha.Context;
  before(async function () {
    const context = this.test?.ctx;
    if (context) ctx = context;
  });

  it("should test", async () => {});
}
