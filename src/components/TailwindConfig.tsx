"use client";

import Script from "next/script";

export default function TailwindConfig() {
  return (
    <Script
      id="tailwind-config"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  olive: '#5A5B44',
                  cream: '#F3EEE7',
                  dark: '#2F2B24',
                  gold: '#C7A86A',
                  beige: '#E8D8C1',
                },
                fontFamily: {
                  serif: ['"Cormorant Garamond"', 'serif'],
                  sans: ['Inter', 'sans-serif'],
                }
              }
            }
          }
        `,
      }}
    />
  );
}