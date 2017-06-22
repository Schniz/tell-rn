import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaybeTouchable from "./MaybeTouchable";
import ColorHash from "color-hash";

const colorhash = new ColorHash();

export default class Story extends React.Component {
  render() {
    const { expanded, expandFn, title, description, clickable } = this.props;

    return (
      <MaybeTouchable
        condition={clickable}
        onPress={!expanded ? expandFn : () => alert("hey")}
      >
        <View
          alignItems="center"
          flexDirection="row"
          style={{
            minHeight: 40,
            borderLeftWidth: 10,
            borderLeftColor: colorhash.hex(title),
            borderBottomColor: "#ccc",
            borderBottomWidth: StyleSheet.hairlineWidth
          }}
        >
          <View
            style={{
              paddingLeft: 10,
              flex: 1
            }}
          >
            <Text
              style={{
                fontSize: 18
              }}
            >
              {title}
            </Text>
            {expanded &&
              <Text>
                {description}
              </Text>}
          </View>
        </View>
      </MaybeTouchable>
    );
  }
}
