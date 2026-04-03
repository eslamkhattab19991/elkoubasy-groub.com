'use client';

import React, { forwardRef } from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
}

const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(({ 
  children, 
  id, 
  className = "", 
  dark = false 
}, ref) => {
  return (
    <section 
      ref={ref}
      id={id}
      className={`py-20 md:py-28 overflow-hidden ${dark ? 'bg-brand-dark text-white' : ''} ${className}`}
    >
      <div className="container-custom">
        {children}
      </div>
    </section>
  );
});

SectionWrapper.displayName = 'SectionWrapper';

export default SectionWrapper;
