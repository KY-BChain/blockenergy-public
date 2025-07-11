// DeepSeek AI ChatBot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.getElementById('deepseek-chat-button');
    const chatModal = document.getElementById('deepseek-chat-modal');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Toggle chat visibility
    chatbotButton.addEventListener('click', () => {
        chatModal.style.display = 'block';
        userInput.focus();
    });
    
    closeChat.addEventListener('click', () => {
        chatModal.style.display = 'none';
    });
    
    // Send message functionality
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            userInput.value = '';
            
            // Simulate AI response (in real implementation, this would call an API)
            setTimeout(() => {
                const aiResponse = generateAIResponse(message);
                addMessage(aiResponse, 'ai');
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Generate AI responses
    function generateAIResponse(query) {
        const lowerQuery = query.toLowerCase();
        
        // Business-focused responses about cancer research
        if (lowerQuery.includes('federated') || lowerQuery.includes('privacy')) {
            return "Our platform uses federated learning to train AI models without sharing sensitive patient data. Each hospital keeps data locally while contributing to global model improvements.";
        } else if (lowerQuery.includes('radiomics') || lowerQuery.includes('feature')) {
            return "ACR extracts over 1000 quantitative features from medical images, including shape, texture, and intensity characteristics for precise tumor analysis.";
        } else if (lowerQuery.includes('breast') || lowerQuery.includes('cervical')) {
            return "We specialize in AI-driven early detection for breast and cervical cancers. Our models achieve 97% AUC in clinical validation studies.";
        } else if (lowerQuery.includes('blockchain') || lowerQuery.includes('web3')) {
            return "We use blockchain for secure authentication and data integrity verification. Patient data remains encrypted with zero-knowledge proof verification.";
        } else if (lowerQuery.includes('join') || lowerQuery.includes('participate')) {
            return "Research institutions can join our network by contacting acr@blockenergy.eu. You'll need to complete our research ethics compliance process first.";
        }
        
        // Default response
        return "I'm DeepSeek AI, specialised in cancer research with AI + DLT. I can help with questions about federated learning, radiomics, clinical workflows, or research participation. What would you like to know?";
    }
});