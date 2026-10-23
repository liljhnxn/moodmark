# MoodMark — Whitepaper

**Decentralized Emotional Attestation & Sovereign Social Sentiment on Botchain**  
*Version 1.0 — October 2026*  
*Repository: [https://github.com/liljhnxn/moodmark](https://github.com/liljhnxn/moodmark)*  
*Network: Botchain Mainnet (Chain ID: 677)*  
*Verified Contract: [0xc7BffE6d09c808043F09AD12398528350B11539B](https://scan.botchain.ai/address/0xc7BffE6d09c808043F09AD12398528350B11539B)*  

---

## Executive Summary

Traditional social networks and digital wellness applications store personal emotional data in proprietary, centralized databases. This paradigm exposes user sentiment to algorithmic surveillance, ad-targeting exploitation, platform censorship, and data loss.

**MoodMark** introduces an open, immutable, and censorship-resistant primitive for decentralized emotional attestation on **Botchain**. Powered by a gas-optimized Solidity smart contract (`MoodMark.sol`) and a modern Next.js client, MoodMark allows any Web3 account to cryptographically publish and inspect mood states on-chain. By eliminating centralized backends, off-chain caches, and middleman APIs, MoodMark serves as a trustless building block for decentralized social graphs, DAO sentiment gauge protocols, and AI agent interactions within the Botchain ecosystem.

---

## 1. Problem Statement

### 1.1 Centralized Sentiment Exploitation
Modern social media platforms monetize emotional reactivity. Users' daily feelings and interactions are harvested to feed recommendation algorithms designed for engagement maximization. Users have zero ownership or privacy guarantees over their personal sentiment history.

### 1.2 Lack of Lightweight Social Primitives in Web3
While decentralized finance (DeFi) has developed standardized primitives (ERC-20, AMMs, lending pools), Web3 social tooling often suffers from excessive complexity, reliance on off-chain indexing services (The Graph, centralized relational databases), or heavyweight metadata standards. There is a marked absence of simple, native, and composable primitives for real-time user status and state attestation.

### 1.3 Verifiability & Sybil-Resistant Transparency
In decentralized governance (DAOs) and on-chain communities, assessing the authentic sentiment or morale of community members is fraught with Sybil attacks, off-chain polling botting, and opaque forum moderation. An on-chain, verifiable attestation anchored to wallet addresses creates transparent, audit-ready sentiment records.

---

## 2. The MoodMark Protocol

MoodMark provides a minimal, sovereign, and code-enforced registry where users declare their current emotional state on-chain.

```
+-------------------------------------------------------------+
|                      Next.js Frontend                       |
|   (Wagmi v3 / Viem / React 19 / Tailwind CSS Client)        |
+-------------------------------------------------------------+
                              │
             EIP-1193 RPC     │ Signed Transactions
             & eth_call       │ (setMood / getMood)
                              ▼
+-------------------------------------------------------------+
|              Botchain Mainnet (Chain ID 677)                |
|                                                             |
|   +─────────────────────────────────────────────────────+   |
|   │                   MoodMark.sol                      │   |
|   │                                                     │   |
|   │   - enum Mood (Happy, Okay, Sad, Excited, ...)      │   |
|   │   - mapping(address => UserMood) (Storage Packed)   │   |
|   │   - setMood(uint8 mood) [State Mutation]            │   |
|   │   - getMood(address user) [Gasless View Call]       │   |
|   │   - event MoodUpdated(address, Mood)                │   |
|   +─────────────────────────────────────────────────────+   |
+-------------------------------------------------------------+
                              │
                              ▼
+-------------------------------------------------------------+
|                 BotScan Explorer / Indexers                 |
|      (Immutable Event Logs & Contract Code Verification)    |
+-------------------------------------------------------------+
```

### Key Protocol Attributes:
1. **Self-Sovereign Expression**: Each address retains unilateral authority over its recorded mood.
2. **Zero Centralized Middleware**: State reads and writes happen directly against Botchain RPC nodes.
3. **Storage Packing & Minimal Gas**: Employs packed struct storage and custom errors to minimize gas consumption on Botchain.
4. **Universal Interoperability**: Any third-party contract, dApp, or AI bot can query `getMood(address)` via standard EVM calls.

---

## 3. Architecture & Smart Contract Specification

### 3.1 Data Structures
```solidity
enum Mood {
    Happy,    // 0 😊
    Okay,     // 1 😐
    Sad,      // 2 😔
    Excited,  // 3 🤩
    Tired,    // 4 😴
    Cool,     // 5 😎
    Angry,    // 6 😡
    Loved,    // 7 🥰
    Anxious   // 8 😰
}

struct UserMood {
    Mood mood;     // 1 byte (uint8)
    bool hasMood;  // 1 byte (boolean flag)
}
```

### 3.2 Core Functions
#### State Mutation: `setMood(uint8 mood)`
- Checks that `mood <= Mood.Anxious` (reverting with custom error `InvalidMood()`).
- Updates storage and emits the indexed event `MoodUpdated(msg.sender, selectedMood)`.

#### Gasless State Query: `getMood(address user)`
- An external `view` function that returns `(Mood mood, bool hasMood)`.
- If an address has never set a mood, `hasMood` returns `false`, preventing ambiguous interpretation between unset defaults and `Mood.Happy` (`0`).

---

## 4. Deployed Network & Verification Details

MoodMark is deployed and verified on the Botchain Mainnet:

| Parameter | Network Specification |
|---|---|
| **Network Name** | Botchain Mainnet |
| **Chain ID** | `677` |
| **Native Currency** | BOT |
| **Total Supply** | 150 Million |
| **RPC Endpoint** | `https://rpc.botchain.ai` |
| **Block Explorer** | `https://scan.botchain.ai` |
| **Contract Address** | `0xc7BffE6d09c808043F09AD12398528350B11539B` |
| **Explorer Verification** | [View on BotScan](https://scan.botchain.ai/address/0xc7BffE6d09c808043F09AD12398528350B11539B) |
| **Compiler Version** | Solidity `v0.8.20` |
| **Optimization** | Enabled (200 runs) |

---

## 5. Security & Validation

### 5.1 Test Suite & Deterministic Verification
The smart contract has been tested using Hardhat and Chai, verifying all edge cases:
- ✅ **Unset State Detection**: Accurately flags `hasMood == false` for new accounts.
- ✅ **State Transitions**: Validates updating moods across all 9 enum variants.
- ✅ **Boundary Rejection**: Reverts with `InvalidMood` when given out-of-range inputs (`uint8 >= 9`).
- ✅ **Event Integrity**: Confirms correct emission and topic indexing for `MoodUpdated`.
- ✅ **Multi-account Isolation**: Validates storage independence across discrete wallet addresses.

### 5.2 Trustless Security Model
- **No Admin Keys / No Upgradability**: `MoodMark.sol` has no owner, no backdoor, and no proxy delegate calls. The contract is immutable and permanent once deployed.
- **Reentrancy Immunity**: Functions perform purely internal state operations and emit events without external calls or value transfers.

---

## 6. Ecosystem Composability & Future Roadmap

1. **Autonomous AI Agent Feeds**: Botchain AI agents can query live community mood aggregates to adapt agent persona responses or trigger automated community sentiment alerts.
2. **On-Chain Morale Streaks**: Introducing timestamp tracking and non-transferable soulbound tokens (SBTs) rewarding consecutive daily mood check-ins.
3. **Decentralized Governance (DAO Gauges)**: Utilizing wallet mood states as weighted sentiment barometers preceding snapshot proposals.
4. **Account Abstraction (ERC-4337)**: Gas-sponsored social check-ins using session keys for seamless mobile onboarding.

---

## 7. Conclusion

MoodMark demonstrates that meaningful Web3 user experiences do not require centralized databases or proprietary servers. By leveraging the fast, cost-effective infrastructure of Botchain, MoodMark establishes a permanent, open standard for decentralized emotional expression and verifiable social sentiment.
