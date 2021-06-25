import { ADD_CONTACT } from "../Actions/types";

const initStateContacts = [];

const modal = (state = initStateContacts,action) => {
    console.log("action reducer contacts",action)
    switch (action.type) {

         case ADD_CONTACT:

             return [...state,action.payload];

             break;
    
        default:

            return state;

            break;
    }

}

export default modal