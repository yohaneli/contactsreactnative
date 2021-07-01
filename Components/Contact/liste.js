import React,{useContext} from 'react';
import { View, FlatList, Text } from 'react-native';
import { styles } from './style';
import ContactItem from './contactItem';
import { useSelector } from 'react-redux';
import { FirebaseContext } from '../../FirebaseContext';

  const Liste = () => {
    
    const {contacts} = useSelector(state => state);    

    return (
        <FlatList
          data={contacts}
          renderItem={({item}) => <ContactItem item={item} />}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => <Text>Vous n'avez aucun contact pour le moment</Text>}
        />
    );
  }
  
  export default Liste;