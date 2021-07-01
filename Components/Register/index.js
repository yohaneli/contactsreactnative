import React,{useState,useContext} from 'react';
import { View, Text } from 'react-native';
import { Button,Input } from 'react-native-elements';
import { Icon } from 'react-native-vector-icons/Icon';
import {FirebaseContext} from '../../FirebaseContext';

const index = ({navigation}) => {

    const {auth,queryAddUser} = useContext(FirebaseContext);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

        const inscription = () => {

            console.log("insc")

            try {

                console.log(email,password);

                /*const inscription = async () => {

                    try {

                    const {user} = await auth.createUserWithEmailAndPassword(email,password)

                    await queryAddUser(user.uid, {email:user.email})

                    }catch (err) {

                        console.log(err);

                    }
                }
                */

                auth.createUserWithEmailAndPassword(email,password).then( async ({user}) => {

                    await queryAddUser(user.uid, {email:user.email , data:Date.now()})

                }).catch(error => {

                    if (error.code === 'auth/email-already-in-use') {

                        console.log('Cette adresse mail est déjà utilisée !');

                    }
                
                    if (error.code === 'auth/invalid-email') {

                        console.log("Cette adresse mail n'est pas valide");

                    }

                    console.error(error);

                });

            } catch (error) {

                console.log(error);

            }

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
            title="S'incrire"
            onPress={inscription}
            />

            <Button 
            title="Se connecter"
            onPress={() => navigation.navigate('Login')}
            style={{marginTop:100}}
            />  

        </View>
    )
}

export default index
