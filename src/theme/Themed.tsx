import * as React from "react";
import {Text as DefaultText, View as DefaultView} from "react-native";

// import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export function useThemeColor(props: {light?: string; dark?: string}, colorName: keyof typeof Colors.light & keyof typeof Colors.dark) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function ThemedText(props: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, "text");

  return <DefaultText testID="themed-text" style={[{color}, style]} {...otherProps} />;
}

export function ThemedView(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, "background");

  return <DefaultView testID="themed-view" style={[{backgroundColor}, style]} {...otherProps} />;
}
