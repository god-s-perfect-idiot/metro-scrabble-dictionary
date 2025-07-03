// Simple Scrabble Word Checker for IE Mobile 11
// Uses hosted API to check if input words are valid

var apiBaseUrl = 'https://scrabble-api-fk8b.onrender.com';
var apiReady = false;

// Show loading
function showLoading() {
    var loadingSection = document.getElementById('loadingSection');
    var resultSection = document.getElementById('resultSection');
    var welcomeSection = document.getElementById('welcomeSection');
    
    loadingSection.style.display = 'block';
    resultSection.style.display = 'none';
    welcomeSection.style.display = 'none';
}

// Hide loading
function hideLoading() {
    var loadingSection = document.getElementById('loadingSection');
    var welcomeSection = document.getElementById('welcomeSection');
    
    loadingSection.style.display = 'none';
    welcomeSection.style.display = 'block';
}

// Test API connection
function testApiConnection() {
    console.log('Testing API connection...');
    showLoading();
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiBaseUrl + '/search/hello', true);
    
    // Set timeout to 10 seconds
    xhr.timeout = 10000;
    
    xhr.onreadystatechange = function() {
        console.log('XHR State:', xhr.readyState, 'Status:', xhr.status);
        
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('API connection successful');
                console.log('Response:', xhr.responseText);
                
                try {
                    var response = JSON.parse(xhr.responseText);
                    if (response.hasOwnProperty('valid')) {
                        console.log('✓ API is working correctly');
                        apiReady = true;
                        hideLoading();
                    } else {
                        console.error('✗ API response format unexpected');
                        hideLoading();
                        alert('API connection failed. Please check your internet connection and refresh the page.');
                    }
                } catch (error) {
                    console.error('Error parsing API response:', error);
                    hideLoading();
                    alert('Error connecting to word dictionary. Please refresh the page.');
                }
            } else {
                console.error('Failed to connect to API. Status:', xhr.status);
                hideLoading();
                alert('Failed to connect to word dictionary. Please check your internet connection and refresh the page.');
            }
        }
    };
    
    xhr.onerror = function() {
        console.error('Network error connecting to API');
        hideLoading();
        alert('Network error connecting to word dictionary. Please check your connection and refresh the page.');
    };
    
    xhr.ontimeout = function() {
        console.error('Timeout connecting to API');
        hideLoading();
        alert('Connection timeout. Please refresh the page and try again.');
    };
    
    xhr.send();
}

// Check if word is valid using API
function checkWordWithApi(word, callback) {
    if (!word || word.length === 0) {
        callback(false);
        return;
    }
    
    if (!apiReady) {
        console.log('API not ready yet');
        callback(false);
        return;
    }
    
    var cleanWord = word.trim().toLowerCase();
    console.log('Checking word with API:', cleanWord);
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiBaseUrl + '/search/' + encodeURIComponent(cleanWord), true);
    
    // Set timeout to 5 seconds
    xhr.timeout = 5000;
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    var isValid = response.valid === true;
                    
                    console.log('API response for "' + cleanWord + '":', isValid);
                    callback(isValid);
                } catch (error) {
                    console.error('Error parsing API response:', error);
                    callback(false);
                }
            } else {
                console.error('API request failed. Status:', xhr.status);
                callback(false);
            }
        }
    };
    
    xhr.onerror = function() {
        console.error('Network error during API request');
        callback(false);
    };
    
    xhr.ontimeout = function() {
        console.error('API request timeout');
        callback(false);
    };
    
    xhr.send();
}

// Fetch anagrams using API
function fetchAnagrams(word, callback) {
    if (!word || word.length === 0) {
        callback([]);
        return;
    }
    
    if (!apiReady) {
        console.log('API not ready yet');
        callback([]);
        return;
    }
    
    var cleanWord = word.trim().toLowerCase();
    console.log('Fetching anagrams for:', cleanWord);
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiBaseUrl + '/anagrams/' + encodeURIComponent(cleanWord), true);
    
    // Set timeout to 5 seconds
    xhr.timeout = 5000;
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    var anagrams = response.anagrams || [];
                    
                    console.log('Anagrams for "' + cleanWord + '":', anagrams);
                    callback(anagrams);
                } catch (error) {
                    console.error('Error parsing anagrams response:', error);
                    callback([]);
                }
            } else {
                console.error('Anagrams API request failed. Status:', xhr.status);
                callback([]);
            }
        }
    };
    
    xhr.onerror = function() {
        console.error('Network error during anagrams API request');
        callback([]);
    };
    
    xhr.ontimeout = function() {
        console.error('Anagrams API request timeout');
        callback([]);
    };
    
    xhr.send();
}

// Show result
function showResult(word, isValid) {
    var resultSection = document.getElementById('resultSection');
    var welcomeSection = document.getElementById('welcomeSection');
    var resultCard = document.getElementById('resultCard');
    var resultTitle = document.getElementById('resultTitle');
    var resultMessage = document.getElementById('resultMessage');
    
    // Hide welcome section
    welcomeSection.style.display = 'none';
    
    // Show result section
    resultSection.style.display = 'block';
    
    // Update result card
    resultCard.className = 'result-card ' + (isValid ? 'valid' : 'invalid');
    
    if (isValid) {
        resultTitle.textContent = 'Valid Word!';
        resultMessage.textContent = '"' + word + '" is a valid Scrabble word.';
    } else {
        resultTitle.textContent = 'Invalid Word';
        resultMessage.textContent = '"' + word + '" is not a valid Scrabble word.';
    }
}

// Show welcome
function showWelcome() {
    var resultSection = document.getElementById('resultSection');
    var welcomeSection = document.getElementById('welcomeSection');
    var anagramsSection = document.getElementById('anagramsSection');
    
    resultSection.style.display = 'none';
    anagramsSection.style.display = 'none';
    welcomeSection.style.display = 'block';
}

// Show anagrams
function showAnagrams(word, anagrams) {
    var anagramsSection = document.getElementById('anagramsSection');
    var anagramsList = document.getElementById('anagramsList');
    var anagramsLoader = document.getElementById('anagramsLoader');
    
    // Hide loader
    anagramsLoader.style.display = 'none';
    
    // Clear previous anagrams
    anagramsList.innerHTML = '';
    
    if (anagrams.length === 0) {
        anagramsList.innerHTML = '<div class="no-anagrams">No anagrams found</div>';
    } else {
        anagrams.forEach(function(anagram) {
            var anagramItem = document.createElement('div');
            anagramItem.className = 'anagram-item';
            anagramItem.textContent = anagram;
            anagramsList.appendChild(anagramItem);
        });
    }
    
    // Show anagrams section
    anagramsSection.style.display = 'block';
}

// Show anagrams loader
function showAnagramsLoader() {
    var anagramsSection = document.getElementById('anagramsSection');
    var anagramsList = document.getElementById('anagramsList');
    var anagramsLoader = document.getElementById('anagramsLoader');
    
    // Clear previous anagrams
    anagramsList.innerHTML = '';
    
    // Show loader
    anagramsLoader.style.display = 'block';
    
    // Show anagrams section
    anagramsSection.style.display = 'block';
}

// Hide anagrams
function hideAnagrams() {
    var anagramsSection = document.getElementById('anagramsSection');
    anagramsSection.style.display = 'none';
}

// Check word function
function checkWord() {
    var wordInput = document.getElementById('wordInput');
    var word = wordInput.value;
    
    if (!word || word.length === 0) {
        return;
    }
    
    if (!apiReady) {
        console.log('API still connecting, please wait...');
        alert('Please wait, connecting to word dictionary...');
        return;
    }
    
    // Show loading while checking
    var checkBtn = document.getElementById('checkBtn');
    var originalText = checkBtn.textContent;
    checkBtn.textContent = 'Checking...';
    checkBtn.disabled = true;
    
    checkWordWithApi(word, function(isValid) {
        showResult(word, isValid);
        
        // Show anagrams loader
        showAnagramsLoader();
        
        // Fetch and show anagrams after showing result
        fetchAnagrams(word, function(anagrams) {
            showAnagrams(word, anagrams);
        });
        
        // Restore button
        checkBtn.textContent = originalText;
        checkBtn.disabled = false;
    });
}

// Initialize app
function initApp() {
    console.log('Initializing Scrabble Word Checker...');
    
    // Test API connection
    testApiConnection();
    
    // Set up event listeners
    var checkBtn = document.getElementById('checkBtn');
    var wordInput = document.getElementById('wordInput');
    
    // Check button click
    checkBtn.onclick = checkWord;
    
    // Enter key in input
    wordInput.onkeypress = function(e) {
        if (e.keyCode === 13) {
            checkWord();
        }
    };
    
    // Clear input to show welcome
    wordInput.oninput = function() {
        if (!this.value || this.value.length === 0) {
            showWelcome();
        }
    };
    
    console.log('App initialized');
}

// Start app when page loads
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // IE fallback
    document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
            initApp();
        }
    });
} 