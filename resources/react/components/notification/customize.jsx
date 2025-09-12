import React, { useState, useCallback, useContext } from "react";
import ReactSwitch from "react-switch";
import { Page,Layout,LegacyCard,Text,TextField,RangeSlider,BlockStack,Thumbnail,RadioButton,
    Select,FormLayout,Card,Grid,InlineStack,Form,Sticky
} from "@shopify/polaris";
import {
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
} from "/public/images-icon";

import { XIcon } from "@shopify/polaris-icons";
import { ModalSettings } from "./modalsettings";
import { CuponDataContext } from "./CuponDataContext";

export function Customize() {
    const {
        title,setTitle,description,setDescription,file,setFile,
        image,setImage,subdescription,setSubDescription,
        altText,setAltText,couponCode,setCouponCode,
        buttonText,setButtonText,showModal,setShowModal,
        BackgroundColor,setBackgroundColor,ButtonColor,
        setButtonColor,ButtonTextColor,setButtonTextColor,
        CloseButtonTextColor,setCloseButtonTextColor,
        borderRadius,setBorderRadius,selectedBackgroundImage,
        setSelectedBackgroundImage,boxShadowStyle,rangeValuePadding,
        setRangeValuePadding,rangeValueWidth,setRangeValueWidth,
        BorderColor,setBorderColor,TitleColor,setTitleColor,
        DecriptionColor,setDecriptionColor,checkedNewTab,
        setCheckedNewTab,checkedClose,setCheckedClose,
        checkedBrand,setCheckedBranding,triggerType,
        setTriggerType,triggerDirection,setTriggerDirection,
        value,setValue,checkedAllpage,setCheckedAllpage,
        displaytriggerType,setDisplayTriggerType,
        fullUrl,setFullUrl,cssSelector,setCssSelector,
        displayFrequency,setDisplayFrequency,
        schedule,setSchedule,startDate,setStartDate,
        endDate,setEndDate,selectedpage,setSelectedpage,
        checkedshedow, setCheckedshedow,
        selectedhover, setSelectedhover,
        selectedentrance, setselectedentrance,
        selectedexit, setselectedexit,
        selectedanimation, setselectedanimation,
        weight, setWeight,displayRadio, setDisplayRadio,
        titleFontSize,setTitleFontSize,decriptionFontSize,
        setDecriptionFontSize,couponColor,setCouponColor,
        couponBgColor,setCouponBgColor,couponBorderColor,
        setCouponBorderColor,couponBorderSize,
        setCouponBorderSize,couponBorderStyle,
        setCouponBorderStyle,verticalLine,
        setVerticalLine,copyButtonColor,setCopyButtonColor,
        copyButtonbgColor,setCopyButtonbgColor
    } = useContext(CuponDataContext);

    const handleThumbnailClick = (image) => {
        setSelectedBackgroundImage(image.id);
    };

    const handleSelectChangeHover = useCallback((value) => setSelectedhover(value), []);
    const handleSelectChangeEdentrance = useCallback((value) => setselectedentrance(value), []);
    const handleSelectChangeExit = useCallback((value) => setselectedexit(value), []);
    const handleSelectChangeAnimation = useCallback((value) => setselectedanimation(value), []);

    const handleRangeSliderChangeWidth = useCallback(
        (value) => setRangeValueWidth(value),
        [],
    );
    console.log(rangeValueWidth, "hhhhhhhh");

    const handleRangeSliderChangePadding = useCallback(
        (value) => setRangeValuePadding(value),
        [],
    );

    const handleDisplayRadioChange = (value) => {
        setDisplayRadio(value);
        console.log("value", value);
        if (value === "Rounded") {
            console.log("call roubng");
            setBorderRadius("10px"); 
        } else if (value === "Highly rounded") {
            setBorderRadius("20px"); 
        } else {
            setBorderRadius("0px"); 
        }
    };
    const handleChange = (value) => {
        setCheckedshedow(value);
    };
    const handleWeightChange = useCallback((value) => setWeight(value), []);
    const images = [
        { src: null, alt: "Image 0", id: "image-0" },
    { src: image1, alt: "Image 1", id: "image-1" },
    { src: image2, alt: "Image 2", id: "image-2" },
    { src: image3, alt: "Image 3", id: "image-3" },
    { src: image4, alt: "Image 4", id: "image-4" },
    { src: image5, alt: "Image 5", id: "image-5" },
    { src: image6, alt: "Image 6", id: "image-6" },
    { src: image7, alt: "Image 7", id: "image-7" },
    { src: image8, alt: "Image 8", id: "image-8" },
    { src: image9, alt: "Image 9", id: "image-9" },
    { src: image3, alt: "Image 10", id: "image-10" },
    ].map((image, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <input
                type="radio"
                name="backgroundImage"
                id={`image${index + 1}`}
                value={image.id}
                checked={selectedBackgroundImage === image.id}
                onChange={() => handleThumbnailClick(image)}
            />
            <label
                htmlFor={`image${index + 1}`}
                style={{ border: "1px solid #e5e5e5" }}
            >
                <Thumbnail source={image.src} alt={image.alt} />
            </label>
        </div>
    ));

    const groupedImages = [
        images.slice(0, 4),
        images.slice(4, 8),
        images.slice(8, 10),
    ];

    const displayRadiusOptions = [
        { label: "Straight", value: "Straight" },
        { label: "Rounded", value: "Rounded" },
        { label: "Highly rounded", value: "Highly rounded" },
    ];

    const displaycouponborderstyOptions = [
        { label: "dotted", value: "dotted" },
        { label: "dashed", value: "dashed" },
        { label: "solid", value: "solid" },
        { label: "double", value: "double" },
        { label: "groove", value: "groove" },
        { label: "ridge", value: "ridge" },
        { label: "inset", value: "inset" },
        { label: "outset", value: "outset" },
        { label: "none", value: "none" },
    ];

    const optionsHover = [
        { label: "None", value: "None" },
        { label: "Fast scale up", value: "1.1" },
        { label: "Slow scale up", value: "1.05" },
        { label: "Fast scale down", value: "0.9" },
        { label: "Slow scale down", value: "0.95" },
    ];
    const optionsEntrance = [
        { label: "Fade In", value: "Fade In" },
        { label: "Slide In Up", value: "Slide In Up" },
        { label: "Slide In Down", value: "Slide In Down" },
        { label: "Zoom In", value: "Zoom In" },
        { label: "Bounce In", value: "Bounce In" },
    ];
    const optionsExit = [
        { label: "Fade Out", value: "Fade Out" },
        { label: "Slide Out Up", value: "Slide Out Up" },
        { label: "Slide Out Down", value: "Slide Out Down" },
        { label: "Zoom Out", value: "Zoom Out" },
        { label: "Bounce Out", value: "Bounce Out" },
    ];
    const optionsAnimation = [
        { label: "None", value: "None" },
        { label: "Heartbeat", value: "Heartbeat" },
        { label: "Bounce", value: "Bounce" },
        { label: "Flash", value: "Flash" },
        { label: "Pulse", value: "Pulse" },
    ];

    return (
        <Page>
            <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <Card>
                        <FormLayout>
                            <Text variant="headingLg" as="h5">
                                Display
                            </Text>

                            <FormLayout.Group condensed>
                                <TextField
                                    label="Title color"
                                    autoComplete="off"
                                    type="color"
                                    onChange={(value) => setTitleColor(value)}
                                    value={TitleColor}
                                />
                                <TextField
                                    label="Title font size"
                                    type="number"
                                    value={titleFontSize}
                                    onChange={(value) => setTitleFontSize(value)}
                                    suffix="px"
                                    autoComplete="off"
                                />
                            </FormLayout.Group>

                            <FormLayout.Group condensed>
                                <TextField
                                    label="Description color"
                                    autoComplete="off"
                                    type="color"
                                    onChange={(value) => setDecriptionColor(value)}
                                    value={DecriptionColor}
                                />
                                <TextField
                                    label="Description font size"
                                    type="number"
                                    value={decriptionFontSize}
                                    onChange={(value) => setDecriptionFontSize(value)}
                                    suffix="px"
                                    autoComplete="off"
                                />
                            </FormLayout.Group>

                            <TextField
                                label="Backgound color"
                                autoInlineStackComplete="off"
                                type="color"
                                onChange={(value) => setBackgroundColor(value)}
                                value={BackgroundColor}
                            />


                            <div>
                                <Text as="h6">Background pattern</Text>
                                <InlineStack
                                    blockAlign="stretch"
                                >
                                    {groupedImages.map((group, index) => (
                                        <BlockStack key={index}>
                                            <InlineStack blockAlign="stretch">
                                                {group}
                                            </InlineStack>
                                        </BlockStack>
                                    ))}
                                </InlineStack>
                            </div>

                            <TextField
                                label="Vertical line color"
                                autoInlineStackComplete="off"
                                type="color"
                                onChange={(value) => setVerticalLine(value)}
                                value={verticalLine}
                            />


                            <FormLayout.Group condensed>
                                <TextField
                                    type="color"
                                    label="Coupon color"
                                    autoInlineStackComplete="off"
                                    value={couponColor}
                                    onChange={(value) => setCouponColor(value)}
                                />

                                <TextField
                                    type="color"
                                    label="Copy button backgound color"
                                    autoInlineStackComplete="off"
                                    value={couponBgColor}
                                    onChange={(value) => setCouponBgColor(value)}
                                />
                            </FormLayout.Group>

                            <FormLayout.Group condensed>
                                <TextField
                                    type="color"
                                    label="Coupon border color"
                                    autoInlineStackComplete="off"
                                    value={couponBorderColor}
                                    onChange={(value) => setCouponBorderColor(value)}
                                />
                                <TextField
                                    label="Coupon border size"
                                    type="number"
                                    value={couponBorderSize}
                                    onChange={(value) => setCouponBorderSize(value)}
                                    suffix="px"
                                    autoComplete="off"
                                />
                            </FormLayout.Group>

                            <Select
                                label="Coupon border style"
                                options={displaycouponborderstyOptions}
                                onChange={(value) => setCouponBorderStyle(value)}
                                value={couponBorderStyle}
                            />

                            <FormLayout.Group condensed>
                                <TextField
                                    label="copy button backgound color"
                                    autoInlineStackComplete="off"
                                    type="color"
                                    onChange={(value) => setCopyButtonbgColor(value)}
                                    value={copyButtonbgColor}
                                />

                                <TextField
                                    label="Copy button text color"
                                    autoInlineStackComplete="off"
                                    type="color"
                                    onChange={(value) => setCopyButtonColor(value)}
                                    value={copyButtonColor}
                                />
                            </FormLayout.Group>

                            <FormLayout.Group condensed>
                                <TextField
                                    label="Button background color"
                                    autoComplete="off"
                                    type="color"
                                    onChange={(value) => setButtonColor(value)}
                                    value={ButtonColor}
                                />
                                <TextField
                                    label="Button text color"
                                    autoComplete="off"
                                    type="color"
                                    onChange={(value) => setButtonTextColor(value)}
                                    value={ButtonTextColor}
                                />
                            </FormLayout.Group>

                            <TextField
                                label="Close button color"
                                autoComplete="off"
                                type="color"
                                onChange={(value) =>
                                    setCloseButtonTextColor(value)
                                }
                                value={CloseButtonTextColor}
                            />

                            <RangeSlider
                                label="Internal padding"
                                min={0}
                                max={25}
                                value={rangeValuePadding}
                                onChange={handleRangeSliderChangePadding}
                                output
                            />

                            <div
                                className="app-main"
                            >
                                <ReactSwitch
                                    className="react-switch"
                                    checked={checkedshedow}
                                    onChange={handleChange}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    onColor="#303030"
                                    offColor="#CCCCCC"
                                />
                                <div className="app">
                                    <Text
                                        variant="headingSm"
                                        as="h6"
                                        className="trigger-label"
                                    >
                                        Display shadow
                                    </Text>
                                    <p>
                                        Enable/disable the shadow around the edges
                                    </p>
                                </div>
                            </div>

                            <RangeSlider
                                label="Border width"
                                min={0}
                                max={5}
                                value={rangeValueWidth}
                                onChange={handleRangeSliderChangeWidth}
                                output
                            />
                            <TextField
                                label="Border color"
                                autoComplete="off"
                                type="color"
                                onChange={(value) => setBorderColor(value)}
                                value={BorderColor}
                            />

                            <div>
                                <Text
                                    variant="headingSm"
                                    as="h6"
                                    className="trigger-label"
                                >
                                    Border radius
                                </Text>
                                <div style={{ display: "flex" }}>
                                    {displayRadiusOptions.map((option) => (
                                        <React.Fragment key={option.value}>
                                            <RadioButton
                                                label={option.label}
                                                checked={displayRadio === option.value}
                                                onChange={() =>
                                                    handleDisplayRadioChange(
                                                        option.value,
                                                    )
                                                }
                                            />
                                            <div style={{ marginRight: "1rem" }} />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            <Select
                                label="Hover animation"
                                options={optionsHover}
                                onChange={handleSelectChangeHover}
                                value={selectedhover}
                            />


                            <FormLayout>
                                <FormLayout.Group condensed>
                                    <Select
                                        label="Entrance animation"
                                        options={optionsEntrance}
                                        onChange={handleSelectChangeEdentrance}
                                        value={selectedentrance}
                                    />
                                    <Select
                                        label="Exit Animation"
                                        options={optionsExit}
                                        onChange={handleSelectChangeExit}
                                        value={selectedexit}
                                    />
                                </FormLayout.Group>
                            </FormLayout>

                            <Select
                                label="Animation"
                                options={optionsAnimation}
                                onChange={handleSelectChangeAnimation}
                                value={selectedanimation}
                            />

                            <TextField
                                label="Animation interval"
                                type="number"
                                value={weight}
                                onChange={handleWeightChange}
                                autoComplete="off"
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
                                    borderRadius: borderRadius,
                                }}
                            >
                                <div
                                    style={{
                                        marginBottom: "10px"
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
        </Page >
    );
}
