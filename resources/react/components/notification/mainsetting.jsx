import React, { useState, useContext } from "react";
import ReactSwitch from "react-switch";
import { Page,Card,TextField,DropZone,Layout,BlockStack,Text,Grid,
    Icon, FormLayout, Sticky,Divider, InlineStack,
    Box,
} from "@shopify/polaris";
import { XIcon } from "@shopify/polaris-icons";
import { CuponDataContext } from "./CuponDataContext";
import { ModalSettings } from "./modalsettings";

export function MainSetting() {
    const {
        title,setTitle,description,setDescription,
        file,setFile,image,setImage,
        subdescription,setSubDescription,
        altText,setAltText,couponCode,setCouponCode,
        buttonText,setButtonText,showModal,setShowModal,
        BackgroundColor,setBackgroundColor,
        ButtonColor,setButtonColor,
        ButtonTextColor,setButtonTextColor,
        CloseButtonTextColor,setCloseButtonTextColor,
        borderRadius,setBorderRadius,
        selectedBackgroundImage,setSelectedBackgroundImage,
        boxShadowStyle,
        rangeValuePadding,setRangeValuePadding,
        rangeValueWidth, setRangeValueWidth,
        BorderColor,setBorderColor,
        TitleColor,setTitleColor,
        DecriptionColor,setDecriptionColor,
        checkedNewTab,setCheckedNewTab,
        ButtonURL,setButtonURL,
        checkedClose,setCheckedClose,
        checkedBrand,setCheckedBranding,
        triggerType,setTriggerType,
        triggerDirection,setTriggerDirection,
        value,setValue,
        checkedAllpage,setCheckedAllpage,
        displaytriggerType,setDisplayTriggerType,
        fullUrl,setFullUrl,
        cssSelector,setCssSelector,
        displayFrequency,setDisplayFrequency,
        schedule,setSchedule,
        startDate,setStartDate,
        endDate,setEndDate,
        selectedpage, setSelectedpage,
        checkedshedow, setCheckedshedow,
        selectedhover, setSelectedhover,
        selectedentrance, setselectedentrance,
        selectedexit, setselectedexit,
        selectedanimation, setselectedanimation,
        weight, setWeight,
        displayRadio, setDisplayRadio,
        titleFontSize,setTitleFontSize,
        decriptionFontSize,setDecriptionFontSize,
        couponColor,setCouponColor,
        couponBgColor,setCouponBgColor,
        couponBorderColor,setCouponBorderColor,
        couponBorderSize,setCouponBorderSize,
        couponBorderStyle,setCouponBorderStyle,
        verticalLine,setVerticalLine,
        copyButtonColor,setCopyButtonColor,
        copyButtonbgColor,setCopyButtonbgColor
    } = useContext(CuponDataContext);

    function handleChange(e) {
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    }
    const handleChangeTab = (value) => {
        setCheckedNewTab(value);
    };

    return (
        <Page>
            <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <Card>
                        <FormLayout>
                            <Text variant="headingLg" as="h5">
                                Settings
                            </Text>

                            <TextField
                                label="Notification name"
                                autoComplete="off"
                                onChange={setTitle}
                                value={title}
                            />
                            <Divider />

                            {file ? (
                                <>
                                    
                                    <Text>Image</Text>
                                    <input
                                        type="file"
                                        onChange={handleChange}

                                    />
                                </>
                            ) : (
                                <DropZone.FileUpload />
                            )} 

                            <TextField
                                label="Title"
                                autoComplete="off"
                                onChange={setDescription}
                                value={description}
                            />

                            <TextField
                                label="Subtitle"
                                autoComplete="off"
                                onChange={(value) =>
                                    setSubDescription(value)
                                }
                                value={subdescription}
                            />


                        <InlineStack gap="200">
                            <TextField
                                label="Image ALT"
                                autoComplete="off"
                                onChange={setAltText}
                                value={altText}
                            />
                            <TextField
                                label="Coupon code"
                                autoComplete="off"
                                onChange={setCouponCode}
                                value={couponCode}
                            />
                        </InlineStack>

                            <TextField
                                label="Button URL"
                                autoComplete="off"
                                placeholder="https://example.com/"
                                onChange={setButtonURL}
                                value={ButtonURL}
                            />


                            <div className="app-main">
                                <InlineStack gap="300">

                                
                                <ReactSwitch
                                    className="react-switch"
                                    checked={checkedNewTab}
                                    onChange={handleChangeTab}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    onColor="#303030"
                                    offColor="#CCCCCC"
                                />
                                <div className="app">
                                    <Box paddingBlock="100">
                                    <Text variant="bodyMd" as="p">
                                        On click open on new tab
                                    </Text></Box>
                                </div>
                                </InlineStack>
                            </div>

                            <TextField
                                label="Button text"
                                autoComplete="off"
                                onChange={setButtonText}
                                value={buttonText}
                            />
                        </FormLayout>
                    </Card>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <Sticky>
                        <Card>
                            <BlockStack
                                vertical
                                style={{
                                    display: "block",
                                }}
                            >
                                <div
                                    style={{
                                        marginBottom: "10px",
                                    }}
                                >
                                    <Text variant="headingLg" as="h5">
                                        Preview
                                    </Text>

                                </div>
                                <div
                                    style={{
                                        direction: `${triggerDirection === 'Right to left' ? 'rtl' : 'ltr'}`,
                                        padding: `5px`,
                                        border: `${rangeValueWidth}px solid`,
                                        borderColor: `${BorderColor}`,
                                        boxShadow: `${checkedshedow === true || checkedshedow == "1" ? 'rgba(0, 0, 0, 0.3) 0px 6px 6px' : ''}`,
                                        borderRadius: borderRadius,
                                    }}
                                >
                                    <ModalSettings
                                        checkedClose={checkedClose}
                                        backgroundColorbox={BackgroundColor}
                                        backgroundImage={selectedBackgroundImage}
                                        padding={rangeValuePadding}
                                        border={rangeValueWidth}
                                        backgroundColor={BorderColor}
                                        direction={triggerDirection}
                                        file={file}
                                        image={image}
                                        description={description}
                                        altText={altText}
                                        subdescription={subdescription}
                                        couponCode={couponCode}
                                        buttonText={buttonText}
                                        showModal={showModal}
                                        setShowModal={setShowModal}
                                        TitleColor={TitleColor}
                                        DecriptionColor={DecriptionColor}
                                        BackgroundColor={BackgroundColor}
                                        ButtonColor={ButtonColor}
                                        CloseButtonTextColor={CloseButtonTextColor}
                                        ButtonTextColor={ButtonTextColor}
                                        titleFontSize={titleFontSize}
                                        decriptionFontSize={decriptionFontSize}
                                        couponColor={couponColor}
                                        couponBgColor={couponBgColor}
                                        couponBorderColor={couponBorderColor}
                                        couponBorderSize={couponBorderSize}
                                        couponBorderStyle={couponBorderStyle}
                                        verticalLine={verticalLine}
                                        copyButtonColor={copyButtonColor}
                                        copyButtonbgColor={copyButtonbgColor}
                                    />
                                </div>
                            </BlockStack>
                        </Card>
                    </Sticky>
                </Grid.Cell>
            </Grid>
        </Page>
    );
}
