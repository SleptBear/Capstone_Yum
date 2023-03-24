import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory, useParams } from 'react-router-dom'
import { updateLocation, getLocation } from '../../store/location'
import "./forms.css"
// import "./addproduct.css"
const EditLocation = () => {
    const user = useSelector(state => state.session.user)
    const location = useSelector(state => state.location.location)
    // console.log("USERSELECTOR", user)
    const [name, setName] = useState(location.name)
    const [phone, setPhone] = useState(location.phone)
    const [stringprice, setstringPrice] = useState(location.price)
    const [city, setCity] = useState(location.city)
    const [state, setState ] = useState(location.state)
    const [address, setAddress] = useState(location.address)
    const [zipcode, setZipcode] = useState(location.zipcode)
    const [operating_hours, setOperating_hours] = useState(location.operating_hours)
    const [image, setImage] = useState('')
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch()
    const history = useHistory()
    const price = parseInt(stringprice)

    const id = useParams()
    const locationId = id?.id

    useEffect(() => {
        dispatch(getLocation(locationId))
    }, [dispatch])

    if(!user) {
       return <h4>User not logged in</h4>
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
    const LocationData = {
        name,
        phone,
        city,
        state,
        address,
        zipcode,
        price,
        operating_hours,
    };

    // const imgData = {
    //     image_url: image
    // }

        dispatch(updateLocation(LocationData, locationId))

        .then(async (res) => history.push(`/locations/${locationId}`))
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors)
        //   });
    }

    return(
        <div className= "UpdateLocationMain">

            <form className="UpdateLocationform" onSubmit={handleSubmit} noValidate>
                <h1>Update a Location</h1>
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
            onChange={(e) => {
                setName(e.target.value)
            }}
            required

            ></input>
            </label>
            {/* <label className="descriptionlabel">
                Description
            <textarea className="description-form"

            value={description}

            placeholder="Describe your Location here"
            maxLength={255}
            onChange={(e) => {
                setDescription(e.target.value)
            }}
            required

            ></textarea>
            </label> */}
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
            onChange={(e) => {
                setZipcode(e.target.value)
            }}
            required

            ></input>
            </label>
            <label className="Label">
                Hours of Operation
            <input className="Operating_hours-form"
            type="text"
            value={operating_hours}
            placeholder="Hours of Operation"
            maxLength={50}
            onChange={(e) => {
                setOperating_hours(e.target.value)
            }}
            required

            ></input>
            </label>
            {/* <label className="Label">
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
            // </label> */}
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

export default EditLocation;
