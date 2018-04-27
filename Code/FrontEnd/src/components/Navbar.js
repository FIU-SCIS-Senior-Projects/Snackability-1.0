import React from 'react';
import { Header, Icon } from 'react-native-elements';

const NavBar = () => {
    return (
        <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Snackability', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
        />
    );
}
export default NavBar;