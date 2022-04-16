import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    origin: null,
    destinaton: null,
    travelTimeInformation: null,
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers:{
        setOrigin: (state, action) =>{
            state.origin = action.payload;
        },
        setDestination:(state, action)=>{
            state.destinaton = action.payload;
        },
        setTravelTimeInformation:(state, action)=>{
            state.travelTimeInformation = action.payload;
        }
    }
});

export const {setOrigin, setDestination, setTravelTimeInformation}=navSlice.actions;

//selectors

export const selectOrigin = (state)=>state.nav.origin;
export const selectDestination = (state)=>state.nav.destinaton;
export const selectTravelInformation = (state)=>state.nav.travelTimeInformation;

export default navSlice.reducer;