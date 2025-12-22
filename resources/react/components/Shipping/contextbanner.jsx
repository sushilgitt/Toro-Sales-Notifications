import React, { createContext, useContext, useState } from "react";

export const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
  const [shippingname, setShippingname] = useState("");
  const [shippingcontent, setShippingcontent] = useState("Free Shipping on all orders over");
  const [shippingamount, setShippingamount] = useState("50");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [showpageurl, setShowpageurl] = useState("");
  const [hidepageurl, setHidepageurl] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [bgcolor, setBgcolor] = useState("#eaebe7ff");
  const [txtcolor, setTxtcolor] = useState("#000000");
  const [alignment, setAlignment] = useState("center");
  const [fontsize, setFontsize] = useState("15");
  const [height, setHeight] = useState("60");
  const [bannerpos, setBannerpos] = useState("bottom");
  const [amountcolor, setAmountcolor] = useState("#000000");
  const [amountsize, setAmountsize] = useState("15");
  const [status, setStatus] = useState("Inactive");

  const [initialData, setInitialData] = useState(null);

  const bannerData = {
    shippingname,setShippingname,
    shippingcontent,setShippingcontent,
    shippingamount,setShippingamount,
    startdate,setStartdate,
    enddate,setEnddate,
    showpageurl,setShowpageurl,
    hidepageurl,setHidepageurl,
    selectedTags,setSelectedTags,
    bgcolor,setBgcolor,
    txtcolor,setTxtcolor,
    alignment,setAlignment,
    fontsize,setFontsize,
    height,setHeight,
    bannerpos,setBannerpos,
    amountcolor,setAmountcolor,
    amountsize,setAmountsize,
    initialData,setInitialData,
    status, setStatus,
  };

  return (
    <BannerContext.Provider value={bannerData}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBannerData = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBannerData must be used within a BannerProvider");
  }
  return context;
};