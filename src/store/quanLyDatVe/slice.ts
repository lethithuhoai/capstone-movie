import { createSlice } from '@reduxjs/toolkit'
import { BoxOfficeList } from 'types/QuanLyDatVe';
import { lichChieuPhimThunk } from '.';


type QuanLyDatVe = {
   //  
   boxOfficeList ?: BoxOfficeList
}
const initialState: QuanLyDatVe = {
   
}

const quanLyDatVeSlice = createSlice({
   name: "quanLyDatVe",
   initialState,
   reducers: {
   },//xử lý acction đồng bộ
   extraReducers(builder) {
      builder
         // .addCase(loginThunk.pending, (state) => {
         //    state.isFetchingChair = true
         // })
         // .addCase(loginThunk.rejected, (state) => {
         //    state.isFetchingChair = false
         // })
         .addCase(lichChieuPhimThunk.fulfilled, (state, { payload }) => {

            // lưu accessToken xuống local
            // set lại user
            state.boxOfficeList = payload

            // state.isFetchingChair = false
         })
   },// xử lý acction bất đồng bộ call api

})
export const { actions: quanLyDatVeActions, reducer: quanLyDatVeReducer } = quanLyDatVeSlice