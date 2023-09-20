import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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

export default function () {
  const springConfig = {
    damping: 2,
    stiffness: 80,
  };

  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue('#fff');

  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  const onButtonPress = (link) => {
    opacity.value = withTiming(0.7, { duration: 200 });
    scale.value = withSpring(0.9, springConfig);
    backgroundColor.value = withTiming('#007BFF', { duration: 200 });

    // Abrir o link após a animação
    setTimeout(() => {
      runOnJS(handleOpenLink)(link);
    }, 200);

    // Restaurar o estado original após um atraso
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSpring(1, springConfig);
      backgroundColor.value = withTiming('#fff', { duration: 200 });
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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
      backgroundColor: backgroundColor.value,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.upperText}>Texto na parte superior</Text>

      <View style={styles.buttonsContainer}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                onButtonPress('https://github.com/seu-usuario');
              }
            }}
          >
            <Animated.View style={styles.button} {...{ gestureHandler }}>
              <FontAwesome name="github" size={24} color="black" />
              <Text style={styles.buttonText}>GitHub</Text>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>

        <Animated.View style={[styles.card, animatedStyle]}>
          <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                onButtonPress('https://expo.io');
              }
            }}
          >
            <Animated.View style={styles.button} {...{ gestureHandler }}>
              <FontAwesome name="expeditedssl" size={24} color="black" />
              <Text style={styles.buttonText}>Expo</Text>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>

        <Animated.View style={[styles.card, animatedStyle]}>
          <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                onButtonPress('mailto:seu-email@gmail.com');
              }
            }}
          >
            <Animated.View style={styles.button} {...{ gestureHandler }}>
              <FontAwesome name="envelope" size={24} color="black" />
              <Text style={styles.buttonText}>Gmail</Text>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </View>

      <Text style={styles.lowerText}>Texto na parte inferior</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperText: {
    position: 'absolute',
    top: 20,
    fontSize: 18,
  },
  lowerText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 10,
    color: 'black',
  },
});

