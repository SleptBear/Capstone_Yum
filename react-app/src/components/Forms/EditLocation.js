import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory, useParams } from 'react-router-dom'
import { updateLocation, getLocation, deleteLocation } from '../../store/location'
import OpenModalButton from '../OpenModalButton'
import { useModal } from '../../context/Modal'
import RemoveLocationButton from './RemoveLocationButton'

import "./forms.css"
// import "./addproduct.css"
const EditLocation = () => {
    const user = useSelector(state => state.session.user)
    const location = useSelector(state => state.location.location)
    // console.log("USERSELECTOR", user)
    const [name, setName] = useState(location.name)
    const [description, setDescription] = useState(location.description)
    const [phone, setPhone] = useState(location.phone)
    const [stringprice, setstringPrice] = useState(location.price)
    const [city, setCity] = useState(location.city)
    const [state, setState ] = useState(location.state)
    const [address, setAddress] = useState(location.address)
    const [zipcode, setZipcode] = useState(location.zipcode)
    const [category, setCategory] = useState(location.category)
    const [operating_hours, setOperating_hours] = useState(location.operating_hours)
    // const [image, setImage] = useState('')
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const dispatch = useDispatch()
    const history = useHistory()
    const price = parseInt(stringprice)

    const id = useParams()
    const locationId = id?.id

    useEffect(() => {
        dispatch(getLocation(locationId))
    }, [dispatch])


    const handleRemove = async (e) => {
        // e.preventDefault()
        dispatch(deleteLocation(locationId))

        .then(async (res) => {
            const data = await res.json();
            // console.log(res)
            // console.log(data)
            if (data && data.errors) setErrors([data.errors])
            if(res.ok) {
            history.push(`/`)
            closeModal()
            // window.alert("Location Unlisted")
            }
        })
        // .catch(async (res) => {
        // });

    }


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

    dispatch(updateLocation(LocationData, locationId))
    .then(async (res) => {
        const data = await res.json();
        // console.log("return data in catch", data)

        if (data && data.errors) setErrors([data.errors])
        if(res.ok) history.push(`/locations/${locationId}`)
    }
        )

    //   .catch(async (res) => {
    //     const data = await res.json();
    //     console.log("return data in catch", data)
    //     if (data && data.errors) setErrors(data.errors)
    //   });
}

    return(
        <div className= "UpdateLocationMain">

            <form className="UpdateLocationform" onSubmit={handleSubmit}>
                <h1 className='Form-Title'>Update a Location</h1>
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
            maxLength={20}
            pattern="[a-zA-Z0-9' ]*"
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
                Average Price
                <input className="price-form"
            type="text"
            value={stringprice}
            placeholder="Price"
            maxLength={20}
            pattern="[0-9]*"
            title="No Special Symbols or Characters"
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
                <select className="State-form"
  value={state}
  onChange={(e) => {
    setState(e.target.value)
  }}
  required
>
  <option value="" disabled>Select a state</option>
  <option value="AL">Alabama</option>
  <option value="AK">Alaska</option>
  <option value="AZ">Arizona</option>
  <option value="AR">Arkansas</option>
  <option value="CA">California</option>
  <option value="CO">Colorado</option>
  <option value="CT">Connecticut</option>
  <option value="DE">Delaware</option>
  <option value="FL">Florida</option>
  <option value="GA">Georgia</option>
  <option value="HI">Hawaii</option>
  <option value="ID">Idaho</option>
  <option value="IL">Illinois</option>
  <option value="IN">Indiana</option>
  <option value="IA">Iowa</option>
  <option value="KS">Kansas</option>
  <option value="KY">Kentucky</option>
  <option value="LA">Louisiana</option>
  <option value="ME">Maine</option>
  <option value="MD">Maryland</option>
  <option value="MA">Massachusetts</option>
  <option value="MI">Michigan</option>
  <option value="MN">Minnesota</option>
  <option value="MS">Mississippi</option>
  <option value="MO">Missouri</option>
  <option value="MT">Montana</option>
  <option value="NE">Nebraska</option>
  <option value="NV">Nevada</option>
  <option value="NH">New Hampshire</option>
  <option value="NJ">New Jersey</option>
  <option value="NM">New Mexico</option>
  <option value="NY">New York</option>
  <option value="NC">North Carolina</option>
  <option value="ND">North Dakota</option>
  <option value="OH">Ohio</option>
  <option value="OK">Oklahoma</option>
  <option value="OR">Oregon</option>
  <option value="PA">Pennsylvania</option>
  <option value="RI">Rhode Island</option>
  <option value="SC">South Carolina</option>
  <option value="SD">South Dakota</option>
  <option value="TN">Tennessee</option>
  <option value="TX">Texas</option>
  <option value="UT">Utah</option>
  <option value="VT">Vermont</option>
  <option value="VA">Virginia</option>
  <option value="WA">Washington</option>
  <option value="WV">West Virginia</option>
  <option value="WI">Wisconsin</option>
  <option value="WY">Wyoming</option>
</select>
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
            minLength={5}
            maxLength={5}
            pattern="[0-9]*"
            title="No Symbols or Characters, must be length 5"
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
                Hours of Operation
                <input className="Operating_hours-form"
            type="text"
            value={operating_hours}
            placeholder="Hours of Operation"
            maxLength={10}
            pattern="[-a-zA-Z0-9 ]*"
            title='Format as #am-#pm'
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
            <br></br>
            </form>
            <h2>Or Remove.</h2>
            <br></br>

                {/* <button
                onClick={() => handleRemove()}
                className="submit-form"
                style={{backgroundColor: 'dark red'}}>
                    Remove Location
                </button> */}
                {/* <button
                onClick={() => handleRemove()}
                className="submit-form"
                style={{backgroundColor: 'dark red'}}>
                    Remove Location
                </button> */}

                <div className='remove-button'>

                <OpenModalButton
                modalComponent={<RemoveLocationButton locationId={locationId}/>}
                buttonText={<i className="fa-regular fa-trash-can"></i>}
                >
                </OpenModalButton>
                    </div>
            {/* <Footer /> */}
        </div>
    )
}

export default EditLocation;
