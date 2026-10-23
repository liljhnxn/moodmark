# MoodMark — Pitch Deck

**Decentralized Emotional Attestation & Sovereign Social Sentiment on Botchain**  
*Network: Botchain Mainnet (Chain ID: 677)*  
*Repository: [https://github.com/liljhnxn/moodmark](https://github.com/liljhnxn/moodmark)*  
*Contract: [`0xc7BffE6d09c808043F09AD12398528350B11539B`](https://scan.botchain.ai/address/0xc7BffE6d09c808043F09AD12398528350B11539B)*  

---

## Slide 1: Cover & Mission
### MoodMark: Sovereign Sentiment on Botchain
- **Tagline**: The immutable, decentralized layer for personal sentiment and on-chain social status.
- **Ecosystem**: Built natively for **Botchain** (Fast, secure, EVM-compatible).
- **Core Value**: Giving users true sovereign ownership over their emotional attestations without algorithms, tracking cookies, or corporate data silos.

---

## Slide 2: The Problem
### The Broken State of Web2 Mood & Status Tracking
1. **Corporate Extraction**: Web2 social platforms monetize human feelings through algorithmic outrage and invasive sentiment profiling.
2. **Data Fragility & Censorship**: Personal journal entries, mood trackers, and status feeds sit on centralized servers that can be shut down, modified, or wiped.
3. **No Web3 Composability**: DeFi, DAOs, and on-chain communities have financial primitives, but lack native, lightweight social indicators to gauge human morale and member engagement.

---

## Slide 3: The Solution
### The MoodMark Protocol
- **On-Chain Attestation**: Users select their current emotional state from 9 expressive moods and immutably record it on Botchain.
- **Zero Centralized Infrastructure**: No database, no Supabase, no centralized APIs. All state is read and written directly from the verified smart contract.
- **Universal Transparency**: Anyone can inspect their own mood or look up any wallet address in the ecosystem to view their real-time on-chain sentiment.

---

## Slide 4: Product Experience & Workflow
```
   1. Connect Wallet       ──▶  MetaMask / Rabby / Injected Web3
            │
   2. Select Mood          ──▶  9 Options (Happy, Excited, Cool, Loved...)
            │
   3. Record to Botchain   ──▶  1-Click on-chain transaction (Sub-cent gas)
            │
   4. Universal Lookup     ──▶  Search any wallet address for real-time mood
```
- **Instant Feedback**: Real-time transaction confirmation and direct link to BotScan explorer.
- **Dashboard**: Live reflection of current on-chain state with clear indicators for unset wallets.

---

## Slide 5: Technical Architecture
- **Smart Contract** (`MoodMark.sol`):
  - Solidity `^0.8.20`
  - Storage-packed `struct UserMood` (1 byte `enum` + 1 byte `bool`) in a single EVM slot for ultra-low gas consumption.
  - Custom error handling (`InvalidMood()`) for minimal bytecode footprint.
- **Frontend Client**:
  - Next.js (App Router, React 19)
  - Wagmi v2 & Viem for robust RPC communication
  - Tailwind CSS v4 with dark mode aesthetics and responsive UI

---

## Slide 6: Verified Live Deployment
### Fully Operational on Botchain Mainnet
- **Network**: Botchain Mainnet
- **Chain ID**: `677`
- **Native Token**: BOT (150 Million Total Supply)
- **Contract Address**: `0xc7BffE6d09c808043F09AD12398528350B11539B`
- **Block Explorer**: [BotScan Contract View](https://scan.botchain.ai/address/0xc7BffE6d09c808043F09AD12398528350B11539B)
- **Unit Test Coverage**: 100% test pass rate with Hardhat & Chai (Boundary checks, state transitions, event emissions).

---

## Slide 7: Ecosystem Composability & Use Cases
1. **DAO Morale & Community Gauges**: Measure member sentiment before launching contentious governance votes.
2. **AI Agent Interaction**: Autonomous Botchain AI agents can query user mood states to deliver context-aware, empathetic interactions.
3. **GameFi & Metaverse Profiles**: Dynamic in-game avatars and status flags reacting to on-chain mood records.
4. **Social Graph Reputation**: Interoperable with `.bot` domain names and Web3 identity standards.

---

## Slide 8: Market Opportunity
- **Web3 Social Expansion**: As on-chain identity matures, consumer dApps require expressive, micro-social primitives.
- **Mental Wellness & Mindful Crypto**: Combining daily mindfulness habits with verifiable blockchain streak achievements.
- **Low Gas, High Velocity**: Botchain's high throughput and negligible gas fees make daily social interactions frictionless.

---

## Slide 9: Product Roadmap
- **Phase 1 (Completed)**: Core smart contract deployment on Botchain Mainnet, BotScan integration, responsive Next.js frontend, and universal wallet lookup.
- **Phase 2 (Next)**: Daily mood streak counters & soulbound NFT badges for consistent check-ins.
- **Phase 3**: Botchain AI Agent sentiment oracle feeds & community-wide mood index dashboard.
- **Phase 4**: Account Abstraction (ERC-4337) with gasless social transactions.

---

## Slide 10: Open Source & Links
- **GitHub Repository**: [https://github.com/liljhnxn/moodmark](https://github.com/liljhnxn/moodmark)
- **Verified Smart Contract**: [`0xc7BffE6d09c808043F09AD12398528350B11539B`](https://scan.botchain.ai/address/0xc7BffE6d09c808043F09AD12398528350B11539B)
- **Network RPC**: `https://rpc.botchain.ai`
- **Network Explorer**: `https://scan.botchain.ai`
