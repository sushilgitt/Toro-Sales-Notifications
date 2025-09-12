import React, { useState, useCallback, createContext, useContext, useEffect } from "react";
import { Page, Button, Tabs } from "@shopify/polaris";
import { CuponDataContext } from "../components/notification/CuponDataContext";
import { useNavigate } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import {SaveBar} from '@shopify/app-bridge-react';
import { useParams } from "react-router-dom";
import { MainSetting } from "../components/notification/mainsetting";
import { Triggers } from "../components/notification/trigger";
import { Display } from "../components/notification/display";
import { Customize } from "../components/notification/customize";
import { useCouponData } from "../hooks/useCouponData";
export const UserContext = createContext();

export default function CreateNotification() {
    const [selected, setSelected] = useState(0);
    const couponData = useCouponData();
    const shopify = useAppBridge();
 
    const {
        title, setTitle, description,setDescription, file,setFile, image, setImage,subdescription,
        setSubDescription, altText, setAltText, couponCode, setCouponCode, buttonText,
        setButtonText, showModal, setShowModal,BackgroundColor,setBackgroundColor,ButtonColor,
        setButtonColor,ButtonTextColor, setButtonTextColor, CloseButtonTextColor, setCloseButtonTextColor,
        borderRadius, setBorderRadius, selectedBackgroundImage,setSelectedBackgroundImage, checked,
        setChecked,rangeValuePadding,setRangeValuePadding,rangeValueWidth,setRangeValueWidth,
        BorderColor,setBorderColor,TitleColor,setTitleColor, DecriptionColor,setDecriptionColor,
        checkedNewTab, setCheckedNewTab,ButtonURL,setButtonURL,checkedClose,setCheckedClose,checkedBrand,
        setCheckedBranding, triggerType, setTriggerType, triggerDirection, setTriggerDirection,
        value,setValue, checkedAllpage,setCheckedAllpage,displaytriggerType,setDisplayTriggerType,
        fullUrl,setFullUrl,cssSelector,setCssSelector,displayFrequency,setDisplayFrequency,
        schedule,setSchedule,startDate, setStartDate,endDate,setEndDate,selectedpage,setSelectedpage,
        checkedshedow,setCheckedshedow, selectedhover,setSelectedhover,selectedentrance,setselectedentrance,
        selectedexit,setselectedexit,selectedanimation,setselectedanimation,weight,setWeight,displayRadio,
        setDisplayRadio, titleFontSize, setTitleFontSize,decriptionFontSize, setDecriptionFontSize,
        couponColor,setCouponColor,couponBgColor,setCouponBgColor, couponBorderColor, setCouponBorderColor,
        couponBorderSize,setCouponBorderSize, couponBorderStyle,setCouponBorderStyle,
        verticalLine,setVerticalLine,copyButtonColor, setCopyButtonColor, copyButtonbgColor,setCopyButtonbgColor
    } = couponData;

     const [previousCouponData, setPreviousCouponData] = useState({
        title, description,file,image,subdescription,altText,couponCode,
        buttonText,showModal, BackgroundColor,ButtonColor,ButtonTextColor,CloseButtonTextColor,
        borderRadius,selectedBackgroundImage,checked,rangeValuePadding,rangeValueWidth,
        BorderColor,TitleColor,DecriptionColor,checkedNewTab,ButtonURL,checkedClose,
        checkedBrand,triggerType,triggerDirection,value,checkedAllpage,fullUrl,
        cssSelector,displaytriggerType, displayFrequency,schedule,startDate, endDate,
        selectedpage,checkedshedow,selectedhover,selectedentrance,selectedexit, selectedanimation,
        weight,displayRadio, titleFontSize,decriptionFontSize,couponColor,couponBgColor,
        couponBorderColor, couponBorderSize, couponBorderStyle, verticalLine,copyButtonColor,copyButtonbgColor
    });

    const boxShadowStyle = checked ? "0 6px 6px hsla(0, 0%, 0%, 0.3)" : "none";

    const navigate = useNavigate();
    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    useEffect(() => {
        const allFields = {
            title, description, couponCode, buttonText,
            BackgroundColor, ButtonColor, ButtonTextColor,
            CloseButtonTextColor, BorderColor, TitleColor,
            DecriptionColor, ButtonURL, triggerType,
            triggerDirection, displaytriggerType, displayFrequency,
            file, image, subdescription, altText, showModal,
            borderRadius, selectedBackgroundImage, checked,
            rangeValuePadding, rangeValueWidth, checkedNewTab,
            checkedClose, checkedBrand, value, checkedAllpage,
            fullUrl, cssSelector, schedule, startDate, endDate,
            selectedpage, checkedshedow, selectedhover,
            selectedentrance, selectedexit, selectedanimation,
            weight, displayRadio, titleFontSize, decriptionFontSize,
            couponColor, couponBgColor, couponBorderColor,
            couponBorderSize, couponBorderStyle, verticalLine,
            copyButtonColor, copyButtonbgColor
        };

        const anyFieldFilled = Object.values(allFields).some(
            value => value !== undefined && value !== null && value !== '' && value !== false
        );

        const currentData = {
            title, description, file, image, subdescription, altText, couponCode, buttonText,
            showModal, BackgroundColor, ButtonColor, ButtonTextColor, CloseButtonTextColor,
            borderRadius, selectedBackgroundImage, checked, rangeValuePadding, rangeValueWidth,
            BorderColor, TitleColor, DecriptionColor, checkedNewTab, ButtonURL, checkedClose,
            checkedBrand, triggerType, triggerDirection, value, checkedAllpage, fullUrl,
            cssSelector, displaytriggerType, displayFrequency, schedule, startDate, endDate,
            selectedpage, checkedshedow, selectedhover, selectedentrance, selectedexit,
            selectedanimation, weight, displayRadio, titleFontSize, decriptionFontSize,
            couponColor, couponBgColor, couponBorderColor, couponBorderSize, couponBorderStyle,
            verticalLine, copyButtonColor, copyButtonbgColor
        };

        const hasChanges = JSON.stringify(currentData) !== JSON.stringify(previousCouponData);

        if (anyFieldFilled || hasChanges) {
            shopify.saveBar.show('my-save-bar');
        } else {
            shopify.saveBar.hide('my-save-bar');
        }
    }, [
        title, description, file, image, subdescription, altText, couponCode, buttonText,
        showModal, BackgroundColor, ButtonColor, ButtonTextColor, CloseButtonTextColor,
        borderRadius, selectedBackgroundImage, checked, rangeValuePadding, rangeValueWidth,
        BorderColor, TitleColor, DecriptionColor, checkedNewTab, ButtonURL, checkedClose,
        checkedBrand, triggerType, triggerDirection, value, checkedAllpage, fullUrl,
        cssSelector, displaytriggerType, displayFrequency, schedule, startDate, endDate,
        selectedpage, checkedshedow, selectedhover, selectedentrance, selectedexit,
        selectedanimation, weight, displayRadio, titleFontSize, decriptionFontSize,
        couponColor, couponBgColor, couponBorderColor, couponBorderSize, couponBorderStyle,
        verticalLine, copyButtonColor, copyButtonbgColor
    ]);

    const tabs = [
        {
            id: "main-settings-1",
            content: "1. Main settings",
            render: () => <MainSetting />,
        },
        {
            id: "triggers-1",
            content: "2. Triggers",
            panelID: "accepts-marketing-content-1",
            render: () => <Triggers />,
        },
        {
            id: "display-1",
            content: "3. Display",
            panelID: "repeat-customers-content-1",
            render: () => <Display />,
        },
        {
            id: "customize-1",
            content: "4. Customize",
            panelID: "prospects-content-1",
            render: () => <Customize />,
        },
    ];

    const handleSave = () => {
        const data_setting = {
            title, description, file, subdescription, altText, couponCode,buttonText,
            checkedNewTab,ButtonURL, checkedClose, checkedBrand,triggerType,triggerDirection,
            value,checkedAllpage, fullUrl, cssSelector,displaytriggerType,displayFrequency,
            schedule,startDate, endDate,selectedpage, TitleColor,DecriptionColor, BackgroundColor,
            ButtonColor,ButtonTextColor,BorderColor,rangeValuePadding,borderRadius, rangeValueWidth,
            selectedBackgroundImage,CloseButtonTextColor,checkedshedow,selectedhover,selectedentrance,selectedexit,
            selectedanimation, weight, displayRadio,titleFontSize,decriptionFontSize,couponColor,couponBgColor,
            couponBorderColor,couponBorderSize, couponBorderStyle,verticalLine,copyButtonColor, copyButtonbgColor,
        };

        const formData = new FormData();
        Object.keys(data_setting).forEach(key => {
            formData.append(key, data_setting[key]);
        });

        const options_setting = {
            method: "POST",
            body: formData,
        };

        fetch("/api/settings", options_setting)
            .then((response) => {
                console.log(response, "response data -----------");
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setPreviousCouponData({ ...data_setting });
                shopify.saveBar.hide('my-save-bar');
                navigate("/coupon");
                shopify.toast.show("Notification saved successfully");
            })
            .catch((error) => {
                console.error("Error:", error.message);
                shopify.toast.show(error.message, { duration: 2000, onDismiss: () => console.log(error) })
            });
    };

    const handleSavee = () => {
        console.log('Saving');
        handleSave();
    };

    const handleDiscard = () => {
        setTitle(previousCouponData.title);
        setDescription(previousCouponData.description);
        setFile(previousCouponData.file);
        setImage(previousCouponData.image);
        setSubDescription(previousCouponData.subdescription);
        setAltText(previousCouponData.altText);
        setCouponCode(previousCouponData.couponCode);
        setButtonText(previousCouponData.buttonText);
        setShowModal(previousCouponData.showModal);
        setBackgroundColor(previousCouponData.BackgroundColor);
        setButtonColor(previousCouponData.ButtonColor);
        setButtonTextColor(previousCouponData.ButtonTextColor);
        setCloseButtonTextColor(previousCouponData.CloseButtonTextColor);
        setBorderRadius(previousCouponData.borderRadius);
        setSelectedBackgroundImage(previousCouponData.selectedBackgroundImage);
        setChecked(previousCouponData.checked);
        setRangeValuePadding(previousCouponData.rangeValuePadding);
        setRangeValueWidth(previousCouponData.rangeValueWidth);
        setBorderColor(previousCouponData.BorderColor);
        setTitleColor(previousCouponData.TitleColor);
        setDecriptionColor(previousCouponData.DecriptionColor);
        setCheckedNewTab(previousCouponData.checkedNewTab);
        setButtonURL(previousCouponData.ButtonURL);
        setCheckedClose(previousCouponData.checkedClose);
        setCheckedBranding(previousCouponData.checkedBrand);
        setTriggerType(previousCouponData.triggerType);
        setTriggerDirection(previousCouponData.triggerDirection);
        setValue(previousCouponData.value);
        setCheckedAllpage(previousCouponData.checkedAllpage);
        setDisplayTriggerType(previousCouponData.displaytriggerType);
        setFullUrl(previousCouponData.fullUrl);
        setCssSelector(previousCouponData.cssSelector);
        setDisplayFrequency(previousCouponData.displayFrequency);
        setSchedule(previousCouponData.schedule);
        setStartDate(previousCouponData.startDate);
        setEndDate(previousCouponData.endDate);
        setSelectedpage(previousCouponData.selectedpage);
        setCheckedshedow(previousCouponData.checkedshedow);
        setSelectedhover(previousCouponData.selectedhover);
        setselectedentrance(previousCouponData.selectedentrance);
        setselectedexit(previousCouponData.selectedexit);
        setselectedanimation(previousCouponData.selectedanimation);
        setWeight(previousCouponData.weight);
        setDisplayRadio(previousCouponData.displayRadio);
        setTitleFontSize(previousCouponData.titleFontSize);
        setDecriptionFontSize(previousCouponData.decriptionFontSize);
        setCouponColor(previousCouponData.couponColor);
        setCouponBgColor(previousCouponData.couponBgColor);
        setCouponBorderColor(previousCouponData.couponBorderColor);
        setCouponBorderSize(previousCouponData.couponBorderSize);
        setCouponBorderStyle(previousCouponData.couponBorderStyle);
        setVerticalLine(previousCouponData.verticalLine);
        setCopyButtonColor(previousCouponData.copyButtonColor);
        setCopyButtonbgColor(previousCouponData.copyButtonbgColor);
        shopify.saveBar.hide('my-save-bar');
    };

    return (
        <Page
            backAction={{ content: 'Products', url: '/coupon' }}
            title="Create notifications"
        >
            <CuponDataContext.Provider value={couponData}>
                <Tabs
                    tabs={tabs}
                    selected={selected}
                    onSelect={handleTabChange}
                >
                    {tabs[selected].render && tabs[selected].render()}
                </Tabs>
            </CuponDataContext.Provider>
            <SaveBar id="my-save-bar">
                <button variant="primary" onClick={handleSavee}>Save</button>
                <button onClick={handleDiscard}>Discard</button>
            </SaveBar>
        </Page>
    );
}