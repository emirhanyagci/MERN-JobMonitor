import { createSlice } from "@reduxjs/toolkit";
interface Note {
  title: string;
}
interface CounterState {
  notes: Note[];
}
const initialState: CounterState = {
  notes: [{ title: "sad" }],
};
export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNotes: (state) => {
      state.notes = [{ title: "updated" }];
    },
  },
});

export const { addNotes } = notesSlice.actions;
export default notesSlice.reducer;
