document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loadingScreen");

  // Simulate loading time - adjust as needed
  setTimeout(function () {
    // Hide the loading screen after animation completes
    loadingScreen.classList.add("hidden");
  }, 1500); // Wait for animation to finish before hiding

  // Fallback to ensure loading screen disappears
  window.addEventListener("load", function () {
    setTimeout(function () {
      loadingScreen.classList.add("hidden");
    }, 1500);
  });
});
