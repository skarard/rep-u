cd "..\smart-contract\
if not exist .\node_modules\ npm install
start "" npx hardhat node
call npx hardhat run .\scripts\deployLocal.ts --network localhost
cd "..\api\"
call npm run dev
