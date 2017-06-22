import React from 'react';
import MapView from 'react-native-maps'
import { Text, View } from 'react-native'

export default class MarkerCallout extends React.Component {
  render() {
    const {title, description, actions} = this.props;

    return (
      <MapView.Callout tooltip={false}>
        <View
          style={{
            minWidth: 300
          }}
        >
          <Text style={{fontWeight: 'bold', paddingBottom: 7}}>{title}</Text>
          <Text style={{ lineHeight: 20 }}>{description}</Text>
          <View flexDirection="row" alginItems="center" justifyContent="space-around">
            {actions}
          </View>
        </View>
      </MapView.Callout>
    )
  }
}
