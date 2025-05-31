import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", ".dark"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}", // Explicitly include the components directory
    "./src/components/sections/**/*.{ts,tsx}", // More specific to your Hero component
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        brand: {
					50: '#f0f7ff',
					100: '#e0effe',
					200: '#bae0fd',
					300: '#7cc6fb',
					400: '#3aa9f5',
					500: '#108be7',
					600: '#0670c7',
					700: '#0759a2',
					800: '#0a4a86',
					900: '#0d3f70',
				},
      },
      borderRadius: {
        // ... your border radius configuration
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-out': { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        'slide-up': { '0%': { transform: 'translateY(10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'slide-down': { '0%': { transform: 'translateY(-10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'pulse-soft': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.8' } },
        'scale-in': { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        'float': { // Define the float keyframes
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'test-animation': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-down': 'slide-down 0.4s ease-out',
        'pulse-soft': 'pulse-soft 3s infinite ease-in-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'test-animation': 'test-animation 1s linear infinite',
        'float': 'float 3s ease-in-out infinite', // Define the animate-float animation
      },
      fontFamily: {
        // ... your font family configuration
      },
      boxShadow: {
        // ... your box shadow configuration
      },
      transitionProperty: {
        // ... your transition property configuration
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;