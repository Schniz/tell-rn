import React from "react";
import { StyleSheet, View, Text } from "react-native";
import GetCurrentLocation from './GetCurrentLocation';
import MapView from 'react-native-maps';
import {Motion, spring} from 'react-motion'

export default class MapPage extends React.Component {
  render() {
    return (
      <View flex={1}>
        <GetCurrentLocation
          render={({location}) => (
            location ? (
              <MapView
                style={StyleSheet.absoluteFill}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <MapView.Marker
                  coordinate={location.coords}
                  title={location.coords.longitude + "," + location.coords.latitude}
                >
                  <MapView.Callout>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>WAT</Text>
                      <Text>ANOTHER THING</Text>
                      <View flexDirection="row" alignItems="center">
                        <Text style={{fontSize: 25}}>
                          😯
                        </Text>
                        <Text style={{fontWeight: 'bold', color: '#333'}}>Wow</Text>
                      </View>
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
              </MapView>
            ) : <Text>Loading...</Text>
          )}
        />
      </View>
    );
  }
}
