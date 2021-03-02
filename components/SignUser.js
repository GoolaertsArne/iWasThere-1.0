import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Button } from "react-native";
import { Layout } from "@ui-kitten/components";
import SignaturePad from "react-native-signature-pad";
class SignUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signaturePad: null, signaturePadKey: 0, image: "" };
  }

  componentDidMount() {}

  state = {
    signaturePadKey: 0,
  };

  _signaturePadError = (error) => {
    console.error(error);
  };

  _signaturePadChange = ({ base64DataUrl }) => {
    this.setState({ image: base64DataUrl });
  };

  cleanButtonAction = () => {
    this.setState({ signaturePadKey: this.state.signaturePadKey + 1 });
  };
  saveButtonAction = () => {
    console.log(this.state.image);
  };
  createSignaturePad = () => {
    this.signaturePad = React.createElement(SignaturePad, {
      onError: this._signaturePadError,
      onChange: this._signaturePadChange,
      style: { flex: 1, backgroundColor: "white" },
      key: this.state.signaturePadKey,
    });
    return this.signaturePad;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.createSignaturePad()}
        <Button title="clear" onPress={this.cleanButtonAction}></Button>
        <Button title="save" onPress={this.saveButtonAction}></Button>
      </View>
    );
  }
}
export default SignUser;
