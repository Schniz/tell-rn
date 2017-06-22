import React from "react";
import { Dimensions, TouchableOpacity, StyleSheet, View, Text } from "react-native";
import GetCurrentLocation from './GetCurrentLocation';
import MapView from 'react-native-maps';
import {Motion, spring} from 'react-motion'
import MarkerCallout from './MarkerCallout'
import NearbyStoryListDraggableView from './NearbyStoryListDraggableView';

class EmojiButton extends React.Component {
  render() {
    const {emoji, title, ...props} = this.props;

    return (
      <TouchableOpacity {...props}>
        <View key='wow' flexDirection="row" alignItems="center">
          <Text style={{fontSize: 25}}>
            {emoji}
          </Text>
          <Text style={{fontWeight: 'bold', color: '#333'}}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class MeInTheMap extends React.Component {
  render() {
    return (
      <MapView.Marker
        coordinate={this.props.coords}
      >
        <MarkerCallout
          title="This is you!"
          description="isn't it great?"
        />
      </MapView.Marker>
    );
  }
}

export default class MapPage extends React.Component {
  render() {
    const {user, logoutFn} = this.props;

    return (
      <View flex={1}>
        <GetCurrentLocation
          render={({location}) => (
            location ? (
              <View flex={1}>
                <MapView
                  style={StyleSheet.absoluteFill}
                  initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <MeInTheMap coords={location.coords} />
                </MapView>
                <NearbyStoryListDraggableView coords={location.coords} />
              </View>
            ) : <Text>Loading...</Text>
          )}
        />
      </View>
    );
  }
}
