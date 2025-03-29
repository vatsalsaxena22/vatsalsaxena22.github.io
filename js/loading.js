document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time - adjust as needed
    setTimeout(function() {
      // Hide the loading screen after animation completes
      loadingScreen.classList.add('hidden');
    }, 1500); // Wait for animation to finish before hiding
    
    // Fallback to ensure loading screen disappears
    window.addEventListener('load', function() {
      setTimeout(function() {
        loadingScreen.classList.add('hidden');
      }, 1500);
    });

    // For demo purposes - if you want to show the loading screen again
    window.showLoader = function() {
      loadingScreen.classList.remove('hidden');
      
      // Reset the animation by removing and re-adding the path
      const vContainer = document.querySelector('.v-container');
      const oldSvg = vContainer.querySelector('svg');
      const newSvg = oldSvg.cloneNode(true);
      vContainer.removeChild(oldSvg);
      vContainer.appendChild(newSvg);
      
      // Hide again after animation
      setTimeout(function() {
        loadingScreen.classList.add('hidden');
      }, 1500);
    };
  });