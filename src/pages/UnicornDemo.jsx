import React from 'react';
import LazyUnicornStudio from '../components/LazyUnicornStudio';

const UnicornDemo = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Unicorn Studio Demo</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Basic Example</h2>
        <p className="mb-4">Replace 'YOUR_PROJECT_ID' with your actual Unicorn Studio project ID:</p>
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <LazyUnicornStudio 
            projectId="yBnUWh2xGiLq1BpYRf0p"
            altText="Unicorn Studio demo scene" 
            style={{ height: '400px' }}
          />
        </div>
        <p className="mt-2 text-gray-400 text-sm">Note: You need a valid project ID for the scene to display</p>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Custom Parameters</h2>
        <p className="mb-4">Example with custom parameters:</p>
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <LazyUnicornStudio 
            projectId="YOUR_PROJECT_ID"
            scale={0.75}
            dpi={2}
            lazyload={true}
            production={true}
            altText="Custom parameters demo scene"
            ariaLabel="Interactive 3D scene example"
            style={{ height: '500px' }}
          />
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Using Project JSON Source</h2>
        <p className="mb-4">For faster loading using hosted JSON:</p>
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <LazyUnicornStudio 
            projectSrc="YOUR_HOSTED_JSON_URL.json.txt"
            altText="Hosted JSON demo scene"
            style={{ height: '450px' }}
          />
        </div>
        <p className="mt-2 text-gray-400 text-sm">Replace 'YOUR_HOSTED_JSON_URL.json.txt' with your actual hosted JSON URL</p>
      </div>
    </div>
  );
};

export default UnicornDemo; 