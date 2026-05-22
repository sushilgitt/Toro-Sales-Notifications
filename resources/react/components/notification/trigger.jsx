import React, { useCallback, useContext } from "react";
import ReactSwitch from "react-switch";
import {
    Page, Text, TextField, Select,Button, Checkbox, Modal,RadioButton,Card,
    BlockStack,Grid,Icon,FormLayout,Sticky, Tooltip,
} from "@shopify/polaris";
import { ModalSettings } from "./modalsettings";
import { XIcon } from "@shopify/polaris-icons";
import { CuponDataContext } from "./CuponDataContext";

export function Triggers() {
    const {
        title,setTitle,description,setDescription,file,
        image,setImage,setFile,
        subdescription,setSubDescription,
        altText,setAltText,
        couponCode,setCouponCode,
        buttonText,setButtonText,
        showModal, setShowModal,
        BackgroundColor, setBackgroundColor,
        ButtonColor, setButtonColor,
        ButtonTextColor,setButtonTextColor,
        CloseButtonTextColor, setCloseButtonTextColor,
        borderRadius, setBorderRadius,
        selectedBackgroundImage, setSelectedBackgroundImage,
        boxShadowStyle,rangeValuePadding,
        setRangeValuePadding, rangeValueWidth,
        setRangeValueWidth,
        BorderColor,setBorderColor,
        TitleColor,setTitleColor,
        DecriptionColor,setDecriptionColor,
        checkedNewTab,setCheckedNewTab,
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
        selectedpage,setSelectedpage,
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

    const handleSelectChange = useCallback((value) => setSelectedpage(value), []);
    console.log(startDate, endDate, "startDate--endDate");

    const handleTriggerTypeChange = (value) => {
        setDisplayTriggerType(value);
    };

    const handleChange = (value) => {
        setCheckedAllpage(value);
    };

    const handleFullUrlChange = (value) => {
        setFullUrl(value);
    };

    const handleCssSelectorChange = (value) => {
        setCssSelector(value);
    };

    const handleDisplayFrequencyChange = (value) => {
        setDisplayFrequency(value);
    };

    const handleScheduleChange = (value) => {
        setSchedule(value);
    };

    const handleStartDateChange = (value) => {
        setStartDate(value);
    };

    const handleEndDateChange = (value) => {
        setEndDate(value);
    };

    console.log(startDate, "datetime-local startDate");

    const options = [
        { label: "Exact match", value: "Exact match" },
        { label: "Does not match exact", value: "Does not match exact" },
        { label: "Contains", value: "Contains" },
        { label: "Does not contain", value: "Does not contain" },
        { label: "Starts with", value: "Starts with" },
        { label: "Does not start with", value: "Does not start with" },
        { label: "Ends with", value: "Ends with" },
        { label: "Does not end with", value: "Does not end with" },
        { label: "Page Contains", value: "Page Contains" },
    ];

    const triggerOptions = [
        { label: "Delay", value: "Delay" },
        { label: "Mouse click", value: "Mouse click" },
        { label: "Exit Intent", value: "Exit Intent" },
        { label: "Mouse hover", value: "Mouse hover" },
        { label: "Scroll Percentage", value: "Scroll Percentage" },
    ];

    const displayFrequencyOptions = [
        { label: "Once per browser", value: "Once per browser" },
        { label: "All the time", value: "All the time" },
    ];

    const handleModalClose = () => setShowModal(false);

    return (
        <Page>
            <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <Card>
                        <FormLayout>
                            <Text variant="headingLg" as="h5">
                                Settings
                            </Text>
                            <div className="app-main">
                                <ReactSwitch
                                    className="react-switch"
                                    checked={checkedAllpage}
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
                                        Trigger on all pages
                                    </Text>
                                    <span>Where should the notification show?</span>
                                </div>
                            </div>

                            {!checkedAllpage && (
                                <>
                                    <Select
                                        label="Page targeting rule"
                                        labelHidden
                                        placeholder="select"
                                        options={options}
                                        onChange={handleSelectChange}
                                        value={selectedpage}
                                    />
                                    {(selectedpage === "Exact match" ||
                                        selectedpage ===
                                        "Does not match exact") && (
                                            <TextField
                                                label="Target URL"
                                                labelHidden
                                                placeholder="Full URL - ex: https://domain.com"
                                                autoComplete="off"
                                                onChange={handleFullUrlChange}
                                                value={fullUrl}
                                            />
                                         )} 
                                    {(selectedpage == "Contains" ||
                                        selectedpage == "Does not contain") && (
                                            <TextField
                                                label="Target URL fragment"
                                                labelHidden
                                                placeholder="Part of the URL - ex: /product/102481"
                                                autoComplete="off"
                                                onChange={handleFullUrlChange}
                                                value={fullUrl}
                                            />
                                         )} 
                                    {(selectedpage == "Starts with" ||
                                        selectedpage == "Does not start with" ||
                                        selectedpage == "Ends with" ||
                                        selectedpage ==
                                        "Does not end with") && (
                                            <TextField
                                                label="Target URL fragment"
                                                labelHidden
                                                placeholder="Part of the URL"
                                                autoComplete="off"
                                                onChange={handleFullUrlChange}
                                                value={fullUrl}
                                            />
                                         )}
                                    {selectedpage == "Page Contains" && ( 
                                        <TextField
                                            label="Page content text"
                                            labelHidden
                                            placeholder="Text inside of the website"
                                            autoComplete="off"
                                            onChange={handleFullUrlChange}
                                            value={fullUrl}
                                        />
                                     )} 
                                 </>
                            )} 

                            <Select
                                label="Display trigger"
                                options={triggerOptions}
                                onChange={(value) => setDisplayTriggerType(value)}
                                value={displaytriggerType}
                            />


                            {(displaytriggerType === "Mouse click" || displaytriggerType === "Mouse hover") && (
                                <Tooltip content="(#) id or (.) class of the element selector" dismissOnMouseOut>
                                    <TextField
                                        label="Element selector"
                                        onChange={handleCssSelectorChange}
                                        value={cssSelector}
                                        placeholder="(#) id or (.) class"
                                    />
                                </Tooltip>
                             )} 
                            {displaytriggerType === "Delay" && (
                                <TextField
                                    label="Seconds until the notification shows up"
                                    onChange={handleCssSelectorChange}
                                    value={cssSelector}
                                />
                             )}
                            {displaytriggerType === "Scroll Percentage" && ( 
                                <TextField
                                    label="Percent of scrolling from the top down"
                                    onChange={handleCssSelectorChange}
                                    value={cssSelector}
                                />
                             )} 

                            <div>
                                <Text
                                    variant="headingSm"
                                    as="h5"
                                    className="trigger-label"
                                >
                                    Display frequency
                                </Text>
                                <div style={{ display: "flex" }}>
                                     {displayFrequencyOptions.map((option) => ( 
                                         <React.Fragment key={option.value}> 
                                            <RadioButton
                                                label={option.label}
                                                checked={
                                                    displayFrequency === option.value
                                                }
                                                onChange={() =>
                                                    handleDisplayFrequencyChange(
                                                        option.value,
                                                    )
                                                }
                                            />
                                            <div style={{ marginRight: "1rem" }} />
                                         </React.Fragment> 
                                     ))} 
                                </div>
                            </div>

                            <Checkbox
                                label="Schedule"
                                checked={schedule}
                                onChange={handleScheduleChange}
                            />
                            {schedule && (
                                <>
                                    <FormLayout>
                                        <FormLayout.Group condensed>
                                            <TextField
                                                label="Start date"
                                                type="datetime-local"
                                                onChange={handleStartDateChange}
                                                value={startDate}
                                            />

                                            <TextField
                                                label="End date"
                                                type="datetime-local"
                                                onChange={handleEndDateChange}
                                                value={endDate}
                                            />
                                        </FormLayout.Group>
                                    </FormLayout>
                                 </>
                            )} 


                             <Modal
                                open={showModal}
                                onClose={handleModalClose}
                                title="Trigger saved"
                            >
                                <Modal.Section>
                                    <Text variant="bodyStrong">
                                        Your trigger has been saved successfully.
                                    </Text>
                                </Modal.Section>
                                <Modal.Section>
                                    <Button onClick={handleModalClose}>
                                        Close
                                    </Button>
                                </Modal.Section>
                            </Modal> 
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
