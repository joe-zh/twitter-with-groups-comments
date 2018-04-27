// create a reducer function messageReducer that has  an initialState
// { messages: [] }
// If any action has a property 'error' on it, then append to the messages
// array a new object
//    { messageType: 'error' if the  action has an error  property else 'info',
//      message: action.error if an error else action.message
//    }
// Also handle the case where the action type is DISMISS
// if that happens, then remove from the messages array the index supplied
// with the dismiss action
// remember all these changes must be immutable (I use mutable language
// terms for simplicity

const messageReducer = (state = { messages: [] }, action) => {
    let msgs;
    if (action.type == 'DISMISS') {
        msgs = state.messages.slice(0);
        msgs.splice(action.idx, 1);    
        return { messages: msgs }; 
    }
    else if (action.error) {
        msgs = state.messages.slice(0);
        msgs.push({
            messageType: 'error',
            message: action.error
        });
        return { messages: msgs };
    } 
    else if (action.message) {
        msgs = state.messages.slice(0);
        msgs.push({
            messageType: 'info',
            message: action.message
        });
        return { messages: msgs };
    }
    return state;
};

export default messageReducer;
