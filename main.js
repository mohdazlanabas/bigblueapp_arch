/**
 * Big Blue SuperApp - System Architecture Proposal
 * Interactive JavaScript Components
 * AG Alchemy Consultancy Sdn Bhd
 * December 2025
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initAccordions();
    initCharts();
    initHeaderLayout();
    updateFooterTimestamp();
    initSmoothScroll();
});

/**
 * Navigation Sidebar Toggle
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navSidebar = document.getElementById('navSidebar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navSidebar) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navSidebar.classList.toggle('active');
        });
        
        // Close nav when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navSidebar.classList.remove('active');
            });
        });
        
        // Close nav when clicking outside
        document.addEventListener('click', function(e) {
            if (!navSidebar.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navSidebar.classList.remove('active');
            }
        });
    }
    
    // Active link highlighting on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Adjusts header padding to prevent overlap with the nav toggle on mobile.
 */
function initHeaderLayout() {
    const navToggle = document.getElementById('navToggle');
    const headerContent = document.querySelector('.page-header .header-content'); // Assuming this is your header text container

    if (!navToggle || !headerContent) {
        console.warn('Header layout adjustment elements not found.');
        return;
    }

    const adjustPadding = () => {
        // Check if the navToggle is visible (i.e., we are in mobile view)
        if (window.getComputedStyle(navToggle).display !== 'none') {
            const toggleWidth = navToggle.offsetWidth;
            // Add padding to the right of the header content to avoid overlap
            headerContent.style.paddingRight = `${toggleWidth + 15}px`;
        } else {
            // Reset padding on desktop view
            headerContent.style.paddingRight = '0px';
        }
    };

    // Adjust on load and on window resize
    adjustPadding();
    window.addEventListener('resize', adjustPadding);
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Accordion functionality
 */
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.accordion-item').forEach(acc => {
                acc.classList.remove('active');
            });
            
            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Update footer timestamp
 */
function updateFooterTimestamp() {
    const timestampEl = document.getElementById('footerTimestamp');
    if (timestampEl) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        };
        timestampEl.textContent = 'Generated: ' + now.toLocaleDateString('en-MY', options);
    }
}

/**
 * Initialize all charts
 */
function initCharts() {
    // Chart.js global defaults
    Chart.defaults.color = '#adb5bd';
    Chart.defaults.borderColor = 'rgba(212, 168, 75, 0.2)';
    Chart.defaults.font.family = "'Source Sans Pro', sans-serif";
    
    initFleetDistributionChart();
    initRideVolumeChart();
    initRevenueDistributionChart();
    initUserGrowthChart();
    initGanttChart();
    initRevenueStreamsChart();
    initCompetitiveChart();
}

/**
 * Fleet Distribution Pie Chart
 */
function initFleetDistributionChart() {
    const ctx = document.getElementById('fleetDistributionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Kuala Lumpur', 'Johor Bahru', 'Penang'],
            datasets: [{
                data: [500, 300, 200],
                backgroundColor: [
                    '#d4a84b',
                    '#17a2b8',
                    '#28a745'
                ],
                borderColor: '#0a1628',
                borderWidth: 3,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + ' vehicles';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Ride Volume Line Chart
 */
function initRideVolumeChart() {
    const ctx = document.getElementById('rideVolumeChart');
    if (!ctx) return;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Daily Rides (Projected)',
                data: [500, 800, 1200, 1800, 2500, 3200, 4000, 4800, 5500, 6200, 7000, 8000],
                borderColor: '#d4a84b',
                backgroundColor: 'rgba(212, 168, 75, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#d4a84b',
                pointBorderColor: '#0a1628',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(212, 168, 75, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

/**
 * Revenue Distribution Pie Chart
 */
function initRevenueDistributionChart() {
    const ctx = document.getElementById('revenueDistributionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['EV Taxi', 'E-Hailing', 'Limousine', 'Economy', 'Rent-to-Drive'],
            datasets: [{
                data: [35, 30, 15, 12, 8],
                backgroundColor: [
                    '#d4a84b',
                    '#17a2b8',
                    '#ffc107',
                    '#28a745',
                    '#6c757d'
                ],
                borderColor: '#0a1628',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

/**
 * User Growth Chart
 */
function initUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Q1 Y1', 'Q2 Y1', 'Q3 Y1', 'Q4 Y1', 'Q1 Y2', 'Q2 Y2', 'Q3 Y2', 'Q4 Y2', 'Q1 Y3', 'Q2 Y3', 'Q3 Y3', 'Q4 Y3'],
            datasets: [{
                label: 'Registered Users',
                data: [2000, 15000, 50000, 100000, 180000, 300000, 450000, 650000, 900000, 1200000, 1600000, 2000000],
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if (!chartArea) return '#d4a84b';
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, '#b8923f');
                    gradient.addColorStop(1, '#e8c87a');
                    return gradient;
                },
                borderColor: '#d4a84b',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(212, 168, 75, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) return (value / 1000000) + 'M';
                            if (value >= 1000) return (value / 1000) + 'K';
                            return value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

/**
 * Gantt-style Timeline Chart
 */
function initGanttChart() {
    const ctx = document.getElementById('ganttChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Infrastructure Setup',
                'Database Design',
                'Auth & User Service',
                'Booking Service',
                'Location Service',
                'Payment Service',
                'Fleet Service',
                'Mobile Apps (Flutter)',
                'Admin Dashboard',
                'Integration Testing',
                'UAT & Bug Fixes',
                'Production Deployment'
            ],
            datasets: [{
                label: 'Start Week',
                data: [1, 1, 3, 5, 5, 7, 7, 5, 7, 11, 12, 13],
                backgroundColor: 'rgba(212, 168, 75, 0.3)',
                borderColor: 'transparent',
                borderWidth: 0,
                barPercentage: 0.7
            }, {
                label: 'Duration (Weeks)',
                data: [2, 3, 2, 2, 2, 2, 3, 6, 4, 2, 1, 1],
                backgroundColor: '#d4a84b',
                borderColor: '#b8923f',
                borderWidth: 1,
                borderRadius: 4,
                barPercentage: 0.7
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.datasetIndex === 0) {
                                return 'Start: Week ' + context.raw;
                            }
                            return 'Duration: ' + context.raw + ' weeks';
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Week Number'
                    },
                    grid: {
                        color: 'rgba(212, 168, 75, 0.1)'
                    },
                    max: 14
                },
                y: {
                    stacked: true,
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

/**
 * Revenue Streams Chart
 */
function initRevenueStreamsChart() {
    const ctx = document.getElementById('revenueStreamsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3'],
            datasets: [
                {
                    label: 'Ride Commission',
                    data: [8.4, 36, 84],
                    backgroundColor: '#d4a84b'
                },
                {
                    label: 'Premium Services',
                    data: [1.2, 5.4, 12],
                    backgroundColor: '#ffc107'
                },
                {
                    label: 'Rent-to-Drive',
                    data: [2.1, 9, 21],
                    backgroundColor: '#17a2b8'
                },
                {
                    label: 'Corporate Accounts',
                    data: [1.5, 6.5, 15],
                    backgroundColor: '#28a745'
                },
                {
                    label: 'In-App Advertising',
                    data: [0.3, 2, 6],
                    backgroundColor: '#6c757d'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'rect'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': RM ' + context.raw + 'M';
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    }
                },
                y: {
                    stacked: true,
                    grid: {
                        color: 'rgba(212, 168, 75, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Revenue (RM Millions)'
                    }
                }
            }
        }
    });
}

/**
 * Competitive Positioning Scatter Chart
 */
function initCompetitiveChart() {
    const ctx = document.getElementById('competitiveChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: 'Big Blue (Target)',
                    data: [{ x: 85, y: 80, r: 20 }],
                    backgroundColor: 'rgba(212, 168, 75, 0.7)',
                    borderColor: '#d4a84b',
                    borderWidth: 2
                },
                {
                    label: 'Grab',
                    data: [{ x: 70, y: 90, r: 35 }],
                    backgroundColor: 'rgba(40, 167, 69, 0.5)',
                    borderColor: '#28a745',
                    borderWidth: 1
                },
                {
                    label: 'Traditional Taxis',
                    data: [{ x: 40, y: 50, r: 25 }],
                    backgroundColor: 'rgba(108, 117, 125, 0.5)',
                    borderColor: '#6c757d',
                    borderWidth: 1
                },
                {
                    label: 'MyCar',
                    data: [{ x: 55, y: 60, r: 15 }],
                    backgroundColor: 'rgba(23, 162, 184, 0.5)',
                    borderColor: '#17a2b8',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + 
                                ' - Tech: ' + context.raw.x + 
                                ', Service: ' + context.raw.y;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Technology Innovation →'
                    },
                    min: 0,
                    max: 100,
                    grid: {
                        color: 'rgba(212, 168, 75, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Service Quality →'
                    },
                    min: 0,
                    max: 100,
                    grid: {
                        color: 'rgba(212, 168, 75, 0.1)'
                    }
                }
            }
        }
    });
}

// Vertical Tabs (if needed)
function initVerticalTabs() {
    const vtabBtns = document.querySelectorAll('.vtab-btn');
    const vtabPanels = document.querySelectorAll('.vtab-panel');
    
    vtabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.dataset.tab;
            
            vtabBtns.forEach(b => b.classList.remove('active'));
            vtabPanels.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(target)?.classList.add('active');
        });
    });
}

// Print functionality
function printProposal() {
    window.print();
}

// Export functionality (placeholder)
function exportToPDF() {
    alert('PDF export would be implemented with a library like html2pdf.js');
}

console.log('Big Blue SuperApp Proposal - Interactive components loaded');
