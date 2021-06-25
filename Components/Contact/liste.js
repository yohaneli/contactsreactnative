import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { styles } from './style';
import ContactItem from './contactItem';
import { useSelector } from 'react-redux';

  const Liste = () => {
    
    const {contacts} = useSelector(state => state);

    console.log("contacts",contacts);

    return (
        <FlatList
          data={contacts}
          renderItem={ContactItem}
          keyExtractor={item => item.id}
        />
    );
  }
  
  export default Liste;