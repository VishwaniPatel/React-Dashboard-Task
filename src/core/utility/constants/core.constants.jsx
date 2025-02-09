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
   '--mantine-font-family-headings': "'Poppins', sans-serif",
    '--mantine-font-family': "'Roboto', sans-serif",
  },
  dark: {
    '--mantine-color-body': '#1A1B1E',
    '--mantine-color-text': '#FFFFFF',
    '--mantine-color-primary': '#3575d4',
    '--mantine-color-secondary': '#5b8eda',
  },
  light: {
    '--mantine-color-body': '#FFFFFF',
    '--mantine-color-text': '#1A1B1E',
    '--mantine-color-primary': '#2560b6',
    '--mantine-color-secondary': '#80a8e4',
  },
});
