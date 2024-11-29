function checkAttendance() {
    const scheduledShifts = getScheduledShifts();
    scheduledShifts.forEach(shift => {
        const shiftStart = new Date(shift.startTime);
        const currentTime = new Date();
        
        if (currentTime > shiftStart && !shift.checkedIn) {
            sendReminderEmail(shift.employeeEmail, {
                type: 'check-in',
                scheduledTime: shiftStart
            });
        }
    });
}

function checkOvertime() {
    const activeShifts = getActiveShifts();
    activeShifts.forEach(shift => {
        const shiftEnd = new Date(shift.endTime);
        const currentTime = new Date();
        
        if (currentTime > shiftEnd && !shift.checkedOut) {
            sendOvertimePrompt(shift.employeeEmail);
            
            // Auto-close shift at midnight
            if (currentTime.getHours() === 23 && 
                currentTime.getMinutes() === 59) {
                closeShift(shift.id, shift.scheduledEndTime);
            }
        }
    });
}