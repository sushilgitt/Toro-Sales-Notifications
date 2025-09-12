import React, { useState, useCallback, useContext } from "react";
import ReactSwitch from "react-switch";
import {
    Page,
    Layout,
    LegacyCard,
    Text,
    Select,
    RadioButton,
    Box,
    TextField,
    Card,
    BlockStack,
    Grid,
    Icon,
    FormLayout,
    InlineGrid,
    Sticky
} from "@shopify/polaris";
import { XIcon } from "@shopify/polaris-icons";
import { ModalSettings } from "./modalsettings";
import { CuponDataContext } from "./CuponDataContext";

export function Display() {
    const {
        title,setTitle,image,setImage,
        description,setDescription,file,setFile,
        subdescription,setSubDescription,
        altText,setAltText,couponCode,setCouponCode,
        buttonText,setButtonText,showModal,setShowModal,
        BackgroundColor,setBackgroundColor,
        ButtonColor,setButtonColor,ButtonTextColor,setButtonTextColor,
        CloseButtonTextColor,setCloseButtonTextColor,
        borderRadius,setBorderRadius,
        selectedBackgroundImage,setSelectedBackgroundImage,
        boxShadowStyle,rangeValuePadding,
        setRangeValuePadding,rangeValueWidth,setRangeValueWidth,
        BorderColor,setBorderColor,
        TitleColor,setTitleColor,
        DecriptionColor,setDecriptionColor,
        checkedNewTab,setCheckedNewTab,
        checkedClose, setCheckedClose,
        checkedBrand, setCheckedBranding,
        triggerType, setTriggerType,
        triggerDirection, setTriggerDirection,
        value, setValue,
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


    const handleSelectChange = useCallback((value) => setSelected(value), []);
    const handleTriggerTypeChange = (value) => {
        setTriggerType(value);
    };
    const handleTriggerDirection = (value) => {
        setTriggerDirection(value);
    };
    const triggerOptions = [
        { label: "Top left", value: "Top Left" },
        { label: "Top center", value: "Top Center" },
        { label: "Top right", value: "Top Right" },
        { label: "Middle left", value: "Middle Left" },
        { label: "Middle center", value: "Middle Center" },
        { label: "Middle right", value: "Middle Right" },
        { label: "Bottom left", value: "Bottom Left" },
        { label: "Bottom center", value: "Bottom Center" },
        { label: "Bottom right", value: "Bottom Right" },
    ];
    const directionOptions = [
        { label: "Left to right (LTR)", value: "Left to right" },
        { label: "Right to left (RTL)", value: "Right to left" },
    ];
    const handleChange = useCallback((newValue) => setValue(newValue), []);

    const handleChangeBranding = (value) => {
        setCheckedBranding(value);
    };
    const handleChangeClose = (value) => {
        setCheckedClose(value);
    };

    return (
        <Page>
            <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <Card>
                        <FormLayout>
                            <Text variant="headingLg" as="h5">
                                Display
                            </Text>
                            <div>
                                <Text>Direction</Text>
                                <InlineGrid columns={3}>
                                    {directionOptions.slice(0, 3).map((option) => (
                                         <React.Fragment key={option.value}> 
                                            <RadioButton
                                                label={option.label}
                                                checked={
                                                    triggerDirection === option.value
                                                }
                                                onChange={() =>
                                                    handleTriggerDirection(
                                                        option.value,
                                                    )
                                                }
                                            />
                                        </React.Fragment>
                                     ))} 
                                </InlineGrid>
                            </div>

                            <Select
                                label="Display screen position"
                                options={triggerOptions}
                                onChange={(value) => setTriggerType(value)}
                                value={triggerType}
                            />

                            <TextField
                                label="Display duration"
                                type="number"
                                value={value}
                                onChange={handleChange}
                                autoComplete="off"
                            />

                            <div
                                className="app-main"
                                style={{ marginBottom: "3%" }}
                            >
                                <ReactSwitch
                                    className="react-switch"
                                    checked={checkedClose}
                                    onChange={handleChangeClose}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    onColor="#303030"
                                    offColor="#CCCCCC"
                                />
                                <div className="app">
                                    <Text>Display close button</Text>
                                </div>
                            </div>
                             {/* <div className="app-main">
                                <ReactSwitch
                                    className="react-switch"
                                    checked={checkedBrand}
                                    onChange={handleChangeBranding}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    onColor="#303030"
                                    offColor="#CCCCCC"
                                />
                                <div className="app">
                                    <Text>Display branding</Text>
                                </div>
                            </div>  */}
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
        </Page>
    );
}
