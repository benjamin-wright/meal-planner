import './backdrop.css';

export function Backdrop() {
  return (
    <>
      <div className="backdrop"></div>
      <div className="backdrop-filter"></div>
      <svg className="backdrop-filter" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="1"></feTurbulence>
          <feColorMatrix type="saturate" values="0" result="grain"/>
        </filter>

        <rect width="100%" height="100%" filter="url(#noiseFilter)"></rect>
      </svg>
    </>
  );
}