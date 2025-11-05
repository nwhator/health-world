// Profile page functionality
document.addEventListener('DOMContentLoaded', function() {
    checkAuthenticationAndLoadProfile();
});

function checkAuthenticationAndLoadProfile() {
    const user = localStorage.getItem('healthworld_user');
    
    if (!user) {
        // Redirect to home page if not logged in
        window.location.href = 'index.html?redirect=profile';
        return;
    }
    
    const userData = JSON.parse(user);
    loadProfileData(userData);
}

function loadProfileData(userData) {
    // Load profile header info
    const profileInfo = document.getElementById('profileInfo');
    if (profileInfo) {
        profileInfo.innerHTML = `
            <h1>${userData.name}</h1>
            <p><i class="fas fa-envelope"></i> ${userData.email}</p>
            <p><i class="fas fa-phone"></i> +1 (555) 123-4567</p>
            <p><i class="fas fa-calendar"></i> Member since August 2025</p>
            <span class="profile-badge-page ${userData.type}">${userData.type.charAt(0).toUpperCase() + userData.type.slice(1)}</span>
        `;
    }
    
    // Load personal information
    const personalInfo = document.getElementById('personalInfo');
    if (personalInfo) {
        personalInfo.innerHTML = `
            <div class="info-item">
                <label>Full Name</label>
                <span>${userData.name}</span>
            </div>
            <div class="info-item">
                <label>Email</label>
                <span>${userData.email}</span>
            </div>
            <div class="info-item">
                <label>Phone</label>
                <span>+1 (555) 123-4567</span>
            </div>
            <div class="info-item">
                <label>Date of Birth</label>
                <span>January 15, 1990</span>
            </div>
            <div class="info-item">
                <label>Address</label>
                <span>123 Main St, City, State 12345</span>
            </div>
            <div class="info-item">
                <label>Emergency Contact</label>
                <span>Jane Doe - +1 (555) 987-6543</span>
            </div>
        `;
    }
    
    // Load activity stats
    const activityStats = document.getElementById('activityStats');
    if (activityStats) {
        activityStats.innerHTML = `
            <div class="stat">
                <span class="stat-number">15</span>
                <span class="stat-label">Total Appointments</span>
            </div>
            <div class="stat">
                <span class="stat-number">3</span>
                <span class="stat-label">This Month</span>
            </div>
            <div class="stat">
                <span class="stat-number">4.8</span>
                <span class="stat-label">Avg Rating</span>
            </div>
            <div class="stat">
                <span class="stat-number">12</span>
                <span class="stat-label">Health Records</span>
            </div>
        `;
    }
    
    // Load recent appointments
    const recentAppointments = document.getElementById('recentAppointments');
    if (recentAppointments) {
        recentAppointments.innerHTML = `
            <div class="appointment-mini" onclick="viewAppointmentDetails('apt-001')">
                <div class="appointment-mini-date">
                    <span class="day">15</span>
                    <span class="month">Aug</span>
                </div>
                <div class="appointment-mini-info">
                    <h4>Dental Checkup</h4>
                    <p><i class="fas fa-user-md"></i> Dr. Sarah Johnson</p>
                </div>
            </div>
            <div class="appointment-mini" onclick="viewAppointmentDetails('apt-002')">
                <div class="appointment-mini-date">
                    <span class="day">18</span>
                    <span class="month">Aug</span>
                </div>
                <div class="appointment-mini-info">
                    <h4>Physical Therapy</h4>
                    <p><i class="fas fa-user-nurse"></i> Mike Chen</p>
                </div>
            </div>
            <div class="appointment-mini" onclick="viewAppointmentDetails('apt-003')">
                <div class="appointment-mini-date">
                    <span class="day">22</span>
                    <span class="month">Aug</span>
                </div>
                <div class="appointment-mini-info">
                    <h4>Blood Pressure Check</h4>
                    <p><i class="fas fa-user-nurse"></i> Nurse Maria Lopez</p>
                </div>
            </div>
        `;
    }
    
    // Load health records
    const healthRecords = document.getElementById('healthRecords');
    if (healthRecords) {
        healthRecords.innerHTML = `
            <div class="health-record-item" onclick="viewHealthReport('hr-001')">
                <div class="health-record-info">
                    <h4>Blood Pressure Test</h4>
                    <p>August 10, 2025 - Dr. Sarah Johnson</p>
                </div>
                <div class="health-record-status normal">Normal</div>
            </div>
            <div class="health-record-item" onclick="viewHealthReport('hr-002')">
                <div class="health-record-info">
                    <h4>Cholesterol Screening</h4>
                    <p>July 28, 2025 - Dr. Michael Chen</p>
                </div>
                <div class="health-record-status normal">Normal</div>
            </div>
            <div class="health-record-item" onclick="viewHealthReport('hr-003')">
                <div class="health-record-info">
                    <h4>Annual Physical</h4>
                    <p>June 15, 2025 - Dr. Sarah Johnson</p>
                </div>
                <div class="health-record-status attention">Follow-up</div>
            </div>
        `;
    }
}

// Profile actions
function editPersonalInfo() {
    const editModal = createModal(`
        <div class="edit-info-modal">
            <h3><i class="fas fa-edit"></i> Edit Personal Information</h3>
            <form onsubmit="savePersonalInfo(event)">
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" value="John" required>
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value="Doe" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="john.doe@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" value="+1 (555) 123-4567" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" id="address" name="address" value="123 Main St, City, State 12345" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="emergencyName">Emergency Contact Name</label>
                        <input type="text" id="emergencyName" name="emergencyName" value="Jane Doe" required>
                    </div>
                    <div class="form-group">
                        <label for="emergencyPhone">Emergency Contact Phone</label>
                        <input type="tel" id="emergencyPhone" name="emergencyPhone" value="+1 (555) 987-6543" required>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="save-btn">
                        <i class="fas fa-save"></i> Save Changes
                    </button>
                    <button type="button" onclick="closeModal()" class="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(editModal);
}

function savePersonalInfo(event) {
    event.preventDefault();
    showNotification('Personal information updated successfully!', 'success');
    closeModal();
    // Reload profile data
    setTimeout(() => {
        location.reload();
    }, 1500);
}

function viewAllHealthRecords() {
    window.location.href = 'dashboard.html#health-records';
}

function notificationSettings() {
    showSettings();
    // Focus on notifications tab
    setTimeout(() => {
        showSettingsTab('notifications');
    }, 500);
}

function privacySettings() {
    showSettings();
    // Focus on privacy tab
    setTimeout(() => {
        showSettingsTab('privacy');
    }, 500);
}

// Preference updates
function updateLanguage() {
    const language = document.getElementById('languageSelect').value;
    showNotification(`Language updated to ${language}`, 'success');
    // Here you would implement actual language switching
}

function updateTimezone() {
    const timezone = document.getElementById('timezoneSelect').value;
    showNotification(`Timezone updated to ${timezone}`, 'success');
    // Here you would implement actual timezone switching
}

function updateTheme() {
    const theme = document.getElementById('themeSelect').value;
    showNotification(`Theme updated to ${theme} mode`, 'success');
    // Here you would implement actual theme switching
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

// Make functions globally available
window.editPersonalInfo = editPersonalInfo;
window.savePersonalInfo = savePersonalInfo;
window.viewAllHealthRecords = viewAllHealthRecords;
window.notificationSettings = notificationSettings;
window.privacySettings = privacySettings;
window.updateLanguage = updateLanguage;
window.updateTimezone = updateTimezone;
window.updateTheme = updateTheme;
