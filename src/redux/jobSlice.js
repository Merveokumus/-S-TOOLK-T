import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    jobs:[],
    filtredJobs:[],
    initialized: false,
};

const jobSlice = createSlice({
    name: "jobSlice",
    initialState,
    reducers:{
        setJobs: (state,action) => {
            //hem orjinal hem kopya diziden gelen verileri gönderiyoruz
            state.jobs = action.payload;
            state.filtredJobs = action.payload;
            state.initialized = true;
        },

        addNewJob: (state,action) => {
            state.jobs = [...state,jobs.payload];
        },
//! duruma göre filtreleme
        filterByStatus : (state,action) => {
            //aksiyonun payload değeri ile gelen status değerine eşit olan 
            //elemanlarla yeni bir dizi oluşturduk
            const filtredJobs = state.jobs.filter(
                (job) => job.status === action.payload);
            //kopya diziyi güncelleme
                state.filtredJobs = filtredJobs;
        },
//! tipe göre filtreleme
        filterByType : (state,action) => {
            //aksiyonla gelen type değerine göre yeni bir dizi olultursun
            const filtredArr = state.jobs.filter(
                (job) => job.type === action.payload);
            //yeni diziyi ekrana basılan dizi olarak ayarla
                state.filtredJobs = filtredArr;
        },
//!inputa göre filtreleme
        handleSearch : (state,action) => {
            //arama terimini küçük harfe çevirme
            const query = action.payload.toLowerCase();
           //aksiyonla gelen arama terimi ile eşleşen objelerle yeni bir dizi oluştur
           const filtredArr = state.jobs.filter((job) => 
              job.company.toLowerCase().includes(query));
           // yeni oluşan diziyi kopya diziye ( ekrana basılan) aktar
           state.filtredJobs = filtredArr;
        },
//!sıralama
        sortState : (state, action) => {
            switch(action.payload){
                case "a-z":
                    state.filtredJobs.sort((a,b) => {
                        if(a.company < b.company) return -1;
                        if(a.company > b.company) return 1;
                        return 0;
                    }) ;
                    break;

                case "z-a":
                    state.filtredJobs.sort((a,b) => {
                        if(a.company < b.company) return 1;
                        if(a.company > b.company) return -1;
                        return 0;
                    })
                    break;
                case "En Yeni" :
                    state.filtredJobs.sort(
                        (a,b) => new Date(b.date) - new Date(a.date) );
                    break;
                case "En Eski" :
                    state.filtredJobs.sort(
                        (a,b) => new Date(a.date) - new Date(b.date) );
                    break;
                default:
                    break;
            };
        },
//! Filtrelenmiş diziyi sıfırlar
        handleClear : (state, action) => {
            state.filtredJobs = state.jobs;
        }
    },
})

export const {setJobs ,
     addNewJob , 
     filterByStatus , 
     filterByType , 
     handleSearch,
     sortState,
     handleClear,
    } = jobSlice.actions;
export default jobSlice.reducer;