// Session management
let sessionTimer;
const SESSION_DURATION = 180; // 3 minutes (180 seconds)
let remainingTime = SESSION_DURATION;

// Initialize timer
function initSessionTimer() {
    updateTimerDisplay();
    startSessionTimer();
    
    // Reset timer on user activity
    document.addEventListener('mousemove', resetSessionTimer);
    document.addEventListener('keydown', resetSessionTimer);
    document.addEventListener('click', resetSessionTimer);
}

// Start/resume countdown
function startSessionTimer() {
    clearInterval(sessionTimer);
    
    sessionTimer = setInterval(() => {
        remainingTime--;
        updateTimerDisplay();
        
        if (remainingTime <= 0) {
            logoutUser();
        }
    }, 1000);
}

// Update display with color coding
function updateTimerDisplay() {
    const timerElement = document.getElementById('timer-text');
    const container = document.getElementById('session-timer');
    
    // Format as MM:SS
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update visual state
    container.classList.remove('normal', 'warning', 'critical');
    
    if (remainingTime <= 10) {
        container.classList.add('critical');
    } else if (remainingTime <= 30) {
        container.classList.add('warning');
    } else {
        container.classList.add('normal');
    }
}

// Reset timer on user activity
function resetSessionTimer() {
    remainingTime = SESSION_DURATION;
    updateTimerDisplay();
    startSessionTimer();
}

// Logout functionality
function logoutUser() {
    clearInterval(sessionTimer);
    
    // Visual feedback
    document.getElementById('session-timer').classList.add('critical');
    document.getElementById('timer-text').textContent = '00:00';
    
    // Actual logout actions
    alert('Your session has expired. Please log in again.');
    console.log('User session expired - performing logout');
    
    // Add your actual logout logic here:
    // - Clear authentication tokens
    // - Reset UI elements
    // - Redirect to login page
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initSessionTimer);