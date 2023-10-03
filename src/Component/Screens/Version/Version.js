import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Alterado para FontAwesome5
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  withSpring,
  withTiming,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';

import style from './style';

export default function () {
  const springConfig = {
    damping: 2,
    stiffness: 80,
  };

  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const backgroundColors = {
    github: useSharedValue('#fff'),
    Potimaker: useSharedValue('#fff'),
    gmail: useSharedValue('#fff'),
  };

  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  const onButtonPress = (link, button) => {
    Object.keys(backgroundColors).forEach((key) => {
      backgroundColors[key].value = withTiming('#fff', { duration: 200 });
    });
    backgroundColors[button].value = withTiming('#007BFF', { duration: 200 });

    // Abrir o link após a animação
    setTimeout(() => {
      runOnJS(handleOpenLink)(link);
    }, 200);

    // Restaurar o estado original após um atraso
    setTimeout(() => {
      Object.keys(backgroundColors).forEach((key) => {
        backgroundColors[key].value = withTiming('#fff', { duration: 200 });
      });
    }, 500);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      opacity.value = 0.7;
    },
    onEnd: () => {
      opacity.value = 1;
    },
  });

  const animatedStyles = {
    github: useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
        backgroundColor: backgroundColors.github.value,
      };
    }),
    Potimaker: useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
        backgroundColor: backgroundColors.Potimaker.value,
      };
    }),
    gmail: useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
        backgroundColor: backgroundColors.gmail.value,
      };
    }),
  };

  return (
    <View style={style.container}>
      <Text style={style.upperText}>Links/Versão</Text>

      <View style={style.buttonsContainer}>
        <Animated.View style={[style.card, animatedStyles.github]}>
          <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                onButtonPress('https://github.com/grodrigues49168', 'github');
              }
            }}
          >
            <Animated.View style={style.button} {...{ gestureHandler }}>
              <FontAwesome5 name="github" size={24} color="black" />
              <Text style={style.buttonText}>GitHub</Text>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>

        <Animated.View style={[style.card, animatedStyles.Potimaker]}> 
          <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                onButtonPress('https://potimaker-ifrn.github.io/sitePotimaker/index.html', 'Potimaker');
              }
            }}
          >
            <Animated.View style={style.button} {...{ gestureHandler }}>
              <FontAwesome5 name="globe" size={20} color="black" /> 
              <Text style={style.buttonText}>Potimaker</Text>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>

        <Animated.View style={[style.card, animatedStyles.gmail]}>
          <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                onButtonPress('potimaker.ifrn@gmail.com', 'gmail');
              }
            }}
          >
            <Animated.View style={style.button} {...{ gestureHandler }}>
              <FontAwesome5 name="envelope" size={24} color="black" />
              <Text style={style.buttonText}>Gmail</Text>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </View>

      <Text style={style.lowerText}>V0.14 "beta"</Text>
    </View>
  );
}