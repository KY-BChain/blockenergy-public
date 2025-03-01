# BlockEnergy Core Platform

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![ERC-3643](https://img.shields.io/badge/Standard-ERC--3643-green)](https://erc3643.org)
[![HKMA VASP](https://img.shields.io/badge/Regulated-HKMA_VASP-blueviolet)](https://www.hkma.gov.hk)

> **Next-Generation DeFi Platform for Regulated Commodities Trading & Energy Finance**

![BlockEnergy Architecture](mermaid/stablecoin_architecture_v2.5.png)

## 🌍 Project Overview

BlockEnergy revolutionizes **commodities trading** and **energy finance** through a regulated DeFi ecosystem, combining:

- **$BE Hybrid StableCoin**: Multi-asset collateralized digital currency
- **Commodities DEX**: EN590 diesel, jet fuel, solar credits, and carbon markets
- **Transactive Energy Grids**: AI-driven microgrid energy trading

```mermaid
flowchart TD
    subgraph EcoSystem["BlockEnergy Ecosystem"]
        direction LR
        Stablecoin["$BE StableCoin"] -->|Collateral| Commodities["Physical Commodities"]
        Stablecoin -->|Settlement| EnergyGrid["Transactive Energy"]
        Stablecoin -->|Trading| Carbon["Carbon Credit Markets"]
        
        Commodities -->|Tokenization| RWA["RWAs (EN590, Jet Fuel)"]
        EnergyGrid -->|Pricing| AI["Fetch.ai AEA"]
        Carbon -->|Verification| Oracle["Chainlink/DeepSeek"]
    end

## 🏦 $BE StableCoin Architecture

### Key Features

| Component                | Specification                          | Regulatory Alignment       |
|--------------------------|----------------------------------------|----------------------------|
| **Collateral Basket**    | 80% CBDCs (eCNY,eHKD,eEUR), 20% RWAs  | MiCA Art. 23, HKMA VASP    |
| **Pricing Engine**       | DeepSeek API + Chainlink Oracles       | ESMA Market Abuse Reg      |
| **Identity Layer**       | ERC-3643 + ONCHAINID                   | GDPR, HKMA KYC/AML         |
| **Settlement**           | IPSF via Fleek/IPFS                    | EU DLT Pilot Regime         |

```mermaid
%% filename: stablecoin_architecture.mmd
flowchart TD
    subgraph Collateral["Collateral Management"]
        CBDC["CBDCs (80%)
        - eCNY
        - eHKD
        - eEUR"] --> BE
        RWA["RWAs (20%)
        - EN590 Diesel
        - Jet Fuel
        - Solar Credits"] --> BE
    end

    BE["$BE StableCoin"] -->|DeFi Integration| Trading["Commodities DEX"]
    BE -->|Payments| Energy["Energy Grid Settlements"]
    BE -->|Compliance| Audit["HKMA VASP Portal"]
```

## 🛠️ Technical Implementation

### Core Components

1. **Smart Contracts**
   ```bash
   blockenergy-core/
   └── stablecoin/
       └── contracts/
           ├── BECoin.sol             # ERC-3643 Core
           ├── compliance/           # KYC/AML Rules
           ├── oracles/              # Price Feeds
           └── utils/                # Token Math
   ```

2. **Pricing Infrastructure**
   ```python
   # pricing_engine/aea/price_feed/skills/pricing
   def calculate_basket_value():
       # DeepSeek API integration
       diesel_price = get_en590_price()
       solar_price = get_platts_solar()
       return (diesel_price * 0.4) + (solar_price * 0.6)
   ```

## 🚀 Getting Started

### Installation

```bash
git clone https://github.com/KY-BChain/blockenergy-core.git
cd blockenergy-core
npm install -D hardhat @openzeppelin/contracts @erc3643/contracts
```

### Local Deployment (Ganache)

1. **Start Ganache Desktop**
   - Workspace: `BlockEnergyLocalTest`
   - Chain ID: `1337`
   - Port: `7545`

2. **Deploy Contracts**
   ```bash
   npx hardhat run stablecoin/scripts/deploy.ts --network ganache
   ```

### Testing Framework

```typescript
// Sample Unit Test
describe("EN590 Trading", () => {
  it("Should settle diesel trade in $BE", async () => {
    const tx = await dex.tradeEN590(1000, "0xBuyer");
    await expect(tx).to.emit("TradeSettled");
  });
});
```

## 📜 Regulatory Compliance

| Jurisdiction | Standard                  | Implementation                          |
|--------------|---------------------------|-----------------------------------------|
| **EU**       | Markets in Crypto Assets  | ERC-3643 identity hooks                 |
| **HKSAR**    | VASP Framework            | Daily reserve audits                    |
| **UN**       | Paris Agreement           | Carbon credit retirement tracking       |

## 🌐 Roadmap

| Quarter      | Milestone                         |
|--------------|-----------------------------------|
| Q3 2024      | eCNY/eHKD Collateral Pool Launch  |
| Q1 2025      | EN590 Diesel Trading Module       |
| Q3 2025      | Transactive Energy Integration    |

## 🤝 Contributing

1. Fork `blockenergy-public`
2. Create feature branch: `git checkout -b feat/en590-trading`
3. Submit PR with [KYBChain CLA](https://kybchain.org/cla)

## 📄 License

Apache 2.0 - See [LICENSE](LICENSE)

---

**Contact**: dev@blockenergy.net | [BlockEnergy White Paper](https://blockenergy.net/whitepaper)
