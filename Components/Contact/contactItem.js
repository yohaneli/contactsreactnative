import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem,Avatar } from 'react-native-elements';


const ContactItem = ({item}) => {
    return(
        <ListItem bottomDivider>
            <Avatar source={{uri: item.avatar_url}} />
            <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
      </ListItem>
    )
}

export default ContactItem;



