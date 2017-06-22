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

export default class NearbyStoryList extends React.Component {
  render() {
    return (
      <MaybeTouchable
        condition={!this.props.open}
        style={{ flex: 1 }}
        activeOpacity={0.9}
        onPress={() => this.props.setOpenFn(true)}
      >
        <View
          style={{
            shadowRadius: this.props.open ? 10 : 4,
            shadowOpacity: this.props.open ? 0.3 : 0.2
          }}
          flex={1}
          backgroundColor="#f7f7f7"
        >
          <Text
            style={{
              letterSpacing: 2,
              fontWeight: "bold",
              fontSize: 12,
              padding: 10,
              color: "#444"
            }}
          >
            NEARBY STORIES
          </Text>
          <FlatList
            style={{ flex: 1 }}
            data={[
              {
                title: "this is a story",
                key: 1,
                description: `Od yavo shalom aleynu\nOd yavo shalom aleynu!\nOd yavo shalom aleynu ve al kulam`
              },
              {
                title: "a chikidana",
                key: 2,
                description: `Od yavo shalom aleynu\nOd yavo shalom aleynu!\nOd yavo shalom aleynu ve al kulam`
              },
              {
                title: "cash flow",
                key: 3,
                description: `Od yavo shalom aleynu\nOd yavo shalom aleynu!\nOd yavo shalom aleynu ve al kulam`
              }
            ]}
            renderItem={({ item }) =>
              <NearbyStoryListItem
                {...item}
                expanded={this.props.expandedKey === item.key}
                expandFn={() => {
                  LayoutAnimation.spring();
                  this.props.expandFn(item.key);
                }}
                clickable={this.props.open}
                key={item.key}
              />}
          />
        </View>
      </MaybeTouchable>
    );
  }
}
