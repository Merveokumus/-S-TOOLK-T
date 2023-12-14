import {useRef} from 'react'
import { statusOptions , typeOptions, sortOptions } from '../constants'
import { filterByStatus , filterByType ,handleSearch, sortState, handleClear} from '../redux/jobSlice'
import { useDispatch } from 'react-redux'
import {toast} from "react-toastify";

const Filter = () => {
    const dispatch = useDispatch();
    const inputRef = useRef();

    //status değeri her değiştiğinde çalışır
    const handleStatusChange = (e) => {
        dispatch(filterByStatus(e.target.value))
    }
    //type değeri her değiştiğinde çalışır
    const handleTypeChange = (e) => {
        dispatch(filterByType(e.target.value))
    }
    //input her değiştiğinde
    const handleChange = (e) => {
   dispatch(handleSearch((e.target.value)));
    }

    const handleSortChange = (e) => {
        dispatch(sortState(e.target.value));

    }
    //temizle butonuna basılınca çalışıor
    const handleClick = (e) => {
        toast.success("Filtreler temizlendi");
        e.preventDefaoult();
        //inputun içerisini temizleme
        inputRef.current.value = '';
     
        //temizleme aksiyonu çalıştırma
        dispatch(handleClear());
    };
  return (
    <section className='filter-sec'>
        <h2>Filtreleme Formu</h2>
        <form >
            <div className='input-field'>
                <label >Arama</label>
                <input ref={inputRef} type="text" onChange={handleChange} />
            </div>
            <div className='input-field'>
                <label >Durum</label>
               <select onChange={ handleStatusChange}>
                {statusOptions.map((opt) =>
                <option value={opt.label}>
                    {opt.label}</option>)}
                </select>
            </div>
            <div className='input-field'>
                <label >Tip</label>
                <select onChange={handleTypeChange} > 
                    {typeOptions.map((opt) => 
                    <option value={opt.label}>
                        {opt.label}
                        </option> )}
                </select>
            </div>
            <div className='input-field'>
                <label >Sırala</label>
                <select onChange={handleSortChange} > 
                    {sortOptions.map((opt) => 
                    <option value={opt}>
                        {opt}
                        </option> )}
                </select>
            </div>
            <button onClick={handleClick}>Filtreleri Temizle</button>
        </form>
    </section>
  )
}

export default Filter;