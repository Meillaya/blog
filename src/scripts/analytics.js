// src/scripts/simpleAnalytics.js

export function initSimpleAnalytics() {
    const sendPageView = () => {
      const data = {
        url: window.location.href,
        title: document.title,
        referrer: document.referrer,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        timestamp: new Date().toISOString()
      };
  
      // Replace 'https://your-analytics-api.com/collect' with your actual endpoint
      fetch('https://your-analytics-api.com/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).catch(error => console.error('Analytics error:', error));
    };
  
    // Send pageview on initial load
    sendPageView();
  
    // Send pageview on route change (for single-page applications)
    document.addEventListener('astro:page-load', sendPageView);
  }
  