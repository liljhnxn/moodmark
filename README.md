# MoodMark ✨

> A minimal, fast, and modern Web3 dApp to record and inspect daily moods on the **Botchain Mainnet** blockchain.

---

## 1. Project Overview

**MoodMark** allows users to connect their Web3 wallet, select their current emotional state from 9 expressive moods, and permanently record it onto the Botchain Mainnet blockchain.

Users can view their current on-chain mood at any time and inspect the recorded mood of any other wallet address directly from the smart contract without reliance on centralized databases or external indexing APIs.

---

## 2. Features

- **Wallet Connection**: Seamless connection with MetaMask, Rabby, and other injected Web3 wallets via Wagmi v2 & Viem.
- **Botchain Mainnet Integration**: Automatic chain detection (Chain ID: `677`), network status badge, and network-switching prompt.
- **Immutable Mood Recording**:
  - 9 moods: Happy (`0` 😊), Okay (`1` 😐), Sad (`2` 😔), Excited (`3` 🤩), Tired (`4` 😴), Cool (`5` 😎), Angry (`6` 😡), Loved (`7` 🥰), Anxious (`8` 😰).
  - Emits the `MoodUpdated` event upon saving or updating.
  - Rejects invalid mood values and prevents redundant contract interactions while a transaction is pending.
- **Transaction Tracking**: Live status (wallet signature prompt, block confirmation) and direct links to the BotScan block explorer (`https://scan.botchain.ai/tx/0x...`).
- **My Mood Dashboard**: Live retrieval of the connected wallet's saved mood from the smart contract with direct link to view account on BotScan.
- **Look Up Another Wallet**: Search any valid EVM/Botchain wallet address to check their recorded mood in real-time directly from the smart contract with explorer view.
- **Modern Dark UI**: Designed with Tailwind CSS, sleek dark aesthetics, purple/blue gradient accents, and responsive layout.

---

## 3. Technology Stack

- **Smart Contract & Tooling**:
  - Solidity `^0.8.20`
  - Hardhat & Ethers.js
  - Mocha & Chai for unit tests
- **Frontend & Web3 Integration**:
  - Next.js (App Router, React 19)
  - TypeScript
  - Tailwind CSS v4
  - [Wagmi v2](https://wagmi.sh)
  - [Viem](https://viem.sh)
  - [@tanstack/react-query](https://tanstack.com/query)
  - Lucide React (Icons)

---

## 4. Blockchain Network Details (Botchain Mainnet)

| Parameter | Value |
|---|---|
| **Network Name** | Botchain Mainnet |
| **Chain ID** | `677` |
| **Native Token** | BOT |
| **Total Supply** | 150 Million |
| **RPC Endpoint** | [https://rpc.botchain.ai](https://rpc.botchain.ai) |
| **Block Explorer** | [https://scan.botchain.ai](https://scan.botchain.ai) |
| **Deployed Contract** | [`0xc7BffE6d09c808043F09AD12398528350B11539B`](https://scan.botchain.ai/address/0xc7BffE6d09c808043F09AD12398528350B11539B) |

---

## 5. Getting Started & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- A Web3 wallet browser extension (e.g., MetaMask, Rabby)

### Installation
Clone the repository and install dependencies:
```bash
npm install
```

---

## 6. Running the Smart Contract Tests

Run the complete test suite to verify all contract logic, state transitions, validation, and event emissions:

```bash
npm test
```

### Test Coverage:
1. `An unset wallet is correctly identified`
2. `A wallet can save Happy`
3. `A wallet can save Okay`
4. `A wallet can save Sad`
5. `A wallet can update its mood`
6. `Invalid mood values are rejected`
7. `The MoodUpdated event is emitted correctly`
8. `Different wallets can save different moods`

---

## 7. How to Deploy the Smart Contract

### Step 1: Prepare Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Open `.env` and set your deployer private key:
```env
BOTCHAIN_RPC_URL=https://rpc.botchain.ai
PRIVATE_KEY=your_private_key_without_0x
```
*(Ensure your deployer account has BOT tokens for gas fees).*

### Step 2: Run the Deployment Script
```bash
npm run deploy
```

Upon success, the script outputs the deployed contract address and saves it to `src/config/deployed-contract.json`:
```text
✅ MoodMark successfully deployed to: 0xc7BffE6d09c808043F09AD12398528350B11539B
🔍 View on Explorer: https://scan.botchain.ai/address/0xc7BffE6d09c808043F09AD12398528350B11539B
```

### Verified Live Contract (Mainnet):
- **Contract Address**: `0xc7BffE6d09c808043F09AD12398528350B11539B`
- **Block Explorer**: [BotScan Contract View](https://scan.botchain.ai/address/0xc7BffE6d09c808043F09AD12398528350B11539B)
- **Deployment Transaction**: [`0x34c05b8ca629acdec3c46f17a0041dec9906691cdca099c92339697f119adfcf`](https://scan.botchain.ai/tx/0x34c05b8ca629acdec3c46f17a0041dec9906691cdca099c92339697f119adfcf)

---

## 8. How to Configure the Contract Address in the Frontend

To connect the Next.js frontend to your deployed contract:

1. Configure `.env.local`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xc7BffE6d09c808043F09AD12398528350B11539B
```
2. Restart the Next.js development server if it was already running.

---

## 9. How to Run the Frontend Locally

Start the Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To verify a production build locally:
```bash
npm run build
npm start
```

---

## 10. How to Deploy the Frontend to Vercel

1. **Push to GitHub / GitLab / Bitbucket**:
   Commit your code and push it to your remote repository.

2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your MoodMark repository.
   - Framework Preset will automatically detect **Next.js**.

3. **Configure Environment Variables in Vercel**:
   Under **Settings > Environment Variables**, add:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`: `0xc7BffE6d09c808043F09AD12398528350B11539B`

4. **Deploy**:
   Click **"Deploy"**. Vercel will build and host your Web3 dApp with automatic SSL and global CDN distribution.

---

## 11. Security & Best Practices

- **Zero Secrets in Git**: `.env` and sensitive files are strictly excluded by `.gitignore`.
- **Minimal Surface**: 9 moods, gas-optimized, no external centralized dependencies.
- **Safe Wallet Interactions**: Uses modern Viem / Wagmi standards with typed contract ABIs.
