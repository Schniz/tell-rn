import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {FBLogin} from 'react-native-facebook-login'

export default class App extends React.Component {
  render() {
    return (
      <View flex={1}>
        <FBLogin />
      </View>
    );
  }
}
