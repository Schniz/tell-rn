import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Animated,
  PanResponder,
  Dimensions,
  View,
  Text,
  FlatList
} from "react-native";
import MaybeTouchable from "./MaybeTouchable";
import NearbyStoryListItem from "./NearbyStoryListItem";
import NearbyStoryList from './NearbyStoryList'

export default class NearbyStoryListDraggableView extends React.Component {
  state = { expandedKey: null, open: false, scroll: new Animated.Value(0) };
  panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: (_, { dy }) => Math.abs(dy) > 0.5,
    onPanResponderGrant: (e, gestureState) => {
      this.state.scroll.setValue(0);
    },

    onPanResponderMove: Animated.event([null, { dy: this.state.scroll }]),

    onPanResponderRelease: (e, { vx, dy, ...kaki }) => {
      this.setOpen(dy < 0);
      this.state.scroll.setValue(0);
    }
  });

  setOpen = open => {
    LayoutAnimation.spring();
    const expandedKey = open ? undefined : null;
    this.setState({ open, expandedKey });
  };

  render() {
    const { width: windowWidth, height: windowHeight } = Dimensions.get(
      "window"
    );

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={{
          height: windowHeight - 100,
          width: windowWidth,
          top: this.state.open ? 100 : windowHeight - 100,
          position: "absolute",
          transform: [
            {
              translateY: this.state.scroll.interpolate(
                this.state.open
                  ? {
                      inputRange: [0, 250],
                      outputRange: [0, 250],
                      extrapolate: "clamp"
                    }
                  : {
                      inputRange: [-windowHeight / 2, 0],
                      outputRange: [-windowHeight + 200, 0],
                      extrapolate: "clamp"
                    }
              )
            }
          ]
        }}
      >
        <NearbyStoryList
          open={this.state.open}
          setOpenFn={this.setOpen}
          expandedKey={this.state.expandedKey}
          expandFn={expandedKey => this.setState({expandedKey})}
        />
      </Animated.View>
    );
  }
}
