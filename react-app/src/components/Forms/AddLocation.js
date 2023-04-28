import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'
import { createLocation } from '../../store/location'
import "./forms.css"

const AddLocation = () => {
    const user = useSelector(state => state.session.user)
    // console.log("USERSELECTOR", user)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    const [stringprice, setstringPrice] = useState('')
    const [city, setCity] = useState('')
    const [state, setState ] = useState('')
    const [address, setAddress] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [category, setCategory] = useState('')
    const [operating_hours, setOperating_hours] = useState('')
    const [image, setImage] = useState(null)
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
        image
    }

        const data = await dispatch(createLocation(LocationData, imgData));
        if (data && data.errors) {
            // console.log(data)
            setErrors(data.errors);
        } else {
            history.push(`/locations/${data.id}`)
        }

        // .then(async (res) => history.push(`/locations/${res.id}`))

        // .catch(async (res) => {
        //     console.log(res)
        //     const data = await res;
        //     console.log(data)
        //     if (data && data.errors) setErrors(data.errors)
        //   });
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
            placeholder="Describe your Location here..."
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
            placeholder="### - ### - ####"
            maxLength={12}
            onChange={(e) => {
                setPhone(e.target.value)
            }}
            required

            ></input>
            </label>
            <label className="Label">
                Avg Price in Dollars ($)
            <input className="price-form"
            type="text"
            value={stringprice}
            placeholder="12"
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
            {/* <label className="Label">
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
            </label> */}
            <label className="Label">
                Address
            <input className="Address-form"
            type="text"
            value={address}
            placeholder="## Street Name"
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
            placeholder="#####"
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
                Operating_hours
            <input className="Operating_hours-form"
            type="text"
            value={operating_hours}
            placeholder="E.x: 9am-5pm"
            maxLength={10}
            pattern="[-a-zA-Z0-9 ]*"
            title='Format as #am-#pm'
            onChange={(e) => {
                setOperating_hours(e.target.value)
            }}
            required

            ></input>
            </label>
            <label className="Label">
                Preview Image
                <input
                type='file'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
                >
                </input>
            {/* <input className="size-form"
            type="url"
            value={image}
            placeholder="Image URL"
            required
            onChange={(e) => {
                setImage(e.target.value)
            }}

            ></input> */}
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
            {/* <Footer /> */}
        </div>
    )
}

export default AddLocation;
