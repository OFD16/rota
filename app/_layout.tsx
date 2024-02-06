import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    urbanist_black: require('../assets/fonts/Urbanist-Black.ttf'),
    urbanist_blackitalic: require('../assets/fonts/Urbanist-BlackItalic.ttf'),

    urbanist_bold: require('../assets/fonts/Urbanist-Bold.ttf'),
    urbanist_bolditalic: require('../assets/fonts/Urbanist-BoldItalic.ttf'),

    urbanist_extrabold: require('../assets/fonts/Urbanist-ExtraBold.ttf'),
    urbanist_extrabolditalic: require('../assets/fonts/Urbanist-ExtraBoldItalic.ttf'),
    urbanist_extralight: require('../assets/fonts/Urbanist-ExtraLight.ttf'),
    urbanist_extralightitalic: require('../assets/fonts/Urbanist-ExtraLightItalic.ttf'),

    urbanist_italic: require('../assets/fonts/Urbanist-Italic.ttf'),
    urbanist_light: require('../assets/fonts/Urbanist-Light.ttf'),
    urbanist_lightitalic: require('../assets/fonts/Urbanist-LightItalic.ttf'),

    urbanist_medium: require('../assets/fonts/Urbanist-Medium.ttf'),
    urbanist_mediumitalic: require('../assets/fonts/Urbanist-MediumItalic.ttf'),

    urbanist_regular: require('../assets/fonts/Urbanist-Regular.ttf'),
    urbanist_semibold: require('../assets/fonts/Urbanist-SemiBold.ttf'),
    urbanist_semibolditalic: require('../assets/fonts/Urbanist-SemiBoldItalic.ttf'),

    urbanist_thin: require('../assets/fonts/Urbanist-Thin.ttf'),
    urbanist_thinitalic: require('../assets/fonts/Urbanist-ThinItalic.ttf'),

    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
