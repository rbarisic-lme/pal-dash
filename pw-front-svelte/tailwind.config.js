import forms from '@tailwindcss/forms';
import { paldashTheme } from './paldash-theme.ts';

// @ts-check
import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: [
    './src/**/*.{html,js,svelte,ts}',
    // Skeleton Section
    join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
  ],
  theme: {
    container: {
      // you can configure the container to be centered
      center: true,
      // or have default horizontal padding
      padding: '1rem',
      // default breakpoints but with 40px removed
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1496px',
      },
    },
    extend: {
      flexWrap: {
        'default': 'wrap',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      padding: {
        'xs': '4px',
        'sm': '6px',
        'md': '12px',
        'lg': '20px',
        'xl': '84px',
      },
      colors: {
        light: '#fff',
        'white': '#fff',
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#64ff00',
        'yellow': '#ffc82c',
        'yellow-light': 'rgb(225 199 125)',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
        bg: '#0E0C1B', // Rich Black
        second: '#3223DB',
        third: '#3bf698',
        new: '#221e3e',
  
      },
      fontFamily: {
        // sans: ['Inter', 'sans-serif'],
        // lead: ['Poppins', 'serif'],
        shingo: ['A-OTF Shin Go Pro', 'sans-serif'],
        sans: ['A-OTF Shin Go Pro', 'sans-serif'],
        lead: ['A-OTF Shin Go Pro', 'sans-serif'],
      },
      fontSize: {
        // sm: '11px',
        // base: '14px',
        // 'lg': '18px',
        // 'xl': '24px',
        // '2xl': '48px',
        // 'lead': '64px',
        // adjusted for shingo:
        sm: '10px',
        base: '12px',
        'md': '14px',
        'lg': '16px',
        'xl': '18px',
        '2xl': '38px',
        'lead': '54px',
        'sublead': '28px',
      },
      spacing: {
        'xs': '4px',
        'sm': '6px',
        'md': '10px',
        'lg': '20px',
        'xl': '32px',
        '2xl': '64px',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '6px',
        DEFAULT: '15px',
        'lg': '24px',
        'xl': '32px',
        'full': '9999px',
      }
    }
  },
	plugins: [
    forms,
    skeleton({
      themes: {
        custom: [paldashTheme],
        preset: [ "skeleton" ] }
    })
	]
}