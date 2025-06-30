// Updated to use RWAToken.sol
import AuthWalletABI from '../../../artifacts/contracts/ERC4337/AuthWallet.sol/AuthWallet.json';

export class ERC4337Auth {
  constructor(walletAddress, rwaTokenAddress) {
    this.wallet = new ethers.Contract(walletAddress, AuthWalletABI.abi);
    this.rwaToken = rwaTokenAddress;
  }

  async initUserSession(signer) {
    const isVerified = await this.wallet.rwaToken.isVerified(signer.address);
    sessionStorage.setItem('rwaStatus', isVerified);
  }
}