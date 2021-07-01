import React,{useContext} from 'react';
import { FirebaseContext } from '../../FirebaseContext';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '759317585541-jih5ou5mpgr22f8qu73v42so016ig1jr.apps.googleusercontent.com',
  });

const index = () => {

    const {auth} = useContext(FirebaseContext);

    const goToHome = async () => {

        // Get the users ID token

        const { idToken } = await GoogleSignin.signIn();

        console.log(idToken);

        // Create a Google credential with the token

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential

        return auth.signInWithCredential(googleCredential);

        //navigation.navigate("Home");
    }
    
    return (
        <View>
            <Button
            title="Login with Google"
            onPress={goToHome}
            />
        </View>
    )
}

export default index
