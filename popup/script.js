document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector("#submit")
  const tokenInput = document.querySelector("#token")
  const clearTokenButton = document.querySelector("#clear-token")
  const statusDiv = document.querySelector("#status")
  const chrome = window.chrome

  function showStatus(message, type = "info") {
    statusDiv.textContent = message
    statusDiv.className = `status-message ${type}`
    statusDiv.style.display = "block"
  }

  function hideStatus() {
    statusDiv.style.display = "none"
  }

  submitButton.addEventListener("click", async () => {
    const token = tokenInput.value.trim()

    if (!token) {
      showStatus("Please enter an auth token.", "error")
      return
    }

    hideStatus()
    submitButton.disabled = true
    submitButton.textContent = "Logging in..."
    tokenInput.disabled = true
    clearTokenButton.disabled = true

    try {
      // Get the current active tab (requires 'activeTab' permission)
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

      if (!tab || !tab.url.includes("twitch.tv")) {
        showStatus("Please navigate to Twitch.tv before logging in.", "error")
        return
      }

      // Execute the login script in the active tab (requires 'scripting' permission)
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: loginToTwitch,
        args: [token],
      })

      showStatus("Login script executed. Page reloading...", "success")

      setTimeout(() => {
        window.close()
      }, 2000)
    } catch (error) {
      console.error("Login process failed:", error)
      showStatus(`Login failed: ${error.message || "An unknown error occurred."}`, "error")
    } finally {
      submitButton.disabled = false
      submitButton.textContent = "Login to Twitch"
      tokenInput.disabled = false
      clearTokenButton.disabled = false
    }
  })

  clearTokenButton.addEventListener("click", () => {
    tokenInput.value = ""
    tokenInput.focus()
    hideStatus()
  })

  tokenInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      submitButton.click()
    }
  })
})

// This function runs in the context of the active tab
function loginToTwitch(token) {
  console.log("Twitch Token Login: Starting cookie manipulation...")

  const cookiesToClear = ["twilight-user", "auth-token", "last_login", "login", "name"]
  const pastDate = "Thu, 01 Jan 1970 00:00:00 GMT"

  const domains = [".twitch.tv", "twitch.tv", "www.twitch.tv"]
  const paths = ["/", "/."]

  cookiesToClear.forEach((cookieName) => {
    domains.forEach((domain) => {
      paths.forEach((path) => {
        document.cookie = `${cookieName}=; domain=${domain}; path=${path}; expires=${pastDate}; Secure; SameSite=None`
        document.cookie = `${cookieName}=; domain=${domain}; path=${path}; expires=${pastDate}; Secure`
        document.cookie = `${cookieName}=; domain=${domain}; path=${path}; expires=${pastDate}`
        console.log(`Twitch Token Login: Attempted to clear cookie: ${cookieName} for domain ${domain} path ${path}`)
      })
    })
    document.cookie = `${cookieName}=; path=/; expires=${pastDate}; Secure; SameSite=None`
    document.cookie = `${cookieName}=; path=/; expires=${pastDate}; Secure`
    document.cookie = `${cookieName}=; path=/; expires=${pastDate}`
    console.log(`Twitch Token Login: Attempted to clear cookie: ${cookieName} for current domain`)
  })

  const cleanToken = token.replace(/['"]/g, "")

  const expirationTime = new Date()
  expirationTime.setFullYear(expirationTime.getFullYear() + 1)

  const cookieOptions = `domain=.twitch.tv; path=/; expires=${expirationTime.toUTCString()}; Secure; SameSite=Lax` // Changed to Lax for broader compatibility
  document.cookie = `auth-token=${cleanToken}; ${cookieOptions}`
  console.log(`Twitch Token Login: Set new auth-token cookie: auth-token=${cleanToken}; ${cookieOptions}`)

  // A small delay before reloading to ensure the browser processes the cookie change
  setTimeout(() => {
    window.location.reload()
    console.log("Twitch Token Login: Page reload initiated.")
  }, 750)
}
