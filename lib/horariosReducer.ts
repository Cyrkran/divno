import { configureStore, Reducer } from "@reduxjs/toolkit";
import { createStore } from "redux";

const defaultState = {
    horarios: [[{startTime: '15:00', endTime: '17:00'}], [], [], [], [], [], []]
};
    

function horarioReducer (state = defaultState, action) {
    switch(action.type){
        case: 'horario/add': {
            return {
                ...state,
                horarios: [
                    ...state.
                ]
            }
        }
        default:
            return state;
    }
}

const store = createStore(horarioReducer)
