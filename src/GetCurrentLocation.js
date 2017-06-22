import React from "react";

export default class App extends React.Component {
  state = {};
  watchId = null;

  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 200,
      maximumAge: 0
    };

    this.watchId = navigator.geolocation.watchPosition(
      location => this.setState({ error: null, location }),
      error => this.setState({ error: error, location: null }),
      options
    );
  }

  componentWillUnmount() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  render() {
    return this.props.render(this.state);
  }
}
