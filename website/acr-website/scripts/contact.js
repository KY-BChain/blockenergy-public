document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('researchContactForm');
    if (!form) return;
    
    // Generate random verification code
    function generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000);
    }
    
    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            institution: form.institution.value,
            email: form.email.value,
            interests: form.interests.value
        };
        
        // Generate and store OTP
        const otp = generateVerificationCode();
        sessionStorage.setItem('contactVerification', JSON.stringify({
            ...formData,
            otp,
            timestamp: Date.now()
        }));
        
        try {
            // Send OTP email
            await emailjs.send('default_service', 'contact_otp', {
                to_email: formData.email,
                otp_code: otp,
                institution: formData.institution
            });
            
            // Show verification section
            document.getElementById('verificationSection').style.display = 'block';
            
            // Start countdown timer
            startCountdown();
            
        } catch (error) {
            showStatus('Error sending verification email: ' + error, 'error');
        }
    });
    
    // OTP verification
    document.getElementById('verifyBtn')?.addEventListener('click', verifyOTP);
    document.getElementById('resendLink')?.addEventListener('click', resendOTP);
    
    // Auto-tab between OTP inputs
    document.querySelectorAll('.otp-input').forEach(input => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                const nextIndex = parseInt(e.target.dataset.index) + 1;
                const nextInput = document.querySelector(`.otp-input[data-index="${nextIndex}"]`);
                if (nextInput) nextInput.focus();
            }
        });
    });

    function verifyOTP() {
        const stored = JSON.parse(sessionStorage.getItem('contactVerification'));
        if (!stored) return;
        
        // Collect OTP digits
        let enteredOTP = '';
        document.querySelectorAll('.otp-input').forEach(input => {
            enteredOTP += input.value;
        });
        
        if (parseInt(enteredOTP) === stored.otp) {
            // Send full contact request
            emailjs.send('default_service', 'contact_request', {
                to_email: 'acr@blockenergy.eu',
                ...stored
            }).then(() => {
                showStatus('Verification successful! Your inquiry has been sent.', 'success');
                sessionStorage.removeItem('contactVerification');
                form.reset();
                
                // Hide verification section after 5 seconds
                setTimeout(() => {
                    document.getElementById('verificationSection').style.display = 'none';
                }, 5000);
            });
        } else {
            showStatus('Invalid verification code. Please try again.', 'error');
        }
    }
    
    function resendOTP() {
        const stored = JSON.parse(sessionStorage.getItem('contactVerification'));
        if (!stored) return;
        
        // Generate new OTP
        const newOtp = generateVerificationCode();
        stored.otp = newOtp;
        stored.timestamp = Date.now();
        sessionStorage.setItem('contactVerification', JSON.stringify(stored));
        
        // Resend email
        emailjs.send('default_service', 'contact_otp', {
            to_email: stored.email,
            otp_code: newOtp,
            institution: stored.institution
        }).then(() => {
            showStatus('New verification code sent!', 'info');
            startCountdown();
        });
    }
    
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        const resendLink = document.getElementById('resendLink');
        let timeLeft = 300; // 5 minutes in seconds
        
        // Hide resend link initially
        resendLink.style.display = 'none';
        
        const timer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                countdownElement.textContent = '00:00';
                resendLink.style.display = 'block';
            } else {
                timeLeft--;
            }
        }, 1000);
    }
    
    function showStatus(message, type) {
        const status = document.getElementById('statusMessage');
        status.textContent = message;
        status.className = 'status-message ' + type;
        status.style.display = 'block';
        
        setTimeout(() => {
            status.style.display = 'none';
        }, 5000);
    }
});