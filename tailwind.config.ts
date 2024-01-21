import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'cgone':'1280px',
        'cgtwo':'835px',
        'xs':'410px',
        'sm': '640px', 
  
        'md': '768px', 
  
        'lg': '1024px', 

        'll':'1070px',
  
        'xl': '1330px', 
  
        '2xl': '1536px', 
      }
    },
  },
  plugins: [],
}
export default config
