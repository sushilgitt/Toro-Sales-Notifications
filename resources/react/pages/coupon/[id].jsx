import React, { useContext, useEffect, useState, useCallback, createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Page, Button, Tabs } from "@shopify/polaris";
import { MainSetting } from "../../components/notification/mainsetting";
import { Triggers } from "../../components/notification/trigger";
import { Display } from "../../components/notification/display";
import { Customize } from "../../components/notification/customize";
import { useCouponData } from "../../hooks/useCouponData";
import { CuponDataContext } from "../../components/notification/CuponDataContext";
import { useAppBridge } from "@shopify/app-bridge-react";
import { SaveBar } from "@shopify/app-bridge-react";

export default function Edit() {
    const [selected, setSelected] = useState(0);
    const [isDirty, setIsDirty] = useState(false);
    const [initialData, setInitialData] = useState(null);
    const couponData = useCouponData();
    const shopify = useAppBridge();
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        title, setTitle, description, setDescription, file, setFile, image, setImage,
        subdescription, setSubDescription, altText, setAltText, couponCode, setCouponCode,
        buttonText, setButtonText, showModal, setShowModal, BackgroundColor, setBackgroundColor,
        ButtonColor, setButtonColor, ButtonTextColor, setButtonTextColor,
        CloseButtonTextColor, setCloseButtonTextColor, borderRadius, setBorderRadius,
        selectedBackgroundImage, setSelectedBackgroundImage, checked, setChecked,
        rangeValuePadding, setRangeValuePadding, rangeValueWidth, setRangeValueWidth,
        BorderColor, setBorderColor, TitleColor, setTitleColor, DecriptionColor, setDecriptionColor,
        checkedNewTab, setCheckedNewTab, ButtonURL, setButtonURL, checkedClose, setCheckedClose,
        checkedBrand, setCheckedBranding, triggerType, setTriggerType, triggerDirection, setTriggerDirection,
        value, setValue, checkedAllpage, setCheckedAllpage, displaytriggerType, setDisplayTriggerType,
        fullUrl, setFullUrl, cssSelector, setCssSelector, displayFrequency, setDisplayFrequency,
        schedule, setSchedule, startDate, setStartDate, endDate, setEndDate, selectedpage, setSelectedpage,
        checkedshedow, setCheckedshedow, selectedhover, setSelectedhover, selectedentrance, setselectedentrance,
        selectedexit, setselectedexit, selectedanimation, setselectedanimation, weight, setWeight,
        displayRadio, setDisplayRadio, titleFontSize, setTitleFontSize, decriptionFontSize, setDecriptionFontSize,
        couponColor, setCouponColor, couponBgColor, setCouponBgColor, couponBorderColor, setCouponBorderColor,
        couponBorderSize, setCouponBorderSize, couponBorderStyle, setCouponBorderStyle,
        verticalLine, setVerticalLine, copyButtonColor, setCopyButtonColor, copyButtonbgColor, setCopyButtonbgColor
    } = couponData;

    const boxShadowStyle = checked ? "0 6px 6px hsla(0, 0%, 0%, 0.3)" : "none";

    const handleTabChange = useCallback((selectedTabIndex) => setSelected(selectedTabIndex), []);

    useEffect(() => {
        fetch(`/api/settings/${id}`)
            .then((response) => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then((data) => {
                setInitialData(data);
                setTitle(data.mainSetting.title || "");
                setDescription(data.mainSetting.description || "");
                setFile(data.mainSetting.file || "");
                setImage(data.mainSetting.image || "");
                setSubDescription(data.mainSetting.subdescription || "");
                setAltText(data.mainSetting.altText || "");
                setCouponCode(data.mainSetting.couponCode || "");
                setButtonText(data.mainSetting.buttonText || "");
                setShowModal(data.showModal || "");
                setBackgroundColor(data.customize.BackgroundColor || "");
                setButtonColor(data.customize.ButtonColor || "");
                setButtonTextColor(data.customize.ButtonTextColor || "");
                setCloseButtonTextColor(data.customize.CloseButtonTextColor || "");
                setBorderRadius(data.customize.borderRadius || "");
                setSelectedBackgroundImage(data.customize.selectedBackgroundImage || "");
                setCheckedNewTab(data.mainSetting.checkedNewTab || "");
                setButtonURL(data.mainSetting.ButtonURL || "");
                setCheckedClose(data.display.checkedClose || "");
                setCheckedBranding(data.display.checkedBrand || "");
                setTriggerType(data.display.triggerType || "");
                setTriggerDirection(data.display.triggerDirection || "");
                setValue(data.display.value || "");
                setCheckedAllpage(data.triggers.checkedAllpage || "");
                setDisplayTriggerType(data.triggers.displaytriggerType || "");
                setFullUrl(data.triggers.fullUrl || "");
                setCssSelector(data.triggers.cssSelector || "");
                setDisplayFrequency(data.triggers.displayFrequency || "");
                setSchedule(data.triggers.schedule || "");
                setStartDate(data.triggers.startDate || "");
                setEndDate(data.triggers.endDate || "");
                setSelectedpage(data.triggers.selectedpage || "");
                setTitleColor(data.customize.TitleColor || "");
                setDecriptionColor(data.customize.DecriptionColor || "");
                setRangeValuePadding(data.customize.rangeValuePadding || "");
                setRangeValueWidth(data.customize.rangeValueWidth || "");
                setBorderColor(data.customize.BorderColor || "");
                setCheckedshedow(data.customize.checkedshedow || "");
                setSelectedhover(data.customize.selectedhover || "");
                setselectedentrance(data.customize.selectedentrance || "");
                setselectedexit(data.customize.selectedexit || "");
                setselectedanimation(data.customize.selectedanimation || "");
                setWeight(data.customize.weight || "");
                setDisplayRadio(data.customize.displayRadio || "");
                setTitleFontSize(data.customize.TitleFontSize || "");
                setDecriptionFontSize(data.customize.DecriptionFontSize || "");
                setCouponColor(data.customize.CouponColor || "");
                setCouponBgColor(data.customize.CouponBgColor || "");
                setCouponBorderColor(data.customize.CouponBorderColor || "");
                setCouponBorderSize(data.customize.CouponBorderSize || "");
                setCouponBorderStyle(data.customize.CouponBorderStyle || "");
                setVerticalLine(data.customize.verticalLine || "");
                setCopyButtonColor(data.customize.copyButtonColor || "");
                setCopyButtonbgColor(data.customize.copyButtonbgColor || "");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [id]);

    useEffect(() => {
        if (!initialData) return;
        const currentData = {
            title, description, file, image, subdescription, altText, couponCode, buttonText,
            showModal, BackgroundColor, ButtonColor, ButtonTextColor, CloseButtonTextColor,
            borderRadius, selectedBackgroundImage, checkedNewTab, ButtonURL, checkedClose,
            checkedBrand, triggerType, triggerDirection, value, checkedAllpage, displaytriggerType,
            fullUrl, cssSelector, displayFrequency, schedule, startDate, endDate, selectedpage,
            TitleColor, DecriptionColor, rangeValuePadding, rangeValueWidth, BorderColor,
            checkedshedow, selectedhover, selectedentrance, selectedexit, selectedanimation,
            weight, displayRadio, titleFontSize, decriptionFontSize, couponColor, couponBgColor,
            couponBorderColor, couponBorderSize, couponBorderStyle, verticalLine,
            copyButtonColor, copyButtonbgColor
        };

        const hasChanges = Object.keys(currentData).some(key => 
            currentData[key] !== (initialData.mainSetting?.[key] || 
                                  initialData.customize?.[key] || 
                                  initialData.display?.[key] || 
                                  initialData.triggers?.[key] || 
                                  initialData[key] || "")
        );
        setIsDirty(hasChanges);
        if (hasChanges) {
            shopify.saveBar.show('my-save-bar');
        } else {
            shopify.saveBar.hide('my-save-bar');
        }
    }, [initialData, title, description, file, image, subdescription, altText, couponCode, buttonText,
        showModal, BackgroundColor, ButtonColor, ButtonTextColor, CloseButtonTextColor,
        borderRadius, selectedBackgroundImage, checkedNewTab, ButtonURL, checkedClose,
        checkedBrand, triggerType, triggerDirection, value, checkedAllpage, displaytriggerType,
        fullUrl, cssSelector, displayFrequency, schedule, startDate, endDate, selectedpage,
        TitleColor, DecriptionColor, rangeValuePadding, rangeValueWidth, BorderColor,
        checkedshedow, selectedhover, selectedentrance, selectedexit, selectedanimation,
        weight, displayRadio, titleFontSize, decriptionFontSize, couponColor, couponBgColor,
        couponBorderColor, couponBorderSize, couponBorderStyle, verticalLine,
        copyButtonColor, copyButtonbgColor]);

    const tabs = [
        { id: "main-settings-1", content: "Main Settings", render: () => <MainSetting /> },
        { id: "triggers-1", content: "Triggers", panelID: "accepts-marketing-content-1", render: () => <Triggers /> },
        { id: "display-1", content: "Display", panelID: "repeat-customers-content-1", render: () => <Display /> },
        { id: "customize-1", content: "Customize", panelID: "prospects-content-1", render: () => <Customize /> },
    ];

    const handleSubmit = () => {
        const data_update_setting = {
            title, description, file, subdescription, altText, couponCode, buttonText,
            showModal, BackgroundColor, ButtonColor, ButtonTextColor, CloseButtonTextColor,
            borderRadius, selectedBackgroundImage, checkedNewTab, ButtonURL, checkedClose,
            checkedBrand, triggerType, triggerDirection, value, checkedAllpage, displaytriggerType,
            fullUrl, cssSelector, displayFrequency, schedule, startDate, endDate, selectedpage,
            TitleColor, DecriptionColor, rangeValuePadding, rangeValueWidth, BorderColor,
            checkedshedow, selectedhover, selectedentrance, selectedexit, selectedanimation,
            weight, displayRadio, titleFontSize, decriptionFontSize, couponColor, couponBgColor,
            couponBorderColor, couponBorderSize, couponBorderStyle, verticalLine,
            copyButtonColor, copyButtonbgColor,
        };

        const formData = new FormData();
        Object.keys(data_update_setting).forEach(key => {
            formData.append(key, data_update_setting[key]);
        });

        fetch(`/api/update/${id}`, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    for (const [field, messages] of Object.entries(data.errors)) {
                        messages.forEach((message) => {
                            shopify.toast.show(message, { duration: 4000 });
                        });
                    }
                } else {
                    shopify.toast.show('Notification updated', { duration: 2000, onDismiss: () => navigate("/coupon") });
                    setInitialData(data_update_setting);
                    setIsDirty(false);
                    shopify.saveBar.hide('my-save-bar');
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleDiscard = () => {
        if (!initialData) return;
        setTitle(initialData.mainSetting.title || "");
        setDescription(initialData.mainSetting.description || "");
        setFile(initialData.mainSetting.file || "");
        setImage(initialData.mainSetting.image || "");
        setSubDescription(initialData.mainSetting.subdescription || "");
        setAltText(initialData.mainSetting.altText || "");
        setCouponCode(initialData.mainSetting.couponCode || "");
        setButtonText(initialData.mainSetting.buttonText || "");
        setShowModal(initialData.showModal || "");
        setBackgroundColor(initialData.customize.BackgroundColor || "");
        setButtonColor(initialData.customize.ButtonColor || "");
        setButtonTextColor(initialData.customize.ButtonTextColor || "");
        setCloseButtonTextColor(initialData.customize.CloseButtonTextColor || "");
        setBorderRadius(initialData.customize.borderRadius || "");
        setSelectedBackgroundImage(initialData.customize.selectedBackgroundImage || "");
        setCheckedNewTab(initialData.mainSetting.checkedNewTab || "");
        setButtonURL(initialData.mainSetting.ButtonURL || "");
        setCheckedClose(initialData.display.checkedClose || "");
        setCheckedBranding(initialData.display.checkedBrand || "");
        setTriggerType(initialData.display.triggerType || "");
        setTriggerDirection(initialData.display.triggerDirection || "");
        setValue(initialData.display.value || "");
        setCheckedAllpage(initialData.triggers.checkedAllpage || "");
        setDisplayTriggerType(initialData.triggers.displaytriggerType || "");
        setFullUrl(initialData.triggers.fullUrl || "");
        setCssSelector(initialData.triggers.cssSelector || "");
        setDisplayFrequency(initialData.triggers.displayFrequency || "");
        setSchedule(initialData.triggers.schedule || "");
        setStartDate(initialData.triggers.startDate || "");
        setEndDate(initialData.triggers.endDate || "");
        setSelectedpage(initialData.triggers.selectedpage || "");
        setTitleColor(initialData.customize.TitleColor || "");
        setDecriptionColor(initialData.customize.DecriptionColor || "");
        setRangeValuePadding(initialData.customize.rangeValuePadding || "");
        setRangeValueWidth(initialData.customize.rangeValueWidth || "");
        setBorderColor(initialData.customize.BorderColor || "");
        setCheckedshedow(initialData.customize.checkedshedow || "");
        setSelectedhover(initialData.customize.selectedhover || "");
        setselectedentrance(initialData.customize.selectedentrance || "");
        setselectedexit(initialData.customize.selectedexit || "");
        setselectedanimation(initialData.customize.selectedanimation || "");
        setWeight(initialData.customize.weight || "");
        setDisplayRadio(initialData.customize.displayRadio || "");
        setTitleFontSize(initialData.customize.TitleFontSize || "");
        setDecriptionFontSize(initialData.customize.DecriptionFontSize || "");
        setCouponColor(initialData.customize.CouponColor || "");
        setCouponColor(initialData.customize.CouponColor || "");
        setCouponBgColor(initialData.customize.CouponBgColor || "");
        setCouponBorderColor(initialData.customize.CouponBorderColor || "");
        setCouponBorderSize(initialData.customize.CouponBorderSize || "");
        setCouponBorderStyle(initialData.customize.CouponBorderStyle || "");
        setVerticalLine(initialData.customize.verticalLine || "");
        setCopyButtonColor(initialData.customize.copyButtonColor || "");
        setCopyButtonbgColor(initialData.customize.copyButtonbgColor || "");
        setIsDirty(false);
        shopify.saveBar.hide('my-save-bar');
    };

    return (
        <Page
            backAction={{ content: 'Products', url: '/coupon' }}
            title="Edit Notifications"
            // primaryAction={<Button variant="primary" onClick={handleSubmit}>Save</Button>}
        >
            <CuponDataContext.Provider value={couponData}>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    {tabs[selected].render && tabs[selected].render()}
                </Tabs>
            </CuponDataContext.Provider>
            {isDirty && (
                <SaveBar id="my-save-bar">
                    <button variant="primary" onClick={handleSubmit}>Save</button>
                    <button onClick={handleDiscard}>Discard</button>
                </SaveBar>
            )}
        </Page>
    );
}