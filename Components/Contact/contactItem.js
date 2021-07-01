import React,{useContext,useState} from 'react';
import { ActivityIndicator } from 'react-native';
import { ListItem,Button,Icon,Avatar } from 'react-native-elements';
import { useSelector,useDispatch } from 'react-redux';
import { FirebaseContext } from '../../FirebaseContext';
import { gererFavori } from '../../Redux/Actions/favori';
import { launchCamera } from 'react-native-image-picker';

const ContactItem = ({item}) => {

    const {queryDeleteContact,queryUpdateContact,queryAddImage,queryGetImageUrl} = useContext(FirebaseContext);

    console.log(queryGetImageUrl);

    const {contacts,favori} = useSelector(state => state);

    const [loading, setLoading] = useState(false);

    const color = item.favori === true ? "yellow":"black";

    const dispatch = useDispatch();

    const favoris = () => {

      //console.log("favoris",item.id);

      queryUpdateContact(item.id,{favori:!item?.favori});

    }

    const editImage = () => {

      //console.log("image",item.id);

        let options = {
          storageOptions: 
          {

            skipBackup: true,
            path: 'images',

          },
        };
        
      launchCamera(options, (response) => {

        //console.log('Response = ', response);

        if (response.assets != undefined) {

          setLoading(true);

          const {uri} = response.assets[0];

          //console.log("uri = ",uri);

          queryAddImage(item.id,"dope.jpeg",uri).then(res => {

            //console.log(res);

            queryGetImageUrl(item.id,"dope.jpeg").then(url => {

              queryUpdateContact(item.id,{
                avatar_url:url
              })

              setLoading(false);

            })

          })

        }

      })

    }

    const supprimer = (id) => {

      console.log("delete",id)

      queryDeleteContact(id);

    }

    return(
        <ListItem.Swipeable
        rightContent={
            <Button
              title="Delete"
              icon={{ name: 'delete', color: 'white' }}
              buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
              onPress={() => supprimer(item.id)}
            />
          }
          
        >
          

          {
            loading ? <ActivityIndicator animating={true} color={"red"}/>:<Avatar 
            source = {{uri: item.avatar_url}}
            onPress={editImage}
            />
          }

            <ListItem.Content>
            
            <ListItem.Title>{item.name} </ListItem.Title>
            
            <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon
            name='star'
            color={color}
            onPress={() => favoris(item.id)} />
      </ListItem.Swipeable>
    )
}

export default ContactItem;



