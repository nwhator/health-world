// Verification Page JavaScript

// Global variables
let uploadedFiles = {
    license: [],
    certifications: [],
    education: [],
    identity: []
};

let verificationStatus = 'pending';
let currentUser = null;

// Initialize verification page
document.addEventListener('DOMContentLoaded', function() {
    initializeVerificationPage();
    setupFileUploadHandlers();
    checkUserStatus();
});

function initializeVerificationPage() {
    console.log('Verification page initialized');
    
    // Check URL parameters for status
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const status = urlParams.get('status');
    
    if (type && status) {
        showUserStatus(type, status);
    }
    
    // Setup FAQ toggles
    setupFAQToggles();
}

function checkUserStatus() {
    // Check if user has a profile that needs verification
    const user = localStorage.getItem('healthworld_user');
    if (user) {
        currentUser = JSON.parse(user);
        
        if (currentUser.type === 'doctor' || currentUser.type === 'pharmacy') {
            if (currentUser.status === 'pending_verification') {
                showUserStatus(currentUser.type, 'pending');
            } else if (currentUser.status === 'verified') {
                showUserStatus(currentUser.type, 'approved');
            } else if (currentUser.status === 'rejected') {
                showUserStatus(currentUser.type, 'rejected');
            }
        }
    }
}

function showUserStatus(type, status) {
    const statusSection = document.getElementById('current-status');
    const uploadSection = document.getElementById('document-upload');
    
    statusSection.style.display = 'block';
    
    const statusIcon = document.getElementById('status-icon');
    const statusTitle = document.getElementById('status-title');
    const statusDescription = document.getElementById('status-description');
    
    // Update timeline
    updateStatusTimeline(status);
    
    switch (status) {
        case 'pending':
            statusIcon.innerHTML = '<i class="fas fa-clock"></i>';
            statusTitle.textContent = 'Verification in Progress';
            statusDescription.textContent = 'Your application is being reviewed by our verification team. We will contact you within 2-3 business days.';
            break;
            
        case 'approved':
            statusIcon.className = 'status-icon approved';
            statusIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            statusTitle.textContent = 'Verification Approved!';
            statusDescription.textContent = 'Congratulations! Your profile has been verified. You can now start accepting appointments.';
            break;
            
        case 'rejected':
            statusIcon.className = 'status-icon rejected';
            statusIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
            statusTitle.textContent = 'Verification Requires Attention';
            statusDescription.textContent = 'Some documents need to be updated or clarified. Please check your email for specific requirements.';
            
            // Show upload section for resubmission
            uploadSection.style.display = 'block';
            break;
            
        case 'incomplete':
            statusIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            statusTitle.textContent = 'Application Incomplete';
            statusDescription.textContent = 'Please upload all required documents to complete your verification.';
            
            // Show upload section
            uploadSection.style.display = 'block';
            break;
    }
}

function updateStatusTimeline(status) {
    const steps = ['submitted-step', 'review-step', 'verification-step', 'approval-step'];
    
    // Reset all steps
    steps.forEach(stepId => {
        const step = document.getElementById(stepId);
        step.classList.remove('completed', 'active');
    });
    
    switch (status) {
        case 'pending':
            document.getElementById('submitted-step').classList.add('completed');
            document.getElementById('review-step').classList.add('active');
            break;
            
        case 'under_review':
            document.getElementById('submitted-step').classList.add('completed');
            document.getElementById('review-step').classList.add('completed');
            document.getElementById('verification-step').classList.add('active');
            break;
            
        case 'approved':
            steps.forEach(stepId => {
                document.getElementById(stepId).classList.add('completed');
            });
            break;
            
        case 'rejected':
        case 'incomplete':
            document.getElementById('submitted-step').classList.add('completed');
            break;
    }
}

function setupFileUploadHandlers() {
    const uploadAreas = document.querySelectorAll('.upload-area');
    
    uploadAreas.forEach(area => {
        const input = area.querySelector('input[type="file"]');
        const browseLink = area.querySelector('.browse-link');
        const type = area.dataset.type;
        
        // Drag and drop events
        area.addEventListener('dragover', handleDragOver);
        area.addEventListener('dragleave', handleDragLeave);
        area.addEventListener('drop', (e) => handleDrop(e, type));
        
        // Click to browse
        if (browseLink) {
            browseLink.addEventListener('click', () => input.click());
        }
        
        // File input change
        input.addEventListener('change', (e) => handleFileSelect(e, type));
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e, type) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files, type);
}

function handleFileSelect(e, type) {
    const files = Array.from(e.target.files);
    processFiles(files, type);
}

function processFiles(files, type) {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    files.forEach(file => {
        if (!validTypes.includes(file.type)) {
            showNotification(`${file.name} is not a valid file type. Please upload PDF, JPG, or PNG files.`, 'error');
            return;
        }
        
        if (file.size > maxSize) {
            showNotification(`${file.name} is too large. Maximum file size is 10MB.`, 'error');
            return;
        }
        
        // Add file to the appropriate category
        uploadedFiles[type].push({
            file: file,
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type,
            id: Date.now() + Math.random()
        });
        
        updateFileList(type);
        showNotification(`${file.name} uploaded successfully`, 'success');
    });
}

function updateFileList(type) {
    const uploadArea = document.querySelector(`[data-type="${type}"]`);
    const fileList = uploadArea.querySelector('.file-list');
    
    fileList.innerHTML = '';
    
    uploadedFiles[type].forEach(fileData => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <i class="fas fa-file-${getFileIcon(fileData.type)}"></i>
                <div>
                    <div class="file-name">${fileData.name}</div>
                    <div class="file-size">${fileData.size}</div>
                </div>
            </div>
            <button class="file-remove" onclick="removeFile('${type}', ${fileData.id})">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        fileList.appendChild(fileItem);
    });
}

function removeFile(type, fileId) {
    uploadedFiles[type] = uploadedFiles[type].filter(file => file.id !== fileId);
    updateFileList(type);
    showNotification('File removed', 'info');
}

function getFileIcon(mimeType) {
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType.startsWith('image/')) return 'image';
    return 'alt';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function saveProgress() {
    // Save current progress to localStorage
    const progressData = {
        uploadedFiles: uploadedFiles,
        references: collectReferenceData(),
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('verification_progress', JSON.stringify(progressData));
    showNotification('Progress saved successfully', 'success');
}

function collectReferenceData() {
    const references = [];
    
    for (let i = 1; i <= 2; i++) {
        const ref = {
            name: document.querySelector(`[name="ref${i}_name"]`)?.value || '',
            title: document.querySelector(`[name="ref${i}_title"]`)?.value || '',
            organization: document.querySelector(`[name="ref${i}_org"]`)?.value || '',
            phone: document.querySelector(`[name="ref${i}_phone"]`)?.value || '',
            email: document.querySelector(`[name="ref${i}_email"]`)?.value || ''
        };
        
        references.push(ref);
    }
    
    return references;
}

function submitVerification() {
    // Validate required documents
    if (!validateSubmission()) {
        return;
    }
    
    // Show loading state
    showLoadingState('Submitting your verification documents...');
    
    // Simulate submission process
    setTimeout(() => {
        // Save submission data
        const submissionData = {
            uploadedFiles: uploadedFiles,
            references: collectReferenceData(),
            submittedAt: new Date().toISOString(),
            status: 'submitted'
        };
        
        localStorage.setItem('verification_submission', JSON.stringify(submissionData));
        
        // Update user status
        if (currentUser) {
            currentUser.status = 'pending_verification';
            localStorage.setItem('healthworld_user', JSON.stringify(currentUser));
        }
        
        hideLoadingState();
        showSubmissionSuccess();
        
        // Update page to show pending status
        setTimeout(() => {
            showUserStatus(currentUser?.type || 'doctor', 'pending');
            document.getElementById('document-upload').style.display = 'none';
        }, 3000);
        
    }, 2500);
}

function validateSubmission() {
    const requiredSections = ['license', 'identity'];
    const missingDocuments = [];
    
    requiredSections.forEach(section => {
        if (uploadedFiles[section].length === 0) {
            missingDocuments.push(section);
        }
    });
    
    if (missingDocuments.length > 0) {
        showNotification('Please upload all required documents before submitting', 'error');
        return false;
    }
    
    // Validate at least one reference
    const references = collectReferenceData();
    const validReferences = references.filter(ref => 
        ref.name.trim() && ref.email.trim() && ref.phone.trim()
    );
    
    if (validReferences.length === 0) {
        showNotification('Please provide at least one professional reference', 'error');
        return false;
    }
    
    return true;
}

function showSubmissionSuccess() {
    const success = document.createElement('div');
    success.className = 'submission-success-modal';
    success.innerHTML = `
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Verification Submitted!</h3>
            <p>Your verification documents have been successfully submitted.</p>
            <p>Our verification team will review your application within 2-3 business days.</p>
            <p>You will receive email updates on your verification status.</p>
            <div class="next-steps">
                <h4>What happens next?</h4>
                <ul>
                    <li>Document review and validation</li>
                    <li>Credential verification with issuing authorities</li>
                    <li>Background check (if required)</li>
                    <li>Final approval and profile activation</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add success modal styles
    if (!document.getElementById('submission-success-styles')) {
        const style = document.createElement('style');
        style.id = 'submission-success-styles';
        style.textContent = `
            .submission-success-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            }
            .success-content {
                background: white;
                padding: 3rem 2rem;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                animation: successModalSlide 0.5s ease;
            }
            .success-icon i {
                color: #10b981;
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            .success-content h3 {
                color: #1f2937;
                margin-bottom: 1rem;
                font-size: 1.8rem;
            }
            .success-content p {
                color: #6b7280;
                line-height: 1.6;
                margin-bottom: 1rem;
            }
            .next-steps {
                background: #f8fafc;
                padding: 1.5rem;
                border-radius: 15px;
                margin-top: 2rem;
                text-align: left;
            }
            .next-steps h4 {
                color: #1f2937;
                margin-bottom: 1rem;
                text-align: center;
            }
            .next-steps ul {
                list-style: none;
                padding: 0;
            }
            .next-steps li {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 0.5rem;
                color: #4b5563;
            }
            .next-steps li::before {
                content: "→";
                color: #2563eb;
                font-weight: bold;
            }
            @keyframes successModalSlide {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(success);
    
    // Auto remove after 10 seconds
    setTimeout(() => {
        if (success.parentElement) {
            success.remove();
        }
    }, 10000);
}

function checkStatus() {
    showNotification('Checking verification status...', 'info');
    
    // Simulate status check
    setTimeout(() => {
        // In a real app, this would make an API call
        const statuses = ['pending', 'under_review', 'pending'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        updateStatusTimeline(randomStatus);
        showNotification('Status updated', 'success');
    }, 1500);
}

function contactSupport() {
    const support = document.createElement('div');
    support.className = 'support-modal';
    support.innerHTML = `
        <div class="support-content">
            <h3>Contact Verification Support</h3>
            <div class="contact-options">
                <div class="contact-option">
                    <i class="fas fa-phone"></i>
                    <div>
                        <h4>Phone Support</h4>
                        <p>1-800-VERIFY (1-800-837-4398)</p>
                        <p>Mon-Fri 9AM-6PM EST</p>
                    </div>
                </div>
                <div class="contact-option">
                    <i class="fas fa-envelope"></i>
                    <div>
                        <h4>Email Support</h4>
                        <p>verify@healthworld.com</p>
                        <p>Response within 24 hours</p>
                    </div>
                </div>
                <div class="contact-option">
                    <i class="fas fa-comments"></i>
                    <div>
                        <h4>Live Chat</h4>
                        <p>Available 24/7</p>
                        <button onclick="startLiveChat()" class="chat-btn">Start Chat</button>
                    </div>
                </div>
            </div>
            <button onclick="closeSupportModal()" class="close-support-btn">Close</button>
        </div>
    `;
    
    // Add support modal styles
    if (!document.getElementById('support-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'support-modal-styles';
        style.textContent = `
            .support-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            }
            .support-content {
                background: white;
                padding: 3rem 2rem;
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
            }
            .support-content h3 {
                text-align: center;
                color: #1f2937;
                margin-bottom: 2rem;
                font-size: 1.8rem;
            }
            .contact-options {
                display: grid;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            .contact-option {
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                padding: 1.5rem;
                border: 2px solid #e5e7eb;
                border-radius: 15px;
                transition: border-color 0.3s;
            }
            .contact-option:hover {
                border-color: #2563eb;
            }
            .contact-option i {
                font-size: 1.5rem;
                color: #2563eb;
                margin-top: 0.25rem;
            }
            .contact-option h4 {
                color: #1f2937;
                margin-bottom: 0.5rem;
            }
            .contact-option p {
                color: #6b7280;
                margin-bottom: 0.25rem;
            }
            .chat-btn {
                background: #10b981;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
                margin-top: 0.5rem;
                transition: background 0.3s;
            }
            .chat-btn:hover {
                background: #059669;
            }
            .close-support-btn {
                width: 100%;
                background: #6b7280;
                color: white;
                border: none;
                padding: 12px;
                border-radius: 50px;
                cursor: pointer;
                font-weight: 600;
                transition: background 0.3s;
            }
            .close-support-btn:hover {
                background: #4b5563;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(support);
}

function closeSupportModal() {
    const modal = document.querySelector('.support-modal');
    if (modal) {
        modal.remove();
    }
}

function startLiveChat() {
    closeSupportModal();
    showNotification('Live chat feature coming soon!', 'info');
}

function setupFAQToggles() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
}

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-question').forEach(q => {
        if (q !== element) {
            q.classList.remove('active');
            q.parentElement.querySelector('.faq-answer').classList.remove('open');
        }
    });
    
    // Toggle current FAQ
    element.classList.toggle('active');
    answer.classList.toggle('open');
}

function showLoadingState(message) {
    const loading = document.createElement('div');
    loading.id = 'verification-loading';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(loading);
}

function hideLoadingState() {
    const loading = document.getElementById('verification-loading');
    if (loading) {
        loading.remove();
    }
}

// Load saved progress on page load
function loadSavedProgress() {
    const saved = localStorage.getItem('verification_progress');
    if (saved) {
        const progressData = JSON.parse(saved);
        uploadedFiles = progressData.uploadedFiles || uploadedFiles;
        
        // Update file lists
        Object.keys(uploadedFiles).forEach(type => {
            if (uploadedFiles[type].length > 0) {
                updateFileList(type);
            }
        });
        
        // Restore reference data
        if (progressData.references) {
            progressData.references.forEach((ref, index) => {
                const refNum = index + 1;
                Object.keys(ref).forEach(field => {
                    const input = document.querySelector(`[name="ref${refNum}_${field}"]`);
                    if (input) {
                        input.value = ref[field];
                    }
                });
            });
        }
        
        showNotification('Previous progress restored', 'info');
    }
}

// Load progress when page loads
window.addEventListener('load', loadSavedProgress);
