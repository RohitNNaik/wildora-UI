import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => Math.round((width / guidelineBaseWidth) * size);
const verticalScale = size => Math.round((height / guidelineBaseHeight) * size);

export default {
  scale,
  verticalScale,
  colors: {
    primary: '#2B8A9B',
    accent: '#F6A623',
    background: '#F7FAFC',
    surface: '#FFFFFF',
    text: '#0F172A',
    muted: '#64748B',
  },
  spacing: (n = 1) => scale(8) * n,
  radius: 12,
  shadow: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 },
    android: { elevation: 4 },
  }),
};
