import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";

class Firebase {

    constructor() {
        
        this.auth = auth();
        this.db=firestore();
        this.storage=storage();
    }

    // all queries

    queryContact = () => this.db.collection("contacts");

    // liste des contacts

    queryAllContacts = () => this.queryContact().orderBy("name","asc");

    //ajouter un contact

    queryAddContact = (contact) => this.queryContact().add(contact);

    //supprimer un contact

    queryDeleteContact = (id) => this.queryContact().doc(id).delete();

    //update un contact

    queryUpdateContact = (id,data) => firestore().collection("contacts").doc(id).update(data);

    // add image

    queryAddImage = (id,nameFile,uri) => storage().ref(`images/${id}/${nameFile}`).putFile(uri);

    // recuperer lien de telechargement

    queryGetImageUrl = (id,nameFile) => storage().ref(`images/${id}/${nameFile}`).getDownloadURL();

    queryAuthListener = () => auth().onAuthStateChanged();

}

export default Firebase;