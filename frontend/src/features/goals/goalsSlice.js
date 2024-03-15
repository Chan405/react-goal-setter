import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createGoal = createAsyncThunk('/goal/create',  async(goalData, thunk_API) => {
    try{

    } catch(e) {
        return thunk_API.rejectWithValue('error')
    }
})

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
})

export const {reset} = goalSlice.actions;
export default goalSlice.reducer;
 