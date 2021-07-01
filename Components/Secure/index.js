import React,{useContext,useEffect,useState} from 'react';

import { StyleSheet, Text, SafeAreaView,StatusBar } from 'react-native';

import { FirebaseContext } from '../../FirebaseContext';

import { useSelector,useDispatch } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ajouterContact,supprimerContact,majContact } from '../../Redux/Actions/contacts';

import Header from '../Header';
import Contact from '../Contact';
import SpeedDial from '../SpeedDial';
import Modal from '../Modal';
import Compte from '../Compte';
import Detail from '../Detail';


const initContacts = (queryAllContacts,contacts,dispatch) => {

  return queryAllContacts().onSnapshot((snapshot) => {

    snapshot.docChanges().forEach((change) => {

        if (change.type === "added") {

            //console.log("New city: ");

            dispatch(ajouterContact(

              {
                id: change.doc.id,
                ...change.doc.data()
              }

            ));

        }

        if (change.type === "modified") {

            //console.log("Modified city: ",change.doc.id,change.doc.data());

            dispatch(majContact(
              
              {

              id: change.doc.id,
              ...change.doc.data()

              }
            
            ));


        }

        if (change.type === "removed") {

            //console.log("Removed city: ",change.doc.id);

            //  const newContacts = contacts.filter(contact => contact.id != id);

              dispatch(supprimerContact(change.doc.id));

        }
    
      });

    });

  }

const Home = ({navigation}) => {

    const {queryAllContacts} = useContext(FirebaseContext);

    //console.log(queryAllContacts);

    const {contacts,favori} = useSelector(state => state);

    //console.log(favori);

    const dispatch = useDispatch();

    useEffect(() => {

      const unSubContacts = initContacts(queryAllContacts,contacts,dispatch);

      return () => {

        unSubContacts;

      }

    }, [])

    return (
      <SafeAreaView style={styles.container}>
        <Header/>
        <Contact/>
        <SpeedDial/>
        <Modal/>
      </SafeAreaView>
    )

}

const HomeStack = createStackNavigator();

 const HomeStackScreen = () => {

  return (

    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Detail" component={Detail} />
    </HomeStack.Navigator>

  );

}

const Tab = createBottomTabNavigator();

const index = () => {

  return (
    
         <>

            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeStackScreen} /> 
                <Tab.Screen name="Compte" component={Compte} />
            </Tab.Navigator>

        </>
        
  );

}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }
})

 //  console.log(snapshot);

      //  let tempListContacts = [];

      //  !snapshot.empty && snapshot.forEach(item => {

      //   //console.log(snapshot)
  
      //   tempListContacts.push({id:item.id, ...item.data()})

      //   console.log(tempListContacts);
  