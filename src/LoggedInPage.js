import React from "react";
import { Dimensions, Image, TouchableOpacity, StyleSheet, View, Text } from "react-native";
import GetCurrentLocation from './GetCurrentLocation';
import MapView from 'react-native-maps';
import MarkerCallout from './MarkerCallout'
import NearbyStoryListDraggableView from './NearbyStoryListDraggableView';
import {Motion, spring} from 'react-motion'

class Logo extends React.Component {
  state = { loaded: false }

  onLoad = () => {
    this.setState({loaded: true})
    this.onLoad = () => {}
  }

  render() {
    return (
      <Motion
        defaultStyle={{scale: 0}}
        style={{scale: spring(this.state.loaded ? 1 : 0)}}
      >
        {({scale}) => (
          <View
            style={{
              width: 50,
              height: 50,
              position: 'absolute',
              left: 10,
              top: 20,
              transform: [{ scale }],
              borderRadius: 25,
              shadowRadius: 7,
              shadowOpacity: .4,
              backgroundColor: 'red',
            }}
          >
            <Image
              source={this.props.source}
              onLoadStart={() => this.setState({loaded: false})}
              onLoadEnd={() => setTimeout(this.onLoad, 100)}
              style={[StyleSheet.absoluteFill, { borderRadius: 25 }]}
            />
          </View>
        )}
      </Motion>
    )
  }
}

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
        <Logo
          source={{ uri: `https://graph.facebook.com/${user.userId}/picture?width=200` }}
        />
      </View>
    );
  }
}
