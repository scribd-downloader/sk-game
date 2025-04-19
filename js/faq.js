/**
 * Suika Game - FAQ JavaScript
 * Handles the FAQ accordion functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initFaqAccordion();
    initCommunityQuestions();
});

/**
 * Initialize the FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) {
        console.warn('No FAQ items found on the page.');
        return;
    }
    
    console.log(`Found ${faqItems.length} FAQ items, initializing accordion functionality.`);

    // Add click event listeners to each FAQ question
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle the active class on the FAQ item
                item.classList.toggle('active');
                
                // Toggle visibility of the answer section
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    if (item.classList.contains('active')) {
                        answer.style.display = 'block';
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.style.maxHeight = '0';
                        // Use setTimeout to add a delay before setting display to none
                        setTimeout(() => {
                            answer.style.display = 'none';
                        }, 300); // Match this to your CSS transition time
                    }
                }
            });
        }
    });
    
    // Initialize answers to be hidden by default
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.display = 'none';
            answer.style.maxHeight = '0';
        }
    });
}

/**
 * Initialize community questions functionality
 */
function initCommunityQuestions() {
    // Get the submit button and message element
    const submitBtn = document.querySelector('.community-submit-btn');
    const submittedMessage = document.querySelector('.submitted-message');
    const questionInput = document.querySelector('#communityQuestion');
    
    // Check if elements exist
    if (!submitBtn || !submittedMessage || !questionInput) {
        console.warn('Community question form elements not found on page:');
        console.warn('submitBtn:', submitBtn);
        console.warn('submittedMessage:', submittedMessage);
        console.warn('questionInput:', questionInput);
        return;
    }
    
    console.log('Community question elements found, setting up submit handler');
    
    // Directly add click event to the submit button
    submitBtn.addEventListener('click', function(e) {
        console.log('Submit button clicked');
        e.preventDefault();
        
        if (questionInput.value.trim() !== '') {
            // Show the success message
            submittedMessage.classList.add('show');
            console.log('Success message should be visible now');
            
            // Clear the input
            questionInput.value = '';
            
            // Hide the message after 5 seconds
            setTimeout(() => {
                submittedMessage.classList.remove('show');
            }, 5000);
        } else {
            alert('質問を入力してください');
        }
    });
} 