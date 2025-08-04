# Twitch Token Login Extension

A modern, minimalistic Chrome extension for logging into Twitch using your authentication token. Secure, fast, and private—built for users who need quick token-based access to Twitch without entering their credentials.

## Features

- 🔑 **Token-Based Login:** Instantly log in to Twitch using your auth token.
- 🧹 **Secure Cookie Management:** Automatically clears old Twitch session cookies before setting your new auth token for a clean, conflict-free login.
- 🟣 **Modern Twitch-Themed UI:** Clean, responsive popup with accessibility and keyboard support.
- ⚡ **Efficient, Minimal Workflow:** Login in seconds, directly from your browser, without storing any sensitive data.
- 🔄 **Automatic Page Reload:** Reloads Twitch after login to ensure your session is updated.
- ✨ **No Credentials Stored:** Your token is never saved or transmitted outside your browser.

## Installation

1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the extension folder.
5. The Twitch Token Login icon will appear in your toolbar.

## Usage

1. Click the extension icon in your Chrome toolbar.
2. Enter your Twitch auth token in the popup input field.
3. Click **Login to Twitch**.
4. The extension clears old Twitch cookies, sets your new auth token, and reloads the current Twitch tab.
5. You're instantly logged in—no username or password required.

## Permissions

This extension requires:
- `scripting` – To inject login scripts for cookie/session handling on Twitch pages.
- `activeTab` – To ensure login actions are performed on the correct Twitch tab.
- `host_permissions` for `*.twitch.tv/*` – To limit actions strictly to Twitch.

## Security Notes

- Auth tokens are **never stored** or transmitted anywhere.
- Old session cookies are thoroughly cleared to prevent session conflicts.
- Only works on official Twitch domains for maximum privacy and security.

## Development

- 100% vanilla JavaScript, clean HTML, and CSS.
- Built with Chrome Extension Manifest V3.
- Designed for quick extension popup interactions and single-purpose security.

## Author

Created by [3d2faebf4bca96cacf2aa10dc002bf42](https://github.com/3d2faebf4bca96cacf2aa10dc002bf42)

---

**Disclaimer:**  
This extension is for educational and development purposes only. Use responsibly and in accordance with Twitch's Terms of Service.
