import React from "react";
import { TouchableOpacity } from "react-native";

export default class MaybeTouchable extends React.Component {
  render() {
    const { component: Component, condition, ...props } = this.props;
    const C = Component || TouchableOpacity;
    return condition ? <C {...props} /> : props.children;
  }
}
