// scripts/auth.js
// ----------------

import { SessionManager } from './auth/session-manager.js';

// Mock users (for demo only)
const mockUsers = {
  "test@blockenergy.net": { password: "testing123" }
};

document.addEventListener('DOMContentLoaded', () => {
  // ——— Form toggle ———
  window.showForm = (formType) => {
    // hide all forms & tabs
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));

    // show the chosen form
    document.getElementById(`${formType}Form`).classList.add('active');
    // highlight the corresponding tab button
    document
      .querySelector(`.auth-tab[onclick="showForm('${formType}')"]`)
      .classList.add('active');
  };

  // ——— Login handler ———
  window.handleLogin = async () => {
    const email    = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    if (!email || !password) {
      return alert('Please fill all fields');
    }

    if (mockUsers[email] && mockUsers[email].password === password) {
      // mark session
      sessionStorage.setItem('auth', 'true');
      startTimer(10);
      setTimeout(() => { window.location.href = 'dapp.html'; }, 500);
      // redirect to your dapp
      window.location.href = 'dapp.html';
    } else {
      alert('Invalid credentials');
    }
  };

  // ——— Registration handler ———
  window.handleRegistration = async () => {
    const email    = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return alert('Invalid email');
    }
    if (password.length < 8) {
      return alert('Password too short');
    }

    // for demo, just stash pending user
    localStorage.setItem('pendingUser', JSON.stringify({ email, password }));
    alert('Registration successful! You can now log in.');
    showForm('login');
  };

  // ——— Session timer ———
  let timerInterval;
  function startTimer(minutes) {
    let remaining = minutes * 60;
    const display = document.getElementById('session-timer');
    display.style.display = 'block';

    timerInterval = setInterval(() => {
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      display.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

      if (--remaining < 0) {
        clearInterval(timerInterval);
        sessionStorage.removeItem('auth');
        display.textContent = 'Session expired!';
        setTimeout(() => location.reload(), 2000);
      }
    }, 1000);
  }

  // if they’ve already logged in, resume timer
  if (sessionStorage.getItem('auth')) {
    startTimer(10); // 10‑minute session
  }
});
