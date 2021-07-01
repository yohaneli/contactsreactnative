import React,{useState,useContext} from 'react';
import { View, Text } from 'react-native';
import { Button,Input } from 'react-native-elements';
import { Icon } from 'react-native-vector-icons/Icon';
import {FirebaseContext} from '../../FirebaseContext';

const index = ({navigation}) => {

    const {auth} = useContext(FirebaseContext);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const connexion = () => {

        try {

            console.log(email,password);

            auth.signInWithEmailAndPassword(email,password);

        } catch (error) {

            console.log(error);

        }

    }

    const deconnexion = () => {

        auth.signOut();
        
    }
    
    
    
    return (
        <View>
            <Input
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            />

            <Input
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            />

            <Button 
            title="Connexion"
            onPress={connexion}
            />

            <Button 
            title="Inscription"
            onPress={() => navigation.navigate('Register')}
            style={{marginTop:100}}
            />

            <Button 
            title="Déconnexion"
            onPress={deconnexion}
            />

        </View>
    )
}

export default index
