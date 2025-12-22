import { Route, Routes } from "react-router-dom";
import React from "react";
import IndexPage from "./pages";
import Coupon from "./pages/coupon";
import CreateNotification from "./pages/createNotification";
import BannerList from "./pages/bannerlist";
import Banner from "./components/Countdown/banner";
import Banneredit from "./components/Countdown/banneredit";
import Edit from "./pages/coupon/[id]";
import Shipping from "./pages/shipping.jsx";
import Shippingbanner from "./components/Shipping/shippingbanner";

const AppRoute = () => {
	    return (
		<Routes>
		    <Route path="/" element={<IndexPage/>} />
		    <Route path="/coupon" element={<Coupon/>} />
			<Route path="/createnotification" element={<CreateNotification/>} />
			<Route path="/bannerlist" element={<BannerList/>}/>
			<Route path="/banner" element={<Banner/>} />
			<Route path="/banneredit/:id" element={<Banneredit/>} />
			<Route path="/coupon/:id" element={<Edit/>}/>
			{/* <Route path="/shipping" element={<Shipping/>}/> */}
			<Route path="/shipping/create" element={<Shippingbanner/>}/>
			<Route path="/shipbanneredit/:id" element={<Shippingbanner />} />
		</Routes>
	    );
};

export default AppRoute;