import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS
const PRIMARY = {
  holylight: '#D0E0E3',
  holylighter: '#CDF5F0',
  lighter: '#76A5AF',
  light: '#44818E',
  lightblue: '#A3C3C9',
  blue: '#1C768A',
  darkblue: '#145564',
  main: '#D0E0E3',
  dark: '#061F2B',
  darker: '#030E13',
  contrastText: '#fff'
};
const SECONDARY = {
  lighter: '#FEF8D5',
  // light: "#FAE383",
  light: '#f1c232',
  main: '#ed7f10',
  dark: '#AD8119',
  darker: '#7A5D14',
  contrastText: '#fff'
};
const TERTIARY = {
  main: '#45818E',
  contrastText: '#fff'
};
const SUCCESS = {
  light: '#CCF0CA',
  main: '#197F1E',
  contrastText: '#fff',
  blur: 'rgba(0,180,0,0.2)'
};
const INFO = {
  light: '#B1C8CE',
  main: '#007B9E'
};
const WARNING = {
  light: '#CEC767',
  main: '#B2A70C',
  contrastText: '#fff'
};
const ERROR = {
  light: '#CE7673',
  main: '#c62828',
  contrastText: '#fff',
  blur: 'rgba(255,0,0,0.2)'
};
const GREY = {
  light: '#D0E0E3',
  main: '#8E9AAF',
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454545',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8)
};
const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FEF998', '#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF513A', '#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
  grey: ['#212B36']
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  tertiary: { ...TERTIARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
};

const paletteDark = {
  ...COMMON,
  text: { primary: GREY[100], secondary: GREY[300], disabled: GREY[600] },
  background: { paper: '#fff', default: '#F9FAFC', neutral: GREY[200] },
  action: { active: GREY[600], ...COMMON.action }
};

export default paletteDark;
