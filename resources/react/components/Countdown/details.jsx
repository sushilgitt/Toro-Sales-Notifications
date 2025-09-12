import {
    Box,
    Card,
    Checkbox,
    Divider,
    Grid,
    InlineStack,
    LegacyCard,
    Page,
    Select,
    Text,
    TextField,
    Tooltip,
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useContext, useEffect } from "react";
import BannerContext, { useBannerData } from "./bannercontext";
import ReactSwitch from "react-switch";
import React from "react";

export default function Details() {
    const navigate = useNavigate();
    const context = useContext(BannerContext);
    const {
        name,setName,bannerContent,setBannerContent,
        pageUrl,setPageUrl,hidePageUrl,setHidePageUrl,
        buttonText,setButtonText,destinationUrl,setDestinationUrl,
        selected,setSelected,checked,setChecked,
    } = context;

    const handleSelectChange = useCallback((value) => setSelected(value), []);
    const handleChange = useCallback(
        (newChecked) => setChecked(newChecked),
        []
    );

    const options = [
        { label: "None", value: "none" },
        { label: "Default Button", value: "default button" },
        { label: "Text Link", value: "text link" },
        { label: "Square Button", value: "square button" },
        { label: "Round Button", value: "round button" },
    ];

    return (
        <Box paddingBlock="200">
            <Card>
                <Grid>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }} >
                        <Text variant="headingMd" as="h6">
                            Banner Details
                        </Text>
                        <Box paddingBlock={100} />
                        <TextField
                            label="Banner Name"
                            placeholder="Enter Banner Name"
                            value={name}
                            onChange={(value) => setName(value)}
                            helpText="This name is only shown in the backend banner list"
                        />
                        <Box paddingBlock={200} />
                        <Tooltip content="Enter the message you want displayed on the banner. Use emojis to grab attention!">
                            <TextField
                                multiline={4}
                                label="Banner Content"
                                placeholder="🚨 Hurry! Countdown to savings is ticking! 🕒"
                                value={bannerContent}
                                onChange={(value) => setBannerContent(value)}
                            />
                        </Tooltip>
                        <Box paddingBlock={200} />
                        <Tooltip content="Add the full page URL where you want this banner to be displayed.">
                            <TextField
                                label="Show On Page URL"
                                placeholder="Enter URL e.g. https://example.com/home"
                                value={pageUrl}
                                onChange={(value) => setPageUrl(value)}
                            />
                        </Tooltip>
                        <Box paddingBlockStart={600}>
                            <Tooltip content="Enter the URL of the page you want to hide from view.">
                                <TextField
                                    label="Hide from Page URL"
                                    placeholder="Enter URL e.g. https://example.com/collection"
                                    value={hidePageUrl}
                                    onChange={(value) => setHidePageUrl(value)}
                                />
                            </Tooltip>
                        </Box>
                    </Grid.Cell>

                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                        <Text variant="headingMd" as="h6">
                            Button Details
                        </Text>
                        <Box paddingBlock={100} />
          
                        <Select
                            label="Button Type"
                            options={options}
                            onChange={handleSelectChange}
                            value={selected}
                            helpText="Select the type of button you want to display on the banner."
                        />
                      

                        <Box paddingBlock={200} />
                        <Tooltip content="This text will appear on the button.">
                            <TextField
                                label="Button Text"
                                placeholder="Enter text displayed on button"
                                value={buttonText}
                                onChange={(value) => setButtonText(value)}
                            />
                        </Tooltip>
                        <Box paddingBlock={100} />
                        <Tooltip content="When the banner is clicked, users will be taken to this URL.">
                            <TextField
                                label="Destination URL"
                                placeholder="Enter URL e.g. https://example.com"
                                value={destinationUrl}
                                onChange={(value) => setDestinationUrl(value)}
                            />
                        </Tooltip>
                        <Box paddingBlock={200} />

                        <Box width="200px" paddingBlock={500}>
                            <InlineStack align="center" gap="200">
                                <ReactSwitch
                                    checked={checked}
                                    onChange={handleChange}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                />
                                <Tooltip content="Enable to open the banner link in a new browser tab">
                                    <Text>Open links in new tab</Text>
                                </Tooltip>
                            </InlineStack>
                        </Box>
                    </Grid.Cell>
                </Grid>
            </Card>
        </Box>
    );
}
