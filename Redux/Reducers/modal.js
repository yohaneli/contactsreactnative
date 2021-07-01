import { AFF_MODAL } from "../Actions/types";

const initStateModal = {visible:false};

const modal = (state = initStateModal,action) => {

    switch (action.type) {

        case AFF_MODAL:

            return action.payload;

            break;
    
        default:

            return state;

            break;
    }

}

export default modal
