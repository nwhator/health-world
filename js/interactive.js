// Additional interactive functions for enhanced features

// Settings tab switching
function showSettingsTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.settings-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.settings-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Show corresponding content
    const content = document.getElementById(tabName + '-settings');
    if (content) {
        content.classList.add('active');
    }
}

// Appointment management functions
function rescheduleFromModal(appointmentId) {
    showNotification('Reschedule feature is being developed', 'info');
    console.log('Reschedule appointment:', appointmentId);
}

function cancelFromModal(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        showNotification('Appointment cancelled successfully', 'success');
        // Remove appointment from list
        setTimeout(() => {
            const card = event.target.closest('.appointment-card');
            if (card) {
                card.style.opacity = '0.5';
                card.querySelector('.appointment-status').textContent = 'Cancelled';
                card.querySelector('.appointment-status').className = 'appointment-status cancelled';
            }
        }, 1000);
    }
}

function rateAppointment(appointmentId) {
    const ratingModal = createModal(`
        <div class="rating-modal">
            <h3><i class="fas fa-star"></i> Rate Your Experience</h3>
            <div class="rating-content">
                <p>How would you rate your recent appointment?</p>
                <div class="star-rating">
                    <i class="fas fa-star" data-rating="1" onclick="setRating(1)"></i>
                    <i class="fas fa-star" data-rating="2" onclick="setRating(2)"></i>
                    <i class="fas fa-star" data-rating="3" onclick="setRating(3)"></i>
                    <i class="fas fa-star" data-rating="4" onclick="setRating(4)"></i>
                    <i class="fas fa-star" data-rating="5" onclick="setRating(5)"></i>
                </div>
                <textarea placeholder="Leave a comment (optional)" id="rating-comment"></textarea>
                <div class="rating-actions">
                    <button onclick="submitRating('${appointmentId}')" class="submit-rating-btn">Submit Rating</button>
                    <button onclick="closeModal()" class="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    `);
    
    document.body.appendChild(ratingModal);
}

function setRating(rating) {
    const stars = document.querySelectorAll('.star-rating i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    // Store rating for submission
    window.currentRating = rating;
}

function submitRating(appointmentId) {
    const rating = window.currentRating || 0;
    const comment = document.getElementById('rating-comment').value;
    
    if (rating === 0) {
        showNotification('Please select a rating', 'warning');
        return;
    }
    
    // Simulate rating submission
    showNotification('Thank you for your feedback!', 'success');
    closeModal();
    
    console.log('Rating submitted:', { appointmentId, rating, comment });
}

function bookAgain(appointmentId) {
    showNotification('Redirecting to booking page...', 'info');
    setTimeout(() => {
        closeModal();
        // Simulate scrolling to booking section
        document.querySelector('.at-home-care')?.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

function bookNewAppointmentFromModal() {
    closeModal();
    setTimeout(() => {
        document.querySelector('.at-home-care')?.scrollIntoView({ behavior: 'smooth' });
        showNotification('Please select a service to book', 'info');
    }, 500);
}

// Notification management functions
function markAllNotificationsRead() {
    const unreadItems = document.querySelectorAll('.notification-item.unread');
    unreadItems.forEach(item => {
        item.classList.remove('unread');
    });
    
    const unreadCount = document.querySelector('.unread-count');
    if (unreadCount) {
        unreadCount.textContent = '0 unread';
    }
    
    showNotification('All notifications marked as read', 'success');
}

function viewAppointmentDetails(appointmentId) {
    showNotification('Opening appointment details...', 'info');
    console.log('View appointment:', appointmentId);
}

function rescheduleFromNotification(appointmentId) {
    closeModal();
    setTimeout(() => {
        rescheduleFromModal(appointmentId);
    }, 500);
}

function viewHealthReport(reportId) {
    const reportModal = createModal(`
        <div class="health-report-modal">
            <h3><i class="fas fa-file-medical"></i> Health Report</h3>
            <div class="report-content">
                <div class="report-header">
                    <h4>Blood Pressure Test Results</h4>
                    <span class="report-date">August 10, 2025</span>
                </div>
                <div class="report-data">
                    <div class="data-item">
                        <label>Systolic Pressure:</label>
                        <span class="value normal">118 mmHg</span>
                    </div>
                    <div class="data-item">
                        <label>Diastolic Pressure:</label>
                        <span class="value normal">78 mmHg</span>
                    </div>
                    <div class="data-item">
                        <label>Heart Rate:</label>
                        <span class="value normal">72 bpm</span>
                    </div>
                    <div class="data-item">
                        <label>Status:</label>
                        <span class="status normal">Normal Range</span>
                    </div>
                </div>
                <div class="report-notes">
                    <h5>Healthcare Provider Notes:</h5>
                    <p>Blood pressure readings are within normal range. Continue current lifestyle and medication regimen. Next check-up recommended in 3 months.</p>
                </div>
                <div class="report-actions">
                    <button onclick="downloadReport('${reportId}')" class="download-btn">
                        <i class="fas fa-download"></i> Download PDF
                    </button>
                    <button onclick="shareWithDoctor('${reportId}')" class="share-btn">
                        <i class="fas fa-share"></i> Share with Doctor
                    </button>
                </div>
            </div>
        </div>
    `);
    
    document.body.appendChild(reportModal);
}

function shareWithDoctor(reportId) {
    const shareModal = createModal(`
        <div class="share-modal">
            <h3><i class="fas fa-share"></i> Share with Healthcare Provider</h3>
            <div class="share-content">
                <div class="doctor-list">
                    <div class="doctor-item" onclick="selectDoctor('dr-001')">
                        <i class="fas fa-user-md"></i>
                        <div class="doctor-info">
                            <h4>Dr. Sarah Johnson</h4>
                            <p>Primary Care Physician</p>
                        </div>
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="doctor-item" onclick="selectDoctor('dr-002')">
                        <i class="fas fa-user-md"></i>
                        <div class="doctor-info">
                            <h4>Dr. Michael Chen</h4>
                            <p>Cardiologist</p>
                        </div>
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <div class="share-options">
                    <label class="share-option">
                        <input type="checkbox" checked>
                        <span>Include test results</span>
                    </label>
                    <label class="share-option">
                        <input type="checkbox" checked>
                        <span>Include provider notes</span>
                    </label>
                    <label class="share-option">
                        <input type="checkbox">
                        <span>Request consultation</span>
                    </label>
                </div>
                <textarea placeholder="Add a message (optional)" id="share-message"></textarea>
                <div class="share-actions">
                    <button onclick="confirmShare('${reportId}')" class="confirm-share-btn">Share Report</button>
                    <button onclick="closeModal()" class="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    `);
    
    document.body.appendChild(shareModal);
}

function selectDoctor(doctorId) {
    // Remove selection from all doctors
    document.querySelectorAll('.doctor-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Add selection to clicked doctor
    event.currentTarget.classList.add('selected');
    window.selectedDoctor = doctorId;
}

function confirmShare(reportId) {
    if (!window.selectedDoctor) {
        showNotification('Please select a healthcare provider', 'warning');
        return;
    }
    
    showNotification('Report shared successfully!', 'success');
    closeModal();
    console.log('Shared report:', reportId, 'with doctor:', window.selectedDoctor);
}

function downloadReport(reportId) {
    showNotification('Downloading report...', 'info');
    
    // Simulate download
    setTimeout(() => {
        showNotification('Report downloaded successfully!', 'success');
    }, 2000);
    
    console.log('Download report:', reportId);
}

function rateService(appointmentId) {
    closeModal();
    setTimeout(() => {
        rateAppointment(appointmentId);
    }, 500);
}

// Settings functions
function changePassword() {
    const passwordModal = createModal(`
        <div class="password-modal">
            <h3><i class="fas fa-key"></i> Change Password</h3>
            <form onsubmit="updatePassword(event)">
                <div class="form-group">
                    <label for="current-password">Current Password</label>
                    <input type="password" id="current-password" name="currentPassword" required>
                </div>
                <div class="form-group">
                    <label for="new-password">New Password</label>
                    <input type="password" id="new-password" name="newPassword" required minlength="8">
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirm New Password</label>
                    <input type="password" id="confirm-password" name="confirmPassword" required>
                </div>
                <div class="password-requirements">
                    <h5>Password Requirements:</h5>
                    <ul>
                        <li>At least 8 characters long</li>
                        <li>Include uppercase and lowercase letters</li>
                        <li>Include at least one number</li>
                        <li>Include at least one special character</li>
                    </ul>
                </div>
                <div class="form-actions">
                    <button type="submit" class="update-password-btn">Update Password</button>
                    <button type="button" onclick="closeModal()" class="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(passwordModal);
}

function updatePassword(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');
    
    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    showNotification('Password updated successfully!', 'success');
    closeModal();
}

function setupTwoFactor() {
    const twoFactorModal = createModal(`
        <div class="two-factor-modal">
            <h3><i class="fas fa-shield-alt"></i> Enable Two-Factor Authentication</h3>
            <div class="two-factor-content">
                <div class="setup-step active" data-step="1">
                    <h4>Step 1: Download Authenticator App</h4>
                    <p>Download and install an authenticator app on your mobile device:</p>
                    <div class="app-options">
                        <div class="app-option">
                            <i class="fab fa-google"></i>
                            <span>Google Authenticator</span>
                        </div>
                        <div class="app-option">
                            <i class="fas fa-mobile-alt"></i>
                            <span>Authy</span>
                        </div>
                        <div class="app-option">
                            <i class="fas fa-key"></i>
                            <span>1Password</span>
                        </div>
                    </div>
                    <button onclick="nextTwoFactorStep(2)" class="next-step-btn">Next Step</button>
                </div>
                
                <div class="setup-step" data-step="2">
                    <h4>Step 2: Scan QR Code</h4>
                    <p>Scan this QR code with your authenticator app:</p>
                    <div class="qr-code">
                        <i class="fas fa-qrcode"></i>
                        <p>QR Code would appear here</p>
                    </div>
                    <div class="manual-entry">
                        <p>Or enter this code manually:</p>
                        <code>JBSWY3DPEHPK3PXP</code>
                    </div>
                    <button onclick="nextTwoFactorStep(3)" class="next-step-btn">I've Added the Account</button>
                </div>
                
                <div class="setup-step" data-step="3">
                    <h4>Step 3: Verify Code</h4>
                    <p>Enter the 6-digit code from your authenticator app:</p>
                    <input type="text" id="verification-code" placeholder="000000" maxlength="6" class="verification-input">
                    <button onclick="verifyTwoFactor()" class="verify-btn">Verify & Enable</button>
                </div>
            </div>
        </div>
    `);
    
    document.body.appendChild(twoFactorModal);
}

function nextTwoFactorStep(step) {
    document.querySelectorAll('.setup-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });
    
    const targetStep = document.querySelector(`[data-step="${step}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
    }
}

function verifyTwoFactor() {
    const code = document.getElementById('verification-code').value;
    
    if (code.length !== 6) {
        showNotification('Please enter a 6-digit code', 'warning');
        return;
    }
    
    showNotification('Two-factor authentication enabled successfully!', 'success');
    closeModal();
}

function showForgotPassword() {
    const forgotModal = createModal(`
        <div class="forgot-password-modal">
            <h3><i class="fas fa-key"></i> Reset Password</h3>
            <p>Enter your email address and we'll send you a link to reset your password.</p>
            <form onsubmit="sendResetLink(event)">
                <div class="form-group">
                    <label for="reset-email">Email Address</label>
                    <input type="email" id="reset-email" name="email" required placeholder="Enter your email">
                </div>
                <div class="form-actions">
                    <button type="submit" class="send-reset-btn">Send Reset Link</button>
                    <button type="button" onclick="showLoginForm()" class="back-btn">Back to Login</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(forgotModal);
}

function sendResetLink(event) {
    event.preventDefault();
    showNotification('Password reset link sent to your email!', 'success');
    setTimeout(() => {
        closeModal();
    }, 2000);
}

// Enhanced search functionality
function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (!searchTerm) {
        showNotification('Please enter a search term', 'warning');
        return;
    }
    
    const searchModal = createModal(`
        <div class="search-results-modal">
            <h3><i class="fas fa-search"></i> Search Results for "${searchTerm}"</h3>
            <div class="search-results">
                <div class="result-section">
                    <h4>Services</h4>
                    <div class="result-items">
                        <div class="result-item" onclick="scrollToService('general-consultation')">
                            <i class="fas fa-stethoscope"></i>
                            <div class="result-info">
                                <h5>General Consultation</h5>
                                <p>Comprehensive health checkup and consultation</p>
                            </div>
                        </div>
                        <div class="result-item" onclick="scrollToService('physiotherapy')">
                            <i class="fas fa-walking"></i>
                            <div class="result-info">
                                <h5>Physiotherapy</h5>
                                <p>Physical therapy and rehabilitation services</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="result-section">
                    <h4>Healthcare Providers</h4>
                    <div class="result-items">
                        <div class="result-item" onclick="viewProvider('dr-sarah-johnson')">
                            <i class="fas fa-user-md"></i>
                            <div class="result-info">
                                <h5>Dr. Sarah Johnson</h5>
                                <p>Primary Care Physician - Available for home visits</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="result-section">
                    <h4>Health Information</h4>
                    <div class="result-items">
                        <div class="result-item" onclick="showHealthInfo('blood-pressure')">
                            <i class="fas fa-info-circle"></i>
                            <div class="result-info">
                                <h5>Blood Pressure Management</h5>
                                <p>Tips and information about maintaining healthy blood pressure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    document.body.appendChild(searchModal);
    
    // Clear search input
    document.getElementById('search-input').value = '';
}

function scrollToService(serviceId) {
    closeModal();
    setTimeout(() => {
        const element = document.querySelector(`[data-service="${serviceId}"]`) || 
                       document.querySelector('.services-grid');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            showNotification('Service found! Scroll down to see more options.', 'info');
        }
    }, 500);
}

function viewProvider(providerId) {
    closeModal();
    showNotification('Provider profiles feature is being developed', 'info');
}

function showHealthInfo(topicId) {
    closeModal();
    showNotification('Health information library coming soon!', 'info');
}

// Enhanced emergency assistance
function callEmergency() {
    if (confirm('This will connect you to emergency services. Do you want to continue?')) {
        showNotification('Connecting to emergency services...', 'info');
        
        setTimeout(() => {
            const emergencyModal = createModal(`
                <div class="emergency-modal">
                    <h3><i class="fas fa-phone"></i> Emergency Call Active</h3>
                    <div class="emergency-content">
                        <div class="call-status">
                            <i class="fas fa-phone-alt pulse"></i>
                            <h4>Connected to 911</h4>
                            <p>Call duration: <span id="call-timer">00:00</span></p>
                        </div>
                        
                        <div class="emergency-info">
                            <h5>Your Information Sent:</h5>
                            <div class="info-item">
                                <strong>Location:</strong> 123 Main St, City, State
                            </div>
                            <div class="info-item">
                                <strong>Medical ID:</strong> Available
                            </div>
                            <div class="info-item">
                                <strong>Emergency Contacts:</strong> Notified
                            </div>
                        </div>
                        
                        <div class="emergency-actions">
                            <button onclick="endEmergencyCall()" class="end-call-btn">
                                <i class="fas fa-phone-slash"></i> End Call
                            </button>
                            <button onclick="addEmergencyNote()" class="add-note-btn">
                                <i class="fas fa-comment"></i> Add Note
                            </button>
                        </div>
                    </div>
                </div>
            `);
            
            document.body.appendChild(emergencyModal);
            startCallTimer();
        }, 3000);
    }
}

function startCallTimer() {
    let seconds = 0;
    const timer = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const timerElement = document.getElementById('call-timer');
        if (timerElement) {
            timerElement.textContent = 
                `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        } else {
            clearInterval(timer);
        }
    }, 1000);
    
    window.emergencyTimer = timer;
}

function endEmergencyCall() {
    if (window.emergencyTimer) {
        clearInterval(window.emergencyTimer);
    }
    
    closeModal();
    showNotification('Emergency call ended. Stay safe!', 'info');
}

function addEmergencyNote() {
    const note = prompt('Add a note for emergency responders:');
    if (note) {
        showNotification('Note added to emergency record', 'success');
    }
}

// Make functions globally available
window.showSettingsTab = showSettingsTab;
window.rescheduleFromModal = rescheduleFromModal;
window.cancelFromModal = cancelFromModal;
window.rateAppointment = rateAppointment;
window.setRating = setRating;
window.submitRating = submitRating;
window.bookAgain = bookAgain;
window.bookNewAppointmentFromModal = bookNewAppointmentFromModal;
window.markAllNotificationsRead = markAllNotificationsRead;
window.viewAppointmentDetails = viewAppointmentDetails;
window.rescheduleFromNotification = rescheduleFromNotification;
window.viewHealthReport = viewHealthReport;
window.shareWithDoctor = shareWithDoctor;
window.selectDoctor = selectDoctor;
window.confirmShare = confirmShare;
window.downloadReport = downloadReport;
window.rateService = rateService;
window.changePassword = changePassword;
window.updatePassword = updatePassword;
window.setupTwoFactor = setupTwoFactor;
window.nextTwoFactorStep = nextTwoFactorStep;
window.verifyTwoFactor = verifyTwoFactor;
window.showForgotPassword = showForgotPassword;
window.sendResetLink = sendResetLink;
window.performSearch = performSearch;
window.scrollToService = scrollToService;
window.viewProvider = viewProvider;
window.showHealthInfo = showHealthInfo;
window.callEmergency = callEmergency;
window.startCallTimer = startCallTimer;
window.endEmergencyCall = endEmergencyCall;
window.addEmergencyNote = addEmergencyNote;
