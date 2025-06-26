// In auth.js - Update imports to use relative paths
import { ERC3643Checker } from './auth/erc3643-check.js';
import { ERC4337Auth } from './auth/erc4337-auth.js';
import { SessionManager } from './auth/session-manager.js';

// Mock user database (replace with real API later)
const mockUsers = {
  "test@blockenergy.net": {
    password: "testing123",
    verified: true
  }
};
window.handleLogin = async () => {
  console.log("Login button clicked!");
};
export const initAuth = () => {
  // Form Validation & Error Handling
  const errorDiv = document.createElement('div');
  errorDiv.id = 'auth-error';
  errorDiv.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);color:red;display:none;';
  document.body.appendChild(errorDiv);

  // Auth Toggle
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-form').forEach(form => 
        form.classList.remove('active'));
      document.querySelector(`#${tab.dataset.form}Form`).classList.add('active');
    });
  });

  // Email Login
  window.handleLogin = async () => {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;

    if (!email || !password) {
      showError('Please enter email and password');
      return;
    }

    if (mockUsers[email]?.password === password) {
      SessionManager.startSession({ email, type: 'email' });
      window.location.href = 'dapp.html';
    } else {
      showError('Invalid credentials');
    }
  };

  // Registration
  window.handleRegistration = async () => {
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (!validateEmail(email)) {
      showError('Invalid email format');
      return;
    }

    if (password.length < 8) {
      showError('Password must be ≥8 characters');
      return;
    }

    // Mock email verification
    await mockSendVerificationEmail(email);
    SessionManager.setPendingUser(email, password);
    showError('Verification email sent - check your inbox');
  };

  // Wallet Connection
  window.connectWallet = async () => {
    if (!window.ethereum) {
      showError('Please install MetaMask!');
      return;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const checker = new ERC3643Checker();
      const isVerified = await checker.verifyUser(accounts[0]);
      
      if (isVerified) {
        SessionManager.startSession({ address: accounts[0], type: 'wallet' });
        window.location.href = 'dapp.html';
      }
    } catch (error) {
      showError(`Wallet connection failed: ${error.message}`);
    }
  };
};

// Helper Functions
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function mockSendVerificationEmail(email) {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

function showError(message) {
  const errorDiv = document.getElementById('auth-error');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  setTimeout(() => errorDiv.style.display = 'none', 5000);
}