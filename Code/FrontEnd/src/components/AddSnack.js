import React, { Component } from 'react';
import { WebView, View } from 'react-native';

class AddSnack extends Component {
  render() {
    return (
      <WebView
        style={{marginTop:-10}}
        source={{uri: 'https://docs.google.com/forms/d/e/1FAIpQLSe23DUO25IGJ0Ocxqxo-gwunhkhZCP62C19jG_hs8KIdRBTwg/viewform?c=0&w=1'}}
      />
    );
  }
}

export default AddSnack;