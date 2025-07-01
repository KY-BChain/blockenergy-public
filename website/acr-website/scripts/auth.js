import { SessionManager } from './auth/session-manager.js';

// Mock users (for demo only)
const mockUsers = {
  "test@blockenergy.net": { password: "testing123" }
};

let timerInterval;
/**
 * Starts a countdown timer displayed in the #session-timer element.
 * @param {number} minutes - Number of minutes for the countdown.
 */
function startTimer(minutes) {
  let remaining = minutes * 60;
  const displayContainer = document.getElementById('session-timer');
  const display = document.getElementById('timer-text');
  if (!displayContainer || !display) return;

  displayContainer.style.display = 'block';

  timerInterval = setInterval(() => {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;

    display.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    // Trigger warning flash if under 60 seconds
    if (remaining <= 60) {
      displayContainer.classList.add('flash-warning');
    }

    if (--remaining < 0) {
      clearInterval(timerInterval);
      sessionStorage.removeItem('auth');
      display.textContent = 'Session expired!';
      displayContainer.classList.remove('flash-warning');
      setTimeout(() => location.reload(), 2000);
    }
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Kick off the 10-minute timer immediately on index.html load
  setTimeout(() => {
    const path = window.location.pathname;
    if (path.endsWith('index.html') || path === '/') {
      startTimer(10);
    }
  }, 100);

  // 2. Show the login form by default
  if (typeof window.showForm === 'function') {
    window.showForm('login');
  }

  // 3. Login handler
  window.handleLogin = async () => {
    const email    = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    if (!email || !password) {
      return alert('Please fill all fields');
    }

    const user = mockUsers[email];
    if (user && user.password === password) {
      sessionStorage.setItem('auth', 'true');
      // Restart timer for the next page if needed
      startTimer(10);
      // Delay redirect slightly so user sees the timer start
      setTimeout(() => {
        window.location.href = 'dapp.html';
      }, 500);
    } else {
      alert('Invalid credentials');
    }
  };

  // 4. Registration handler
  window.handleRegistration = async () => {
    const email    = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return alert('Invalid email');
    }
    if (password.length < 8) {
      return alert('Password too short');
    }

    // Store the new user temporarily (demo only)
    localStorage.setItem('pendingUser', JSON.stringify({ email, password }));
    alert('Registration successful! You can now log in.');
    if (typeof window.showForm === 'function') {
      window.showForm('login');
    }
  };
});
