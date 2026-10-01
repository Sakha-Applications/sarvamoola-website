import { Platform } from 'react-native';

export const colors = {
  paper: '#f5f6f0',
  ink: '#12302f',
  teal: '#0e3b3a',
  turmeric: '#e3a72b',
  moss: '#8fb37a',
  muted: '#4b5f5d',
  line: '#cfd6cc',
  onTeal: '#eef2ea',
  onTealMuted: '#c3d4cd',
};

// System fonts so the app needs no font downloads
export const fonts = {
  display: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
};
