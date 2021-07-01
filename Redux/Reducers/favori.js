import { ADD_FAVORI } from "../Actions/types";

const initStateFavori= {favori : false}

const exemple = (state = initStateFavori, action) => {
    //console.log(action)

    switch (action.type) {

        case ADD_FAVORI:
            return !action.payload ;
            break;
    
        default:
            return state
            break;
    }
    
    
}

export default exemple;