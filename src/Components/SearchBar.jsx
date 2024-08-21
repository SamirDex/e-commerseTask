/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Input, Select, Button} from '@chakra-ui/react'
import "./../css/Searchbar.css"

function SearchBar({search , onSearch, sortbyPrice, onsortbyPrice}) {

    const handleInputChange = (e) => {
        // console.log(e.target.value);
        onSearch(e.target.value)
    }

    const handleSortPrice = (e) => {
        // console.log(e.target.value);
        onsortbyPrice(e.target.value)
    }

    return (
        <div className='searchbar'>
            <Input placeholder='Search Product' value={search} onChange={handleInputChange} type='text' className='input' />
            <Select placeholder='Sort Products' className='dropdown' onChange={handleSortPrice}>
                <option value="MintoMax">Min. to Max.</option>
                <option value="MaxtoMin">Max. to Min.</option>
            </Select>
            <Button colorScheme='red' className='favBtn'>Favourite</Button>
            <Button colorScheme='blue' className='basketBtn'>Basket</Button>
        </div>
    )
}

export default SearchBar