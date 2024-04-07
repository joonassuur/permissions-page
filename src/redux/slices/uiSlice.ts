import { createSlice } from '@reduxjs/toolkit';
import { Role } from '../../types/types';

interface UiSlice {
  showSidebar: boolean;
  selectedRole: Role | null;
}

const initialState: UiSlice = {
  showSidebar: true,
  selectedRole: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    resetUiSlice: () => initialState,
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
  },
});

export const { resetUiSlice, setShowSidebar, setSelectedRole } =
  uiSlice.actions;
export default uiSlice.reducer;
