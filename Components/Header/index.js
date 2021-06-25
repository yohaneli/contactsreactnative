import React from 'react';
import { StyleSheet } from 'react-native';
import { Header as Header2 } from 'react-native-elements';

const Header = () => {
    return (
        <Header2
        centerComponent={{ text: 'Contacts', style: { color: '#fff' } }}
        />
    )
}

export default Header

const styles = StyleSheet.create({})
