import React, { useState } from 'react';
import '../css/addcars.css';
import { Link, useParams } from 'react-router-dom';
import DistNav from './DistNav';


const AddCars = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    carBrand: '',
    carType: '',
    carPhoto: null,
    carNumber: '',
    driverName: '',
    driverPhone: '',
    price: '',
    documentPhoto: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      carPhoto: e.target.files[0],
    }));
    
  };

  const handleLicenseChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      documentPhoto: e.target.files[0],
      
    }));
  };

  const addCarHandler = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('ownerName', formData.ownerName);
    formDataToSend.append('ownerPhone', formData.ownerPhone);
    formDataToSend.append('carBrand', formData.carBrand);
    formDataToSend.append('carType', formData.carType);
    formDataToSend.append('carPhoto', formData.carPhoto);
    formDataToSend.append('carNumber', formData.carNumber);
    formDataToSend.append('driverName', formData.driverName);
    formDataToSend.append('driverPhone', formData.driverPhone);
    formDataToSend.append('price',formData.price);
    formDataToSend.append('documentPhoto', formData.documentPhoto);
    formDataToSend.append('distributorId', id);

   
    try {
      const response = await fetch('http://localhost:4000/add-rental-client', {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await response.json();
      if (data.success) {
        console.log('Car added successfully');
        alert('Car added successfully');
        // Reset form data after successful submission
        setFormData({
          ownerName: '',
          ownerPhone: '',
          carBrand: '',
          carType: '',
          carPhoto: null,
          carNumber: '',
          driverName: '',
          driverPhone: '',
          price: '',
          documentPhoto: null
        });
      } else {
        console.log('Car not added');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <DistNav/>
      <div className='main-div-rental'>
        <div className="form-container">
          <h1>Clients Form</h1>
          <div className="form-wrapper">
            <form onSubmit={addCarHandler} encType="multipart/form-data">
              <h2>Owner details:</h2>
              <hr className='owner-line' />
              <div className="owner-details2">
                <div className="form-group">
                  <label htmlFor='ownerName'>Name of the owner:</label>
                  <input type='text' id='ownerName' name='ownerName' value={formData.ownerName} onChange={handleChange} required  className='input--'/>
                </div>
                <div className="form-group">
                  <label htmlFor='ownerPhone'>Owner Phone:</label>
                  <input type='number' id='ownerPhone' name='ownerPhone' value={formData.ownerPhone} onChange={handleChange} required className='input--' />
                </div>
              </div>
              <h2>Vehicle details:</h2>
              <hr className='owner-line' />
              <div className="owner-details2"></div>
              <div className="car-details">
                <div className="form-group">
                  <label htmlFor='carBrand'>Brand:</label>
                  <input type='text' id='carBrand' name='carBrand' value={formData.carBrand} onChange={handleChange} placeholder='eg. BMW, Audi' required className='input--' />
                </div>
                <div className="form-group">
                  <label htmlFor='carType'>Vehicle Type:</label>
                  <input type='text' id='carType' name='carType' value={formData.carType} onChange={handleChange} placeholder='eg. Sedan, 4x4' required className='input--'/>
                </div>
                <div className="form-group">
                  <label htmlFor='carPhoto'>Vehicle Image:</label>
                  <input type='file' id='carPhoto' name='carPhoto' onChange={handlePhotoChange} required className='input--'/>
                </div>
                <div className="form-group">
                  <label htmlFor='carNumber'>Vehicle Number:</label>
                  <input type='text' id='carNumber' name='carNumber' value={formData.carNumber} onChange={handleChange} required className='input--'/>
                </div>
                <div className="form-group">
                  <label htmlFor='price'> Price:</label>
                  <input type='number' id='price' name='price' value={formData.price} onChange={handleChange} required className='input--'/>
                </div>
              </div>
              <h2>Driver details:</h2>
              <hr className='owner-line' />
              <div className="owner-details2"></div>
              <div className="driver-details2">
                <div className="form-group">
                  <label htmlFor='driverName'>Name of Driver:</label>
                  <input type='text' id='driverName' name='driverName' value={formData.driverName} onChange={handleChange} required className='input--'/>
                </div>
                <div className="form-group">
                  <label htmlFor='driverPhone'>Driver Phone:</label>
                  <input type='number' id='driverPhone' name='driverPhone' value={formData.driverPhone} onChange={handleChange} required className='input--'/>
                </div>
                <div className="form-group">
                  <label htmlFor='documentPhoto'>Driver's license:</label>
                  <input type='file' id='documentPhoto' name='documentPhoto' onChange={handleLicenseChange} required className='input--'/>
                </div>
              </div>
              <button type='submit' className='add-car-button'>Add Rental Client</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCars;
