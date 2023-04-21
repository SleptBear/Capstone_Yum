// import ReviewsIndexCard from "../Reviews/ReviewsIndexCard"
import ReviewsIndex from "../Reviews/ReviewsIndex"
import ActiveLife from "./Indoors"
import RestaurantCategory from "./FastFood"
import ShoppingCategory from "./Outdoors"
import Nightlife from "./Bars"
import Beauty from "./SeaFood"
import Automotive from "./Delivery"
import HomeServices from "./Coffee"
import More from "./More"
import "./YumHome.png"





function HomePage() {

    return (
        <div className="Home">
            <div className="background">
                {/* <img src="https://inkind.com/images/tild3033-3634-4136-b937-373235383063__foodbanner-wide.jpg" alt="Not Found"> */}
                <img src="https://www.lyledc.com/media/pjbkwhfy/lyle-hotel-1914-web-wide.jpg?anchor=center&mode=crop&quality=70&width=1280&height=647&rnd=133057541708130000" alt="Not Found">
                {/* <img src="https://www.brandinginasia.com/wp-content/uploads/2021/06/Dark-Kitchen-Dipo-Induction.jpg" alt="Not Found"> */}
                {/* <img src="https://images.squarespace-cdn.com/content/v1/5b4d0a8f2487fd811172f260/1572886853604-1PSXIC5U0UZUU0JM4S5F/f8.JPG" alt="Not Found"> */}
                {/* <img src="https://cf.bstatic.com/images/hotel/max1024x768/197/197749692.jpg" alt="Not Found"> */}
                </img>
            </div>
            <div className="recent-activity">
            <h1>
                What people have been saying
            </h1>
            <div className="all-reviews">
                <ReviewsIndex />
            </div>
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
