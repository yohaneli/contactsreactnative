import React,{useState,useContext} from 'react';
import { View, Text,StyleSheet,Keyboard } from 'react-native';
import { Button, Overlay,Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector,useDispatch } from 'react-redux';
import { afficheModal } from '../../Redux/Actions/modal';
import { ajouterContact } from '../../Redux/Actions/contacts';
import Firebase, {FirebaseContext} from '../../FirebaseContext';


const index = () => {

    const {queryAddContact} = useContext(FirebaseContext);

    //console.log(queryAddContact);

    const [name, setName] = useState("")

    const {modal,contacts} = useSelector(state => state);

    const dispatch = useDispatch();

    const handleChangeName = (name) => {
        setName(name);
        console.log(name)
    }

    const saveName = () => {
        queryAddContact(
              {
                name,
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'nc'
              }
        );
        console.log("name",name);
        //queryAddContacts({name:name});
        toggleOverlay();
    }
    
    

    const toggleOverlay = () => {
        //setVisible(modal.visible);
        
        dispatch(afficheModal({visible:!modal.visible}));
        setName("");
      };

    return (
        <Overlay 
        isVisible={modal.visible} 
        onBackdropPress={toggleOverlay} 
        overlayStyle={styles.overlayStyle}
        >

            <Text style={styles.title}>Ajouter un contact</Text>

            <Input
            placeholder='Ex : Dope Boy'
            onChangeText={handleChangeName}
            />

                <View style={styles.button}>

                    <Button title="Enregistrer" type="outline" onPress={saveName}/>

                </View>

        </Overlay>
    )
}

export default index

const styles = StyleSheet.create({
    overlayStyle:{
        width:280
    },
    title:{
        paddingHorizontal:10,
        paddingVertical:30,
        fontWeight:'bold'
    },
    button:{
        flexDirection:"row",
        justifyContent:"flex-end",
        paddingBottom:20
    }
})
