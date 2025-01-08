document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
    initializeEventListeners();
});

function loadDashboardData() {
    fetch('/api/dashboard-data')
        .then(response => response.json())
        .then(data => {
            updateAttendanceTable(data.attendance);
            updateLeaveRequests(data.leaves);
        })
        .catch(error => console.error('Error:', error));
}

function initializeEventListeners() {
    document.getElementById('leaveRequestsTable')
        .addEventListener('click', handleLeaveAction);
}

function handleLeaveAction(event) {
    if (event.target.classList.contains('action-button')) {
        const requestId = event.target.dataset.requestId;
        const action = event.target.dataset.action;
        updateLeaveStatus(requestId, action);
    }
}
