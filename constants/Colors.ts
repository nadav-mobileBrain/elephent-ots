const tintColorLight = '#1A1A1A';
const tintColorDark = '#FFFFFF';

export default {
  primary: '#9FE870', // Neon green for primary actions
  primaryLight: '#B8FF89',
  primaryDark: '#7AC754',
  secondary: '#2C2C2C', // Dark gray for cards
  tertiary: '#383838', // Slightly lighter gray
  quaternary: '#444444', // Even lighter gray
  quinary: '#505050', // Lightest gray
  accent: '#7AC754', // Neon green
  accentTransparent: 'rgba(159, 232, 112, 0.1)',
  background: '#1A1A1A', // Very dark gray/black
  backgroundSecondary: '#242424', // Slightly lighter background
  card: '#2C2C2C', // Dark gray for cards
  text: '#FFFFFF', // White text
  textSecondary: '#AAAAAA', // Light gray text
  border: '#383838', // Dark border color

  light: {
    text: '#FFFFFF',
    background: '#1A1A1A',
    tint: tintColorLight,
    tabIconDefault: '#666666',
    tabIconSelected: '#9FE870',
  },
  dark: {
    text: '#FFFFFF',
    background: '#1A1A1A',
    tint: tintColorDark,
    tabIconDefault: '#666666',
    tabIconSelected: '#9FE870',
  },
};
