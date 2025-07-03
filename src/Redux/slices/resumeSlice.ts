import { createSlice, } from '@reduxjs/toolkit';
import type {  PayloadAction } from '@reduxjs/toolkit';

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    data: null,
  },
  reducers: {
    setResume: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    clearResume: (state) => {
      state.data = null;
    },
  },
});

export const { setResume, clearResume } = resumeSlice.actions;
export default resumeSlice.reducer;
