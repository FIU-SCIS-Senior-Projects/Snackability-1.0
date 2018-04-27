import React from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import Expo from 'expo';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import SearchForm from './components/SearchForm';
import Login from './components/pages/Signin';
import SplashPage from './components/pages/Splash';
import InfoList from './components/pages/Info';
import Signup from './components/pages/Signup';
import Settings from './components/pages/Settings';
import AddSnack from './components/AddSnack';
import snackDetailView from './components/SnackDetailView';
import LocalSnackView from './components/LocalSnackView';
import HistoryPage from './components/pages/HistoryPage'


const TabIcon = ({ selected, title }) => {
    return (
        <Icon
            name='search'
            type='font-awesome'
            color='#ffffff'
            onPress={() => Actions.search()} />
    );
}

const TabIcon2 = ({ selected, title }) => {
    return (
        <Icon
            name='cog'
            type='font-awesome'
            color='#ffffff'
            onPress={() => Actions.settings()} />
    );
}

const TabIcon3 = ({ selected, title }) => {
    return (
        <Icon
            name='history'
            type='font-awesome'
            color='#ffffff'
            onPress={() => Actions.History()} />
    );
}

const TabIcon4 = ({ selected, title }) => {
    return (
        <Icon
            name='info'
            type='font-awesome'
            color='#ffffff'
            onPress={() => Actions.InfoList()} />
    );
}

const RouterComponent = () => (
    <Router
        sceneStyle={{ backgroundColor: '#ffffff' }}
        titleStyle={styles.titleStyle}
        navigationBarStyle={styles.navigationBarStyle}
        navBarButtonColor='#ffffff'
        titleStyle={{ alignSelf: 'center' }}
    >

        <Scene key="root">
            <Scene key="auth">
                <Scene key="SplashPage" hideNavBar component={SplashPage} title="Splash" initial={true}/>
                <Scene key="Login" hideNavBar component={Login} title="Login"/>
                <Scene key="Signup" hideNavBar component={Signup} title="Signup" />
            </Scene>

            <Scene
                key="main"
                tabs={true}
                tabBarPosition='bottom'
                inactiveTintColor='#ffffff'
                tabBarStyle={{ backgroundColor: '#2958a5' }}
                hideNavBar >
                <Scene
                    key="search"
                    renderBackButton={null}
                    title="Search"
                    icon={TabIcon}>
                    <Scene key="Search"
                        initial
                        renderBackButton={null}
                        component={SearchForm}
                        title="Snack Search"
                    />
                    <Scene
                        key="snackDetail"
                        component={snackDetailView}
                        title="Snack Detail" />
                    <Scene
                        key="localDetail"
                        component={LocalSnackView}
                        title="Snack Detail" />
                </Scene>
                <Scene
                    key="history"
                    renderBackButton={null}
                    title="History"
                    icon={TabIcon3}>
                    <Scene key="History" component={HistoryPage} title="Snack History" />
                </Scene>
                <Scene
                    key="info"
                    renderBackButton={() => { }}
                    title="Info"
                    icon={TabIcon4}>
                    <Scene key="InfoList" renderBackButton={() => { }} component={InfoList} title="Info" />
                </Scene>
                <Scene
                    key="settings"
                    renderBackButton={null}
                    title="Settings"
                    icon={TabIcon2}>
                    <Scene
                        key="settings"
                        component={Settings}
                        title="Settings"
                    />
                    <Scene
                        key="addSnack"
                        component={AddSnack}
                        title="Add A Snack"
                    />
                </Scene>
            </Scene>
        </Scene>
    </Router>



);
const styles = {
    titleStyle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        alignSelf: 'center',
        paddingBottom: 10,
    },
    navigationBarStyle: {
        backgroundColor: '#2958a5',
    }
}


export default RouterComponent;