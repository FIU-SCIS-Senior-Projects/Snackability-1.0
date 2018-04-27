import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation, Image } from 'react-native';
import { Card, List, ListItem, Button } from 'react-native-elements'
import InfoList from '../InfoList';

class HistoryPage extends Component {

  componentWillMount() {
  }

  render() {
    const list2 = [
      {
        name: 'Doritos',
        avatar_url: 'https://inlivo-vrabm4g9pc6mip71kb.stackpathdns.com/viktor_ftp/prodPics_Brands/doritos-spicy-sweet-chili-flavored-tortilla-chips-11-oz.jpg',
      },
      {
        name: 'Pretzels',
        avatar_url: 'https://inlivo-vrabm4g9pc6mip71kb.stackpathdns.com/viktor_ftp/prodPics_Brands/snyders-of-hanover-pumpernickel-and-onion-braided-twists-pretzels-12-oz.jpg',
      },
      {
        name: 'Apple',
        avatar_url: 'https://www.lebanoninapicture.com/Prv/Images/Pages/Page_124517/apple-apples-fruit-freshfruit-freshfruits-organic-7-20-2017-10-03-04-am-t.jpg',
      },
      {
        name: 'Pita Chips',
        avatar_url: 'https://d2c6ijbp7nf9a4.cloudfront.net/menu_item_photos/photos/2652/small_stacys-pita-chips.jpg',
      },
      {
        name: 'Skittles',
        avatar_url: 'https://inlivo-vrabm4g9pc6mip71kb.stackpathdns.com/viktor_ftp/prodPics_Brands/skittles-original-14-oz.jpg',
      }
    ]

    return (
      <View style={styles.container}>
        <Text style={styles.header2}>
          Your Recent Snacks:
                </Text>
        <List>
          {
            list2.map((l, i) => (
              <ListItem
                avatar={{ uri: l.avatar_url }}
                key={i}
                title={l.name}
                subtitle={l.subtitle}
              />
            ))
          }
        </List>
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1
  },
  textStyles: {
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 14,
    marginBottom: 20
  },
  header2: {
    textAlign: 'center',
    fontSize: 20,
    color: '#007aff',
    marginVertical: 10
  }
};

export default HistoryPage;