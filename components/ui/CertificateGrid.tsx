'use client';

import React from 'react';
import Image from 'next/image';

interface CertificateGridProps {
  items: Array<{ id: string; name: string; desc: string }>;
}

const CertificateGrid: React.FC<CertificateGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((item, idx) => (
        <div key={item.id} className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-500">
          <div className="relative h-20 w-32 mb-8 mx-auto grayscale group-hover:grayscale-0 transition-all duration-700">
             <Image 
              src={`/assets/certificate/imgi_${(idx % 4) + 1}_certificate.webp`} 
              alt={item.name} 
              fill 
              className="object-contain"
            />
          </div>
          <h4 className="text-xl font-bold mb-4 text-center group-hover:text-brand-green transition-colors">
            {item.name}
          </h4>
          <p className="text-sm text-brand-muted text-center leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CertificateGrid;
