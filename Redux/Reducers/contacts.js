import { ADD_CONTACT,DELETE_CONTACT,UP_CONTACT } from "../Actions/types";

const initStateContacts = [];

const modal = (state = initStateContacts,action) => {
    //console.log("action reducer contacts",action)
    switch (action.type) {

        case ADD_CONTACT:

            return [...state,action.payload];

            break;

        case DELETE_CONTACT:

            const newContacts = state.filter(contact => contact.id != action.payload);

            return newContacts;
 
            break;

        case UP_CONTACT:

/* boucler sur la liste des contacts, si tu trouve l'identifiant de la modif du payload change le contenu du contact sinon trace ta route*/

            const newData = state.map(contact =>{

                if(contact.id === action.payload.id) {

                    return action.payload;
                }

                return contact;

            })

            console.log(" action payload up contact ", action.payload);

            //const newContacts = state.filter(contact => contact.id != action.payload);

            return newData;
    
            break;
    
        default:

            return state;

            break;
    }

}

export default modal