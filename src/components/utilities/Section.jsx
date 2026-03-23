import React from 'react';

const Section = React.forwardRef(({ children, className = '', id = '', ...rest }, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      className={`section-spacing ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
});

export default Section;
