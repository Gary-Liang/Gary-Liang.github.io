import React, { useState, useEffect } from 'react';

function Popup({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Show the popup when the component mounts
    const timeout = setTimeout(() => {
      setIsVisible(false); // Hide the popup after 3 seconds
      onClose();
    }, 3000); // 3 seconds

    return () => {
      clearTimeout(timeout); // Clear the timeout when the component unmounts
    };
  }, []);

  return (
    <div className="container relative">
      <div className={`popup ${isVisible ? 'visible' : 'hidden'} overlay absolute top-[-40px] bg-black opacity-50 z-900`}>
        {message}
      </div>
    </div>
  );
}

export default Popup;