// Health World JavaScript Functions

// Global variables
let currentUser = null;
let currentLocation = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    checkUserLocation();
});

// Initialize the application
function initializeApp() {
    console.log('Health World App Initialized');
    // Check for saved user session
    checkUserSession();
    // Initialize notifications
    requestNotificationPermission();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    // Mobile menu toggle (for future mobile navigation)
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', toggleUserMenu);
    }
}

// Emergency Module Functions
function openEmergencyModule() {
    const emergencyModule = document.getElementById('emergency-module');
    emergencyModule.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Auto-get location for emergency
    getCurrentLocation();
    
    // Log emergency module access
    logUserAction('emergency_module_opened');
}

function callEmergency(serviceType) {
    // Show confirmation dialog
    if (confirm(`Are you sure you want to call ${serviceType} services? This will initiate an emergency call.`)) {
        // In a real app, this would make an actual emergency call
        showEmergencyDialog(serviceType);
        // Share location automatically
        shareLocationWithEmergency(serviceType);
        // Track emergency response
        trackEmergencyResponse(serviceType);
    }
}

function showEmergencyDialog(serviceType) {
    const emergencyNumbers = {
        ambulance: '911 - Medical Emergency',
        fire: '911 - Fire Department',
        police: '911 - Police Emergency'
    };
    
    const modal = createModal(`
        <div class="emergency-call-modal">
            <h3>🚨 Emergency Call Initiated</h3>
            <p>Calling: ${emergencyNumbers[serviceType]}</p>
            <div class="emergency-status">
                <p>📍 Location: Sharing current location...</p>
                <p>⏱️ Response time: Calculating...</p>
                <div class="emergency-actions">
                    <button onclick="closeEmergencyCall()" class="cancel-btn">Cancel Call</button>
                    <button onclick="confirmEmergencyCall('${serviceType}')" class="confirm-btn">Confirm Emergency</button>
                </div>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function shareLocationWithEmergency(serviceType) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                
                showNotification(`Location shared with ${serviceType} services`, 'success');
                console.log('Location shared:', currentLocation);
            },
            function(error) {
                showNotification('Unable to get location. Please ensure location services are enabled.', 'error');
                console.error('Location error:', error);
            }
        );
    }
}

function trackEmergencyResponse(serviceType) {
    // Simulate emergency response tracking
    const statusUpdates = [
        'Emergency services notified',
        'Response team dispatched',
        'Estimated arrival: 8-12 minutes',
        'Response team en route'
    ];
    
    let updateIndex = 0;
    const interval = setInterval(() => {
        if (updateIndex < statusUpdates.length) {
            showNotification(statusUpdates[updateIndex], 'info');
            updateIndex++;
        } else {
            clearInterval(interval);
        }
    }, 3000);
}

// At-Home Care Module Functions
function openAtHomeCare() {
    const atHomeModule = document.getElementById('athome-module');
    atHomeModule.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    logUserAction('athome_care_opened');
}

function bookService(serviceType) {
    // Create booking modal
    const bookingModal = createBookingModal(serviceType);
    document.body.appendChild(bookingModal);
}

function createBookingModal(serviceType) {
    const serviceDetails = {
        dental: {
            name: 'Dental Checkup',
            description: 'Professional dental examination and cleaning at your home',
            price: '$120',
            duration: '45 minutes'
        },
        'bp-monitoring': {
            name: 'Blood Pressure Monitoring',
            description: 'Regular blood pressure checks and health monitoring',
            price: '$60',
            duration: '30 minutes'
        },
        physiotherapy: {
            name: 'Physiotherapy Session',
            description: 'Professional physiotherapy and rehabilitation',
            price: '$100',
            duration: '60 minutes'
        },
        nursing: {
            name: 'Nursing Care',
            description: 'Professional nursing services and health support',
            price: '$90',
            duration: '45 minutes'
        }
    };
    
    const service = serviceDetails[serviceType];
    
    const modal = createModal(`
        <div class="booking-modal">
            <h3>Book ${service.name}</h3>
            <div class="service-details">
                <p><strong>Service:</strong> ${service.description}</p>
                <p><strong>Price:</strong> ${service.price}</p>
                <p><strong>Duration:</strong> ${service.duration}</p>
            </div>
            
            <div class="booking-form">
                <div class="form-group">
                    <label>Preferred Date:</label>
                    <input type="date" id="booking-date" min="${new Date().toISOString().split('T')[0]}">
                </div>
                
                <div class="form-group">
                    <label>Preferred Time:</label>
                    <select id="booking-time">
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Payment Type:</label>
                    <div class="payment-selection">
                        <label><input type="radio" name="payment" value="one-time" checked> One-time Payment</label>
                        <label><input type="radio" name="payment" value="subscription"> Monthly Subscription</label>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button onclick="closeModal()" class="cancel-btn">Cancel</button>
                    <button onclick="confirmBooking('${serviceType}')" class="confirm-btn">Book Now</button>
                </div>
            </div>
        </div>
    `);
    
    return modal;
}

function confirmBooking(serviceType) {
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const paymentType = document.querySelector('input[name="payment"]:checked').value;
    
    if (!date) {
        showNotification('Please select a date', 'error');
        return;
    }
    
    // Simulate booking process
    showNotification('Processing your booking...', 'info');
    
    setTimeout(() => {
        const bookingId = generateBookingId();
        showNotification(`Booking confirmed! Booking ID: ${bookingId}`, 'success');
        
        // Show booking confirmation
        showBookingConfirmation(serviceType, date, time, paymentType, bookingId);
        
        closeModal();
        closeModule('athome-module');
    }, 2000);
}

function showBookingConfirmation(serviceType, date, time, paymentType, bookingId) {
    const confirmation = createModal(`
        <div class="booking-confirmation">
            <h3>✅ Booking Confirmed</h3>
            <div class="confirmation-details">
                <p><strong>Booking ID:</strong> ${bookingId}</p>
                <p><strong>Service:</strong> ${serviceType}</p>
                <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Payment:</strong> ${paymentType}</p>
            </div>
            <div class="confirmation-actions">
                <button onclick="trackAppointment('${bookingId}')" class="track-btn">Track Appointment</button>
                <button onclick="closeModal()" class="close-btn">Close</button>
            </div>
        </div>
    `);
    
    document.body.appendChild(confirmation);
}

// Utility Functions
function closeModule(moduleId) {
    const module = document.getElementById(moduleId);
    module.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
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
    
    return modal;
}

function closeModal() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        document.body.removeChild(modal);
    });
}

function performSearch(query) {
    if (!query.trim()) {
        showNotification('Please enter a search term', 'warning');
        return;
    }
    
    showNotification(`Searching for: ${query}`, 'info');
    
    // Simulate search results
    setTimeout(() => {
        const results = simulateSearchResults(query);
        displaySearchResults(results);
    }, 1000);
}

function simulateSearchResults(query) {
    const allServices = [
        { name: 'Emergency Ambulance', type: 'emergency', description: 'Fast emergency medical response' },
        { name: 'Dental Care', type: 'at-home', description: 'Professional dental services at home' },
        { name: 'Blood Pressure Check', type: 'at-home', description: 'Regular health monitoring' },
        { name: 'Physiotherapy', type: 'at-home', description: 'Recovery and rehabilitation therapy' },
        { name: 'Nursing Care', type: 'at-home', description: 'Professional nursing services' },
        { name: 'Medicine Delivery', type: 'pharmacy', description: 'Fast medication delivery' }
    ];
    
    return allServices.filter(service => 
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase())
    );
}

function displaySearchResults(results) {
    const searchResults = createModal(`
        <div class="search-results">
            <h3>Search Results</h3>
            <div class="results-list">
                ${results.length === 0 ? 
                    '<p>No services found. Try a different search term.</p>' :
                    results.map(result => `
                        <div class="result-item" onclick="selectService('${result.type}', '${result.name}')">
                            <h4>${result.name}</h4>
                            <p>${result.description}</p>
                            <span class="service-type">${result.type}</span>
                        </div>
                    `).join('')
                }
            </div>
            <button onclick="closeModal()" class="close-btn">Close</button>
        </div>
    `);
    
    document.body.appendChild(searchResults);
}

function selectService(type, name) {
    closeModal();
    
    if (type === 'emergency') {
        openEmergencyModule();
    } else if (type === 'at-home') {
        openAtHomeCare();
    } else {
        showNotification(`Selected: ${name}`, 'info');
    }
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                console.log('Location obtained:', currentLocation);
            },
            function(error) {
                console.error('Location error:', error);
                showNotification('Location access denied. Some features may be limited.', 'warning');
            }
        );
    }
}

function checkUserLocation() {
    getCurrentLocation();
}

function toggleUserMenu() {
    // Check if user is logged in
    const user = localStorage.getItem('healthworld_user');
    
    if (!user) {
        // Show login options
        const loginMenu = createModal(`
            <div class="user-menu">
                <h3>Welcome to Health World</h3>
                <p>Please sign in to access your dashboard</p>
                <div class="menu-options">
                    <button onclick="showSignupPopup()" class="login-btn">
                        <i class="fas fa-user-plus"></i> Create Account
                    </button>
                    <button onclick="showLoginForm()" class="login-btn">
                        <i class="fas fa-sign-in-alt"></i> Sign In
                    </button>
                </div>
            </div>
        `);
        document.body.appendChild(loginMenu);
    } else {
        // Show user menu for logged in users
        const userData = JSON.parse(user);
        const userMenu = createModal(`
            <div class="user-menu">
                <div class="user-info">
                    <div class="user-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="user-details">
                        <h3>${userData.name}</h3>
                        <p>${userData.email}</p>
                        <span class="user-type">${userData.type.charAt(0).toUpperCase() + userData.type.slice(1)}</span>
                    </div>
                </div>
                <div class="menu-options">
                    <button onclick="redirectToDashboard()">
                        <i class="fas fa-tachometer-alt"></i> Dashboard
                    </button>
                    <button onclick="showProfile()">
                        <i class="fas fa-user"></i> View Profile
                    </button>
                    <button onclick="showAppointments()">
                        <i class="fas fa-calendar"></i> My Appointments
                    </button>
                    <button onclick="showNotifications()">
                        <i class="fas fa-bell"></i> Notifications
                    </button>
                    <button onclick="showSettings()">
                        <i class="fas fa-cog"></i> Settings
                    </button>
                    <div class="menu-divider"></div>
                    <button onclick="logout()" class="logout-btn">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        `);
        document.body.appendChild(userMenu);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                z-index: 3000;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.3s ease;
            }
            .notification.info { background: #2563eb; }
            .notification.success { background: #10b981; }
            .notification.warning { background: #f59e0b; }
            .notification.error { background: #dc2626; }
            .notification button {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function generateBookingId() {
    return 'HW' + Date.now().toString().slice(-6);
}

function trackAppointment(bookingId) {
    closeModal();
    showNotification(`Tracking appointment ${bookingId}`, 'info');
    
    // Simulate tracking information
    setTimeout(() => {
        const tracking = createModal(`
            <div class="appointment-tracking">
                <h3>Appointment Tracking</h3>
                <div class="tracking-info">
                    <p><strong>Booking ID:</strong> ${bookingId}</p>
                    <p><strong>Status:</strong> Confirmed</p>
                    <p><strong>Care Provider:</strong> Will be assigned 24 hours before appointment</p>
                    <div class="tracking-timeline">
                        <div class="timeline-item completed">
                            <span>✅</span> Booking Confirmed
                        </div>
                        <div class="timeline-item pending">
                            <span>⏳</span> Care Provider Assignment
                        </div>
                        <div class="timeline-item pending">
                            <span>📞</span> Pre-appointment Call
                        </div>
                        <div class="timeline-item pending">
                            <span>🏠</span> Service Delivery
                        </div>
                    </div>
                </div>
                <button onclick="closeModal()" class="close-btn">Close</button>
            </div>
        `);
        
        document.body.appendChild(tracking);
    }, 1000);
}

function logUserAction(action) {
    console.log(`User action logged: ${action} at ${new Date().toISOString()}`);
    // In a real app, this would send analytics data to the server
}

function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function checkUserSession() {
    // Simulate checking for saved user session
    const savedUser = localStorage.getItem('healthworld_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        console.log('User session restored:', currentUser);
    }
}

// Placeholder functions for future implementation
function showProfile() {
    closeModal();
    const user = localStorage.getItem('healthworld_user');
    
    if (!user) {
        showNotification('Please sign in to view your profile', 'warning');
        return;
    }
    
    // Redirect to profile page instead of showing modal
    window.location.href = 'profile.html';
}

function showAppointments() {
    closeModal();
    const user = localStorage.getItem('healthworld_user');
    
    if (!user) {
        showNotification('Please sign in to view your appointments', 'warning');
        return;
    }
    
    const appointmentsModal = createModal(`
        <div class="appointments-modal">
            <h3><i class="fas fa-calendar-alt"></i> My Appointments</h3>
            <div class="appointments-content">
                <div class="appointments-filters">
                    <button class="filter-btn active" onclick="filterAppointments('all')">All</button>
                    <button class="filter-btn" onclick="filterAppointments('upcoming')">Upcoming</button>
                    <button class="filter-btn" onclick="filterAppointments('past')">Past</button>
                    <button class="filter-btn" onclick="filterAppointments('cancelled')">Cancelled</button>
                </div>
                
                <div class="appointments-list">
                    <div class="appointment-card upcoming">
                        <div class="appointment-date">
                            <span class="day">15</span>
                            <span class="month">Aug</span>
                        </div>
                        <div class="appointment-info">
                            <h4>Dental Checkup</h4>
                            <p><i class="fas fa-user-md"></i> Dr. Sarah Johnson</p>
                            <p><i class="fas fa-clock"></i> 10:00 AM - 11:00 AM</p>
                            <p><i class="fas fa-map-marker-alt"></i> Home Visit</p>
                        </div>
                        <div class="appointment-status upcoming">Upcoming</div>
                        <div class="appointment-actions">
                            <button onclick="rescheduleFromModal('apt-001')" class="action-btn">
                                <i class="fas fa-calendar"></i> Reschedule
                            </button>
                            <button onclick="cancelFromModal('apt-001')" class="action-btn cancel">
                                <i class="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    </div>
                    
                    <div class="appointment-card past">
                        <div class="appointment-date">
                            <span class="day">10</span>
                            <span class="month">Aug</span>
                        </div>
                        <div class="appointment-info">
                            <h4>Blood Pressure Check</h4>
                            <p><i class="fas fa-user-nurse"></i> Nurse Maria Lopez</p>
                            <p><i class="fas fa-clock"></i> 2:00 PM - 2:30 PM</p>
                            <p><i class="fas fa-map-marker-alt"></i> Home Visit</p>
                        </div>
                        <div class="appointment-status completed">Completed</div>
                        <div class="appointment-actions">
                            <button onclick="rateAppointment('apt-002')" class="action-btn">
                                <i class="fas fa-star"></i> Rate
                            </button>
                            <button onclick="bookAgain('apt-002')" class="action-btn">
                                <i class="fas fa-redo"></i> Book Again
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="appointments-empty" style="display: none;">
                    <i class="fas fa-calendar-times"></i>
                    <h4>No appointments found</h4>
                    <p>You don't have any appointments in this category</p>
                    <button onclick="bookNewAppointmentFromModal()" class="book-new-btn">
                        <i class="fas fa-plus"></i> Book New Appointment
                    </button>
                </div>
            </div>
        </div>
    `);
    
    document.body.appendChild(appointmentsModal);
}

function showNotifications() {
    closeModal();
    const user = localStorage.getItem('healthworld_user');
    
    if (!user) {
        showNotification('Please sign in to view notifications', 'warning');
        return;
    }
    
    const notificationsModal = createModal(`
        <div class="notifications-modal">
            <h3><i class="fas fa-bell"></i> Notifications</h3>
            <div class="notifications-header">
                <div class="notification-stats">
                    <span class="unread-count">2 unread</span>
                    <button onclick="markAllNotificationsRead()" class="mark-all-btn">Mark all as read</button>
                </div>
            </div>
            
            <div class="notifications-list">
                <div class="notification-item unread">
                    <div class="notification-icon appointment">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="notification-content">
                        <h4>Appointment Reminder</h4>
                        <p>Your dental checkup is scheduled for tomorrow at 10:00 AM</p>
                        <div class="notification-actions">
                            <button onclick="viewAppointmentDetails('apt-001')" class="notification-action">View Details</button>
                            <button onclick="rescheduleFromNotification('apt-001')" class="notification-action">Reschedule</button>
                        </div>
                        <span class="notification-time">2 hours ago</span>
                    </div>
                </div>
                
                <div class="notification-item unread">
                    <div class="notification-icon health">
                        <i class="fas fa-file-medical"></i>
                    </div>
                    <div class="notification-content">
                        <h4>Health Report Available</h4>
                        <p>Your recent blood pressure test results are now ready for review</p>
                        <div class="notification-actions">
                            <button onclick="viewHealthReport('hr-001')" class="notification-action">View Report</button>
                            <button onclick="shareWithDoctor('hr-001')" class="notification-action">Share with Doctor</button>
                        </div>
                        <span class="notification-time">1 day ago</span>
                    </div>
                </div>
                
                <div class="notification-item read">
                    <div class="notification-icon rating">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="notification-content">
                        <h4>Rate Your Experience</h4>
                        <p>How was your recent physiotherapy session with Mike Chen?</p>
                        <div class="notification-actions">
                            <button onclick="rateService('apt-003')" class="notification-action">Rate Now</button>
                        </div>
                        <span class="notification-time">3 days ago</span>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    document.body.appendChild(notificationsModal);
}

function showSettings() {
    closeModal();
    const user = localStorage.getItem('healthworld_user');
    
    if (!user) {
        showNotification('Please sign in to access settings', 'warning');
        return;
    }
    
    const settingsModal = createModal(`
        <div class="settings-modal">
            <h3><i class="fas fa-cog"></i> Settings</h3>
            <div class="settings-navigation">
                <button class="settings-tab active" onclick="showSettingsTab('account')">
                    <i class="fas fa-user"></i> Account
                </button>
                <button class="settings-tab" onclick="showSettingsTab('notifications')">
                    <i class="fas fa-bell"></i> Notifications
                </button>
                <button class="settings-tab" onclick="showSettingsTab('privacy')">
                    <i class="fas fa-shield-alt"></i> Privacy
                </button>
                <button class="settings-tab" onclick="showSettingsTab('billing')">
                    <i class="fas fa-credit-card"></i> Billing
                </button>
            </div>
            
            <div id="account-settings" class="settings-content active">
                <h4>Account Settings</h4>
                <div class="settings-options">
                    <div class="setting-item">
                        <div class="setting-info">
                            <h5>Profile Information</h5>
                            <p>Update your personal information and contact details</p>
                        </div>
                        <button onclick="editProfile()" class="setting-action">Edit</button>
                    </div>
                    <div class="setting-item">
                        <div class="setting-info">
                            <h5>Change Password</h5>
                            <p>Update your account password for security</p>
                        </div>
                        <button onclick="changePassword()" class="setting-action">Change</button>
                    </div>
                    <div class="setting-item">
                        <div class="setting-info">
                            <h5>Two-Factor Authentication</h5>
                            <p>Add an extra layer of security to your account</p>
                        </div>
                        <button onclick="setupTwoFactor()" class="setting-action">Enable</button>
                    </div>
                </div>
            </div>
            
            <div id="notifications-settings" class="settings-content">
                <h4>Notification Preferences</h4>
                <div class="notification-settings">
                    <div class="notification-group">
                        <h5>Appointment Reminders</h5>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span class="toggle-slider"></span>
                            <span>Email notifications</span>
                        </label>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span class="toggle-slider"></span>
                            <span>SMS notifications</span>
                        </label>
                    </div>
                    <div class="notification-group">
                        <h5>Health Updates</h5>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span class="toggle-slider"></span>
                            <span>Test results</span>
                        </label>
                        <label class="toggle-switch">
                            <input type="checkbox">
                            <span class="toggle-slider"></span>
                            <span>Health tips</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    document.body.appendChild(settingsModal);
}

function logout() {
    closeModal();
    const user = localStorage.getItem('healthworld_user');
    
    if (!user) {
        showNotification('You are not signed in', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to sign out?')) {
        localStorage.removeItem('healthworld_user');
        localStorage.removeItem('healthworld_profile');
        localStorage.removeItem('verification_progress');
        
        showNotification('Signed out successfully', 'success');
        
        // Update UI
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
}

function showSignupPopup() {
    const signupModal = createModal(`
        <div class="signup-modal">
            <h3><i class="fas fa-user-plus"></i> Create Account</h3>
            <div class="signup-tabs">
                <button class="signup-tab active" onclick="showSignupTab('patient')">
                    <i class="fas fa-user"></i> Patient
                </button>
                <button class="signup-tab" onclick="showSignupTab('provider')">
                    <i class="fas fa-user-md"></i> Healthcare Provider
                </button>
                <button class="signup-tab" onclick="showSignupTab('pharmacy')">
                    <i class="fas fa-pills"></i> Pharmacy
                </button>
            </div>
            
            <form onsubmit="handleSignup(event)" id="signupForm">
                <div id="patient-signup" class="signup-content active">
                    <div class="form-row">
                        <div class="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" required placeholder="Enter first name">
                        </div>
                        <div class="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" required placeholder="Enter last name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" required placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" required placeholder="Enter phone number">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" required placeholder="Enter password" minlength="8">
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" required placeholder="Confirm password">
                    </div>
                </div>
                
                <div id="provider-signup" class="signup-content">
                    <div class="form-row">
                        <div class="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" placeholder="Enter first name">
                        </div>
                        <div class="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" placeholder="Enter last name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label>License Number</label>
                        <input type="text" name="license" placeholder="Enter license number">
                    </div>
                    <div class="form-group">
                        <label>Specialization</label>
                        <select name="specialization">
                            <option value="">Select specialization</option>
                            <option value="general">General Practice</option>
                            <option value="cardiology">Cardiology</option>
                            <option value="dermatology">Dermatology</option>
                            <option value="pediatrics">Pediatrics</option>
                            <option value="nursing">Nursing</option>
                            <option value="physiotherapy">Physiotherapy</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter password" minlength="8">
                    </div>
                </div>
                
                <div id="pharmacy-signup" class="signup-content">
                    <div class="form-group">
                        <label>Pharmacy Name</label>
                        <input type="text" name="pharmacyName" placeholder="Enter pharmacy name">
                    </div>
                    <div class="form-group">
                        <label>License Number</label>
                        <input type="text" name="license" placeholder="Enter pharmacy license">
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" name="address" placeholder="Enter address">
                    </div>
                    <div class="form-group">
                        <label>Contact Email</label>
                        <input type="email" name="email" placeholder="Enter contact email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter password" minlength="8">
                    </div>
                </div>
                
                <div class="form-options">
                    <label class="agreement">
                        <input type="checkbox" name="terms" required>
                        <span>I agree to the <a href="#" onclick="showTerms()">Terms of Service</a> and <a href="#" onclick="showPrivacy()">Privacy Policy</a></span>
                    </label>
                </div>
                
                <button type="submit" class="signup-btn">Create Account</button>
            </form>
            
            <div class="login-divider">
                <span>Already have an account?</span>
            </div>
            <button onclick="showLoginForm()" class="switch-to-login-btn">
                Sign In
            </button>
        </div>
    `);
    
    document.body.appendChild(signupModal);
}

function showSignupTab(type) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.signup-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.signup-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Show corresponding content
    const content = document.getElementById(type + '-signup');
    if (content) {
        content.classList.add('active');
    }
    
    // Update form data attribute for submission
    document.getElementById('signupForm').setAttribute('data-type', type);
}

function handleSignup(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const accountType = event.target.getAttribute('data-type') || 'patient';
    
    // Basic validation
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (accountType === 'patient' && password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    showNotification('Creating your account...', 'info');
    
    setTimeout(() => {
        // Create user data
        const userData = {
            id: 'user-' + Date.now(),
            name: accountType === 'pharmacy' ? 
                formData.get('pharmacyName') : 
                `${formData.get('firstName')} ${formData.get('lastName')}`,
            email: formData.get('email'),
            type: accountType,
            status: accountType === 'patient' ? 'active' : 'pending_verification'
        };
        
        localStorage.setItem('healthworld_user', JSON.stringify(userData));
        
        closeModal();
        showNotification('Account created successfully!', 'success');
        
        // Redirect based on account type
        setTimeout(() => {
            if (accountType === 'patient') {
                window.location.href = 'dashboard.html';
            } else {
                window.location.href = 'verification.html';
            }
        }, 1500);
    }, 2000);
}

function redirectToDashboard() {
    closeModal();
    window.location.href = 'dashboard.html';
}

function showLoginForm() {
    closeModal();
    const loginModal = createModal(`
        <div class="login-modal">
            <h3><i class="fas fa-sign-in-alt"></i> Sign In</h3>
            <form onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" required placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" required placeholder="Enter your password">
                </div>
                <div class="form-options">
                    <label class="remember-me">
                        <input type="checkbox" name="remember">
                        <span>Remember me</span>
                    </label>
                    <a href="#" onclick="showForgotPassword()">Forgot password?</a>
                </div>
                <button type="submit" class="login-btn">Sign In</button>
            </form>
            <div class="login-divider">
                <span>Don't have an account?</span>
            </div>
            <button onclick="showSignupPopup()" class="create-account-btn">
                Create New Account
            </button>
        </div>
    `);
    
    document.body.appendChild(loginModal);
}

function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Simulate login process
    showNotification('Signing in...', 'info');
    
    setTimeout(() => {
        // Create mock user data
        const userData = {
            id: 'user-' + Date.now(),
            name: 'John Doe',
            email: formData.get('email'),
            type: 'patient',
            status: 'active'
        };
        
        localStorage.setItem('healthworld_user', JSON.stringify(userData));
        
        closeModal();
        showNotification('Signed in successfully!', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 2000);
}

function editProfile() {
    showNotification('Profile editing feature is being developed', 'info');
}

function filterAppointments(filter) {
    // Remove active class from all filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Filter appointments (simplified for demo)
    const appointments = document.querySelectorAll('.appointment-card');
    appointments.forEach(apt => {
        if (filter === 'all' || apt.classList.contains(filter)) {
            apt.style.display = 'flex';
        } else {
            apt.style.display = 'none';
        }
    });
}

function closeEmergencyCall() {
    closeModal();
    showNotification('Emergency call cancelled', 'info');
}

function confirmEmergencyCall(serviceType) {
    closeModal();
    showNotification(`Emergency call confirmed for ${serviceType}`, 'success');
    // In a real app, this would actually initiate the emergency call
}
