import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error(
      "No deployer private key configured. Please set PRIVATE_KEY in your .env file."
    );
  }

  const chainId = 677;
  const rpcUrl = process.env.BOTCHAIN_RPC_URL || process.env.BOTCHAIN_MAINNET_RPC_URL || "https://rpc.botchain.ai";
  const tokenSymbol = "BOT";
  const networkName = "Botchain Mainnet";
  const explorerUrl = "https://scan.botchain.ai";

  console.log("==========================================");
  console.log(`Connecting to ${networkName} (Chain ID: ${chainId})...`);
  console.log(`RPC Endpoint: ${rpcUrl}`);

  const provider = new ethers.JsonRpcProvider(rpcUrl, {
    chainId: chainId,
    name: "botchainMainnet",
  });

  const formattedPk = privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`;
  const wallet = new ethers.Wallet(formattedPk, provider);

  console.log("Deployer address:", wallet.address);
  const balance = await provider.getBalance(wallet.address);
  console.log(`Deployer balance: ${ethers.formatEther(balance)} ${tokenSymbol}`);

  // Fetch real gas price and ensure minimal standard rate
  const feeData = await provider.getFeeData();
  const gasPrice = feeData.gasPrice || ethers.parseUnits("20", "gwei");
  console.log(`Gas price: ${ethers.formatUnits(gasPrice, "gwei")} gwei (standard network rate)`);
  console.log("==========================================");

  const artifactPath = path.join(__dirname, "../artifacts/contracts/MoodMark.sol/MoodMark.json");
  if (!fs.existsSync(artifactPath)) {
    throw new Error(`Compiled artifact not found at ${artifactPath}. Please run hardhat compile first.`);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);

  console.log("Deploying MoodMark contract to Botchain Mainnet...");
  const contract = await factory.deploy({
    gasPrice: gasPrice,
  });

  const txHash = contract.deploymentTransaction()?.hash;
  console.log("🚀 Transaction broadcasted! Tx hash:", txHash);
  if (txHash) {
    console.log(`🔍 View transaction: ${explorerUrl}/tx/${txHash}`);
  }
  console.log("Waiting for block confirmation on chain...");
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("==========================================");
  console.log("✅ MoodMark successfully deployed to:", contractAddress);
  console.log(`🔍 View on Explorer: ${explorerUrl}/address/${contractAddress}`);
  console.log("==========================================");

  // Save to deployed-contract.json
  const outputData = {
    address: contractAddress,
    network: "botchainMainnet",
    chainId: chainId,
    deployedAt: new Date().toISOString(),
    deployer: wallet.address,
    explorer: `${explorerUrl}/address/${contractAddress}`,
    txHash: txHash || "",
  };

  const outputPath = path.join(__dirname, "../src/config/deployed-contract.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
  console.log(`📁 Contract address saved to ${outputPath}`);

  // Update .env and .env.local with the new NEXT_PUBLIC_CONTRACT_ADDRESS
  updateEnvFile(path.join(__dirname, "../.env"), contractAddress);
  updateEnvFile(path.join(__dirname, "../.env.local"), contractAddress);
  console.log("📁 Updated NEXT_PUBLIC_CONTRACT_ADDRESS in .env and .env.local");
}

function updateEnvFile(filePath, address) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf8");
    if (content.includes("NEXT_PUBLIC_CONTRACT_ADDRESS=")) {
      content = content.replace(
        /NEXT_PUBLIC_CONTRACT_ADDRESS=.*/g,
        `NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`
      );
    } else {
      content += `\nNEXT_PUBLIC_CONTRACT_ADDRESS=${address}\n`;
    }
    fs.writeFileSync(filePath, content);
  }
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
