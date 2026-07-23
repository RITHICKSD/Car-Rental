// Dashboard JS - Chart.js Initialization & Dashboard Interactions

document.addEventListener('DOMContentLoaded', () => {

    // ========================
    // SIDEBAR ACTIVE LINK
    // ========================
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ========================
    // SPENDING / REVENUE CHART
    // ========================
    const spendingCtx = document.getElementById('spendingChart');
    if (spendingCtx) {
        new Chart(spendingCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Rental Spend (₹)',
                    data: [2200, 1800, 3500, 2900, 4200, 3800, 5100],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59,130,246,0.12)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#3b82f6',
                    pointRadius: 5,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(148,163,184,0.15)' }
                    },
                    x: {
                        grid: { color: 'rgba(148,163,184,0.15)' }
                    }
                }
            }
        });
    }

    // ========================
    // BOOKING STATUS PIE CHART
    // ========================
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Active', 'Completed', 'Cancelled', 'Extended'],
                datasets: [{
                    data: [3, 12, 2, 5],
                    backgroundColor: ['#3b82f6', '#10b981', '#ef4444', '#f59e0b'],
                    borderWidth: 2,
                    borderColor: 'transparent',
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                },
                cutout: '65%'
            }
        });
    }

    // ========================
    // ADMIN REVENUE BAR CHART
    // ========================
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                    {
                        label: 'Revenue (₹)',
                        data: [45000, 52000, 61000, 58000, 74000, 69000, 88000],
                        backgroundColor: 'rgba(59,130,246,0.7)',
                        borderRadius: 6,
                    },
                    {
                        label: 'Expenses (₹)',
                        data: [18000, 21000, 25000, 22000, 30000, 27000, 34000],
                        backgroundColor: 'rgba(16,185,129,0.7)',
                        borderRadius: 6,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'top' } },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(148,163,184,0.15)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // ========================
    // ADMIN FLEET PIE CHART
    // ========================
    const fleetCtx = document.getElementById('fleetChart');
    if (fleetCtx) {
        new Chart(fleetCtx, {
            type: 'doughnut',
            data: {
                labels: ['Available', 'Rented', 'Maintenance', 'Reserved'],
                datasets: [{
                    data: [18, 12, 4, 6],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'],
                    borderWidth: 2,
                    borderColor: 'transparent',
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } },
                cutout: '65%'
            }
        });
    }

    // ========================
    // DATE RANGE AVAILABILITY CHECKER
    // ========================
    const checkBtn = document.getElementById('check-availability');
    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            const pickup = document.getElementById('pickup-date').value;
            const dropoff = document.getElementById('dropoff-date').value;
            const resultDiv = document.getElementById('availability-result');
            if (!pickup || !dropoff) {
                resultDiv.textContent = '⚠ Please select both dates.';
                resultDiv.style.color = '#f59e0b';
                return;
            }
            if (new Date(dropoff) <= new Date(pickup)) {
                resultDiv.textContent = '⚠ Drop-off must be after pick-up date.';
                resultDiv.style.color = '#ef4444';
                return;
            }
            const days = Math.ceil((new Date(dropoff) - new Date(pickup)) / (1000*60*60*24));
            resultDiv.textContent = `✔ ${days} vehicle(s) available for ${days} day(s). Choose a vehicle below!`;
            resultDiv.style.color = '#10b981';
        });
    }

    // ========================
    // EXTENSION FORM HANDLER
    // ========================
    const extForm = document.getElementById('extension-form');
    if (extForm) {
        extForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = document.getElementById('extension-msg');
            msg.textContent = '✔ Extension request submitted successfully! Our team will contact you shortly.';
            msg.style.color = '#10b981';
            extForm.reset();
        });
    }
});
