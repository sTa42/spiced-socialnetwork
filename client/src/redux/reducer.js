import { combineReducers } from "redux";
import friendsReducer from "./friends/slice";

const rootReducer = combineReducers({ FriendsAndWannaBees: friendsReducer });

export default rootReducer;

var obj = { name: "Hello" };
var newobj = { ...obj, breed: "nice" };

// map array, cloning chaning each element in the array, loop , new array ouput
// filter array, removing things , copy array, then removes the eeement
