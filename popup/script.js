document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector("#submit")
  const tokenInput = document.querySelector("#token")
  const statusDiv = document.querySelector("#status")
  const chrome = window.chrome // Declare the chrome variable

  function showStatus(message, isError = false) {
    statusDiv.textContent = message
    statusDiv.className = `status-message ${isError ? "error" : "success"}`
    statusDiv.style.display = "block"
  }

  function hideStatus() {
    statusDiv.style.display = "none"
  }

  submitButton.addEventListener("click", async () => {
    const token = tokenInput.value.trim()

    if (!token) {
      showStatus("Please enter an auth token", true)
      return
    }

    hideStatus()
    submitButton.disabled = true
    submitButton.textContent = "Logging in..."

    try {
      // Get the current active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

      if (!tab) {
        throw new Error("No active tab found")
      }

      // Check if we're on a Twitch page, if not, navigate to Twitch first
      if (!tab.url.includes("twitch.tv")) {
        await chrome.tabs.update(tab.id, { url: "https://www.twitch.tv" })
        // Wait a bit for the page to load
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }

      // Execute the login script
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: loginToTwitch,
        args: [token],
      })

      showStatus("Login successful! Redirecting...", false)

      // Close the popup after a short delay
      setTimeout(() => {
        window.close()
      }, 1500)
    } catch (error) {
      console.error("Login failed:", error)
      showStatus(`Login failed: ${error.message}`, true)
    } finally {
      submitButton.disabled = false
      submitButton.textContent = "Login to Twitch"
    }
  })

  // Allow Enter key to submit
  tokenInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      submitButton.click()
    }
  })
})

function loginToTwitch(token) {
  console.log("Starting Twitch login process...")

  // Clear specific old cookies that shouldn't be carried over
  const cookiesToClear = ["twilight-user", "auth-token", "last_login", "login", "name"]
  const pastDate = "Thu, 01 Jan 1970 00:00:00 GMT"

  // Clear cookies for different domain variations
  cookiesToClear.forEach((cookieName) => {
    // Clear for .twitch.tv domain
    document.cookie = `${cookieName}=; domain=.twitch.tv; path=/; expires=${pastDate}; Secure`
    // Clear for twitch.tv domain
    document.cookie = `${cookieName}=; domain=twitch.tv; path=/; expires=${pastDate}; Secure`
    // Clear for current domain
    document.cookie = `${cookieName}=; path=/; expires=${pastDate}; Secure`
    // Clear without domain
    document.cookie = `${cookieName}=; path=/; expires=${pastDate}`
  })

  // Clean the token (remove quotes if present)
  const cleanToken = token.replace(/['"]/g, "")

  // Set expiration time (1 year from now)
  const expirationTime = new Date()
  expirationTime.setFullYear(expirationTime.getFullYear() + 1)

  // Set the new auth-token cookie with different variations to ensure it works
  const cookieString = `auth-token=${cleanToken}; domain=.twitch.tv; path=/; expires=${expirationTime.toUTCString()}; Secure; SameSite=None`
  document.cookie = cookieString

  // Also try without SameSite=None in case it causes issues
  document.cookie = `auth-token=${cleanToken}; domain=.twitch.tv; path=/; expires=${expirationTime.toUTCString()}; Secure`

  console.log("Auth token cookie set, reloading page...")

  // Reload the page to apply the new authentication
  setTimeout(() => {
    window.location.reload()
  }, 500)
}
