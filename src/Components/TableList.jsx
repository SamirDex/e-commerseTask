/* eslint-disable react/prop-types */
import React, { useEffect, useState} from 'react'
import "./../css/Tablelist.css"
import { FaRegHeart, FaShoppingBasket } from "react-icons/fa";
import { Button, Input, } from '@chakra-ui/react'
import { RiDiscountPercentLine } from "react-icons/ri";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,FormControl,
  } from '@chakra-ui/react'


function TableList({ productDatas, onDelete, onEdit, onSaveEdit, editingData}) {
    // console.log(productDatas);
    const [productName, setProductName] = useState(''); 
    const [productPrice, setProductPrice] = useState(0); 
    const [isEditing, setIsEditing] = useState(false); 
    
    const handleFormSubmit = (e) => {
        e.preventDefault() ; 
        handleSave(); 
    }
    useEffect(() => {
        if(editingData){
            setProductName(editingData.name)
            setProductPrice(editingData.price)
            setIsEditing(true)
        }
    }, [editingData])

    const handleSave = () => {
        if(editingData){
            const updatedProduct = {...editingData, name: productName, price: productPrice};
            onSaveEdit(updatedProduct);
            setIsEditing(false);
            setProductName('');
            setProductPrice(0);
        }
    }

    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Name</Th>
                        <Th>Discount</Th>
                        <Th isNumeric>price</Th>
                        <Th isNumeric>Stock Count</Th>
                        <Th>Favourite</Th>
                        <Th>Basket</Th>
                        <Th>Edit</Th>
                        <Th>delete</Th>

                    </Tr>
                </Thead>
                <Tbody>
                    {productDatas.map((data) => (
                        <Tr key={data.id} style={{ backgroundColor: data.stockCount <= 20 ? '#fd5c63' : 'transparent',}}>
                            <Td>{data.id}</Td>
                            <Td>{isEditing && editingData?.id === data.id ? (
                                <form onSubmit={handleFormSubmit}>
                                    <FormControl>
                                        <Input
                                        type='text'
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl mt={2}>
                                        <Input
                                        type='number'
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        />
                                    </FormControl>
                                    <Button type='submit' colorScheme='blue' mt={2}>
                                        Save
                                    </Button>
                                </form>
                            ) : (
                                data.name
                            )}</Td>
                            <Td>
                                {data.sale ? (
                                <RiDiscountPercentLine style={{ color: 'green', margin: '0 auto', fontSize: '25px' }}/>
                                ) : (
                                ''
                                )}
                            </Td>
                            <Td isNumeric>${data.price}</Td>
                            <Td isNumeric>{data.stockCount}</Td>
                            <Td>
                                <FaRegHeart className='favIcon' />
                            </Td>
                            <Td>
                                <FaShoppingBasket className='basketIcon' />
                            </Td>
                            <Td>
                                {isEditing && editingData?.id === data.id ? null : (
                                <Button colorScheme='blue' onClick={() => onEdit(data)}>
                                    Edit
                                </Button>
                                )}
                            </Td>
                            <Td>
                                <Button colorScheme='red' onClick={() => onDelete(data.id)}>
                                Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default TableList