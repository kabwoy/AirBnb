import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import bookingsAPIService from './BookingsAPIService'
import listingsSlice from '../listings/listingsSlice'


const initialState = {
    bookings: [],
    error: false,
    loading: false,
    success: false,
    message: ''

}
// fetch bookings
export const getBookings = createAsyncThunk('bookings/fetchAll', async (_, thunkAPI) => {
    try {
        return await bookingsAPIService.bookings()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

// create booking
export const createNewBooking = createAsyncThunk('bookings/create', async (data, thunkAPI) => {
    try {
        return await bookingsAPIService.createListing(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

// delete  booking
export const deleteBooking = createAsyncThunk('bookings/delete', async (id, thunkAPI) => {
    try {
        return await bookingsAPIService.deleteBooking(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})
export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookings.pending, (state) => {
                state.loading = true
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.items = action.payload
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.message = action.payload
            })
          
            //create
            .addCase(createNewBooking.pending, (state) => {
                state.loading = true
            })
            .addCase(createNewBooking.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.newItem = action.payload
            })
            .addCase(createNewBooking.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.message = action.payload
            })
        
            //delete
            .addCase(deleteBooking.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.items = action.payload
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.message = action.payload
            })

    }
})

export const {reset} = listingsSlice.actions
export default listingsSlice.reducer