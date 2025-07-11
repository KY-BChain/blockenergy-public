// Generic RWA compliance check
// Updated with industry-specific checks
export class ERC3643Checker {
  constructor(rwaTokenAddress) {
    this.contract = new ethers.Contract(
      rwaTokenAddress,
      ['function verifyCompliance(address,bytes32) view returns (bool)']
    );
  }

  async checkCompliance(userAddress, industryType) {
    const industryCode = ethers.utils.formatBytes32String(industryType);
    return this.contract.verifyCompliance(userAddress, industryCode);
  }
}

// Usage Example (In your login handler):
const petroleumCheck = new ERC3643Checker(process.env.RWA_TOKEN_ADDRESS);
const isCompliant = await petroleumCheck.checkCompliance(userAddress, "petroleum");