import { createSlice } from "@reduxjs/toolkit";

export const ChartTypeSlice = createSlice({
    name : 'chartTypeSlice',
    initialState : {
        chartType : 'bar'
    },
    reducers: {
        changeChartType : (state, action) => {
            state.chartType = action.payload
        }
    }
})

export const {changeChartType} = ChartTypeSlice.actions;
export default ChartTypeSlice.reducer;