import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api.js';

// --- Thunks for Gigs (Advisors) ---
export const fetchMyGigs = createAsyncThunk('data/fetchMyGigs', async (_, { rejectWithValue }) => {
    try { const { data } = await API.get('/advisory/my-gigs'); return data.data; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});
export const createGig = createAsyncThunk('data/createGig', async (gigData, { dispatch, rejectWithValue }) => {
    try { const { data } = await API.post('/advisory/gigs', gigData); dispatch(fetchMyGigs()); return data.data; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});
export const fetchGigById = createAsyncThunk('data/fetchGigById', async (id, { rejectWithValue }) => {
    try { const { data } = await API.get(`/advisory/gigs/${id}`); return data.data; }
    catch (err) { return rejectWithValue(err.response.data.error); }
});
export const updateGig = createAsyncThunk('data/updateGig', async ({ id, gigData }, { dispatch, rejectWithValue }) => {
    try { const { data } = await API.put(`/advisory/gigs/${id}`, gigData); dispatch(fetchMyGigs()); return data.data; }
    catch (err) { return rejectWithValue(err.response.data.error); }
});
export const fetchAllGigs = createAsyncThunk('data/fetchAllGigs', async (_, { rejectWithValue }) => {
    try { const { data } = await API.get('/advisory/gigs'); return data.data; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});

// --- Thunks for Proposals (Investors & Business Owners) ---
export const fetchAllProposals = createAsyncThunk('data/fetchAllProposals', async (_, { rejectWithValue }) => {
    try { const { data } = await API.get('/business/proposals'); return data.data; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});
export const fetchProposalById = createAsyncThunk('data/fetchProposalById', async (proposalId, { rejectWithValue }) => {
    try { const { data } = await API.get(`/business/proposals/${proposalId}`); return data.data; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});
export const expressInterestInProposal = createAsyncThunk('data/expressInterestInProposal', async (proposalId, { rejectWithValue }) => {
    try { const { data } = await API.post(`/business/proposals/${proposalId}/interest`); return { proposalId, interestedInvestors: data.data }; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});
export const fetchMyProposals = createAsyncThunk('data/fetchMyProposals', async (_, { rejectWithValue }) => {
    try { const { data } = await API.get('/business/my-proposals'); return data.data; }
    catch (err) { return rejectWithValue(err.response.data.error); }
});
export const createProposal = createAsyncThunk('data/createProposal', async (proposalData, { dispatch, rejectWithValue }) => {
    try { const { data } = await API.post('/business/proposals', proposalData); dispatch(fetchMyProposals()); return data.data; }
    catch (err) { return rejectWithValue(err.response.data.error); }
});
export const updateProposal = createAsyncThunk('data/updateProposal', async ({ id, proposalData }, { dispatch, rejectWithValue }) => {
    try { const { data } = await API.put(`/business/proposals/${id}`, proposalData); dispatch(fetchMyProposals()); return data.data; }
    catch (err) { return rejectWithValue(err.response.data.error); }
});
export const publishProposal = createAsyncThunk('data/publishProposal', async (proposalId, { dispatch, rejectWithValue }) => {
    try { const { data } = await API.put(`/business/proposals/${proposalId}/publish`); dispatch(fetchMyProposals()); return data.data; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});

// --- Thunks for Investors ---
export const fetchInvestorPortfolio = createAsyncThunk('data/fetchInvestorPortfolio', async (_, { rejectWithValue }) => {
    try { const { data } = await API.get('/investors/portfolio'); return data.data; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});

// --- Thunks for Loan Products (Bankers) ---
export const fetchMyLoanProducts = createAsyncThunk('data/fetchMyLoanProducts', async (_, { rejectWithValue }) => {
    try { const { data } = await API.get('/banking/my-products'); return data.data; }
    catch (err) { return rejectWithValue(err.response.data.error); }
});
export const createLoanProduct = createAsyncThunk('data/createLoanProduct', async (productData, { dispatch, rejectWithValue }) => {
    try { const { data } = await API.post('/banking/products', productData); dispatch(fetchMyLoanProducts()); return data.data; }
    catch (err) { return rejectWithValue(err.response.data.error); }
});
export const fetchLoanProductById = createAsyncThunk('data/fetchLoanProductById', async (id, { rejectWithValue }) => {
    try { const { data } = await API.get(`/banking/products/${id}`); return data.data; }
    catch (err) { return rejectWithValue(err.response.data.error); }
});
export const updateLoanProduct = createAsyncThunk('data/updateLoanProduct', async ({ id, productData }, { dispatch, rejectWithValue }) => {
    try { const { data } = await API.put(`/banking/products/${id}`, productData); dispatch(fetchMyLoanProducts()); return data.data; }
    catch (err) { return rejectWithValue(err.response.data.error); }
});
export const fetchAllLoanProducts = createAsyncThunk('data/fetchAllLoanProducts', async (_, { rejectWithValue }) => {
    try { const { data } = await API.get('/banking/products'); return data.data; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});

// --- Thunks for Orders (Shared) ---
export const fetchMyOrders = createAsyncThunk('data/fetchMyOrders', async (_, { rejectWithValue }) => {
    try { const { data } = await API.get('/orders/my-orders'); return data.data; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});

// --- Thunks for Deal Rooms ---
export const acceptInvestorInterest = createAsyncThunk('data/acceptInvestorInterest', async ({ proposalId, investorId }, { dispatch, rejectWithValue }) => {
    try { const { data } = await API.post(`/business/proposals/${proposalId}/accept/${investorId}`); dispatch(fetchProposalById(proposalId)); return data.data; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});
export const fetchDealRoomDetails = createAsyncThunk('data/fetchDealRoomDetails', async (dealRoomId, { rejectWithValue }) => {
    try { const { data } = await API.get(`/deal-rooms/${dealRoomId}`); return data.data; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});
export const fetchMyDealRooms = createAsyncThunk('data/fetchMyDealRooms', async (_, { rejectWithValue }) => {
    try { const { data } = await API.get('/deal-rooms'); return data.data; }
    catch (err) { return rejectWithValue(err.response?.data?.error); }
});
export const deleteDealRoom = createAsyncThunk('data/deleteDealRoom',async (dealRoomId, { dispatch, rejectWithValue }) => {
    try {
      await API.delete(`/deal-rooms/${dealRoomId}`);
      // After deleting, re-fetch the list of deal rooms to update the UI
dispatch(fetchMyDealRooms());return dealRoomId;} catch (err) {return rejectWithValue(err.response?.data?.error || 'Could not delete deal room.')}});
export const fetchInvestorProfile = createAsyncThunk('data/fetchInvestorProfile', async (_, { rejectWithValue }) => { try { const { data } = await API.get('/investors/profile/me'); return data.data; } catch (err) { return rejectWithValue(err.response.data.error); } });
export const updateInvestorProfile = createAsyncThunk('data/updateInvestorProfile', async (profileData, { dispatch, rejectWithValue }) => { try { const { data } = await API.put('/investors/profile', profileData); dispatch(fetchInvestorProfile()); return data.data; } catch (err) { return rejectWithValue(err.response.data.error); } });
// NEW: Async thunk to submit a loan application
export const applyForLoan = createAsyncThunk(
  'data/applyForLoan',
  async ({ productId, applicationData }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/banking/products/${productId}/apply`, applicationData);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Could not submit application.');
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    gigs: [],
    loanProducts: [],
    orders: [],
    proposals: [],
    portfolio: [],
    myProposals: [],
    myLoanProducts: [],
    selectedItem: null,
    selectedProposal: null,
    dealRooms: [],
    currentDealRoom: null,
    loading: false,
    error: null,
    dealRooms: [],
    investorProfile: null,
  },
  reducers: {
    clearSelectedItem: (state) => { state.selectedItem = null; },
    clearSelectedProposal: (state) => { state.selectedProposal = null; },
    clearDataError: (state) => { state.error = null; },
    clearCurrentDealRoom: (state) => { state.currentDealRoom = null; },
    addChatMessage: (state, action) => {
        if (state.currentDealRoom) {
            state.currentDealRoom.messages.push(action.payload);
        }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyGigs.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyGigs.fulfilled, (state, action) => { state.loading = false; state.gigs = action.payload; })
      .addCase(fetchMyGigs.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createGig.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createGig.fulfilled, (state) => { state.loading = false; })
      .addCase(createGig.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchAllProposals.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllProposals.fulfilled, (state, action) => { state.loading = false; state.proposals = action.payload; })
      .addCase(fetchAllProposals.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchProposalById.pending, (state) => { state.loading = true; state.selectedProposal = null; state.error = null; })
      .addCase(fetchProposalById.fulfilled, (state, action) => { state.loading = false; state.selectedProposal = action.payload; })
      .addCase(fetchProposalById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(expressInterestInProposal.fulfilled, (state, action) => {if (state.selectedProposal && state.selectedProposal._id === action.payload.proposalId) {state.selectedProposal.interestedInvestors = action.payload.interestedInvestors;}})
      .addCase(expressInterestInProposal.rejected, (state, action) => { state.error = action.payload; })
      .addCase(fetchMyProposals.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyProposals.fulfilled, (state, action) => { state.loading = false; state.myProposals = action.payload; })
      .addCase(fetchMyProposals.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createProposal.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createProposal.fulfilled, (state) => { state.loading = false; })
      .addCase(createProposal.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateProposal.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateProposal.fulfilled, (state) => { state.loading = false; })
      .addCase(updateProposal.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(publishProposal.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(publishProposal.fulfilled, (state) => { state.loading = false; })
      .addCase(publishProposal.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchInvestorPortfolio.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchInvestorPortfolio.fulfilled, (state, action) => { state.loading = false; state.portfolio = action.payload; })
      .addCase(fetchInvestorPortfolio.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchMyLoanProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyLoanProducts.fulfilled, (state, action) => { state.loading = false; state.myLoanProducts = action.payload; })
      .addCase(fetchMyLoanProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createLoanProduct.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createLoanProduct.fulfilled, (state) => { state.loading = false; })
      .addCase(createLoanProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchMyOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(fetchMyOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(acceptInvestorInterest.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(acceptInvestorInterest.fulfilled, (state) => { state.loading = false; })
      .addCase(acceptInvestorInterest.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchDealRoomDetails.pending, (state) => { state.loading = true; state.currentDealRoom = null; })
      .addCase(fetchDealRoomDetails.fulfilled, (state, action) => { state.loading = false; state.currentDealRoom = action.payload; })
      .addCase(fetchDealRoomDetails.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchMyDealRooms.pending, (state) => { state.loading = true; })
      .addCase(fetchMyDealRooms.fulfilled, (state, action) => { state.loading = false; state.dealRooms = action.payload; })
      .addCase(fetchMyDealRooms.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchAllGigs.pending, (state) => { state.loading = true; })
      .addCase(fetchAllGigs.fulfilled, (state, action) => { state.loading = false; state.gigs = action.payload; })
      .addCase(fetchAllGigs.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchAllLoanProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchAllLoanProducts.fulfilled, (state, action) => { state.loading = false; state.loanProducts = action.payload; })
      .addCase(fetchAllLoanProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchGigById.pending, (state) => { state.loading = true; state.selectedItem = null; })
      .addCase(fetchGigById.fulfilled, (state, action) => { state.loading = false; state.selectedItem = action.payload; })
      .addCase(fetchGigById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchLoanProductById.pending, (state) => { state.loading = true; state.selectedItem = null; })
      .addCase(fetchLoanProductById.fulfilled, (state, action) => { state.loading = false; state.selectedItem = action.payload; })
      .addCase(fetchLoanProductById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deleteDealRoom.fulfilled, (state, action) => {state.dealRooms = state.dealRooms.filter(room => room._id !== action.payload);})
      .addCase(fetchInvestorProfile.fulfilled, (state, action) => {state.investorProfile = action.payload;})
      .addCase(applyForLoan.pending, (state) => { state.loading = true; })
      .addCase(applyForLoan.fulfilled, (state) => { state.loading = false; })
      .addCase(applyForLoan.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearSelectedProposal, clearDataError, clearCurrentDealRoom, addChatMessage, clearSelectedItem } = dataSlice.actions;
export default dataSlice.reducer;
