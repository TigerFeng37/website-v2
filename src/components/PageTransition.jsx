import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function PageTransition({ children }) {
  const location = useLocation();

  useEffect(() => {
    if (!document.startViewTransition) {
      return; // Skip if the browser doesn't support View Transitions API
    }

    // Function to handle navigation
    const handleNavigation = () => {
      // Use the View Transitions API
      document.startViewTransition(() => {
        // This is where React would normally update the DOM
        // React has already updated the DOM by the time this callback runs
        window.scrollTo(0, 0); // Scroll to top on page change
      });
    };

    // Call the navigation handler when the location changes
    handleNavigation();
  }, [location]);

  return (
    <>
      {children}
    </>
  );
}

export default PageTransition; 