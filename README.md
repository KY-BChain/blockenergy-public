# BlockEnergy Core Platform

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![ERC-3643](https://img.shields.io/badge/Standard-ERC--3643-green)](https://erc3643.org)
[![HKMA VASP](https://img.shields.io/badge/Regulated-HKMA_VASP-blueviolet)](https://www.hkma.gov.hk)

> **Next-Generation DeFi with AI Platform for Regulated Commodities / Energy Pricing and Trading & Finance Finance**

![BlockEnergy Architecture](mermaid/stablecoin_architecture_v2.5.png)

## 🌍 Project Overview

BlockEnergy revolutionises **commodities trading** and **energy finance** through a regulated DeFi ecosystem, combining:

- **$BE Hybrid StableCoin**: Multi-asset collateralized digital currency
- **Commodities DEX**: EN590 diesel, jet fuel, renewables, carbon-credits, and carbon markets
- **Transactive Energy Grids**: AI-driven microgrid energy pricing & trading

```mermaid
flowchart TD
    subgraph EcoSystem["BlockEnergy Ecosystem"]
        direction LR
        Stablecoin["$BE StableCoin"] -->|Collateral| Commodities["Physical Commodities"]
        Stablecoin -->|Settlement| EnergyGrid["Transactive Energy"]
        Stablecoin -->|Trading| Carbon["Carbon Credit Markets"]
        
        Commodities -->|Tokenization| RWA["RWAs (EN590, Jet Fuel)"]
        EnergyGrid -->|Pricing| AI["Fetch.ai AEA+DeepSeek API"]
        Carbon -->|Verification| Oracle["Chainlink/DeepSeek"]
    end
```
## 🏦 BlockEnergy Structure
```bash
blockenergy-core/
├── stablecoin/                     # StableCoin Module
│   ├── contracts/                  # Solidity Contracts
│   │   ├── BECoin.sol             # ERC3643 StableCoin
│   │   ├── compliance/            # Compliance Logic
│   │   │   ├── IdentityRegistry.sol
│   │   │   └── Compliance.sol
│   │   ├── oracles/               # Oracle Integration
│   │   │   ├── ChainlinkOracle.sol
│   │   │   └── DeepSeekAdapter.sol
│   │   └── utils/                 # Utilities
│   │       └── TokenMath.sol
│   ├── scripts/                   # Deployment & Interaction
│   │   ├── deploy.ts              # Hardhat/Truffle Scripts
│   │   └── update_oracle.ts       # Oracle Config
│   ├── tests/                     # Test Suites
│   │   ├── unit/                  # Unit Tests
│   │   │   ├── BECoin.test.ts
│   │   │   └── Compliance.test.ts
│   │   └── integration/           # Integration Tests
│   │       └── OracleIntegration.test.ts
│   └── docs/                      # Technical Documentation
│       ├── ARCHITECTURE.md        # System Design
│       ├── AUDIT.md               # Security Audit Reports
│       └── COMPLIANCE.md          # HKMA Regulatory Alignment
│
├── pricing_engine/                # Pricing Engine Module
│   ├── contracts/                 # On-Chain Components
│   │   └── DeepSeekConnector.sol # API Integration
│   ├── scripts/                   # Data Fetching
│   │   └── fetch_prices.py        # DeepSeek API Scripts
│   ├── tests/
│   │   └── pricing.test.ts        # Price Feed Tests
│   └── docs/
│       └── PRICING_LOGIC.md       # Algorithm Details
│
├── transactive_energy/            # Energy Trading Module (Future)
│   └── ...                       # (Structure similar to stablecoin/)
│
├── mermaid/                       # Architecture Diagrams
│   └── stablecoin_flow.mmd        # Mermaid System Flow
│
├── docs/                          # Global Documentation
│   ├── OVERVIEW.md               # Project Vision
│   ├── ONBOARDING.md             # Developer Setup
│   └── LICENSES.md              # Apache 2.0 / Commercial
│
├── scripts/                       # Global Scripts
│   ├── ganache-setup.sh          # Local Testnet Config
│   └── fleek-ipfs-deploy.sh      # Fleek Hosting
│
├── test/                          # Cross-Module Tests
│   └── end_to_end/               # Full Workflow Tests
│
└── contracts/                     # Shared Contracts
    └── Interfaces/               # Common Interfaces
        ├── IERC3643.sol
        └── IOracle.sol

```

## 🏦 $BE StableCoin Architecture

### Key Features

| Component                | Specification                          | Regulatory Alignment       |
|--------------------------|----------------------------------------|----------------------------|
| **Collateral Basket**    | 80% CBDCs (eCNY,eHKD,eEUR), 20% RWAs  | MiCA Art. 23, HKMA VASP    |
| **Pricing Engine**       | DeepSeek API + Chainlink Oracles       | ESMA Market Abuse Reg      |
| **Identity Layer**       | ERC-3643 + ONCHAINID                   | GDPR, HKMA KYC/AML         |
| **Settlement**           | IPSF via Fleek/IPFS                    | EU DLT Pilot Regime         |

%% $BE StableCoin Architecture - Horizontal Subgraphs
```mermaid
flowchart TD
%% classDef subgraphStyle fill:#f0f4ff,stroke:#333,stroke-width:2px;
%% classDef nodeStyle fill:#fff,stroke:#1e3a8a,stroke-width:1.5px;
    subgraph Branch["branch setup flow"]
        A[Main Branch] --> B[Feature Branch: feature-StableCoin]
        B --> C[Development Work]
        C --> D[PR to Main]
    end
    
    subgraph Setup["1 Local Setup"]
        direction LR
        A1[["Ganache Local Chain
        (Port: 7545, ChainID: 1337)"]] --> A2[["Install Dependencies
        @erc3643/contracts
        @openzeppelin"]] --> A3[["Clone Repository
        KY-BChain/blockenergy-core"]]
    end

    subgraph Development["2 Contract Development"]
        direction LR
        B1[["BECoin.sol
        (ERC3643 Core)"]] --> B2[["IdentityRegistry.sol
        (ONCHAINID Integration)"]] --> B3[["Compliance.sol
        (HKMA Rules)"]]
    end

    subgraph Testing["3 Testing Framework"]
        direction LR
        C1[["Unit Tests
        BECoin.test.ts"]] --> C2[["Integration Tests
        OracleIntegration.test.ts"]] --> C3[["E2E Tests
        end_to_end/"]]
    end

    subgraph Deployment["4 Deployment"]
        direction LR
        D1[["Scripts
        deploy.ts"]] --> D2[["Networks
        Sepolia/Hardhat"]] --> D3[["Verification
        Etherscan"]]
    end

    subgraph Oracles["5 Oracle Integration"]
        direction LR
        E1[["Chainlink Config
        Oracle.sol"]] --> E2[["DeepSeek Adapter
        API.sol"]] --> E3[["Pricing Engine
        DeepSeek API"]]
    end

    subgraph Compliance["6 Compliance Setup"]
        direction LR
        F1[["KYC/AML
        Identity Registry"]] --> F2[["Audit Trails
        Daily Reports"]] --> F3[["CertiK
        Security Audit"]]
    end

    subgraph Maintenance["7 Maintenance & Governance"]
        direction LR
        G1[["Monitoring
        DefiLlama"]] --> G2[["Updates
        Price Feeds"]] --> G3[["Governance
        DAO Proposals"]]
    end

    Setup --> Development --> Testing --> Deployment --> Oracles --> Compliance --> Maintenance


```

%% BE稳定币架构 - 水平子图布局
```mermaid
%% 文件名: stablecoin_architecture_zh.mmd
flowchart TD

subgraph 分支设置流程["分支设置流程"]
    direction TB
    主分支[主分支] --> 功能分支[功能分支: feature-StableCoin]
    功能分支 --> 开发工作[开发工作]
    开发工作 --> 合并请求[PR合并到主分支]
end

subgraph 本地设置["1 本地设置"]
    direction LR
        节点3[["克隆仓库
        KY-BChain/blockenergy-core"]]
        节点2[["安装依赖
        @erc3643/contracts
        @openzeppelin"]]
        节点1[["Ganache本地链
        (端口:7545 链ID:1337)"]]
end

subgraph 合约开发["2 合约开发"]
    direction LR
        合规合约[["Compliance.sol
        (香港金管局规则)"]]
        身份注册[["IdentityRegistry.sol
        (ONCHAINID集成)"]]
        稳定币核心[["BECoin.sol
        (ERC3643核心)"]]
end

subgraph 测试框架["3 测试框架"]
    direction LR
        端到端测试[["端到端测试
        end_to_end/"]]
        集成测试[["集成测试
        OracleIntegration.test.ts"]]
        单元测试[["单元测试
        BECoin.test.ts"]]
end

subgraph 部署["4 部署"]
    direction LR
        验证[["验证
        Etherscan"]]
        网络[["网络
        Sepolia/Hardhat"]]
        脚本[["部署脚本
        deploy.ts"]]
end

subgraph 预言机集成["5 预言机集成"]
    direction LR
        定价引擎[["定价引擎
        DeepSeek API"]]
        深度适配器[["DeepSeek适配器
        API.sol"]]
        链链接口[["Chainlink配置
        Oracle.sol"]]
end

subgraph 合规设置["6 合规设置"]
    direction LR
        安全审计[["CertiK
        安全审计"]]
        审计追踪[["审计追踪
        每日报告"]]
        KYC认证[["KYC/AML
        身份注册"]]
end

subgraph 维护治理["7 维护与治理"]
    direction LR
        DAO治理[["治理
        DAO提案"]]
        价格更新[["更新
        价格反馈"]]
        系统监控[["监控
        DefiLlama"]]
end

%% 连接线
节点1 --> 节点2
节点2 --> 节点3
稳定币核心 --> 身份注册
身份注册 --> 合规合约
单元测试 --> 集成测试
集成测试 --> 端到端测试
脚本 --> 网络
网络 --> 验证
链链接口 --> 深度适配器
深度适配器 --> 定价引擎
KYC认证 --> 审计追踪
审计追踪 --> 安全审计
系统监控 --> 价格更新
价格更新 --> DAO治理

本地设置 --> 合约开发
合约开发 --> 测试框架
测试框架 --> 部署
部署 --> 预言机集成
预言机集成 --> 合规设置
合规设置 --> 维护治理
维护治理 -.-> 分支设置流程

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
