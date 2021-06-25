import React from 'react';
import { StyleSheet, Text, SafeAreaView,StatusBar } from 'react-native';
import Header from './Components/Header';
import Contact from './Components/Contact';
import SpeedDial from './Components/SpeedDial';
import Modal from './Components/Modal';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <Text>Mon texte</Text>
      <Contact/>
      <SpeedDial/>
      <Modal/>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }
})
