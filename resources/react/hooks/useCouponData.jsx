import { useState } from "react";

export const useCouponData = () => {
    const [title, setTitle] = useState("Notification 1");
    const [description, setDescription] = useState("Summer sale discounts");
    const [file, setFile] = useState(
        "https://66socialproof.com/demo/themes/altum/assets/images/notifications/summer.jpg",
    );
    const [image, setImage] = useState(
        "https://66socialproof.com/demo/themes/altum/assets/images/notifications/summer.jpg",
    );
    const [subdescription, setSubDescription] = useState(
        "Use coupon to get the limited discount",
    );

    const [altText, setAltText] = useState("");
    const [couponCode, setCouponCode] = useState("SUMMER30");
    const [buttonText, setButtonText] = useState("READEM");
    const [showModal, setShowModal] = useState(false);
    const [BackgroundColor, setBackgroundColor] = useState("#FFFFFF");
    const [ButtonColor, setButtonColor] = useState("#2a70ff");
    const [ButtonTextColor, setButtonTextColor] = useState("#FFFFFF");
    const [CloseButtonTextColor, setCloseButtonTextColor] = useState("#2a70ff");
    const [borderRadius, setBorderRadius] = useState("0px");
    const [selectedBackgroundImage, setSelectedBackgroundImage] =
        useState(null);

    const [titleFontSize, setTitleFontSize] = useState("26");
    const [decriptionFontSize, setDecriptionFontSize] = useState("15");
    const [couponColor, setCouponColor] = useState("#000000");
    const [couponBgColor, setCouponBgColor] = useState("#FFFFFF");
    const [couponBorderColor, setCouponBorderColor] = useState("#000000");
    const [couponBorderSize, setCouponBorderSize] = useState("1");
    const [couponBorderStyle, setCouponBorderStyle] = useState("solid");
    const [verticalLine,setVerticalLine]=useState("#747272");
    const [copyButtonColor,setCopyButtonColor]=useState("#ffffff");
    const [copyButtonbgColor,setCopyButtonbgColor]=useState("#2a70ff");

    const [checked, setChecked] = useState(true);
    const [rangeValuePadding, setRangeValuePadding] = useState(0);
    const [rangeValueWidth, setRangeValueWidth] = useState(0);
    const [BorderColor, setBorderColor] = useState();
    const [TitleColor, setTitleColor] = useState("#000000");
    const [DecriptionColor, setDecriptionColor] = useState("#000000");
    const [checkedNewTab, setCheckedNewTab] = useState(true);
    const [ButtonURL, setButtonURL] = useState("");

    const [checkedClose, setCheckedClose] = useState(true);
    const [checkedBrand, setCheckedBranding] = useState(true);
    const [triggerType, setTriggerType] = useState("Middle Center");
    const [triggerDirection, setTriggerDirection] = useState("Left to right");
    const [value, setValue] = useState(1);

    const [checkedAllpage, setCheckedAllpage] = useState(true);
    const [displaytriggerType, setDisplayTriggerType] = useState("Delay");
    const [fullUrl, setFullUrl] = useState("");
    const [cssSelector, setCssSelector] = useState("");
    const [displayFrequency, setDisplayFrequency] = useState("Once per browser");
    const [schedule, setSchedule] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedpage, setSelectedpage] = useState("");

    const [checkedshedow, setCheckedshedow] = useState(true);
    const [selectedhover, setSelectedhover] = useState("None");
    const [selectedentrance, setselectedentrance] = useState("Fade In");
    const [selectedexit, setselectedexit] = useState("Fade Out");
    const [selectedanimation, setselectedanimation] = useState();
    const [weight, setWeight] = useState("1");
    const [displayRadio, setDisplayRadio] = useState("Straight");

    return {
        title,
        setTitle,
        description,
        setDescription,
        file,
        setFile,
        image,
        setImage,
        subdescription,
        setSubDescription,
        altText,
        setAltText,
        couponCode,
        setCouponCode,
        buttonText,
        setButtonText,
        showModal,
        setShowModal,
        BackgroundColor,
        setBackgroundColor,
        ButtonColor,
        setButtonColor,
        ButtonTextColor,
        setButtonTextColor,
        CloseButtonTextColor,
        setCloseButtonTextColor,
        borderRadius,
        setBorderRadius,
        selectedBackgroundImage,
        setSelectedBackgroundImage,
        checked,
        setChecked,
        rangeValuePadding,
        setRangeValuePadding,
        rangeValueWidth,
        setRangeValueWidth,
        BorderColor,
        setBorderColor,
        TitleColor,
        setTitleColor,
        DecriptionColor,
        setDecriptionColor,
        checkedNewTab,
        setCheckedNewTab,
        ButtonURL,
        setButtonURL,
        checkedClose,
        setCheckedClose,
        checkedBrand,
        setCheckedBranding,
        triggerType,
        setTriggerType,
        triggerDirection,
        setTriggerDirection,
        value,
        setValue,
        checkedAllpage,
        setCheckedAllpage,
        displaytriggerType,
        setDisplayTriggerType,
        fullUrl,
        setFullUrl,
        cssSelector,
        setCssSelector,
        displayFrequency,
        setDisplayFrequency,
        schedule,
        setSchedule,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        selectedpage,
        setSelectedpage,
        checkedshedow,
        setCheckedshedow,
        selectedhover,
        setSelectedhover,
        selectedentrance,
        setselectedentrance,
        selectedexit,
        setselectedexit,
        selectedanimation,
        setselectedanimation,
        weight,
        setWeight,
        displayRadio,
        setDisplayRadio,
        titleFontSize,
        setTitleFontSize,
        decriptionFontSize,
        setDecriptionFontSize,
        couponColor,
        setCouponColor,
        couponBgColor,
        setCouponBgColor,
        couponBorderColor,
        setCouponBorderColor,
        couponBorderSize,
        setCouponBorderSize,
        couponBorderStyle,
        setCouponBorderStyle,
        verticalLine,
        setVerticalLine,
        copyButtonColor,
        setCopyButtonColor,
        copyButtonbgColor,
        setCopyButtonbgColor
    };
};
