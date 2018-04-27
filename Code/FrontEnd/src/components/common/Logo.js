import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Platform
} from 'react-native';

import img from '../../images/logo2.png';

export default class Logo extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image
					style={styles.imageStyle}
					source={img}
				/>
				<Text style={styles.logoText}>Snackability</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	logoText: {
		marginVertical: 10,
		fontSize: 18,
		color: 'rgb(255, 255, 255)'
	},
	imageStyle: {
	...Platform.select({
		ios: {
			shadowColor: '#000',
			shadowOffset: { width: 2, height: 2 },
			shadowOpacity: 0.3,
			shadowRadius: 2,
			width: 100,
			height: 100
		},
		android: {
			width: 100, 
			height: 100
		},
	}),
	},
});
