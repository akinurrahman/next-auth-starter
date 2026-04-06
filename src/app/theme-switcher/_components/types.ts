export type Preview = {
  bg: string;
  sidebar: string;
  sidebarStrip: string;
  sidebarActive: string;
  card: string;
  text: string;
  muted: string;
  textDim: string;
  primary: string;
  primaryFg: string;
  border: string;
  inputBg: string;
};

export type ThemeVariant = {
  id: string;
  accentHex: string;
  tagline: string;
  preview: Preview;
};

export type ThemeFamily = {
  index: string;
  name: string;
  light: ThemeVariant;
  dark: ThemeVariant;
};
