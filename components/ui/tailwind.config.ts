import exposeColors from '@tailwind-plugin/expose-colors';
import { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      // px-4
      padding: '1rem',
    },
    extend: {
      // https://github.com/nextui-org/nextui/blob/canary/packages/core/theme/src/colors/semantic.ts#L17
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
        },
        foreground: {
          ...colors.zinc,
          DEFAULT: '#11181C',
        },
        divider: {
          DEFAULT: 'rgba(17, 17, 17, 0.15)',
        },
        focus: {
          DEFAULT: colors.blue[500],
        },
        overlay: {
          DEFAULT: '#000000',
        },
        content1: {
          DEFAULT: '#FFFFFF',
          foreground: '#11181C',
        },
        content2: {
          DEFAULT: colors.zinc[100],
          foreground: colors.zinc[800],
        },
        content3: {
          DEFAULT: colors.zinc[200],
          foreground: colors.zinc[700],
        },
        content4: {
          DEFAULT: colors.zinc[300],
          foreground: colors.zinc[600],
        },
      },
    },
  },
  plugins: [exposeColors()],
  corePlugins: {
    preflight: true,
  },
  darkMode: 'class',
} satisfies Config;
