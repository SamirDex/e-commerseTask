import * as  React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import TableList from './Components/TableList';
import "./css/Admin.css"
import SearchBar from './Components/SearchBar';
import { Routes, Route } from 'react-router-dom';



function Admin() {
    const [productDatas, setProductDatas] = useState([]); 
    const [userDatas, setUserDatas] = useState([]); 
    const [search, setSearch] = useState("");
    const [sortbyPrice, setSortbyPrice] = useState("")
    const [editingData, setEditingData] = useState(null)

    const url = "https://66bf2b3142533c4031454a0a.mockapi.io/data/"; 

    useEffect(() => {
        axios(url + "products").then(response => {
            // console.log(response.data);
            setProductDatas(response.data)
        })
    }, [])

    useEffect(() => {
        axios(url + "users" ).then(response => {
            // console.log(response.data);
            setUserDatas(response.data)
        })
    }, [])

    const handleSortChange = (order) => {
        setSortbyPrice(order)
    }

    const handleSearch = (word) => {
        setSearch(word); 
    }
    const filteredDatas = productDatas
    .filter(data => data.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => {
        if(sortbyPrice == "MintoMax") return a.price - b.price
        if(sortbyPrice == "MaxtoMin") return b.price - a.price
    })

    const handleDelete = (id) => {
        const updatedDatas = productDatas.filter(elem => elem.id != id); 
        setProductDatas(updatedDatas); 
        axios.delete(url + "products/" + id); 
    }

    const handleEdit = (data) => {
        if (editingData && editingData.id == data.id) {
            setEditingData(null);
        } else {
            setEditingData(data);
        }
    }

    const handleSaveEdit = (updatedData) => {
        axios.put(`${url}products/${updatedData.id}`, updatedData)
        .then(response => {

            const updatedDatas = productDatas.map(elem => elem.id === response.data.id ? response.data : elem);

            setProductDatas(updatedDatas); 
            setEditingData(null);
        })
    }

    
// console.log(productDatas);

    return (
        <div className='Admin-container'>
            <SearchBar 
            search={search} 
            onSearch={handleSearch} 
            sortbyPrice={sortbyPrice}
            onsortbyPrice ={handleSortChange}
            />

            <TableList
            productDatas = {filteredDatas} 
            onDelete ={handleDelete}
            onEdit={handleEdit}
            onSaveEdit ={handleSaveEdit}
            editingData ={editingData}/>
        </div>
    )
}

export default Admin