// Dashboard JavaScript

// Global variables
let currentUser = null;
let appointments = [];
let notifications = [];
let healthRecords = [];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadUserData();
    setupEventListeners();
});

function initializeDashboard() {
    console.log('Dashboard initialized');
    
    // Load user data from localStorage
    const userData = localStorage.getItem('healthworld_user');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUserInterface();
    } else {
        // Redirect to login if no user data
        window.location.href = 'profiles.html';
        return;
    }
    
    // Load mock data
    loadMockData();
    
    // Initialize clickable elements
    setTimeout(() => {
        initializeClickableElements();
    }, 1000);
    
    // Setup auto-refresh for notifications
    setInterval(checkNewNotifications, 30000); // Check every 30 seconds
}

function updateUserInterface() {
    if (currentUser) {
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('dashboard-user-name').textContent = currentUser.name.split(' ')[0];
    }
}

function loadMockData() {
    // Mock appointments data
    appointments = [
        {
            id: 'apt-001',
            type: 'Dental Checkup',
            provider: 'Dr. Sarah Johnson',
            date: '2025-08-15',
            time: '10:00 AM - 11:00 AM',
            location: 'Home Visit',
            status: 'confirmed'
        },
        {
            id: 'apt-002',
            type: 'Blood Pressure Check',
            provider: 'Nurse Maria Lopez',
            date: '2025-08-18',
            time: '2:00 PM - 2:30 PM',
            location: 'Home Visit',
            status: 'confirmed'
        },
        {
            id: 'apt-003',
            type: 'Physiotherapy Session',
            provider: 'Physical Therapist Mike Chen',
            date: '2025-08-22',
            time: '4:00 PM - 5:00 PM',
            location: 'Home Visit',
            status: 'confirmed'
        }
    ];

    // Mock health records
    healthRecords = [
        {
            id: 'hr-001',
            type: 'Blood Pressure Reading',
            value: '120/80 mmHg',
            status: 'Normal',
            date: '2025-08-10',
            icon: 'heartbeat'
        },
        {
            id: 'hr-002',
            type: 'Weight Check',
            value: '70 kg',
            status: 'Stable',
            date: '2025-08-08',
            icon: 'weight'
        },
        {
            id: 'hr-003',
            type: 'Temperature',
            value: '36.5°C',
            status: 'Normal',
            date: '2025-08-05',
            icon: 'thermometer-half'
        }
    ];

    // Mock notifications
    notifications = [
        {
            id: 'not-001',
            title: 'Appointment Reminder',
            message: 'Your dental checkup is tomorrow at 10:00 AM',
            time: '2 hours ago',
            read: false,
            icon: 'calendar-check'
        },
        {
            id: 'not-002',
            title: 'Health Report Ready',
            message: 'Your blood test results are now available',
            time: '1 day ago',
            read: true,
            icon: 'file-medical'
        },
        {
            id: 'not-003',
            title: 'Rate Your Experience',
            message: 'How was your recent physiotherapy session?',
            time: '2 days ago',
            read: true,
            icon: 'star'
        }
    ];
}

function setupEventListeners() {
    // Close user menu when clicking outside
    document.addEventListener('click', function(event) {
        const userMenu = document.getElementById('user-menu');
        const userProfile = document.querySelector('.user-profile');
        
        if (!userProfile.contains(event.target) && !userMenu.contains(event.target)) {
            userMenu.style.display = 'none';
            userProfile.classList.remove('active');
        }
    });
}

// User Menu Functions
function toggleUserMenu() {
    const userMenu = document.getElementById('user-menu');
    const userProfile = document.querySelector('.user-profile');
    
    if (userMenu.style.display === 'none' || userMenu.style.display === '') {
        userMenu.style.display = 'block';
        userProfile.classList.add('active');
    } else {
        userMenu.style.display = 'none';
        userProfile.classList.remove('active');
    }
}

function showProfileSettings() {
    hideUserMenu();
    showSettingsModal('profile');
}

function showNotificationSettings() {
    hideUserMenu();
    showSettingsModal('notifications');
}

function showSecuritySettings() {
    hideUserMenu();
    showSettingsModal('security');
}

function showBillingSettings() {
    hideUserMenu();
    showSettingsModal('billing');
}

function hideUserMenu() {
    document.getElementById('user-menu').style.display = 'none';
    document.querySelector('.user-profile').classList.remove('active');
}

function showSettingsModal(type) {
    let modalContent = '';
    
    switch(type) {
        case 'profile':
            modalContent = createProfileSettingsContent();
            break;
        case 'notifications':
            modalContent = createNotificationSettingsContent();
            break;
        case 'security':
            modalContent = createSecuritySettingsContent();
            break;
        case 'billing':
            modalContent = createBillingSettingsContent();
            break;
    }
    
    const modal = createModal(modalContent);
    document.body.appendChild(modal);
}

function createProfileSettingsContent() {
    return `
        <div class="settings-modal">
            <h3><i class="fas fa-user-cog"></i> Profile Settings</h3>
            <form onsubmit="updateProfile(event)">
                <div class="settings-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" value="${currentUser?.name || ''}" name="fullName" required>
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" value="${currentUser?.email || ''}" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" value="+1 (555) 123-4567" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label>Date of Birth</label>
                        <input type="date" value="1990-01-01" name="dob" required>
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <textarea name="address" rows="3" required>123 Main St, City, State 12345</textarea>
                    </div>
                    <div class="form-group">
                        <label>Emergency Contact</label>
                        <input type="text" value="Jane Doe - (555) 987-6543" name="emergency" required>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" onclick="closeModal()" class="cancel-btn">Cancel</button>
                    <button type="submit" class="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
    `;
}

function createNotificationSettingsContent() {
    return `
        <div class="settings-modal">
            <h3><i class="fas fa-bell"></i> Notification Settings</h3>
            <div class="notification-preferences">
                <div class="preference-group">
                    <h4>Appointment Reminders</h4>
                    <div class="preference-options">
                        <label class="toggle-option">
                            <input type="checkbox" checked>
                            <span class="toggle-slider"></span>
                            <span>Email notifications</span>
                        </label>
                        <label class="toggle-option">
                            <input type="checkbox" checked>
                            <span class="toggle-slider"></span>
                            <span>SMS notifications</span>
                        </label>
                        <label class="toggle-option">
                            <input type="checkbox">
                            <span class="toggle-slider"></span>
                            <span>Push notifications</span>
                        </label>
                    </div>
                </div>
                
                <div class="preference-group">
                    <h4>Health Updates</h4>
                    <div class="preference-options">
                        <label class="toggle-option">
                            <input type="checkbox" checked>
                            <span class="toggle-slider"></span>
                            <span>Test results available</span>
                        </label>
                        <label class="toggle-option">
                            <input type="checkbox" checked>
                            <span class="toggle-slider"></span>
                            <span>Prescription updates</span>
                        </label>
                        <label class="toggle-option">
                            <input type="checkbox">
                            <span class="toggle-slider"></span>
                            <span>Health tips and advice</span>
                        </label>
                    </div>
                </div>
                
                <div class="preference-group">
                    <h4>Marketing Communications</h4>
                    <div class="preference-options">
                        <label class="toggle-option">
                            <input type="checkbox">
                            <span class="toggle-slider"></span>
                            <span>Promotional offers</span>
                        </label>
                        <label class="toggle-option">
                            <input type="checkbox" checked>
                            <span class="toggle-slider"></span>
                            <span>Service updates</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" onclick="closeModal()" class="cancel-btn">Cancel</button>
                <button onclick="saveNotificationSettings()" class="save-btn">Save Settings</button>
            </div>
        </div>
    `;
}

function createSecuritySettingsContent() {
    return `
        <div class="settings-modal">
            <h3><i class="fas fa-shield-alt"></i> Security Settings</h3>
            <div class="security-options">
                <div class="security-section">
                    <h4>Change Password</h4>
                    <form onsubmit="changePassword(event)">
                        <div class="form-group">
                            <label>Current Password</label>
                            <input type="password" name="currentPassword" required>
                        </div>
                        <div class="form-group">
                            <label>New Password</label>
                            <input type="password" name="newPassword" required>
                        </div>
                        <div class="form-group">
                            <label>Confirm New Password</label>
                            <input type="password" name="confirmPassword" required>
                        </div>
                        <button type="submit" class="change-password-btn">Change Password</button>
                    </form>
                </div>
                
                <div class="security-section">
                    <h4>Two-Factor Authentication</h4>
                    <div class="two-factor-status">
                        <span class="status-indicator disabled">Disabled</span>
                        <button onclick="setupTwoFactor()" class="enable-2fa-btn">Enable 2FA</button>
                    </div>
                </div>
                
                <div class="security-section">
                    <h4>Login Activity</h4>
                    <div class="login-activity">
                        <div class="activity-item">
                            <div class="activity-info">
                                <strong>Current Session</strong>
                                <p>Chrome on Windows • Today at 2:30 PM</p>
                            </div>
                            <span class="activity-status current">Current</span>
                        </div>
                        <div class="activity-item">
                            <div class="activity-info">
                                <strong>Mobile App</strong>
                                <p>iPhone iOS • Yesterday at 8:15 AM</p>
                            </div>
                            <button onclick="terminateSession('mobile')" class="terminate-btn">Terminate</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" onclick="closeModal()" class="cancel-btn">Close</button>
            </div>
        </div>
    `;
}

function createBillingSettingsContent() {
    return `
        <div class="settings-modal">
            <h3><i class="fas fa-credit-card"></i> Billing & Payment</h3>
            <div class="billing-content">
                <div class="billing-section">
                    <h4>Payment Methods</h4>
                    <div class="payment-methods">
                        <div class="payment-method">
                            <div class="method-info">
                                <i class="fab fa-cc-visa"></i>
                                <div>
                                    <strong>Visa ending in 4567</strong>
                                    <p>Expires 12/2027</p>
                                </div>
                            </div>
                            <div class="method-actions">
                                <button onclick="editPaymentMethod('card-1')" class="edit-btn">Edit</button>
                                <button onclick="removePaymentMethod('card-1')" class="remove-btn">Remove</button>
                            </div>
                        </div>
                        <button onclick="addPaymentMethod()" class="add-payment-btn">
                            <i class="fas fa-plus"></i> Add Payment Method
                        </button>
                    </div>
                </div>
                
                <div class="billing-section">
                    <h4>Billing History</h4>
                    <div class="billing-history">
                        <div class="billing-item">
                            <div class="billing-info">
                                <strong>Dental Checkup</strong>
                                <p>August 10, 2025</p>
                            </div>
                            <div class="billing-amount">$120.00</div>
                            <button onclick="downloadInvoice('inv-001')" class="download-btn">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                        <div class="billing-item">
                            <div class="billing-info">
                                <strong>Blood Pressure Monitoring</strong>
                                <p>August 5, 2025</p>
                            </div>
                            <div class="billing-amount">$60.00</div>
                            <button onclick="downloadInvoice('inv-002')" class="download-btn">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="billing-section">
                    <h4>Subscription Plans</h4>
                    <div class="subscription-info">
                        <div class="current-plan">
                            <strong>Current Plan: Basic Care</strong>
                            <p>$29.99/month • Next billing: September 15, 2025</p>
                        </div>
                        <button onclick="managePlan()" class="manage-plan-btn">Manage Plan</button>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" onclick="closeModal()" class="cancel-btn">Close</button>
            </div>
        </div>
    `;
}

// Appointment Functions
function viewAllAppointments() {
    showNotification('Loading all appointments...', 'info');
    // In a real app, this would navigate to a detailed appointments page
    setTimeout(() => {
        showNotification('All appointments loaded', 'success');
    }, 1000);
}

function rescheduleAppointment(appointmentId) {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
        showRescheduleModal(appointment);
    }
}

function cancelAppointment(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        showNotification('Cancelling appointment...', 'info');
        
        setTimeout(() => {
            // Remove the appointment card from the DOM
            const appointmentCard = document.querySelector(`[data-appointment-id="${appointmentId}"]`);
            if (appointmentCard) {
                appointmentCard.style.transition = 'all 0.5s ease';
                appointmentCard.style.opacity = '0';
                appointmentCard.style.transform = 'translateX(-100%)';
                
                setTimeout(() => {
                    appointmentCard.remove();
                    
                    // Update appointments array
                    const index = appointments.findIndex(apt => apt.id === appointmentId);
                    if (index !== -1) {
                        appointments.splice(index, 1);
                    }
                    
                    // Check if there are any appointments left
                    const remainingAppointments = document.querySelectorAll('.appointment-card');
                    if (remainingAppointments.length === 0) {
                        const appointmentsList = document.querySelector('.appointments-list');
                        if (appointmentsList) {
                            appointmentsList.innerHTML = `
                                <div class="no-appointments">
                                    <i class="fas fa-calendar-times"></i>
                                    <h3>No Upcoming Appointments</h3>
                                    <p>You don't have any scheduled appointments.</p>
                                    <button onclick="bookNewAppointment()" class="book-appointment-btn">
                                        <i class="fas fa-plus"></i> Book New Appointment
                                    </button>
                                </div>
                            `;
                        }
                    }
                }, 500);
            }
            
            showNotification('Appointment cancelled successfully', 'success');
        }, 1000);
    }
}

function showRescheduleModal(appointment) {
    const modal = createModal(`
        <div class="reschedule-modal">
            <h3>Reschedule Appointment</h3>
            <div class="appointment-info">
                <h4>${appointment.type}</h4>
                <p>with ${appointment.provider}</p>
                <p>Currently scheduled: ${appointment.date} at ${appointment.time}</p>
            </div>
            <form onsubmit="confirmReschedule(event, '${appointment.id}')">
                <div class="form-group">
                    <label>New Date</label>
                    <input type="date" name="newDate" min="${new Date().toISOString().split('T')[0]}" required>
                </div>
                <div class="form-group">
                    <label>New Time</label>
                    <select name="newTime" required>
                        <option value="">Select Time</option>
                        <option value="09:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="02:00 PM">2:00 PM</option>
                        <option value="03:00 PM">3:00 PM</option>
                        <option value="04:00 PM">4:00 PM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Reason for Rescheduling</label>
                    <textarea name="reason" rows="3" placeholder="Optional"></textarea>
                </div>
                <div class="modal-actions">
                    <button type="button" onclick="closeModal()" class="cancel-btn">Cancel</button>
                    <button type="submit" class="reschedule-confirm-btn">Reschedule</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function confirmReschedule(event, appointmentId) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const newDate = formData.get('newDate');
    const newTime = formData.get('newTime');
    
    // Update appointment
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
        appointment.date = newDate;
        appointment.time = newTime;
        appointment.status = 'rescheduled';
    }
    
    closeModal();
    showNotification('Appointment rescheduled successfully', 'success');
    updateAppointmentsDisplay();
}

// Quick Action Functions
function bookNewAppointment() {
    const modal = createModal(`
        <div class="appointment-booking-modal">
            <h3><i class="fas fa-calendar-plus"></i> Book New Appointment</h3>
            <form onsubmit="submitAppointmentRequest(event)">
                <div class="form-row">
                    <div class="form-group">
                        <label>Service Type</label>
                        <select name="serviceType" required>
                            <option value="">Select Service</option>
                            <option value="dental">Dental Care</option>
                            <option value="general">General Checkup</option>
                            <option value="physiotherapy">Physiotherapy</option>
                            <option value="nursing">Home Nursing</option>
                            <option value="specialist">Specialist Consultation</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Urgency Level</label>
                        <select name="urgency" required>
                            <option value="routine">Routine</option>
                            <option value="urgent">Urgent</option>
                            <option value="emergency">Emergency</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Preferred Date</label>
                        <input type="date" name="date" required min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label>Preferred Time</label>
                        <input type="time" name="time" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <select name="location" required>
                        <option value="home">At Home</option>
                        <option value="clinic">At Clinic</option>
                        <option value="hospital">At Hospital</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Description/Symptoms</label>
                    <textarea name="description" rows="3" placeholder="Describe your symptoms or specific requirements..."></textarea>
                </div>
                <div class="form-group">
                    <label>Budget Range</label>
                    <select name="budget" required>
                        <option value="50-100">$50 - $100</option>
                        <option value="100-200">$100 - $200</option>
                        <option value="200-500">$200 - $500</option>
                        <option value="500+">$500+</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" onclick="closeModal()" class="cancel-btn">Cancel</button>
                    <button type="submit" class="submit-btn">Submit Request</button>
                </div>
            </form>
        </div>
    `);
    document.body.appendChild(modal);
}

function requestPrescription() {
    const modal = createModal(`
        <div class="prescription-request-modal">
            <h3><i class="fas fa-prescription"></i> Request Prescription</h3>
            <form onsubmit="submitPrescriptionRequest(event)">
                <div class="form-group">
                    <label>Request Type</label>
                    <select name="requestType" required>
                        <option value="">Select Type</option>
                        <option value="refill">Prescription Refill</option>
                        <option value="new">New Prescription</option>
                        <option value="consultation">Consultation for Prescription</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Medication Name (if refill)</label>
                    <input type="text" name="medication" placeholder="Enter medication name">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Your Doctor</label>
                        <input type="text" name="doctor" placeholder="Dr. Smith or Any Available">
                    </div>
                    <div class="form-group">
                        <label>Urgency</label>
                        <select name="urgency" required>
                            <option value="routine">Routine</option>
                            <option value="urgent">Urgent</option>
                            <option value="emergency">Emergency</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Symptoms/Condition</label>
                    <textarea name="symptoms" rows="3" placeholder="Describe your symptoms or condition..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Preferred Pharmacy</label>
                    <select name="pharmacy">
                        <option value="any">Any Available</option>
                        <option value="cvs">CVS Pharmacy</option>
                        <option value="walgreens">Walgreens</option>
                        <option value="local">Local Pharmacy</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" onclick="closeModal()" class="cancel-btn">Cancel</button>
                    <button type="submit" class="submit-btn">Submit Request</button>
                </div>
            </form>
        </div>
    `);
    document.body.appendChild(modal);
}

function emergencyCall() {
    const modal = createModal(`
        <div class="emergency-call-modal">
            <h3 style="color: #e74c3c;"><i class="fas fa-phone"></i> Emergency Call</h3>
            <div class="emergency-warning">
                <i class="fas fa-exclamation-triangle"></i>
                <p>For life-threatening emergencies, call 911 immediately!</p>
            </div>
            <div class="emergency-options">
                <button onclick="call911()" class="emergency-btn critical">
                    <i class="fas fa-ambulance"></i>
                    <span>Call 911</span>
                    <small>Life-threatening emergency</small>
                </button>
                <button onclick="requestUrgentCare()" class="emergency-btn urgent">
                    <i class="fas fa-user-md"></i>
                    <span>Urgent Care</span>
                    <small>Non-life threatening</small>
                </button>
                <button onclick="requestNurse()" class="emergency-btn">
                    <i class="fas fa-user-nurse"></i>
                    <span>Emergency Nurse</span>
                    <small>Home emergency care</small>
                </button>
                <button onclick="poisonControl()" class="emergency-btn">
                    <i class="fas fa-skull-crossbones"></i>
                    <span>Poison Control</span>
                    <small>1-800-222-1222</small>
                </button>
            </div>
            <div class="location-sharing">
                <label>
                    <input type="checkbox" checked>
                    <span>Share my location with emergency responders</span>
                </label>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

function orderMedicine() {
    showMedicineOrderModal();
}

// Form submission handlers
function submitAppointmentRequest(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Create service request object
    const request = {
        id: 'req-' + Date.now(),
        type: 'appointment',
        serviceType: formData.get('serviceType'),
        urgency: formData.get('urgency'),
        date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        description: formData.get('description'),
        budget: formData.get('budget'),
        status: 'pending',
        requestDate: new Date().toISOString(),
        customer: currentUser
    };
    
    // Save to localStorage for providers to see
    saveServiceRequest(request);
    
    closeModal();
    showNotification('Appointment request submitted! Providers will be notified.', 'success');
    
    // Add to user's appointments as pending
    addPendingAppointment(request);
}

function submitPrescriptionRequest(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const request = {
        id: 'req-' + Date.now(),
        type: 'prescription',
        requestType: formData.get('requestType'),
        medication: formData.get('medication'),
        doctor: formData.get('doctor'),
        urgency: formData.get('urgency'),
        symptoms: formData.get('symptoms'),
        pharmacy: formData.get('pharmacy'),
        status: 'pending',
        requestDate: new Date().toISOString(),
        customer: currentUser
    };
    
    saveServiceRequest(request);
    
    closeModal();
    showNotification('Prescription request submitted! A doctor will review it shortly.', 'success');
}

function saveServiceRequest(request) {
    // Get existing requests
    let requests = JSON.parse(localStorage.getItem('healthworld_service_requests') || '[]');
    requests.push(request);
    localStorage.setItem('healthworld_service_requests', JSON.stringify(requests));
}

function addPendingAppointment(request) {
    const appointment = {
        id: request.id,
        title: `${request.serviceType.charAt(0).toUpperCase() + request.serviceType.slice(1)} - Pending`,
        doctor: 'To be assigned',
        date: request.date,
        time: request.time,
        type: 'pending',
        status: 'Pending Provider'
    };
    
    appointments.push(appointment);
    updateAppointmentsDisplay();
}

// Emergency call functions
function call911() {
    closeModal();
    // In a real app, this would integrate with emergency services
    const modal = createModal(`
        <div class="emergency-active-modal">
            <h3 style="color: #e74c3c;"><i class="fas fa-phone"></i> Calling 911...</h3>
            <div class="call-status">
                <div class="pulse-animation">
                    <i class="fas fa-phone"></i>
                </div>
                <p>Connecting to emergency services...</p>
                <p><strong>Your location is being shared</strong></p>
            </div>
            <button onclick="closeModal()" class="emergency-btn">End Call</button>
        </div>
    `);
    document.body.appendChild(modal);
}

function requestUrgentCare() {
    closeModal();
    // Submit urgent care request
    const request = {
        id: 'emergency-' + Date.now(),
        type: 'urgent-care',
        urgency: 'urgent',
        description: 'Urgent care needed',
        location: 'home',
        status: 'pending',
        requestDate: new Date().toISOString(),
        customer: currentUser
    };
    
    saveServiceRequest(request);
    showNotification('Urgent care request submitted! A provider will respond shortly.', 'success');
}

function requestNurse() {
    closeModal();
    const request = {
        id: 'emergency-' + Date.now(),
        type: 'emergency-nurse',
        urgency: 'emergency',
        description: 'Emergency nurse needed at home',
        location: 'home',
        status: 'pending',
        requestDate: new Date().toISOString(),
        customer: currentUser
    };
    
    saveServiceRequest(request);
    showNotification('Emergency nurse request submitted! Help is on the way.', 'success');
}

function poisonControl() {
    closeModal();
    window.open('tel:18002221222', '_self');
}

// Report functions
function showReportTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(tabName + '-reports').classList.add('active');
}

function viewFullReport(reportId) {
    // This would show detailed report in a new modal
    showNotification('Opening detailed report...', 'info');
    // Implementation for detailed report view
}

function healthCheckup() {
    showHealthCheckupModal();
}

function viewReports() {
    const modal = createModal(`
        <div class="reports-modal">
            <h3><i class="fas fa-chart-line"></i> Health Reports</h3>
            <div class="reports-tabs">
                <button class="tab-btn active" onclick="showReportTab('recent')">Recent Reports</button>
                <button class="tab-btn" onclick="showReportTab('lab')">Lab Results</button>
                <button class="tab-btn" onclick="showReportTab('prescriptions')">Prescriptions</button>
                <button class="tab-btn" onclick="showReportTab('appointments')">Appointment History</button>
            </div>
            <div class="reports-content">
                <div id="recent-reports" class="tab-content active">
                    <div class="report-item">
                        <div class="report-info">
                            <h4>Blood Pressure Monitoring</h4>
                            <p>Dr. Sarah Johnson - January 15, 2025</p>
                            <span class="report-status normal">Normal Range</span>
                        </div>
                        <button onclick="viewFullReport('bp-2025-01-15')" class="view-btn">View</button>
                    </div>
                    <div class="report-item">
                        <div class="report-info">
                            <h4>Dental Checkup</h4>
                            <p>Dr. Mike Chen - January 10, 2025</p>
                            <span class="report-status attention">Needs Follow-up</span>
                        </div>
                        <button onclick="viewFullReport('dental-2025-01-10')" class="view-btn">View</button>
                    </div>
                </div>
                <div id="lab-reports" class="tab-content">
                    <div class="report-item">
                        <div class="report-info">
                            <h4>Complete Blood Count</h4>
                            <p>LabCorp - January 12, 2025</p>
                            <span class="report-status normal">Normal</span>
                        </div>
                        <button onclick="viewFullReport('cbc-2025-01-12')" class="view-btn">View</button>
                    </div>
                </div>
                <div id="prescriptions-reports" class="tab-content">
                    <div class="report-item">
                        <div class="report-info">
                            <h4>Blood Pressure Medication</h4>
                            <p>Dr. Sarah Johnson - Active</p>
                            <span class="report-status active">Active</span>
                        </div>
                        <button onclick="viewFullReport('rx-bp-active')" class="view-btn">View</button>
                    </div>
                </div>
                <div id="appointments-reports" class="tab-content">
                    <div class="report-item">
                        <div class="report-info">
                            <h4>General Checkup</h4>
                            <p>Dr. Sarah Johnson - January 15, 2025</p>
                            <span class="report-status completed">Completed</span>
                        </div>
                        <button onclick="viewFullReport('apt-2025-01-15')" class="view-btn">View</button>
                    </div>
                </div>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

function showPrescriptionModal() {
    const modal = createModal(`
        <div class="prescription-modal">
            <h3><i class="fas fa-prescription"></i> Request Prescription</h3>
            <form onsubmit="submitPrescriptionRequest(event)">
                <div class="form-group">
                    <label>Medication Name</label>
                    <input type="text" name="medication" required placeholder="Enter medication name">
                </div>
                <div class="form-group">
                    <label>Dosage</label>
                    <input type="text" name="dosage" required placeholder="e.g., 10mg">
                </div>
                <div class="form-group">
                    <label>Frequency</label>
                    <select name="frequency" required>
                        <option value="">Select frequency</option>
                        <option value="once-daily">Once daily</option>
                        <option value="twice-daily">Twice daily</option>
                        <option value="three-times-daily">Three times daily</option>
                        <option value="as-needed">As needed</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Duration</label>
                    <select name="duration" required>
                        <option value="">Select duration</option>
                        <option value="7-days">7 days</option>
                        <option value="14-days">14 days</option>
                        <option value="30-days">30 days</option>
                        <option value="90-days">90 days</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Reason for Request</label>
                    <textarea name="reason" rows="3" required placeholder="Please explain why you need this prescription"></textarea>
                </div>
                <div class="modal-actions">
                    <button type="button" onclick="closeModal()" class="cancel-btn">Cancel</button>
                    <button type="submit" class="submit-btn">Submit Request</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function submitPrescriptionRequest(event) {
    event.preventDefault();
    closeModal();
    showNotification('Prescription request submitted. A doctor will review your request within 24 hours.', 'success');
}

// Notification Functions
function markAllRead() {
    notifications.forEach(notification => {
        notification.read = true;
    });
    updateNotificationsDisplay();
    showNotification('All notifications marked as read', 'success');
}

function checkNewNotifications() {
    // Simulate receiving new notifications
    const randomNotifications = [
        {
            id: 'not-' + Date.now(),
            title: 'Medication Reminder',
            message: 'Time to take your blood pressure medication',
            time: 'Just now',
            read: false,
            icon: 'pills'
        },
        {
            id: 'not-' + (Date.now() + 1),
            title: 'Health Tip',
            message: 'Remember to stay hydrated today!',
            time: 'Just now',
            read: false,
            icon: 'lightbulb'
        }
    ];
    
    // Randomly add new notifications (10% chance every check)
    if (Math.random() < 0.1) {
        const newNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        notifications.unshift(newNotification);
        updateNotificationsDisplay();
        showNotification('New notification received', 'info');
    }
}

function updateNotificationsDisplay() {
    // This would update the notifications display in the UI
    // For now, just log the update
    console.log('Notifications updated:', notifications.filter(n => !n.read).length + ' unread');
}

function updateAppointmentsDisplay() {
    const appointmentsList = document.querySelector('.appointments-list');
    if (!appointmentsList) return;

    if (appointments.length === 0) {
        appointmentsList.innerHTML = `
            <div class="no-appointments">
                <i class="fas fa-calendar-times"></i>
                <h3>No Upcoming Appointments</h3>
                <p>You don't have any scheduled appointments.</p>
                <button onclick="bookNewAppointment()" class="book-appointment-btn">
                    <i class="fas fa-plus"></i> Book New Appointment
                </button>
            </div>
        `;
        return;
    }

    appointmentsList.innerHTML = appointments.map(appointment => `
        <div class="appointment-card" data-appointment-id="${appointment.id}">
            <div class="appointment-date">
                <span class="day">${new Date(appointment.date).getDate()}</span>
                <span class="month">${new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}</span>
            </div>
            <div class="appointment-info">
                <h4>${appointment.type}</h4>
                <p><i class="fas fa-user-md"></i> ${appointment.provider}</p>
                <p><i class="fas fa-clock"></i> ${appointment.time}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${appointment.location}</p>
            </div>
            <div class="appointment-status ${appointment.status}">
                ${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </div>
            <div class="appointment-actions">
                <button onclick="rescheduleAppointment('${appointment.id}')" class="action-btn reschedule">
                    <i class="fas fa-calendar"></i> Reschedule
                </button>
                    <button onclick="cancelAppointment('${appointment.id}')" class="action-btn cancel">
                    <i class="fas fa-times"></i> Cancel
                </button>
            </div>
        </div>
    `).join('');
}

function bookNewAppointment() {
    showNotification('Redirecting to booking page...', 'info');
    setTimeout(() => {
        window.location.href = 'index.html#at-home-care';
    }, 1500);
}

// Make dashboard cards clickable
function initializeClickableElements() {
    // Make health record cards clickable
    document.querySelectorAll('.health-record-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const recordId = this.dataset.recordId || 'hr-' + Date.now();
            viewHealthRecord(recordId);
        });
    });
    
    // Make notification cards clickable
    document.querySelectorAll('.notification-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const notificationId = this.dataset.notificationId || 'not-' + Date.now();
            handleNotificationClick(notificationId);
        });
    });
    
    // Make quick action cards clickable
    document.querySelectorAll('.quick-action').forEach(action => {
        action.style.cursor = 'pointer';
        action.addEventListener('click', function() {
            const actionType = this.dataset.action;
            handleQuickAction(actionType);
        });
    });
}

function viewHealthRecord(recordId) {
    showNotification('Opening health record...', 'info');
    setTimeout(() => {
        viewHealthReport(recordId);
    }, 500);
}

function handleNotificationClick(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        // Mark as read
        notification.read = true;
        
        // Handle different notification types
        switch (notification.type) {
            case 'appointment':
                showAppointments();
                break;
            case 'health-report':
                if (notification.data && notification.data.reportId) {
                    viewHealthReport(notification.data.reportId);
                }
                break;
            case 'reminder':
                showNotification(notification.message, 'info');
                break;
            default:
                showNotification('Notification opened', 'info');
        }
        
        updateNotificationsDisplay();
    }
}

function handleQuickAction(actionType) {
    switch (actionType) {
        case 'book-appointment':
            bookNewAppointment();
            break;
        case 'view-records':
            showNotification('Opening health records...', 'info');
            setTimeout(() => {
                const healthSection = document.querySelector('.health-records-section');
                if (healthSection) {
                    healthSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
            break;
        case 'emergency':
            callEmergency();
            break;
        case 'find-provider':
            showNotification('Redirecting to provider search...', 'info');
            setTimeout(() => {
                window.location.href = 'profiles.html?tab=provider';
            }, 1500);
            break;
        case 'pharmacy':
            showNotification('Redirecting to pharmacy services...', 'info');
            setTimeout(() => {
                window.location.href = 'profiles.html?tab=pharmacy';
            }, 1500);
            break;
        case 'settings':
            showSettings();
            break;
        default:
            showNotification('Feature coming soon!', 'info');
    }
}// Utility Functions
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay dashboard-modal';
    modal.innerHTML = `
        <div class="modal-content">
            ${content}
        </div>
    `;
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Add dashboard modal styles
    if (!document.getElementById('dashboard-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'dashboard-modal-styles';
        style.textContent = `
            .dashboard-modal .modal-content {
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                background: white;
                border-radius: 20px;
                padding: 2rem;
            }
            .settings-modal h3 {
                display: flex;
                align-items: center;
                gap: 10px;
                color: #1f2937;
                margin-bottom: 2rem;
                font-size: 1.5rem;
            }
            .settings-form {
                display: grid;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            .form-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .form-group label {
                font-weight: 600;
                color: #374151;
            }
            .form-group input,
            .form-group textarea,
            .form-group select {
                padding: 12px 16px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s;
            }
            .form-group input:focus,
            .form-group textarea:focus,
            .form-group select:focus {
                outline: none;
                border-color: #2563eb;
            }
            .modal-actions {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                margin-top: 2rem;
                padding-top: 2rem;
                border-top: 2px solid #f3f4f6;
            }
            .cancel-btn,
            .save-btn,
            .submit-btn {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            .cancel-btn {
                background: #f3f4f6;
                color: #6b7280;
            }
            .cancel-btn:hover {
                background: #e5e7eb;
            }
            .save-btn,
            .submit-btn {
                background: #2563eb;
                color: white;
            }
            .save-btn:hover,
            .submit-btn:hover {
                background: #1d4ed8;
            }
            .toggle-option {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 1rem;
                cursor: pointer;
            }
            .toggle-slider {
                position: relative;
                width: 50px;
                height: 24px;
                background: #e5e7eb;
                border-radius: 12px;
                transition: background 0.3s;
            }
            .toggle-slider:before {
                content: '';
                position: absolute;
                top: 2px;
                left: 2px;
                width: 20px;
                height: 20px;
                background: white;
                border-radius: 50%;
                transition: transform 0.3s;
            }
            .toggle-option input:checked + .toggle-slider {
                background: #2563eb;
            }
            .toggle-option input:checked + .toggle-slider:before {
                transform: translateX(26px);
            }
            .toggle-option input {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    return modal;
}

function closeModal() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (modal.parentElement) {
            modal.parentElement.removeChild(modal);
        }
    });
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('healthworld_user');
        localStorage.removeItem('healthworld_profile');
        showNotification('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

// Load user data on page load
function loadUserData() {
    // Load any saved user preferences or data
    const savedPreferences = localStorage.getItem('dashboard_preferences');
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        console.log('User preferences loaded:', preferences);
    }
}
