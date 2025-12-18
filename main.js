/**
 * Big Blue SuperApp - System Architecture Proposal
 * Interactive Components | AG Alchemy Consultancy
 */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSlideNavigation();
    initScrollAnimations();
    initCharts();
    updateFooterTimestamp();
});

// Slide Navigation
let currentSlide = 0;
let totalSlides = 0;

function initSlideNavigation() {
    const slidesContainer = document.getElementById('slidesContainer');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const counter = document.getElementById('slideCounter');
    const dotsContainer = document.getElementById('slideDots');

    totalSlides = slides.length;

    // Create indicator dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'slide-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    // Navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) goToSlide(currentSlide + 1);
        if (touchEndX > touchStartX + 50) goToSlide(currentSlide - 1);
    }

    updateSlideDisplay();
}

function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlide = index;
    updateSlideDisplay();
}

function updateSlideDisplay() {
    const slidesContainer = document.getElementById('slidesContainer');
    const counter = document.getElementById('slideCounter');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dots = document.querySelectorAll('.slide-dot');

    // Move slides container
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;

    // Update counter
    counter.textContent = `${currentSlide + 1} / ${totalSlides}`;

    // Update buttons
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });

    // Update nav links
    const slides = document.querySelectorAll('.slide');
    const slideId = slides[currentSlide].id;
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + slideId);
    });
}

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navSidebar = document.getElementById('navSidebar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navSidebar) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navSidebar.classList.toggle('active');
        });

        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navToggle.classList.remove('active');
                navSidebar.classList.remove('active');
                goToSlide(index);
            });
        });

        document.addEventListener('click', (e) => {
            if (!navSidebar.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navSidebar.classList.remove('active');
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// Footer Timestamp
function updateFooterTimestamp() {
    const el = document.getElementById('footerTimestamp');
    if (el) {
        const now = new Date();
        el.textContent = 'Generated: ' + now.toLocaleDateString('en-MY', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
        });
    }
}

// Charts
function initCharts() {
    Chart.defaults.color = '#adb5bd';
    Chart.defaults.borderColor = 'rgba(212, 168, 75, 0.2)';
    Chart.defaults.font.family = "'Source Sans Pro', sans-serif";
    
    initFleetChart();
    initRideVolumeChart();
    initRevenueDistChart();
    initUserGrowthChart();
    initGanttChart();
    initRevenueStreamsChart();
    initCompetitiveChart();
}

function initFleetChart() {
    const ctx = document.getElementById('fleetDistributionChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Kuala Lumpur', 'Johor Bahru', 'Penang'],
            datasets: [{
                data: [500, 300, 200],
                backgroundColor: ['#d4a84b', '#17a2b8', '#28a745'],
                borderColor: '#0a1628',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom', labels: { padding: 15, usePointStyle: true } },
                tooltip: { callbacks: { label: ctx => ctx.label + ': ' + ctx.raw + ' vehicles' } }
            }
        }
    });
}

function initRideVolumeChart() {
    const ctx = document.getElementById('rideVolumeChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Daily Rides',
                data: [500, 800, 1200, 1800, 2500, 3200, 4000, 4800, 5500, 6200, 7000, 8000],
                borderColor: '#d4a84b',
                backgroundColor: 'rgba(212, 168, 75, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: '#d4a84b'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(212, 168, 75, 0.1)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function initRevenueDistChart() {
    const ctx = document.getElementById('revenueDistributionChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['EV Taxi', 'E-Hailing', 'Limousine', 'Economy', 'Rent-to-Drive'],
            datasets: [{
                data: [35, 30, 15, 12, 8],
                backgroundColor: ['#d4a84b', '#17a2b8', '#ffc107', '#28a745', '#6c757d'],
                borderColor: '#0a1628',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom', labels: { padding: 12, usePointStyle: true } },
                tooltip: { callbacks: { label: ctx => ctx.label + ': ' + ctx.raw + '%' } }
            }
        }
    });
}

function initUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Q1Y1', 'Q2Y1', 'Q3Y1', 'Q4Y1', 'Q1Y2', 'Q2Y2', 'Q3Y2', 'Q4Y2', 'Q1Y3', 'Q2Y3', 'Q3Y3', 'Q4Y3'],
            datasets: [{
                label: 'Users',
                data: [2000, 15000, 50000, 100000, 180000, 300000, 450000, 650000, 900000, 1200000, 1600000, 2000000],
                backgroundColor: '#d4a84b',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { 
                    beginAtZero: true, 
                    grid: { color: 'rgba(212, 168, 75, 0.1)' },
                    ticks: { callback: v => v >= 1000000 ? (v/1000000)+'M' : v >= 1000 ? (v/1000)+'K' : v }
                },
                x: { grid: { display: false } }
            }
        }
    });
}

function initGanttChart() {
    const ctx = document.getElementById('ganttChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Infrastructure', 'Database', 'Auth Service', 'Booking Service', 'Location Service', 
                     'Payment Service', 'Fleet Service', 'Mobile Apps', 'Admin Dashboard', 'Integration Test', 'UAT', 'Deploy'],
            datasets: [{
                label: 'Start',
                data: [1, 1, 3, 5, 5, 7, 7, 5, 7, 11, 12, 13],
                backgroundColor: 'rgba(212, 168, 75, 0.2)',
                borderWidth: 0
            }, {
                label: 'Duration',
                data: [2, 3, 2, 2, 2, 2, 3, 6, 4, 2, 1, 1],
                backgroundColor: '#d4a84b',
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { stacked: true, max: 14, title: { display: true, text: 'Week' }, grid: { color: 'rgba(212, 168, 75, 0.1)' } },
                y: { stacked: true, grid: { display: false } }
            }
        }
    });
}

function initRevenueStreamsChart() {
    const ctx = document.getElementById('revenueStreamsChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3'],
            datasets: [
                { label: 'Ride Commission', data: [8.4, 36, 84], backgroundColor: '#d4a84b' },
                { label: 'Premium', data: [1.2, 5.4, 12], backgroundColor: '#ffc107' },
                { label: 'Rent-to-Drive', data: [2.1, 9, 21], backgroundColor: '#17a2b8' },
                { label: 'Financing', data: [1.0, 4.5, 10], backgroundColor: '#28a745' },
                { label: 'Corporate', data: [1.5, 6.5, 15], backgroundColor: '#6c757d' }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom', labels: { padding: 12, usePointStyle: true } },
                tooltip: { callbacks: { label: ctx => ctx.dataset.label + ': RM ' + ctx.raw + 'M' } }
            },
            scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, grid: { color: 'rgba(212, 168, 75, 0.1)' }, title: { display: true, text: 'RM Millions' } }
            }
        }
    });
}

function initCompetitiveChart() {
    const ctx = document.getElementById('competitiveChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [
                { label: 'Big Blue (Target)', data: [{ x: 85, y: 85, r: 18 }], backgroundColor: 'rgba(212, 168, 75, 0.8)', borderColor: '#d4a84b', borderWidth: 2 },
                { label: 'Grab', data: [{ x: 70, y: 88, r: 30 }], backgroundColor: 'rgba(40, 167, 69, 0.5)', borderColor: '#28a745' },
                { label: 'Traditional Taxi', data: [{ x: 35, y: 45, r: 22 }], backgroundColor: 'rgba(108, 117, 125, 0.5)', borderColor: '#6c757d' },
                { label: 'MyCar', data: [{ x: 55, y: 60, r: 12 }], backgroundColor: 'rgba(23, 162, 184, 0.5)', borderColor: '#17a2b8' }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom', labels: { padding: 12, usePointStyle: true } } },
            scales: {
                x: { title: { display: true, text: 'Technology Innovation →' }, min: 0, max: 100, grid: { color: 'rgba(212, 168, 75, 0.1)' } },
                y: { title: { display: true, text: 'Service Quality →' }, min: 0, max: 100, grid: { color: 'rgba(212, 168, 75, 0.1)' } }
            }
        }
    });
}

console.log('Big Blue SuperApp Proposal - Loaded');
