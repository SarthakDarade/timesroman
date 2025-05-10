
import React, { useEffect, useRef, useState } from 'react';

type MapComponentProps = {
  address: string;
  className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ address, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mapRef = useRef<HTMLIFrameElement>(null);
  
  // Encode address for use in Google Maps embed URL
  const encodedAddress = encodeURIComponent(address);
  
  // Google Maps embed URL
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=m&z=14&output=embed&iwloc=near`;
  
  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };
    
    if (mapRef.current) {
      mapRef.current.addEventListener('load', handleLoad);
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.removeEventListener('load', handleLoad);
      }
    };
  }, []);
  
  return (
    <div className={`relative overflow-hidden rounded-lg border border-gray-300 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      )}
      <iframe
        ref={mapRef}
        src={mapUrl}
        className="h-full w-full min-h-[300px]"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
      />
    </div>
  );
};

export default MapComponent;
