import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'

function ItemList() {
    const [localData, setLocalData] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        foodItem: '',
        cityNames: [],
        starRating: ''
    });

    const deleteIcon = <FontAwesomeIcon icon={faTrash} />
    const editIcon = <FontAwesomeIcon icon={faPen} />

    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    useEffect(() => {
        getLocalData();
    }, [localData])

    const getLocalData = () => {
        setLocalData(JSON.parse(localStorage.getItem('foodItemDetails')));
    }

    const deleteItem = (id) => {
        let localStorageData = JSON.parse(localStorage.getItem('foodItemDetails'));
        localStorageData.splice(id, 1);
        localStorage.setItem('foodItemDetails', JSON.stringify(localStorageData));
    }

    const openModal = (id) => {
        setIsOpen(true);
        let filteredItem = localData.filter(item => item)[id];
        selectedItem.push(filteredItem);
        // setSelectedItem(filteredItem);
        console.log(selectedItem);
    }

    const updateItem = () => {

    }

    return (
        <div>
            <h2 style={{textDecoration: 'underline'}}>Food Items</h2>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <h2>Category</h2>
                <h2>Rating</h2>
                <h2>Cities</h2>
                <h2>Actions</h2>
            </div>
            {localData.map((data, index) => {
                return(
                    <div key={index} style={{display: 'flex', justifyContent: 'space-around'}}>
                        <h5>{data.foodItem}</h5>
                        <h5>{data.starRating} stars</h5>
                        {data.cityNames.map(city => {
                            return(
                                <h5>{city}</h5>
                            )
                        })}
                        <div>
                            <button onClick={() => deleteItem(index)}>{deleteIcon}</button>
                            <button onClick={() => openModal(index)}>{editIcon}</button>
                        </div>
                    </div>
                )
            })}
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <h2>Edit item</h2>
                <form>
                <div>
                    <h3>Food:</h3>
                    {selectedItem.map((item, index) => {
                        return(
                            <div key={index}>
                                <div style={{display: 'flex'}}>
                                    <label htmlFor="italian">Italian</label>
                                    <input type="radio" id="italian" value={item.foodItem} checked={item.foodItem === 'Italian'} name="foodItem"></input>
                                    <label htmlFor="chinese" style={{marginLeft: '20px'}}>Chinese</label>
                                    <input type="radio" id="chinese" value={item.foodItem} checked={item.foodItem === 'Chinese'} name="foodItem"></input>
                                </div>
                                <div>
                                    <h3>Star rating:</h3>
                                    <select value={item.starRating} style={{width: '100%', height: '30px', fontSize: '15px'}}>
                                        <option value="5">5 stars</option>
                                        <option value="4">4 stars</option>
                                        <option value="3">3 stars</option>
                                    </select>
                                </div>
                                <div>
                                    <h3>City:</h3>
                                    {item.cityNames.map((city, index) => {
                                        return(
                                            <div key={index}>
                                                <input type="checkbox" id="chd" value={city} checked={city === 'Chandigarh'}></input>
                                                <label htmlFor="chd">Chandigarh</label>
                                                <input type="checkbox" id="mohali" value={city} checked={city === 'Mohali'} style={{marginLeft: '20px'}}></input>
                                                <label htmlFor="mohali">Mohali</label>
                                                <input type="checkbox" id="pchk" value={city} checked={city === 'Panchkula'} style={{marginLeft: '20px'}}></input>
                                                <label htmlFor="pchk">Panchkula</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                    <button onClick={() => setIsOpen(false)}>Close</button>
                    <button onClick={updateItem} style={{float: 'right'}}>Update</button>
                </form>
            </Modal>
        </div>
    )
}

export default ItemList
