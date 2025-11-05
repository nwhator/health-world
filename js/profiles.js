// Profiles Page JavaScript

// Profile selection and form management
let selectedProfile = null;

// Initialize profiles page
document.addEventListener('DOMContentLoaded', function() {
    initializeProfilesPage();
});

function initializeProfilesPage() {
    console.log('Profiles page initialized');
    
    // Check if user is already logged in with a profile
    checkExistingProfile();
    
    // Setup form validation
    setupFormValidation();
}

function selectProfile(profileType) {
    selectedProfile = profileType;
    
    // Hide all forms first
    hideAllForms();
    
    // Show the selected form
    const formId = profileType + '-form';
    const form = document.getElementById(formId);
    
    if (form) {
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add visual feedback
        highlightSelectedProfile(profileType);
        
        // Log the selection
        logProfileSelection(profileType);
    }
}

function hideAllForms() {
    const forms = document.querySelectorAll('.profile-form');
    forms.forEach(form => {
        form.style.display = 'none';
    });
    
    // Remove highlighting from all profile cards
    const cards = document.querySelectorAll('.profile-card');
    cards.forEach(card => {
        card.classList.remove('selected');
    });
}

function highlightSelectedProfile(profileType) {
    const card = document.querySelector(`.${profileType}-profile`);
    if (card) {
        card.classList.add('selected');
        
        // Add temporary selection styles
        if (!document.getElementById('selection-styles')) {
            const style = document.createElement('style');
            style.id = 'selection-styles';
            style.textContent = `
                .profile-card.selected {
                    transform: scale(1.02);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
                }
                .profile-card.selected.patient-profile {
                    border-color: #1d4ed8;
                    background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.15));
                }
                .profile-card.selected.doctor-profile {
                    border-color: #059669;
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.15));
                }
                .profile-card.selected.pharmacy-profile {
                    border-color: #b91c1c;
                    background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(220, 38, 38, 0.15));
                }
            `;
            document.head.appendChild(style);
        }
    }
}

function cancelForm() {
    hideAllForms();
    selectedProfile = null;
    showNotification('Profile selection cancelled', 'info');
}

// Form submission handlers
function submitPatientForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const patientData = Object.fromEntries(formData.entries());
    
    // Validate required fields
    if (!validatePatientForm(patientData)) {
        return;
    }
    
    // Show loading state
    showLoadingState('Creating your patient profile...');
    
    // Simulate API call
    setTimeout(() => {
        // Save patient profile
        savePatientProfile(patientData);
        
        // Show success message
        hideLoadingState();
        showSuccessMessage('Patient profile created successfully!', 'patient');
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'index.html?profile=patient';
        }, 2000);
    }, 2000);
}

function submitDoctorForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const doctorData = Object.fromEntries(formData.entries());
    
    // Get selected services
    const services = Array.from(document.querySelectorAll('input[name="services"]:checked'))
                          .map(cb => cb.value);
    doctorData.services = services;
    
    // Validate required fields
    if (!validateDoctorForm(doctorData)) {
        return;
    }
    
    // Show loading state
    showLoadingState('Submitting your application for verification...');
    
    // Simulate API call
    setTimeout(() => {
        // Save doctor profile (pending verification)
        saveDoctorProfile(doctorData);
        
        // Show verification pending message
        hideLoadingState();
        showVerificationPendingMessage('doctor');
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'verification.html?type=doctor&status=pending';
        }, 3000);
    }, 2500);
}

function submitPharmacyForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const pharmacyData = Object.fromEntries(formData.entries());
    
    // Get selected services
    const services = Array.from(document.querySelectorAll('input[name="pharmacyServices"]:checked'))
                          .map(cb => cb.value);
    pharmacyData.pharmacyServices = services;
    
    // Get operating hours
    pharmacyData.operatingHours = {
        weekday: { open: formData.get('weekdayOpen'), close: formData.get('weekdayClose') },
        saturday: { open: formData.get('saturdayOpen'), close: formData.get('saturdayClose') },
        sunday: { open: formData.get('sundayOpen'), close: formData.get('sundayClose') }
    };
    
    // Validate required fields
    if (!validatePharmacyForm(pharmacyData)) {
        return;
    }
    
    // Show loading state
    showLoadingState('Submitting your pharmacy for verification...');
    
    // Simulate API call
    setTimeout(() => {
        // Save pharmacy profile (pending verification)
        savePharmacyProfile(pharmacyData);
        
        // Show verification pending message
        hideLoadingState();
        showVerificationPendingMessage('pharmacy');
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'verification.html?type=pharmacy&status=pending';
        }, 3000);
    }, 2500);
}

// Validation functions
function validatePatientForm(data) {
    const required = ['firstName', 'lastName', 'dob', 'email', 'phone', 'address', 'emergencyName', 'emergencyPhone'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
            focusField(field);
            return false;
        }
    }
    
    // Validate email format
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        focusField('email');
        return false;
    }
    
    // Validate age (must be 18 or older for patient registration)
    if (!isValidAge(data.dob)) {
        showNotification('You must be at least 18 years old to register', 'error');
        focusField('dob');
        return false;
    }
    
    return true;
}

function validateDoctorForm(data) {
    const required = ['firstName', 'lastName', 'title', 'specialization', 'licenseNumber', 'experience', 'email', 'phone', 'serviceAreas'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
            focusField(field);
            return false;
        }
    }
    
    // Validate email format
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        focusField('email');
        return false;
    }
    
    // Validate experience
    if (parseInt(data.experience) < 0) {
        showNotification('Years of experience cannot be negative', 'error');
        focusField('experience');
        return false;
    }
    
    // Validate at least one service is selected
    if (!data.services || data.services.length === 0) {
        showNotification('Please select at least one service you offer', 'error');
        document.querySelector('input[name="services"]').focus();
        return false;
    }
    
    return true;
}

function validatePharmacyForm(data) {
    const required = ['pharmacyName', 'licenseNumber', 'registrationNumber', 'address', 'email', 'phone', 'pharmacistName', 'pharmacistLicense'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
            focusField(field);
            return false;
        }
    }
    
    // Validate email format
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        focusField('email');
        return false;
    }
    
    // Validate at least one service is selected
    if (!data.pharmacyServices || data.pharmacyServices.length === 0) {
        showNotification('Please select at least one service you offer', 'error');
        document.querySelector('input[name="pharmacyServices"]').focus();
        return false;
    }
    
    return true;
}

// Utility validation functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
    }
    
    return age >= 18;
}

function focusField(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.focus();
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Profile saving functions
function savePatientProfile(data) {
    const profile = {
        type: 'patient',
        ...data,
        registrationDate: new Date().toISOString(),
        status: 'active',
        id: generateProfileId('PAT')
    };
    
    localStorage.setItem('healthworld_profile', JSON.stringify(profile));
    localStorage.setItem('healthworld_user', JSON.stringify({
        id: profile.id,
        name: `${data.firstName} ${data.lastName}`,
        type: 'patient',
        email: data.email
    }));
    
    console.log('Patient profile saved:', profile);
}

function saveDoctorProfile(data) {
    const profile = {
        type: 'doctor',
        ...data,
        registrationDate: new Date().toISOString(),
        status: 'pending_verification',
        id: generateProfileId('DOC'),
        verificationDocuments: []
    };
    
    localStorage.setItem('healthworld_profile', JSON.stringify(profile));
    localStorage.setItem('healthworld_user', JSON.stringify({
        id: profile.id,
        name: `Dr. ${data.firstName} ${data.lastName}`,
        type: 'doctor',
        email: data.email,
        status: 'pending_verification'
    }));
    
    console.log('Doctor profile saved (pending verification):', profile);
}

function savePharmacyProfile(data) {
    const profile = {
        type: 'pharmacy',
        ...data,
        registrationDate: new Date().toISOString(),
        status: 'pending_verification',
        id: generateProfileId('PHR'),
        verificationDocuments: []
    };
    
    localStorage.setItem('healthworld_profile', JSON.stringify(profile));
    localStorage.setItem('healthworld_user', JSON.stringify({
        id: profile.id,
        name: data.pharmacyName,
        type: 'pharmacy',
        email: data.email,
        status: 'pending_verification'
    }));
    
    console.log('Pharmacy profile saved (pending verification):', profile);
}

// UI feedback functions
function showLoadingState(message) {
    const loading = document.createElement('div');
    loading.id = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>${message}</p>
        </div>
    `;
    
    // Add loading styles
    if (!document.getElementById('loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            #loading-overlay {
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
            .loading-content {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                max-width: 300px;
            }
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #e5e7eb;
                border-top: 4px solid #2563eb;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(loading);
}

function hideLoadingState() {
    const loading = document.getElementById('loading-overlay');
    if (loading) {
        document.body.removeChild(loading);
    }
}

function showSuccessMessage(message, profileType) {
    const success = document.createElement('div');
    success.className = 'success-modal';
    success.innerHTML = `
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Welcome to Health World!</h3>
            <p>${message}</p>
            <p>You will be redirected to your dashboard shortly...</p>
        </div>
    `;
    
    // Add success styles
    if (!document.getElementById('success-styles')) {
        const style = document.createElement('style');
        style.id = 'success-styles';
        style.textContent = `
            .success-modal {
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
                max-width: 400px;
                animation: successSlide 0.5s ease;
            }
            .success-icon i {
                color: #10b981;
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            .success-content h3 {
                color: #1f2937;
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }
            .success-content p {
                color: #6b7280;
                line-height: 1.6;
                margin-bottom: 0.5rem;
            }
            @keyframes successSlide {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(success);
}

function showVerificationPendingMessage(profileType) {
    const pending = document.createElement('div');
    pending.className = 'verification-modal';
    pending.innerHTML = `
        <div class="verification-content">
            <div class="verification-icon">
                <i class="fas fa-clock"></i>
            </div>
            <h3>Application Submitted!</h3>
            <p>Your ${profileType} profile has been submitted for verification.</p>
            <p>Our team will review your credentials and contact you within 2-3 business days.</p>
            <p>You will receive an email notification once your profile is approved.</p>
            <div class="verification-steps">
                <div class="step completed">
                    <i class="fas fa-check"></i>
                    <span>Application Submitted</span>
                </div>
                <div class="step pending">
                    <i class="fas fa-clock"></i>
                    <span>Document Verification</span>
                </div>
                <div class="step pending">
                    <i class="fas fa-user-check"></i>
                    <span>Profile Activation</span>
                </div>
            </div>
        </div>
    `;
    
    // Add verification styles
    if (!document.getElementById('verification-styles')) {
        const style = document.createElement('style');
        style.id = 'verification-styles';
        style.textContent = `
            .verification-modal {
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
            .verification-content {
                background: white;
                padding: 3rem 2rem;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                animation: verificationSlide 0.5s ease;
            }
            .verification-icon i {
                color: #f59e0b;
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            .verification-content h3 {
                color: #1f2937;
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }
            .verification-content p {
                color: #6b7280;
                line-height: 1.6;
                margin-bottom: 1rem;
            }
            .verification-steps {
                display: flex;
                justify-content: space-between;
                margin-top: 2rem;
                padding-top: 2rem;
                border-top: 2px solid #e5e7eb;
            }
            .step {
                text-align: center;
                flex: 1;
                padding: 1rem 0.5rem;
            }
            .step i {
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
                display: block;
            }
            .step.completed i {
                color: #10b981;
            }
            .step.pending i {
                color: #6b7280;
            }
            .step span {
                font-size: 0.9rem;
                color: #4b5563;
                font-weight: 500;
            }
            @keyframes verificationSlide {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(pending);
}

function generateProfileId(prefix) {
    return prefix + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
}

function setupFormValidation() {
    // Add real-time validation for email fields
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#dc2626';
                showTemporaryMessage(this, 'Please enter a valid email address');
            } else {
                this.style.borderColor = '#e5e7eb';
            }
        });
    });
    
    // Add validation for required fields
    const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#dc2626';
            } else {
                this.style.borderColor = '#e5e7eb';
            }
        });
    });
}

function showTemporaryMessage(element, message) {
    // Remove any existing message
    const existingMessage = element.parentNode.querySelector('.field-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'field-message';
    messageDiv.style.cssText = 'color: #dc2626; font-size: 0.8rem; margin-top: 0.25rem;';
    messageDiv.textContent = message;
    
    element.parentNode.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

function checkExistingProfile() {
    const existingUser = localStorage.getItem('healthworld_user');
    if (existingUser) {
        const user = JSON.parse(existingUser);
        if (user.status !== 'pending_verification') {
            // User already has an active profile, redirect to dashboard
            showNotification(`Welcome back, ${user.name}!`, 'info');
            setTimeout(() => {
                window.location.href = `index.html?profile=${user.type}`;
            }, 2000);
        }
    }
}

function logProfileSelection(profileType) {
    console.log(`Profile selected: ${profileType} at ${new Date().toISOString()}`);
    // In a real app, this would send analytics data to the server
}
