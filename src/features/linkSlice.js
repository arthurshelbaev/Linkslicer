import { createSlice } from '@reduxjs/toolkit';

const linksSlice = createSlice

({
  name: 'links',
  initialState: [],
  reducers: {
    setLinks: (state, action) => {
      return action.payload;
    },
    addLink: (state, action) => {
      state.push(action.payload);
    },
    updateLink: (state, action) => {
      const { id, clicks } = action.payload;
      const link = state.find((link) => link.id === id);
      if (link) {
        link.clicks = clicks;
      }
    },
  },
});

export const { setLinks, addLink, updateLink } = linksSlice.actions;

export default linksSlice.reducer;