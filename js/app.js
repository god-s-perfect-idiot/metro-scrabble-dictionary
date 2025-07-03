/**
 * Scrabble Dictionary App
 * Main application file
 * Compatible with Windows Phone 8.1 (IE Mobile 11)
 */

(function(window, document) {
    'use strict';

    // App Namespace
    window.ScrabbleApp = window.ScrabbleApp || {};

    // App Configuration
    var APP_CONFIG = {
        name: 'Scrabble Dictionary',
        version: '1.0.0',
        author: 'Metro UI Team',
        description: 'A Scrabble dictionary app with Metro UI design for Windows Phone 8.1'
    };

    // App State
    var appState = {
        isInitialized: false,
        currentWord: null,
        searchHistory: [],
        settings: {
            enableSound: false,
            enableVibration: false,
            theme: 'default'
        }
    };

    // App Initialization
    ScrabbleApp.init = function() {
        console.log('Initializing Scrabble Dictionary App v' + APP_CONFIG.version);
        
        // Check if Metro UI is available
        if (typeof MetroUI === 'undefined') {
            console.error('Metro UI framework not loaded');
            return;
        }

        // Initialize app when Metro UI is ready
        document.addEventListener('metro-ui-ready', function() {
            initializeApp();
        });

        // Fallback initialization
        if (document.readyState === 'complete') {
            setTimeout(initializeApp, 100);
        }
    };

    function initializeApp() {
        if (appState.isInitialized) {
            return;
        }

        try {
            // Load settings from localStorage
            loadSettings();
            
            // Initialize app features
            initializeFeatures();
            
            // Set up event listeners
            setupEventListeners();
            
            // Mark as initialized
            appState.isInitialized = true;
            
            console.log('Scrabble Dictionary App initialized successfully');
            
            // Show welcome message
            showWelcomeMessage();
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            showErrorMessage('Failed to initialize app');
        }
    }

    function initializeFeatures() {
        // Initialize touch gestures
        initializeTouchGestures();
        
        // Initialize keyboard shortcuts
        initializeKeyboardShortcuts();
        
        // Initialize offline support
        initializeOfflineSupport();
        
        // Initialize performance monitoring
        initializePerformanceMonitoring();
    }

    function initializeTouchGestures() {
        // Add touch gesture support for Windows Phone
        if (MetroUI.utils.isTouchDevice()) {
            // Swipe to clear search
            var searchInput = document.getElementById('searchInput');
            if (searchInput) {
                var startX = 0;
                var startY = 0;
                
                searchInput.addEventListener('touchstart', function(e) {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                }, { passive: true });
                
                searchInput.addEventListener('touchend', function(e) {
                    var endX = e.changedTouches[0].clientX;
                    var endY = e.changedTouches[0].clientY;
                    var deltaX = endX - startX;
                    var deltaY = endY - startY;
                    
                    // Swipe left to clear
                    if (deltaX < -50 && Math.abs(deltaY) < 50) {
                        searchInput.value = '';
                        if (typeof ScrabbleDictionary !== 'undefined' && ScrabbleDictionary.UI) {
                            ScrabbleDictionary.UI.showWelcome();
                        }
                        MetroUI.Toast.info('Search cleared');
                    }
                }, { passive: true });
            }
        }
    }

    function initializeKeyboardShortcuts() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                var searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to clear search
            if (e.key === 'Escape') {
                var searchInput = document.getElementById('searchInput');
                if (searchInput && searchInput.value.trim() !== '') {
                    searchInput.value = '';
                    if (typeof ScrabbleDictionary !== 'undefined' && ScrabbleDictionary.UI) {
                        ScrabbleDictionary.UI.showWelcome();
                    }
                }
            }
        });
    }

    function initializeOfflineSupport() {
        // Check if service worker is supported
        if ('serviceWorker' in navigator) {
            // Register service worker for offline support
            navigator.serviceWorker.register('sw.js')
                .then(function(registration) {
                    console.log('Service Worker registered successfully');
                })
                .catch(function(error) {
                    console.log('Service Worker registration failed:', error);
                });
        }
        
        // Add offline detection
        window.addEventListener('online', function() {
            MetroUI.Toast.success('Back online');
        });
        
        window.addEventListener('offline', function() {
            MetroUI.Toast.warning('You are offline. Some features may not work.');
        });
    }

    function initializePerformanceMonitoring() {
        // Monitor app performance
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    var loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                    console.log('App load time:', loadTime + 'ms');
                    
                    if (loadTime > 3000) {
                        console.warn('App load time is slow');
                    }
                }, 0);
            });
        }
    }

    function setupEventListeners() {
        // Listen for search events
        document.addEventListener('metro-input-change', function(e) {
            if (e.detail.input.id === 'searchInput') {
                handleSearchInput(e.detail.value);
            }
        });

        // Listen for button clicks
        document.addEventListener('metro-button-click', function(e) {
            handleButtonClick(e.detail.button);
        });

        // Listen for app visibility changes
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                handleAppHidden();
            } else {
                handleAppVisible();
            }
        });

        // Listen for window resize
        window.addEventListener('resize', MetroUI.utils.debounce(function() {
            handleWindowResize();
        }, 250));
    }

    function handleSearchInput(value) {
        // Add to search history
        if (value.trim() !== '') {
            addToSearchHistory(value.trim());
        }
    }

    function handleButtonClick(button) {
        // Handle different button clicks
        switch (button.id) {
            case 'settingsBtn':
                handleSettingsClick();
                break;
            case 'searchBtn':
                handleSearchClick();
                break;
            default:
                // Unknown button
                break;
        }
    }

    function handleSettingsClick() {
        // Show settings modal or page
        MetroUI.Toast.info('Settings feature coming soon!');
    }

    function handleSearchClick() {
        // Trigger search if not already handled by dictionary
        var searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value.trim() !== '') {
            if (typeof ScrabbleDictionary !== 'undefined' && ScrabbleDictionary.UI) {
                ScrabbleDictionary.UI.performSearch();
            }
        }
    }

    function handleAppHidden() {
        // App went to background
        console.log('App hidden');
    }

    function handleAppVisible() {
        // App came to foreground
        console.log('App visible');
    }

    function handleWindowResize() {
        // Handle window resize events
        console.log('Window resized');
    }

    function addToSearchHistory(word) {
        // Add word to search history (limit to 10 items)
        var history = appState.searchHistory;
        var index = history.indexOf(word);
        
        if (index > -1) {
            // Remove existing entry
            history.splice(index, 1);
        }
        
        // Add to beginning
        history.unshift(word);
        
        // Limit to 10 items
        if (history.length > 10) {
            history.pop();
        }
        
        // Save to localStorage
        saveSettings();
    }

    function loadSettings() {
        try {
            var savedSettings = localStorage.getItem('scrabbleAppSettings');
            if (savedSettings) {
                var settings = JSON.parse(savedSettings);
                appState.settings = Object.assign({}, appState.settings, settings);
            }
            
            var savedHistory = localStorage.getItem('scrabbleAppHistory');
            if (savedHistory) {
                appState.searchHistory = JSON.parse(savedHistory);
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
    }

    function saveSettings() {
        try {
            localStorage.setItem('scrabbleAppSettings', JSON.stringify(appState.settings));
            localStorage.setItem('scrabbleAppHistory', JSON.stringify(appState.searchHistory));
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    function showWelcomeMessage() {
        // Show welcome message on first visit
        var hasVisited = localStorage.getItem('scrabbleAppHasVisited');
        if (!hasVisited) {
            setTimeout(function() {
                MetroUI.Toast.info('Welcome to Scrabble Dictionary! Try searching for a word.', 5000);
                localStorage.setItem('scrabbleAppHasVisited', 'true');
            }, 1000);
        }
    }

    function showErrorMessage(message) {
        if (typeof MetroUI !== 'undefined' && MetroUI.Toast) {
            MetroUI.Toast.error(message);
        } else {
            alert(message);
        }
    }

    // Public API
    ScrabbleApp.getVersion = function() {
        return APP_CONFIG.version;
    };

    ScrabbleApp.getSettings = function() {
        return Object.assign({}, appState.settings);
    };

    ScrabbleApp.updateSettings = function(newSettings) {
        appState.settings = Object.assign({}, appState.settings, newSettings);
        saveSettings();
    };

    ScrabbleApp.getSearchHistory = function() {
        return appState.searchHistory.slice();
    };

    ScrabbleApp.clearSearchHistory = function() {
        appState.searchHistory = [];
        saveSettings();
        MetroUI.Toast.success('Search history cleared');
    };

    // Initialize app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ScrabbleApp.init);
    } else {
        ScrabbleApp.init();
    }

})(window, document); 