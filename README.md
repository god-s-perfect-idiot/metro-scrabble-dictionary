# Scrabble Dictionary App

A modern Scrabble dictionary application built with Metro UI design language, specifically optimized for Windows Phone 8.1 (IE Mobile 11).

## Features

### 🎯 Core Functionality
- **Word Validation**: Check if words are valid in Scrabble
- **Score Calculation**: Calculate Scrabble points for any word
- **Letter Breakdown**: See individual letter values
- **Word Definitions**: Get definitions from the Free Dictionary API
- **Real-time Search**: Instant word lookup with API integration

### 🎨 Metro UI Design
- **Authentic Metro Design**: Follows Microsoft's Metro UI design principles
- **Touch Optimized**: Designed for touch interactions on mobile devices
- **Responsive Layout**: Adapts to different screen sizes
- **High Contrast Support**: Accessible design for users with visual impairments
- **Smooth Animations**: Fluid transitions and interactions

### 📱 Windows Phone 8.1 Compatibility
- **IE Mobile 11 Support**: Optimized for Internet Explorer Mobile 11
- **Touch Gestures**: Swipe to clear search, tap interactions
- **Offline Support**: Service Worker for offline functionality
- **Performance Optimized**: Fast loading and smooth operation

### 🔧 Technical Features
- **API Integration**: Uses Free Dictionary API for word definitions
- **Local Storage**: Saves search history and settings
- **Service Worker**: Offline caching and background sync
- **Progressive Web App**: Can be installed on supported devices
- **Cross-browser Compatibility**: Works on modern browsers

## File Structure

```
metro-scrabble-dictionary/
├── index.html              # Main HTML file
├── css/
│   ├── metro-ui.css        # Metro UI framework styles
│   └── app.css            # App-specific styles
├── js/
│   ├── metro-ui.js        # Metro UI JavaScript framework
│   ├── dictionary.js      # Dictionary API and logic
│   └── app.js            # Main application file
├── sw.js                  # Service Worker for offline support
└── README.md             # This file
```

## Usage

### Getting Started
1. Open `index.html` in a web browser
2. Enter a word in the search box
3. Press Enter or tap the search button
4. View the word's definition, score, and letter breakdown

### Features
- **Search**: Type any word to check if it's valid in Scrabble
- **Score Display**: See the total points for the word
- **Letter Breakdown**: View individual letter values
- **Definitions**: Get word meanings from the dictionary API
- **History**: Search history is automatically saved
- **Offline Mode**: Works without internet connection (cached content)

### Keyboard Shortcuts
- `Ctrl/Cmd + K`: Focus search input
- `Enter`: Perform search
- `Escape`: Clear search

### Touch Gestures (Mobile)
- **Swipe Left**: Clear search input
- **Tap**: Interact with buttons and elements
- **Long Press**: Context menus (where available)

## API Integration

The app uses the **Free Dictionary API** (https://dictionaryapi.dev/) to fetch word definitions. This is a free, open-source API that provides:

- Word definitions and meanings
- Phonetic pronunciations
- Part of speech information
- Example usage

### API Endpoints Used
- `GET https://api.dictionaryapi.dev/api/v2/entries/en/{word}`

### Fallback Behavior
If a word is not found in the dictionary API but is valid in Scrabble, the app will still show the word with its score and letter breakdown, using a generic definition.

## Scrabble Word Validation

The app includes a comprehensive list of valid Scrabble words, including:
- Official 2-letter words
- Common longer words
- Standard English vocabulary

### Letter Values
- A, E, I, L, N, O, R, S, T, U: 1 point
- D, G: 2 points
- B, C, M, P: 3 points
- F, H, V, W, Y: 4 points
- K: 5 points
- J, X: 8 points
- Q, Z: 10 points

## Browser Compatibility

### Primary Target
- **Windows Phone 8.1** with IE Mobile 11

### Also Supported
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Android Chrome
- **Progressive Web App**: Installable on supported devices

## Performance Optimizations

### Loading Speed
- Minified CSS and JavaScript
- Optimized images and assets
- Efficient caching strategies
- Lazy loading where applicable

### Memory Usage
- Efficient DOM manipulation
- Event delegation
- Proper cleanup of event listeners
- Minimal memory footprint

### Network Efficiency
- API request caching
- Offline support via Service Worker
- Compressed responses
- Request debouncing

## Development

### Prerequisites
- Modern web browser
- Local web server (for Service Worker testing)
- Text editor or IDE

### Local Development
1. Clone or download the project
2. Start a local web server in the project directory
3. Open `index.html` in your browser
4. Test functionality and make changes

### Testing
- Test on Windows Phone 8.1 device or emulator
- Test on modern browsers for compatibility
- Test offline functionality
- Test touch interactions on mobile devices

## Customization

### Styling
Modify `css/app.css` to customize the app's appearance:
- Colors and themes
- Layout and spacing
- Typography
- Animations

### Functionality
Modify `js/dictionary.js` to customize:
- API endpoints
- Word validation logic
- Score calculation
- UI behavior

### Metro UI Framework
Modify `css/metro-ui.css` and `js/metro-ui.js` to customize:
- Component styles
- Interaction behaviors
- Framework features

## Troubleshooting

### Common Issues

**App doesn't load**
- Check browser compatibility
- Ensure all files are present
- Check for JavaScript errors in console

**API requests fail**
- Check internet connection
- Verify API endpoint availability
- Check browser's CORS settings

**Offline mode not working**
- Ensure Service Worker is registered
- Check browser support for Service Workers
- Clear browser cache and reload

**Touch interactions not working**
- Ensure device supports touch
- Check for conflicting event handlers
- Test on actual mobile device

### Debug Mode
Open browser developer tools and check:
- Console for JavaScript errors
- Network tab for API requests
- Application tab for Service Worker status
- Performance tab for loading times

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## Support

For support or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Test on different devices/browsers
4. Submit an issue with detailed information

---

**Built with ❤️ for Windows Phone 8.1 users** 