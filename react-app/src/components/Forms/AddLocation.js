import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'
import { createLocation } from '../../store/location'
import "./forms.css"
// import "./addproduct.css"
const AddLocation = () => {
    const user = useSelector(state => state.session.user)
    // console.log("USERSELECTOR", user)
    const [name, setName] = useState('Example Place')
    const [description, setDescription] = useState('Description practice that is all.')
    const [phone, setPhone] = useState('949-226-4444')
    const [stringprice, setstringPrice] = useState(15)
    const [city, setCity] = useState('San Juan')
    const [state, setState ] = useState('California')
    const [address, setAddress] = useState('12 West St')
    const [zipcode, setZipcode] = useState('15648')
    const [category, setCategory] = useState('fast')
    const [operating_hours, setOperating_hours] = useState('9am-5pm')
    const [image, setImage] = useState('https://s3-media0.fl.yelpcdn.com/bphoto/hiprQ3a-icgVoLnOEWLPag/348s.jpg')
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch()
    const history = useHistory()
    const price = parseInt(stringprice)

    // if(!user) {
    //    return <h4>User not logged in</h4>
    // }


    const handleSubmit = async (e) => {
        e.preventDefault()
    const LocationData = {
        name,
        description,
        phone,
        city,
        state,
        address,
        zipcode,
        price,
        category,
        operating_hours,
    };

    const imgData = {
        image_url: image
    }

        dispatch(createLocation(LocationData, imgData))

        .then(async (res) => history.push(`/locations/${res.id}`))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
          });
    }

    return (
        <div className= "addLocationMain">

            <form className="addLocationform" onSubmit={handleSubmit}>
                <h1 className='Form-Title'>Add a Location</h1>
                <ul className="error-message">
                {errors.map((error, idx) => (
                <li key={idx} className="error-text">
                    {error}
                </li>
                ))}
                </ul>
            <label className="Label">
                Name
            <input className="name-form"
            type="text"
            value={name}
            placeholder="Name"
            maxLength={50}
            pattern="[a-zA-Z0-9 ]*"
            title="No Symbols, or special characters"
            onChange={(e) => {
                setName(e.target.value)
            }}
            required

            ></input>
            </label>
            <label className="Label">
                Description
            <textarea
            className="description-form"
            type="text"
            value={description}
            pattern="[-a-zA-Z0-9 .,;:?! ]*"
            placeholder="Describe your Location here"
            maxLength={255}
            onChange={(e) => {
                setDescription(e.target.value)
            }}
            required

            ></textarea>
            </label>
            <label className="Label">
                Phone
            <input className="Phone-form"
            type="text"
            value={phone}
            placeholder="Phone"
            maxLength={20}
            onChange={(e) => {
                setPhone(e.target.value)
            }}
            required

            ></input>
            </label>
            <label className="Label">
                Price
            <input className="price-form"
            type="text"
            value={stringprice}
            placeholder="Price"
            maxLength={20}
            pattern="[0-9]*"
            title="No Symbols or Characters"
            onChange={(e) => {
                setstringPrice(e.target.value)
            }}
            required

            ></input>
            </label>
            <label className="Label">
                City
            <input className="city-form"
            type="text"
            value={city}
            placeholder="City"
            maxLength={50}
            pattern="[a-zA-Z ]*"
            title="No Symbols or special characters"
            onChange={(e) => {
                setCity(e.target.value)
            }}
            required

            ></input>
            </label>
            <label className="Label">
                State
            <input className="State-form"
            type="text"
            value={state}
            placeholder="State"
            maxLength={30}
            pattern="[a-zA-Z ]*"
            title="No Symbols, numbers, or special characters"
            onChange={(e) => {
                setState(e.target.value)
            }}
            required

            ></input>
            </label>
            <label className="Label">
                Address
            <input className="Address-form"
            type="text"
            value={address}
            placeholder="Address"
            maxLength={50}
            pattern="[a-zA-Z0-9 ]*"
            title="No Symbols or special characters"
            onChange={(e) => {
                setAddress(e.target.value)
            }}
            required

            ></input>
            </label>
            <label className="Label">
                Zipcode
            <input className="Zipcode-form"
            type="text"
            value={zipcode}
            placeholder="Zipcode"
            maxLength={5}
            pattern="[0-9]*"
            title="No Symbols or Characters"
            onChange={(e) => {
                setZipcode(e.target.value)
            }}
            required

            ></input>
            </label>
            <label className="Label">
                Category
            <input className="Category-form"
            type="text"
            value={category}
            placeholder="Category"
            maxLength={20}
            pattern="[a-zA-Z ]*"
            title="No Symbols or Numbers"
            onChange={(e) => {
                setCategory(e.target.value)
            }}
            required

            ></input>
            </label>
            <label className="Label">
                Operating_hours
            <input className="Operating_hours-form"
            type="text"
            value={operating_hours}
            placeholder="Hours of Operation"
            maxLength={50}
            pattern="[-a-zA-Z0-9 ]*"
            title='Format as #am-#pm'
            onChange={(e) => {
                setOperating_hours(e.target.value)
            }}
            required

            ></input>
            </label>
            <label className="Label">
                Image
            <input className="size-form"
            type="url"
            value={image}
            placeholder="Image"
            required
            onChange={(e) => {
                setImage(e.target.value)
            }}

            ></input>
            </label>
            <button className="submit-form" type="Submit" >Submit</button>
            </form>
            {/* <button className="demo-add-item"
            onClick={() => dispatch(createLocationThunk(({name: "Demo Pants",description: "This is a description",price: 19.99, category: "pants" , color: "Demo Color", size: "Demo Size", seller: user?.id},
            {
                image: "https://target.scene7.com/is/image/Target/GUEST_b42925ba-d115-4575-b10d-c354a55bfaca?wid=1000&hei=1000&qlt=80&fmt=webp",
                preview: true
            }
            )))}
            >Demo Add Item</button> */}

        </div>
    )
}

export default AddLocation;
