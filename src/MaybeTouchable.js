import React from "react";
import { TouchableOpacity } from "react-native";

export default class MaybeTouchable extends React.Component {
  render() {
    const { condition, ...props } = this.props;
    return condition ? <TouchableOpacity {...props} /> : props.children;
  }
}
