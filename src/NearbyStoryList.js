import React from "react";
import { LayoutAnimation, Animated, PanResponder, Dimensions, View, Text } from "react-native";

export default class NearbyStoryList extends React.Component {
  state = { open: false, scroll: new Animated.Value(0) }
  panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: (e, gestureState) => {
      this.state.scroll.setValue(0);
    },

    onPanResponderMove: Animated.event([
      null, {dy: this.state.scroll},
    ]),

    onPanResponderRelease: (e, {vx, vy}) => {
      LayoutAnimation.spring()
      this.setState({open: vy < 0})
      this.state.scroll.setValue(0)
    }
  })

  // componentDidMount() {
  //   this.state.scroll.addListener(value => console.log({value}))
  // }

  render() {
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window')

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={{
          height: windowHeight - 100,
          backgroundColor: 'red',
          width: windowWidth,
          top: this.state.open ? 100 : windowHeight - 100,
          position: 'absolute',
          transform: [{
            translateY: this.state.scroll.interpolate(this.state.open ? {
              inputRange: [0, 250],
              outputRange: [0, 250],
              extrapolate: 'clamp',
            } : {
              inputRange: [-windowHeight/2, 0],
              outputRange: [-windowHeight + 200, 0],
              extrapolate: 'clamp',
            })
          }],
        }}
      >
        <Text>This is a list</Text>
      </Animated.View>
    )
  }
}
