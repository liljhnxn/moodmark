import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const { ethers } = hre;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error(
      "No deployer account configured. Please set PRIVATE_KEY in your .env file."
    );
  }

  console.log("==========================================");
  console.log("Deploying MoodMark contract to Botchain Testnet...");
  console.log("Deployer address:", deployer.address);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance), "BOHR");
  console.log("==========================================");

  const MoodMark = await ethers.getContractFactory("MoodMark");
  const moodMark = await MoodMark.deploy();

  await moodMark.waitForDeployment();
  const contractAddress = await moodMark.getAddress();

  console.log("✅ MoodMark successfully deployed to:", contractAddress);
  console.log(`🔍 View on BohrScan: https://scan.bohr.life/address/${contractAddress}`);

  // Automatically write the contract address to a deployed-contract.json file
  // so frontend or scripts can easily pick it up
  const outputData = {
    address: contractAddress,
    network: "botchainTestnet",
    chainId: 968,
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
  };

  const outputPath = path.join(__dirname, "../src/config/deployed-contract.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
  console.log(`📁 Contract address saved to ${outputPath}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
