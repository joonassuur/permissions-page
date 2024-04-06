import { createSlice } from '@reduxjs/toolkit';
import { Role } from '../../types/types';

interface UiSlice {
  showSidebar: boolean;
  addRoleModalOpen: boolean;
  editRoleModalOpen: boolean;
  selectedRole: Role | null;
}

const initialState: UiSlice = {
  showSidebar: true,
  addRoleModalOpen: false,
  editRoleModalOpen: false,
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
    setAddRoleModalOpen: (state, action) => {
      state.addRoleModalOpen = action.payload;
    },
    setEditRoleModalOpen: (state, action) => {
      state.editRoleModalOpen = action.payload;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
  },
});

export const {
  resetUiSlice,
  setShowSidebar,
  setAddRoleModalOpen,
  setEditRoleModalOpen,
  setSelectedRole,
} = uiSlice.actions;
export default uiSlice.reducer;
