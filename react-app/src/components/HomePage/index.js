// import React from "react"
import ActiveLife from "./ActiveLife"
import RestaurantCategory from "./RestaurantCategory"
import ShoppingCategory from "./ShoppingCategory"
import Nightlife from "./Nightlife"
import Beauty from "./Beauty"
import Automotive from "./Automotive"
import HomeServices from "./HomeServices"
import More from "./More"





function HomePage() {



    return (
        <div className="Home">
            <div className="background">
                {/* background image container(want to place navbar over image only on homne page) */}
                <img src="https://inkind.com/images/tild3033-3634-4136-b937-373235383063__foodbanner-wide.jpg" alt="Not Found">
                {/* <img src="https://cf.bstatic.com/images/hotel/max1024x768/197/197749692.jpg" alt="Not Found"> */}
                </img>
            </div>
            <div className="recent-activity">
            <h1>
                Recent Activity Container
            </h1>
            <h2>Latest/Local reviews will be displayed here</h2>
            </div>
            {/* <hr style={{width: '100%', color: 'light-gray'}}></hr> */}
                <h1>Categories</h1>
                <br></br>
            <div className="Categories">
                    <RestaurantCategory />
                    <ShoppingCategory />
                    <Nightlife />
                    <ActiveLife />
                    <Beauty />
                    <Automotive />
                    <HomeServices />
                    <More />

            </div>
        </div>
    )
}



export default HomePage
