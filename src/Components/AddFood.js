import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function AddFood() {
    const [formData, setFormData] = useState({
        foodItem: 'Italian',
        cityNames: [],
        starRating: '5'
    });
    const [itemsData, setItemsData] = useState([]);

    const history = useHistory();

    const getCity = (event) => {
        if(formData.cityNames.includes(event.target.value)) {
            let index = formData.cityNames.indexOf(event.target.value);
            formData.cityNames.splice(index, 1);
        } else {
            formData.cityNames.push(event.target.value);
        }
    }

    const getStarRating = (event) => {
        setFormData({...formData, starRating: event.target.value});
    }

    const submitData = () => {
        let localData = JSON.parse(localStorage.getItem('foodItemDetails'));
        if(localData === null) {
            itemsData.push(formData);
            localStorage.setItem('foodItemDetails', JSON.stringify(itemsData));
        } else {
            localData.push(formData);
            localStorage.setItem('foodItemDetails', JSON.stringify(localData));
        }
        alert('Food item added succesfully!', history.push('/food-items-list'));
    }

    return (
        <div>
            <h2 style={{textDecoration: 'underline'}}>Add food item</h2>
            <div>
                <h3>Food:</h3>
                <label htmlFor="italian">Italian</label>
                <input type="radio" id="italian" value="Italian" name="foodItem" checked={formData.foodItem === 'Italian'} onChange={e => setFormData({...formData, foodItem: e.target.value})}></input>
                <label htmlFor="chinese" style={{marginLeft: '20px'}}>Chinese</label>
                <input type="radio" id="chinese" value="Chinese" name="foodItem" checked={formData.foodItem === 'Chinese'} onChange={e => setFormData({...formData, foodItem: e.target.value})}></input>
            </div>
            <div>
                <h3>Star rating:</h3>
                <select value={formData.starRating} onChange={getStarRating} style={{width: '10%', height: '30px', fontSize: '15px'}}>
                    <option value="5">5 stars</option>
                    <option value="4">4 stars</option>
                    <option value="3">3 stars</option>
                </select>
            </div>
            <div>
                <h3>City:</h3>
                <input type="checkbox" id="chd" value="Chandigarh" onChange={getCity}></input>
                <label htmlFor="chd">Chandigarh</label>
                <input type="checkbox" id="mohali" value="Mohali" onChange={getCity} style={{marginLeft: '20px'}}></input>
                <label htmlFor="mohali">Mohali</label>
                <input type="checkbox" id="pchk" value="Panchkula" onChange={getCity} style={{marginLeft: '20px'}}></input>
                <label htmlFor="pchk">Panchkula</label>
            </div>
            <button style={{marginTop: '20px', width: '10%', height: '30px', fontSize: '18px'}} onClick={submitData}>Submit</button>
        </div>
    )
}

export default AddFood
