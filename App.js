import React,{useContext,useEffect,useState} from 'react';

import { StyleSheet, Text, SafeAreaView,StatusBar } from 'react-native';

import { FirebaseContext } from './FirebaseContext';

import { useSelector,useDispatch } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ajouterContact,supprimerContact,majContact } from './Redux/Actions/contacts';

import Header from './Components/Header';
import Contact from './Components/Contact';
import SpeedDial from './Components/SpeedDial';
import Modal from './Components/Modal';
import Login from './Components/Login';

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

const Home = () => {

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
        <Text>Mon texte</Text>
        <Contact/>
        <Login/>
        <SpeedDial/>
        <Modal/>
      </SafeAreaView>
    )

}

const Stack = createStackNavigator();


const App = () => {

  const {auth} = useContext(FirebaseContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const authChange = auth.onAuthStateChanged(user => {
      console.log("user",user)
    }) ;
    return () => {
      authChange
    }
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? <Stack.Screen name="Home" component={Home} /> :
        <Stack.Screen name="Login" component={Login} />}
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App

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
  