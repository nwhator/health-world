// Provider Dashboard JavaScript

let currentProvider = null;
let serviceRequests = [];
let todaysSchedule = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeProviderDashboard();
    loadServiceRequests();
    loadTodaysSchedule();
    setupProviderEventListeners();
});

function initializeProviderDashboard() {
    console.log('Provider Dashboard initialized');
    
    // Mock provider data (in real app, this would come from authentication)
    currentProvider = {
        id: 'provider-001',
        name: 'Dr. Sarah Johnson',
        type: 'General Practitioner',
        specialties: ['General Medicine', 'Family Practice'],
        rating: 4.8,
        availability: 'online',
        location: 'New York, NY'
    };
    
    updateProviderInterface();
    startRequestPolling();
}

function updateProviderInterface() {
    if (currentProvider) {
        document.getElementById('provider-name').textContent = currentProvider.name;
        document.getElementById('provider-welcome-name').textContent = currentProvider.name.split(' ')[1];
    }
}

function loadServiceRequests() {
    // Load service requests from localStorage
    const requests = JSON.parse(localStorage.getItem('healthworld_service_requests') || '[]');
    serviceRequests = requests.filter(req => req.status === 'pending');
    
    document.getElementById('pending-requests-count').textContent = serviceRequests.length;
    document.getElementById('pending-requests').textContent = serviceRequests.length;
    
    displayServiceRequests();
}

function displayServiceRequests() {
    const container = document.getElementById('requests-container');
    
    if (serviceRequests.length === 0) {
        container.innerHTML = `
            <div class="no-requests">
                <i class="fas fa-clipboard-check"></i>
                <h3>No pending requests</h3>
                <p>You're all caught up! New service requests will appear here.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = serviceRequests.map(request => `
        <div class="request-card ${request.urgency}" data-type="${request.type}">
            <div class="request-header">
                <div class="request-type">
                    <i class="fas ${getRequestIcon(request.type)}"></i>
                    <span>${request.type.charAt(0).toUpperCase() + request.type.slice(1)}</span>
                </div>
                <div class="request-urgency ${request.urgency}">
                    ${request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                </div>
            </div>
            
            <div class="request-details">
                <div class="patient-info">
                    <h4>${request.customer.name}</h4>
                    <p><i class="fas fa-map-marker-alt"></i> ${request.location || 'Location not specified'}</p>
                </div>
                
                <div class="request-info">
                    ${request.serviceType ? `<p><strong>Service:</strong> ${request.serviceType}</p>` : ''}
                    ${request.date ? `<p><strong>Preferred Date:</strong> ${formatDate(request.date)}</p>` : ''}
                    ${request.time ? `<p><strong>Preferred Time:</strong> ${request.time}</p>` : ''}
                    ${request.budget ? `<p><strong>Budget:</strong> ${request.budget}</p>` : ''}
                    ${request.description ? `<p><strong>Description:</strong> ${request.description}</p>` : ''}
                    ${request.symptoms ? `<p><strong>Symptoms:</strong> ${request.symptoms}</p>` : ''}
                </div>
                
                <div class="request-meta">
                    <span class="request-time">
                        <i class="fas fa-clock"></i>
                        ${formatTimeAgo(request.requestDate)}
                    </span>
                </div>
            </div>
            
            <div class="request-actions">
                <button onclick="acceptRequest('${request.id}')" class="accept-btn">
                    <i class="fas fa-check"></i> Accept
                </button>
                <button onclick="viewRequestDetails('${request.id}')" class="details-btn">
                    <i class="fas fa-eye"></i> Details
                </button>
                <button onclick="declineRequest('${request.id}')" class="decline-btn">
                    <i class="fas fa-times"></i> Decline
                </button>
            </div>
        </div>
    `).join('');
}

function getRequestIcon(type) {
    const icons = {
        'appointment': 'fa-calendar-plus',
        'prescription': 'fa-prescription',
        'urgent-care': 'fa-user-md',
        'emergency-nurse': 'fa-user-nurse',
        'emergency': 'fa-ambulance'
    };
    return icons[type] || 'fa-clipboard';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
}

function acceptRequest(requestId) {
    const request = serviceRequests.find(req => req.id === requestId);
    if (!request) return;
    
    // Update request status
    request.status = 'accepted';
    request.acceptedBy = currentProvider;
    request.acceptedDate = new Date().toISOString();
    
    // Update in localStorage
    updateServiceRequestInStorage(request);
    
    // Remove from current display
    serviceRequests = serviceRequests.filter(req => req.id !== requestId);
    displayServiceRequests();
    
    // Add to today's schedule if it's for today
    if (request.date === new Date().toISOString().split('T')[0]) {
        addToTodaysSchedule(request);
    }
    
    showNotification(`Request accepted! Contact ${request.customer.name} to confirm details.`, 'success');
    
    // Send notification to customer (in real app)
    notifyCustomer(request, 'accepted');
}

function declineRequest(requestId) {
    const request = serviceRequests.find(req => req.id === requestId);
    if (!request) return;
    
    const modal = createModal(`
        <div class="decline-modal">
            <h3>Decline Request</h3>
            <p>Are you sure you want to decline this request from ${request.customer.name}?</p>
            <div class="form-group">
                <label>Reason (optional)</label>
                <textarea id="decline-reason" placeholder="Provide a reason for declining..."></textarea>
            </div>
            <div class="form-actions">
                <button onclick="closeModal()" class="cancel-btn">Cancel</button>
                <button onclick="confirmDecline('${requestId}')" class="decline-btn">Decline Request</button>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

function confirmDecline(requestId) {
    const request = serviceRequests.find(req => req.id === requestId);
    const reason = document.getElementById('decline-reason').value;
    
    request.status = 'declined';
    request.declinedBy = currentProvider;
    request.declineReason = reason;
    request.declinedDate = new Date().toISOString();
    
    updateServiceRequestInStorage(request);
    
    serviceRequests = serviceRequests.filter(req => req.id !== requestId);
    displayServiceRequests();
    
    closeModal();
    showNotification('Request declined', 'info');
    
    notifyCustomer(request, 'declined');
}

function viewRequestDetails(requestId) {
    const request = serviceRequests.find(req => req.id === requestId);
    if (!request) return;
    
    const modal = createModal(`
        <div class="request-details-modal">
            <h3>Request Details</h3>
            <div class="detail-sections">
                <div class="detail-section">
                    <h4>Patient Information</h4>
                    <p><strong>Name:</strong> ${request.customer.name}</p>
                    <p><strong>Email:</strong> ${request.customer.email}</p>
                    <p><strong>Type:</strong> ${request.customer.type}</p>
                </div>
                
                <div class="detail-section">
                    <h4>Service Details</h4>
                    <p><strong>Type:</strong> ${request.type}</p>
                    ${request.serviceType ? `<p><strong>Service:</strong> ${request.serviceType}</p>` : ''}
                    <p><strong>Urgency:</strong> ${request.urgency}</p>
                    ${request.location ? `<p><strong>Location:</strong> ${request.location}</p>` : ''}
                </div>
                
                <div class="detail-section">
                    <h4>Appointment Details</h4>
                    ${request.date ? `<p><strong>Date:</strong> ${formatDate(request.date)}</p>` : ''}
                    ${request.time ? `<p><strong>Time:</strong> ${request.time}</p>` : ''}
                    ${request.budget ? `<p><strong>Budget:</strong> ${request.budget}</p>` : ''}
                </div>
                
                ${request.description || request.symptoms ? `
                <div class="detail-section">
                    <h4>Additional Information</h4>
                    ${request.description ? `<p><strong>Description:</strong> ${request.description}</p>` : ''}
                    ${request.symptoms ? `<p><strong>Symptoms:</strong> ${request.symptoms}</p>` : ''}
                </div>
                ` : ''}
            </div>
            
            <div class="modal-actions">
                <button onclick="acceptRequest('${requestId}'); closeModal();" class="accept-btn">
                    <i class="fas fa-check"></i> Accept Request
                </button>
                <button onclick="closeModal()" class="cancel-btn">Close</button>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

function updateServiceRequestInStorage(request) {
    let allRequests = JSON.parse(localStorage.getItem('healthworld_service_requests') || '[]');
    const index = allRequests.findIndex(req => req.id === request.id);
    if (index !== -1) {
        allRequests[index] = request;
        localStorage.setItem('healthworld_service_requests', JSON.stringify(allRequests));
    }
}

function notifyCustomer(request, action) {
    // In a real app, this would send push notifications or emails
    console.log(`Notifying ${request.customer.name}: Request ${action} by ${currentProvider.name}`);
}

function loadTodaysSchedule() {
    // Mock today's schedule
    todaysSchedule = [
        {
            id: 'apt-001',
            time: '09:00',
            patient: 'John Smith',
            type: 'General Checkup',
            location: 'Clinic',
            status: 'confirmed'
        },
        {
            id: 'apt-002', 
            time: '10:30',
            patient: 'Mary Johnson',
            type: 'Follow-up',
            location: 'Home Visit',
            status: 'confirmed'
        },
        {
            id: 'apt-003',
            time: '14:00',
            patient: 'Robert Davis',
            type: 'Consultation',
            location: 'Telemedicine',
            status: 'pending'
        }
    ];
    
    displayTodaysSchedule();
}

function displayTodaysSchedule() {
    const container = document.getElementById('todays-schedule');
    
    if (todaysSchedule.length === 0) {
        container.innerHTML = `
            <div class="no-schedule">
                <i class="fas fa-calendar-check"></i>
                <h4>No appointments today</h4>
                <p>Your schedule is free today.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = todaysSchedule.map(appointment => `
        <div class="schedule-item ${appointment.status}">
            <div class="schedule-time">
                <span class="time">${appointment.time}</span>
            </div>
            <div class="schedule-details">
                <h4>${appointment.patient}</h4>
                <p><i class="fas fa-stethoscope"></i> ${appointment.type}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${appointment.location}</p>
            </div>
            <div class="schedule-status">
                <span class="status-badge ${appointment.status}">${appointment.status}</span>
            </div>
            <div class="schedule-actions">
                <button onclick="viewPatientRecord('${appointment.id}')" class="action-btn-sm">
                    <i class="fas fa-user"></i>
                </button>
                <button onclick="startAppointment('${appointment.id}')" class="action-btn-sm">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function addToTodaysSchedule(request) {
    const appointment = {
        id: request.id,
        time: request.time,
        patient: request.customer.name,
        type: request.serviceType || request.type,
        location: request.location,
        status: 'confirmed'
    };
    
    todaysSchedule.push(appointment);
    todaysSchedule.sort((a, b) => a.time.localeCompare(b.time));
    displayTodaysSchedule();
}

function filterRequests(type) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter and display requests
    const filteredRequests = type === 'all' ? 
        JSON.parse(localStorage.getItem('healthworld_service_requests') || '[]').filter(req => req.status === 'pending') :
        JSON.parse(localStorage.getItem('healthworld_service_requests') || '[]').filter(req => req.status === 'pending' && req.type === type);
    
    serviceRequests = filteredRequests;
    displayServiceRequests();
}

function toggleAvailability() {
    const currentStatus = currentProvider.availability;
    currentProvider.availability = currentStatus === 'online' ? 'offline' : 'online';
    
    const statusCard = document.querySelector('.stat-card.online');
    const statusElement = statusCard.querySelector('.stat-status');
    
    if (currentProvider.availability === 'online') {
        statusCard.classList.add('online');
        statusCard.classList.remove('offline');
        statusElement.innerHTML = '<i class="fas fa-circle"></i><span>Online</span>';
        showNotification('You are now available for new requests', 'success');
    } else {
        statusCard.classList.add('offline');
        statusCard.classList.remove('online');
        statusElement.innerHTML = '<i class="fas fa-circle"></i><span>Offline</span>';
        showNotification('You are now offline - no new requests will be received', 'info');
    }
}

function startRequestPolling() {
    // Poll for new requests every 30 seconds
    setInterval(() => {
        const previousCount = serviceRequests.length;
        loadServiceRequests();
        
        if (serviceRequests.length > previousCount) {
            showNotification('New service request received!', 'info');
        }
    }, 30000);
}

function setupProviderEventListeners() {
    // Add any additional event listeners for provider interface
}

// Provider action functions
function createAvailability() {
    showNotification('Availability settings coming soon!', 'info');
}

function viewPatientRecords() {
    showNotification('Patient records system coming soon!', 'info');
}

function writePrescription() {
    showNotification('Prescription writing system coming soon!', 'info');
}

function sendInvoice() {
    showNotification('Invoicing system coming soon!', 'info');
}

function viewEarnings() {
    showNotification('Earnings dashboard coming soon!', 'info');
}

function providerSupport() {
    showNotification('Provider support system coming soon!', 'info');
}

function viewFullSchedule() {
    showNotification('Full schedule view coming soon!', 'info');
}

function viewPatientRecord(appointmentId) {
    showNotification('Patient record system coming soon!', 'info');
}

function startAppointment(appointmentId) {
    showNotification('Appointment system coming soon!', 'info');
}

// Utility functions
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            ${content}
        </div>
    `;
    
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

function showNotification(message, type = 'info') {
    // Reuse the notification system from main.js
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        alert(message); // Fallback
    }
}
