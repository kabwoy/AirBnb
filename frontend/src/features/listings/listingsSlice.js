import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import listingAPIService from './listingsAPIService'


const initialState = {
    listings: [],
    singleListing: [] ,
    error: false,
    loading: false,
    success: false,
    message: ''

}
// fetch listins
export const getListings = createAsyncThunk('listings/fetchAll', async (_, thunkAPI) => {
    try {
        return await listingAPIService.listings()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const getSingleListing = createAsyncThunk('listings/fetchSingle', async (id, thunkAPI) => {
    try {
        return await listingAPIService.getListingById(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// create listing
export const createNewListing = createAsyncThunk('listings/create', async (data, thunkAPI) => {
    try {
        return await listingAPIService.createListing(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

// delete  listings
export const deleteListing = createAsyncThunk('listings/delete', async (id, thunkAPI) => {
    try {
        return await listingAPIService.deleteListing(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})
//publish listing
export const publishListing = createAsyncThunk('listings/publish', async (id, thunkAPI) => {
    try {
        return await listingAPIService.publishListing(id)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        return thunkAPI.rejectWithValue(message)
    }
})
//unpublish listing
export const unPublishListing = createAsyncThunk('listings/unpublish', async (id, thunkAPI) => {
    try {
        return await listingAPIService.unpublishListing(id)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        return thunkAPI.rejectWithValue(message)
    }
})

//review listing
export const reviewListing = createAsyncThunk('listings/review', async (id, data, thunkAPI) => {
    try {
        return await listingAPIService.reviewListing(id,data)
    }
    catch (error) { 
        const message = (error.response && error.response.data && error.response.data.message)
        return thunkAPI.rejectWithValue(message);
    }
})
export const ListingsSlice = createSlice({
    name: 'listings',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListings.pending, (state) => {
                state.loading = true
            })
            
            .addCase(getListings.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.listings = action.payload
            })
            .addCase(getSingleListing.pending, (state) => {
                state.loading = true
            })
            .addCase(getSingleListing.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.singleListing = action.payload
            })
            .addCase(getListings.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.message = action.payload
            })
            .addCase(getSingleListing.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.message = action.payload
            })
            //create
            .addCase(createNewListing.pending, (state) => {
                state.loading = true
            })
            .addCase(createNewListing.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.newItem = action.payload
            })
            .addCase(createNewListing.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.message = action.payload
            })

            
        
            //delete
            .addCase(deleteListing.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteListing.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.items = action.payload
            })
            .addCase(deleteListing.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.message = action.payload
            })

    }
})

export const { reset } = ListingsSlice.actions
export default ListingsSlice.reducer