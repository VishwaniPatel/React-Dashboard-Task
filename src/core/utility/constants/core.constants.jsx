import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: 7,
  colors: {
    primary: [
      '#e9f5ff',
      '#d6e4fa',
      '#acc7ee',
      '#80a8e4',
      '#5b8eda',
      '#437dd6',
      '#3575d4',
      '#2560b6',
      '#1c58a9',
      '#064c97',
    ],
  },
  cursorType: 'pointer',
});
export const resolver = () => ({
  variables: {
    '--mantine-font-family-headings': "'Inter', sans-serif",
    '--mantine-font-family': "'Inter', sans-serif",
  },
  dark: {},
  light: {},
});
