# Twitch Token Login Extension

A Chrome extension for logging into Twitch using authentication tokens. Designed for local development and testing purposes.

## Features

- 🔐 **Token-based Authentication** - Login to Twitch using auth tokens
- 🧹 **Cookie Management** - Automatically clears old session cookies
- ⚡ **Quick Access** - Simple popup interface for fast login
- 🎨 **Modern UI** - Clean, Twitch-themed design
- 🔄 **Auto Redirect** - Automatically navigates to Twitch after login

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon will appear in your toolbar

## Usage

1. Click the extension icon in your Chrome toolbar
2. Enter your Twitch auth token in the input field
3. Click "Login to Twitch"
4. The extension will clear old cookies and set your new auth token
5. You'll be automatically redirected to Twitch

## File Structure

```
extension/
├── manifest.json          # Extension configuration
├── popup/                 # Popup interface
│   ├── index.html        # Main popup HTML
│   ├── script.js         # Login functionality
│   └── style.css         # Popup styling
└── icons/                # Extension assets
    └── login.png         # Extension icon
```

## Permissions

This extension requires the following permissions:
- `scripting` - Execute login scripts on Twitch pages
- `cookies` - Manage authentication cookies
- `tabs` - Access current tab information
- `storage` - Store extension data

## Security Notes

- This extension is intended for local development use only
- Auth tokens are not stored permanently
- Old session cookies are cleared before setting new ones
- Only works on `*.twitch.tv` domains

## Development

Built with vanilla JavaScript and Chrome Extension Manifest V3.

## Author

Created by [3d2faebf4bca96cacf2aa10dc002bf42](https://github.com/3d2faebf4bca96cacf2aa10dc002bf42)

---

⚠️ **Disclaimer**: This extension is for educational and development purposes only. Use responsibly and in accordance with Twitch's Terms of Service.
```

