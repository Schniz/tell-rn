import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FBLogin, FBLoginManager } from "react-native-facebook-login";
import LoggedInPage from './LoggedInPage'

export default class App extends React.Component {
  state = { user: null };

  render() {
    return this.state.user ? (
      <LoggedInPage
        user={this.state.user}
        logoutFn={() => {
          FBLoginManager.logout(() => this.setState({user: null}));
        }}
      />
    ) : (
      <View flex={1}>
        <FBLogin
          style={{ display: 'none', marginBottom: 10 }}
          ref={x => (this.fbLogin = x)}
          permissions={["email", "user_friends"]}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          onLogin={data => this.setState({ user: data.credentials })}
          onLogout={() => this.setState({ user: null })}
          onLoginFound={data => this.setState({ user: data.credentials })}
          onLoginNotFound={() => this.setState({ user: null })}
          onPermissionsMissing={data => {
            alert("Not enough permissions!");
          }}
        />
      </View>
    );
  }
}
