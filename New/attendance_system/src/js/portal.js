document.addEventListener('DOMContentLoaded', function() {
    initializePortal();
});

function initializePortal() {
    document.getElementById('punchInBtn')
        .addEventListener('click', handlePunchIn);
    document.getElementById('punchOutBtn')
        .addEventListener('click', handlePunchOut);
    document.getElementById('leaveRequestForm')
        .addEventListener('submit', handleLeaveRequest);
}

async function handlePunchIn() {
    try {
        const response = await fetch('/api/punch-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        updatePunchStatus('in', data);
    } catch (error) {
        console.error('Error:', error);
    }
}
