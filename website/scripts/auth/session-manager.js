// scripts/auth/session-manager.js
export class SessionManager {
  static startSession(email) {
    sessionStorage.setItem('be-session', JSON.stringify({
      email,
      expires: Date.now() + 600000 // 10 minutes
    }));
    this.startTimer();
  }

  static startTimer() {
    const timerDiv = document.getElementById('session-timer');
    timerDiv.style.display = 'block';
    
    const update = () => {
      const session = JSON.parse(sessionStorage.getItem('be-session'));
      if (!session) return;
      
      const remaining = session.expires - Date.now();
      if (remaining <= 0) {
        sessionStorage.removeItem('be-session');
        timerDiv.textContent = 'Session expired';
        return;
      }
      
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      timerDiv.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
      requestAnimationFrame(update);
    };
    
    update();
  }
}