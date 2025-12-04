import React from 'react';

// Centralized styles for the modern government aesthetic (Light Theme)
const styles = {
  container: {
    // Full screen setup
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // UPDATED: Modern, light blue/aqua gradient (signifying clarity and trust)
    background: 'linear-gradient(135deg, #E0F7FA 0%, #B3E5FC 100%)', 
    // UPDATED: Dark professional blue text for high readability on light background
    color: '#004D7A', 
    fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  spinnerWrapper: {
    marginBottom: '25px',
    position: 'relative',
  },
  // Custom CSS for a clean, modern loading ring animation
  ring: {
    display: 'block',
    width: '80px',
    height: '80px',
    // UPDATED: Transparent base ring using a muted version of the text color
    border: '8px solid #004D7A22', 
    borderRadius: '50%',
    // UPDATED: Bright Cyan/Teal accent color for the spin effect
    borderColor: '#004D7A22 #0097A7 #004D7A22 #0097A7', 
    animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
    // Subtle shadow adjusted for light background
    boxShadow: '0 0 15px rgba(0, 77, 122, 0.15)', 
  },
  // Keyframes for the custom spin animation
  keyframes: `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
  // Text styles
  heading: {
    marginTop: '20px',
    fontWeight: '700', 
    fontSize: '24px',
    letterSpacing: '1.5px', 
    // Shadow removed/lightened to maintain a clean aesthetic on light background
    textShadow: 'none', 
  },
  subHeading: {
    marginTop: '8px',
    fontSize: '16px',
    fontWeight: '400',
    opacity: 0.85,
  }
};

const LoadingScreen = () => {
  return (
    <div style={styles.container}>
      {/* Inject keyframes into the style block */}
      <style>{styles.keyframes}</style>
      
      {/* Custom Spinner */}
      <div style={styles.spinnerWrapper}>
        <div style={styles.ring}></div>
      </div>

      {/* Modernized Loading Message */}
      <h4 style={styles.heading}>
Loading... Please Wait       </h4>
      <p style={styles.subHeading}>
        Loading secure services, please wait...
      </p>
    </div>
  );
};

export default LoadingScreen;
