import { createSlice } from '@reduxjs/toolkit';

export interface AppSteps {
    currentStep: string;
    taskId: string | null;
    showData: any;
}

const initialState: AppSteps = {
    "currentStep": "/",
    "taskId": null,
    "showData": {}
};


const stepsSlice = createSlice({
    name: 'steps',
    initialState,
    reducers: {
        stepChanged(state, action) {
            return { ...action.payload }
        }
    }
})

export const { stepChanged } = stepsSlice.actions

export default stepsSlice.reducer