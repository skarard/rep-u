import * as dotenv from "dotenv";

dotenv.config();

function parseString(name: string): string[] {
  if (process.env[name]) return [name, process.env[name] as string];

  console.error(`No ${name} set`);
  process.exit(1);
}

function parseNumber(name: string): [string, number] {
  if (process.env[name]) return [name, Number(process.env[name])];

  console.error(`No ${name} set`);
  process.exit(1);
}

const vars = [
  parseString("ENV"),
  parseString("NETWORK"),
  parseString("ETHEREUM_RPC_PROVIDER"),
  parseString("CONTRACT_ADDRESS"),
  parseString("SIGNER_PRIVATE_KEY"),
];

export default Object.fromEntries(vars);
