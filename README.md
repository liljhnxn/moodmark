# MoodMark ✨

> A minimal, fast, and modern Web3 dApp to record and inspect daily moods on the **Botchain Testnet** blockchain.

---

## 1. Project Overview

**MoodMark** allows users to connect their Web3 wallet, select their current emotional state from three distinct moods (**Happy 😊**, **Okay 😐**, **Sad 😔**), and permanently record it onto the Botchain Testnet blockchain.

Users can view their current on-chain mood at any time and inspect the recorded mood of any other wallet address directly from the smart contract without reliance on centralized databases or external indexing APIs.

---

## 2. Features

- **Wallet Connection**: Seamless connection with MetaMask, Rabby, and other injected Web3 wallets via Wagmi v2 & Viem.
- **Botchain Testnet Integration**: Automatic chain detection (Chain ID: `968`), network status badge, and network-switching prompt.
- **Immutable Mood Recording**:
  - 9 moods: Happy (`0` 😊), Okay (`1` 😐), Sad (`2` 😔), Excited (`3` 🤩), Tired (`4` 😴), Cool (`5` 😎), Angry (`6` 😡), Loved (`7` 🥰), Anxious (`8` 😰).
  - Emits the `MoodUpdated` event upon saving or updating.
  - Rejects invalid mood values and prevents redundant contract interactions while a transaction is pending.
- **Transaction Tracking**: Live status (wallet signature prompt, block confirmation) and direct links to the BohrScan block explorer (`https://scan.bohr.life/tx/0x...`).
- **My Mood Dashboard**: Live retrieval of the connected wallet's saved mood from the smart contract. Clearly indicates when no mood has been set yet.
- **Look Up Another Wallet**: Search any valid EVM/Botchain wallet address to check their recorded mood in real-time directly from the smart contract.
- **Modern Dark UI**: Designed with Tailwind CSS, sleek dark aesthetics, purple/blue gradient accents, and responsive layout.

---

## 3. Technology Stack

- **Smart Contract & Tooling**:
  - Solidity `^0.8.20`
  - Hardhat
  - `@nomicfoundation/hardhat-toolbox`
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

## 4. Blockchain Network Details (Botchain Testnet)

| Parameter | Value |
|---|---|
| **Network Name** | Botchain Testnet |
| **Chain ID** | `968` |
| **Currency Name** | Bohr |
| **Currency Symbol** | `BOHR` |
| **RPC URL** | [https://rpc.bohr.life](https://rpc.bohr.life) |
| **Block Explorer** | [https://scan.bohr.life](https://scan.bohr.life) |

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

Run the complete Hardhat test suite to verify all contract logic, state transitions, validation, and event emissions:

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
BOTCHAIN_RPC_URL=https://rpc.bohr.life
PRIVATE_KEY=your_private_key_without_0x
```
*(Ensure your deployer account has testnet BOHR tokens for gas fees).*

### Step 2: Run the Deployment Script
```bash
npm run deploy
```

Upon success, the script outputs the deployed contract address and saves it to `src/config/deployed-contract.json`:
```text
✅ MoodMark successfully deployed to: 0x09b5556f6802DF6bDeB942E3286947d83F2b41b4
🔍 View on BohrScan: https://scan.bohr.life/address/0x09b5556f6802DF6bDeB942E3286947d83F2b41b4
```

### Verified Live Contract:
- **Contract Address**: `0x09b5556f6802DF6bDeB942E3286947d83F2b41b4`
- **Verified Source Code**: [BohrScan Verified Contract](https://scan.bohr.life/address/0x09b5556f6802DF6bDeB942E3286947d83F2b41b4#code)

### How to Verify a Contract on BohrScan:
```bash
npm run verify 0xYourContractAddress
```

---

## 8. How to Configure the Contract Address in the Frontend

To connect the Next.js frontend to your deployed contract:

1. Configure `.env.local`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x09b5556f6802DF6bDeB942E3286947d83F2b41b4
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
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`: The deployed MoodMark contract address (e.g., `0x...`)

4. **Deploy**:
   Click **"Deploy"**. Vercel will build and host your Web3 dApp with automatic SSL and global CDN distribution.

---

## 11. Security & Best Practices

- **Zero Secrets in Git**: `.env` and sensitive files are strictly excluded by `.gitignore`.
- **Minimal Surface**: Only three moods, no tokens, no permissions, no external dependencies or centralized backend.
- **Safe Wallet Interactions**: Uses modern Viem / Wagmi standards with typed contract ABIs.
