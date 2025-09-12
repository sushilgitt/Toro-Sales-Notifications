import {
    BlockStack,
    Box,
    Card,
    Divider,
    Grid,
    InlineGrid,
    InlineStack,
    LegacyCard,
    RangeSlider,
    Select,
    Text,
    TextField,
    Thumbnail,
    Tooltip,
} from "@shopify/polaris";
import React, { useContext, useState } from "react";
import { useCallback } from "react";
import {
    bg,
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
    bg6,
    bg7,
    bg8,
    bg9,
} from "/public/images-icon";
import BannerContext from "./bannercontext";

export default function Style() {
    const context = useContext(BannerContext);

    const {
        backgroundColorbanner,setBackgroundColorbanner,textColor,setTextColor,
        buttonTextColor,setButtonTextColor,buttonBackgroundColor,setButtonBackgroundColor,
        selectedbanner,setSelectedbanner,rangeValue,setRangeValue,
        fontValue,setFontValue,fontType,setFontType,buttonWidth,setButtonWidth,
        buttonHeight,setButtonHeight,selectedBackgroundImage,setSelectedBackgroundImage,
        digitColor,setDigitColor,labelColor,setLabelColor,
        backgroundColor,setBackgroundColor,selectedplace,setSelectedplace,
        labelgap,setLabelgap,
    } = context;

    const handleSelectChange = useCallback(
        (value) => setSelectedbanner(value),
        []
    );
    const options = [
        { label: "Center", value: "center" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
    ];
    const handleRangeSliderChange = useCallback(
        (value) => setRangeValue(value),
        []
    );
    const handlefontChange = useCallback((value) => setFontValue(value), []);
    const handlefonttype = useCallback((value) => setFontType(value), []);
    const fonttype = [
        { label: "None", value: "none" },
        { label: "Helvetica", value: "helvetica" },
        { label: "Roboto", value: "roboto" },
        { label: "Courier New", value: "courier New" },
        { label: "Arial", value: "arial" },
    ];

    const images = [
        { src: null, alt: "Image 0", id: "banner0" },
        { src: bg, alt: "Image ", id: "bg" },
        { src: bg1, alt: "Image 1", id: "bg1" },
        { src: bg2, alt: "Image 2", id: "bg2" },
        { src: bg3, alt: "Image 3", id: "bg3" },
        { src: bg4, alt: "Image 4", id: "bg4" },
        { src: bg5, alt: "Image 5", id: "bg5" },
        { src: bg6, alt: "Image 6", id: "bg6" },
        { src: bg7, alt: "Image 7", id: "bg7" },
        { src: bg8, alt: "Image 8", id: "bg8" },
        { src: bg9, alt: "Image 9", id: "bg9" },
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

    const handleThumbnailClick = useCallback((image) => {
        setSelectedBackgroundImage(image.id);
    }, []);

    const handleDigitColorChange = useCallback(
        (value) => setDigitColor(value),
        []
    );
    const handleLabelColorChange = useCallback(
        (value) => setLabelColor(value),
        []
    );
    const handleBackgroundColorChange = useCallback(
        (value) => setBackgroundColor(value),
        []
    );

    const handleSelectplace = useCallback(
        (value) => setSelectedplace(value),
        []
    );
    const handleSelectlabelgap = useCallback((value) => setLabelgap(value), []);

    const place = [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
    ];

    const labelgapchange = [
        { label: "None", value: "none" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
        { label: "Extra Large", value: "extra large" },
    ];

    return (
        <Card>
            <Text variant="headingMd" as="h6">
                Banner Color Settings
            </Text>
            <Box paddingBlock={100} />
            <InlineGrid columns={4} gap="200">
                <Tooltip content="Select a color to apply to the banner background">
                    <TextField
                        type="color"
                        label="Background Color"
                        value={backgroundColorbanner}
                        onChange={(value) => setBackgroundColorbanner(value)}
                    />
                </Tooltip>
                <Tooltip content="Select a text color for your banner content.">
                    <TextField
                        type="color"
                        label="Text Color"
                        value={textColor}
                        onChange={(value) => setTextColor(value)}
                    />
                </Tooltip>
                <Tooltip content="Select a color that will appear on the button text.">
                    <TextField
                        type="color"
                        label="Button Text Color"
                        value={buttonTextColor}
                        onChange={(value) => setButtonTextColor(value)}
                    />
                </Tooltip>
                <Tooltip content="Select a color for the button background">
                    <TextField
                        type="color"
                        label="Button Background"
                        value={buttonBackgroundColor}
                        onChange={(value) => setButtonBackgroundColor(value)}
                    />
                </Tooltip>
            </InlineGrid>

            <Box paddingBlock={300} />

            <Text variant="headingMd" as="h6">
                Banner Style
            </Text>

            <Box paddingBlock={100} />

            <InlineGrid columns={4} gap="300">
                <Tooltip content="Choose the position of the banner content: left, center, or right.">
                    <Select
                        label="Alignment"
                        options={options}
                        onChange={handleSelectChange}
                        value={selectedbanner}
                    />
                </Tooltip>
                <RangeSlider
                    label="Font Size"
                    value={fontValue}
                    onChange={handlefontChange}
                    output
                />
                <RangeSlider
                    label="Banner Height:"
                    value={rangeValue}
                    onChange={handleRangeSliderChange}
                    output
                />
                <Select
                    label="Font Type"
                    options={fonttype}
                    onChange={handlefonttype}
                    value={fontType}
                />
            </InlineGrid>

            <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <Box paddingBlock={300} />
                    <div>
                        <Text as="h6">Background pattern</Text>
                        <Box paddingBlock={100} />
                        <Tooltip content="Select an image to set as the banner background.">
                            <InlineStack blockAlign="stretch">
                                {groupedImages.map((group, index) => (
                                    <BlockStack key={index}>
                                        <InlineStack blockAlign="stretch">
                                            {group}
                                        </InlineStack>
                                    </BlockStack>
                                ))}
                            </InlineStack>
                        </Tooltip>
                    </div>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <Box paddingBlock={200} />
                    <Divider borderColor="border-inverse" />
                    <Box paddingBlock={200} />
                    <Text variant="headingMd" as="h6">
                        Button Settings
                    </Text>

                    <Box paddingBlock={200} />

                    <InlineGrid columns={2} gap="300">
                        <Tooltip content="Adjust the button’s width to fit your layout.">
                            <TextField
                                type="number"
                                label="Button Width"
                                suffix="px"
                                value={buttonWidth}
                                onChange={(value) => setButtonWidth(value)}
                            />
                        </Tooltip>
                        <Tooltip content="Adjust the button’s height to fit your layout.">
                            <TextField
                                type="number"
                                label="Button Height"
                                suffix="px"
                                value={buttonHeight}
                                onChange={(value) => setButtonHeight(value)}
                            />
                        </Tooltip>
                    </InlineGrid>

                    <Box paddingBlock={200} />
                    <Divider borderColor="border-inverse" />
                    <Box paddingBlock={200} />
                    <Text variant="headingMd" as="h6">
                        Countdown Style
                    </Text>

                    <Box paddingBlock={200} />

                    <InlineGrid columns={2} gap="200">
                        <Select
                            label="Countdown Placement"
                            options={place}
                            onChange={handleSelectplace}
                            value={selectedplace}
                        />
                        <Select
                            label="Label Gap"
                            options={labelgapchange}
                            onChange={handleSelectlabelgap}
                            value={labelgap}
                        />
                    </InlineGrid>
                </Grid.Cell>
            </Grid>

            <Box paddingBlock={100} />

            <Text variant="headingMd" as="h6">
                Count Color Settings
            </Text>

            <Box paddingBlock={100} />

            <InlineGrid columns={3} gap="200">
                <Tooltip content="Select a color to apply to the digits">
                    <TextField
                        type="color"
                        label="Count Digit Color"
                        value={digitColor}
                        onChange={handleDigitColorChange}
                    />
                </Tooltip>
                <Tooltip content="Select a color to apply to the label">
                    <TextField
                        type="color"
                        label="Count Label Color"
                        value={labelColor}
                        onChange={handleLabelColorChange}
                    />
                </Tooltip>
                <Tooltip content="Select a color to apply to the digits background">
                    <TextField
                        type="color"
                        label="Count Background Color"
                        value={backgroundColor}
                        onChange={handleBackgroundColorChange}
                    />
                </Tooltip>
            </InlineGrid>
        </Card>
    );
}
