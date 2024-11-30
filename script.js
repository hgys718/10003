$(document).ready(function() {
    // Initialize map with interactive features enabled
    const initialCoords = [40.7287, -73.994];
    const initialZoom = 15;

    // Function to get tile layer based on theme
    function getTileLayer(isDarkMode) {
        const tileUrl = isDarkMode 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
        
        return L.tileLayer(tileUrl, {
            attribution: '',
            maxZoom: 19,
            backgroundColor: isDarkMode ? '#181818' : '#f4f4f4'
        });
    }

    // Create map
    const map = L.map('map', {
        center: initialCoords,
        zoom: initialZoom,
        zoomControl: true,
        dragging: true,
        touchZoom: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        maxZoom: 19,
        minZoom: 15
    });

    // Initial tile layer (dark mode by default)
    let currentTileLayer = getTileLayer(true);
    currentTileLayer.addTo(map);

    // Home button functionality
    $('<button>')
    .addClass('home-button')
    .text('Return')
    .insertAfter('.info')
    .click(function() {
        map.setView(initialCoords, initialZoom, {
            duration: 1
        });
    });

    // Location data with coordinates and popup content
    const locations = {
        astor: { 
            lat: 40.7300633907087, 
            lng: -73.99114510318877, 
            data: {
                title: "Astor Place Station",
                location: "E 8th/Lafayette St",
                image1: "a12.jpg",
                image2: "a11.jpg",
                status: "Partial Rub",
                description: "Subway sign on Astor Place Station Downtown ❻",
                details: "<b>Bevel:</b> Slight bevel outwards",
                font: "<b>Font:</b> Helvetica"
            }
        },
        cooper: { 
            lat: 40.72962144219337, 
            lng: -73.99054893952382, 
            data: {
                title: "Cooper Union",
                location: "Astor place, Cooper Square",
                image1: "d12.jpeg",
                image2: "d11.jpg",
                status: "Partial Rub",
                description: "Building sign on Cooper Union Foundation",
                details: "<b>Bevel:</b> Plaque outwards bevel",
                font: "<b>Font:</b> Trajan"
            }
        },
        nyu: { 
            lat: 40.72874274085271, 
            lng: -73.9926077950089, 
            data: {
                title: "NYU Medical Center",
                location: "Astor Place, Lafayette St",
                image1: "e12.jpeg",
                image2: "e11.jpeg",
                status: "Partial Divided Rub",
                description: "NYU Medical center building plaque",
                details: "<b>Bevel:</b> Plaque bevel outwards",
                font: "<b>Font:</b> Garamond or Times New Roman"
            }
        },
        1952: { 
            lat: 40.7319933268595, 
            lng:  -73.99039353478027, 
            data: {
                title: "1952",
                location: "4th av, 11th st",
                image1: "h12.jpeg",
                image2: "h11.jpeg",
                status: "Partial Divided Rub",
                description: "Carving on the bottom of a building",
                details: "<b>Bevel:</b> Stone carved inwards bevel",
                font: "<b>Font:</b> Likely a Trajan"
            }
        },
        colonade: { 
            lat: 40.72927134840473, 
            lng:  -73.99223200742745, 
            data: {
                title: "Colonade Row",
                location: "434 Lafayette st",
                image1: "b12.jpeg",
                image2: "b11.jpeg",
                status: "Partial Rub",
                description: "Plaque signifying a landmark of New York",
                details: "<b>Bevel:</b> Plaque bevel outwards",
                font: "<b>Font:</b> Trajan"
            }
        },
        stewart: { 
            lat: 40.73091963006013, 
            lng: -73.99066089630584, 
            data: {
                title: "Stewart House",
                location: "70 East 10th st",
                image1: "f12.jpeg",
                image2: "f11.jpeg",
                status: "Partial Rub",
                description: "Sign on stewart house service entrance",
                details: "<b>Bevel:</b> Slight inwards bevel",
                font: "<b>Font:</b> Avenir or Futura"
            }
        },
        street: { 
            lat: 40.73173957420047, 
            lng: -73.99009341030394, 
            data: {
                title: "Street",
                location: "4th av, 11th st",
                image1: "g12.jpeg",
                image2: "g11.jpeg",
                status: "Partial Rub",
                description: "A random carving on the streets of 10003",
                details: "<b>Bevel:</b> Carved inside on the ground",
                font: "<b>Font:</b> N/A"
            }
        },
        shevchenko: { 
            lat: 40.730939167547376, 
            lng: -73.99022838577947, 
            data: {
                title: "Shevchenko Scientific Society",
                location: "63 4th Ave",
                image1: "i12.jpeg",
                image2: "i11.jpg",
                status: "Partial Rub",
                description: "Sign of a scientific society",
                details: "<b>Bevel:</b> Slight inwards bevel",
                font: "<b>Font:</b> Trajan Pro or Times New Roman Caps"
            }
        },
        stylviaandpo: { 
            lat: 40.72878507913308, 
            lng: -73.99225967377602, 
            data: {
                title: "Sylvia and Po Art Gallery",
                location: "417 Lafayette St",
                image1: "j12.jpeg",
                image2: "j11.jpg",
                status: "Partial Rub",
                description: "Art gallery sign of Sylvia Wald and Po Kim",
                details: "<b>Bevel:</b> Slight inwards bevel",
                font: "<b>Top Font:</b> Futura Condensed or ITC Avant Garde Gothic Condensed <br> <b>Bottom Font:</b> Gill Sans or Brandon Grotesque"
            }
        },
        firehydrant: { 
            lat: 40.732682271722936, 
            lng:  -73.98962500471194, 
            data: {
                title: "Fire Hydrant",
                location: "4th Av 12th St",
                image1: "c12.jpeg",
                image2: "c11.jpeg",
                status: "Full Rub",
                description: "Firehydrant, AutoSPKR",
                details: "<b>Bevel:</b> Outwards bevel",
                font: "<b>Font:</b> Stencilla or DIN Stencil"
            }
        },
        library: { 
            lat: 40.729085026678064, 
            lng:   -73.99186453281175, 
            data: {
                title: "Astor Library",
                location: "425 Lafayette St",
                image1: "k12.jpg",
                image2: "k11.jpg",
                status: "Partial Rub",
                description: "Plaque signifying a landmark of New York",
                details: "<b>Bevel:</b> Outwards bevel",
                font: "<b>Font:</b> Trajan"
            }
        },
        loeb: { 
            lat: 40.73229145497612, 
            lng:  -73.98845189160969, 
            data: {
                title: "Loeb Hall",
                location: "135 E 12th St",
                image1: "l12.jpg",
                image2: "l11.jpg",
                status: "Full Rub",
                description: "Building address on the foundation",
                details: "<b>Bevel:</b> Outwards bevel",
                font: "<b>Font:</b> Modern No. 20",
            }
        },
        // Add remaining locations with their coordinates...
    };

    // Create custom marker icon with animation
    const customIcon = L.divIcon({
        className: 'custom-marker',
        iconSize: [10, 10],
        html: '<div class="marker-pulse"></div>'
    });

    // Add markers to map with enhanced interactivity
    Object.entries(locations).forEach(([key, location]) => {
        const marker = L.marker([location.lat, location.lng], {
            icon: customIcon
        }).addTo(map);

        // Enhanced tooltip
        marker.bindTooltip(location.data.title, {
            className: 'location-tooltip',
            direction: 'top',
            offset: [0, -10],
            opacity: 0.9,
            permanent: false
        });

        // Click handler with smooth zoom
        marker.on('click', function(e) {
            // Smooth zoom to marker
            map.setView(e.latlng, 18, {
                duration: 0.5
            });
            
            // Show popup after slight delay for smooth transition
            setTimeout(() => {
                showPopup(location.data);
            }, 300);
        });

        // Hover effects
        marker.on('mouseover', function() {
            this._icon.classList.add('marker-hover');
        });

        marker.on('mouseout', function() {
            this._icon.classList.remove('marker-hover');
        });
    });

    // Initialize eraser functionality
    let eraserInitialized = false;

    function initializeEraser() {
        $('#img2').eraser({
            size: 120,
            completeRatio: 0.65,
            completeFunction: function() {
                console.log('Erasing complete');
            }
        });
    }

    function showPopup(data) {
        const popupContent = `
            <div class="typewriter">
                <div class="heading">
                    <h1>${data.title}</h1>
                </div>
            </div>
            <div class="everything">
                <div id="grid">
                    <div class="container1">
                        <b>${data.location}</b>
                        <b>10003</b>
                        <b>${data.status}</b>
                    </div>
                    <div class="container2">
                        <p>${data.details}</p>
                        <p>${data.font}</p>
                        <p>${data.description}</p>
                    </div>
                </div>
                <div class="wrapper">
                    <img id="img1" src="${data.image1}">
                    <img id="img2" src="${data.image2}" style="z-index: 2;">
                </div>
            </div>
        `;
        
        $('.popup-content').html(popupContent);
        
        $('#img2').on('load', function() {
            initializeEraser();
            eraserInitialized = true;
        });

        $('#overlay').fadeIn(300);
        $('#popup').fadeIn(300);
    }

    // Enhanced window resize handler with debouncing
    let resizeTimeout;
    $(window).resize(function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (eraserInitialized) {
                $('#img2').eraser('reset');
                initializeEraser();
            }
            map.invalidateSize(); // Ensure map renders correctly after resize
        }, 250);
    });

    // Popup close handlers
    $('#overlay').click(function() {
        $('#overlay').fadeOut(300);
        $('#popup').fadeOut(300);
        $('.popup-content').empty();
        eraserInitialized = false;
    });

    $('#popup').click(function(e) {
        e.stopPropagation();
    });

    $(document).keydown(function(e) {
        if (e.key === "Escape") {
            $('#overlay').fadeOut(300);
            $('#popup').fadeOut(300);
            $('.popup-content').empty();
            eraserInitialized = false;
        }
    });

    // Theme Toggle Functionality
    const themeSwitch = $('#theme-switch');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        $('body').addClass('light-mode');
        themeSwitch.prop('checked', true);
        
        // Switch to light mode tile layer
        map.removeLayer(currentTileLayer);
        currentTileLayer = getTileLayer(false);
        currentTileLayer.addTo(map);
    }

    themeSwitch.on('change', function() {
        if (this.checked) {
            $('body').addClass('light-mode');
            localStorage.setItem('theme', 'light');
            
            // Switch to light mode tile layer
            map.removeLayer(currentTileLayer);
            currentTileLayer = getTileLayer(false);
            currentTileLayer.addTo(map);
        } else {
            $('body').removeClass('light-mode');
            localStorage.setItem('theme', 'dark');
            
            // Switch to dark mode tile layer
            map.removeLayer(currentTileLayer);
            currentTileLayer = getTileLayer(true);
            currentTileLayer.addTo(map);
        }

        // Ensure map renders correctly after theme change
        map.invalidateSize();
    });
});