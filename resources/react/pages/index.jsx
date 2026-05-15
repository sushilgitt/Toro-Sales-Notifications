import {
    Page,
    Badge,
    Card,
    Text,
    BlockStack,
    Button,
    Collapsible,
    Link,
    InlineStack,
    Box,
    Icon,
    List,
    CalloutCard,
    Grid,
    InlineGrid,
    Thumbnail
} from "@shopify/polaris";
import React from 'react'
// import { useTranslation, Trans } from "react-i18next";
// import { ShopContext } from "../components/AppWrapper";
import { useEffect, useState, useCallback } from "react";
import { CaretDownIcon, CaretUpIcon } from "@shopify/polaris-icons";
import { useSearchParams } from "react-router-dom";
import { democouponpage } from "/public/images-icon";
import Blockpromo from "../components/dashboard/blockpromo";
import Schedule from "../components/dashboard/Schedule";
// import { getNonEmbedBlockLink } from "../utils/helper";

export default function IndexPage() {
    // const { t } = useTranslation();
  //  const { shop } = useContext(ShopContext);
  //   const { host, uuid } = useContext(ShopContext);
    // const url = getNonEmbedBlockLink(host, uuid)
    // console.log("🚀 ~ IndexPage ~ shop:", url)
    const [count, setCount] = useState(0);
    const [activecount, setActivecount] = useState(0);
    const [notactivecount, setNotactivecount] = useState(0);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const handleToggle1 = useCallback(() => setOpen1((open) => !open), []);
    const handleToggle2 = useCallback(() => setOpen2((open) => !open), []);
    const handleToggle3 = useCallback(() => setOpen3((open) => !open), []);

    const [isAppEnabled, setIsAppEnabled] = useState(false); 
    const [param] = useSearchParams();
    const host = param.get("host");
    console.log('host name',host);

    useEffect(() => {
        fetch('/api/getdatacount')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data, "data");
                setCount(data.count);
                setActivecount(data.activecount);
                setNotactivecount(data.notactivecount);
            })
            .catch(error => {
                console.error('There was an error fetching the data count!', error);
            });
    }, []);


    useEffect(() => {
        
        fetch("/api/getthemefile")
            .then((res) => res.json())
            .then((data) => {
                console.log('data',data);
                setAppstatues(!data.appStatus);
            })
            .catch((error) => {
                console.error("Error fetching assets:", error);
                setAppstatues(false);
            });
    }, []);
const [appstatues, setAppstatues] = useState(false);
    // const handlestatus = () => {
    //     // const appId = '9aed28e4-1a34-4285-9bc4-27b84405ea37'; 
    //     const appId = '32e5af68-81eb-458b-a832-3995584cb12e'; 
    //     const url = `https://${atob(host)}/admin/themes/current/editor?context=apps&template=index&activateAppId=${appId}/star_rating`;
    //     window.open(url, '_blank');
    //     setIsAppEnabled((prev) => !prev);
    // };

    const handlestatus = () => {
        // const appId = '9aed28e4-1a34-4285-9bc4-27b84405ea37'; 
        const appId = "32e5af68-81eb-458b-a832-3995584cb12e";
        const url = `https://${atob(host)}/admin/themes/current/editor?context=apps&template=index&activateAppId=${appId}/star_rating`;
        window.open(url, "_blank");
    };
    return (
        <Page>
            <Text variant="headingXl" as="h4">
                Hi 👋, Welcome to TORO Sales Popup Notifications
            </Text>


            <Box paddingBlock={400}/>

            <Card>
                <Box paddingBlockEnd={100}>
                <InlineStack align="space-between">
                    <Text as="h2" variant="headingMd">
                        App status
                    </Text>
                    <Box>
                        <Badge tone={appstatues ? "success" : "attention"}>
                            {appstatues ? "Enabled" : "Disabled"}
                        </Badge>{" "}
                        <Button
                            variant={appstatues ? "secondary" : "primary"}
                            tone={appstatues ? "critical" : null}
                            onClick={handlestatus}
                        >
                            {appstatues ? "Disable" : "Enable"}
                        </Button>
                    </Box>
                </InlineStack>
            </Box>
                <Box paddingBlock="100">
                    <Text >
                        To start using TORO Sales notifications, please{' '}
                        {isAppEnabled ? 'deactivate' : 'activate'} the app functionality from here.
                    </Text>
                </Box>
            </Card>

            {/* <div style={{ paddingTop: "2%" }}>
                <Box paddingBlockEnd={"200"}>
                    <CalloutCard
                        title="Enable the app"
                        primaryAction={{
                            content: "Click to Go to Theme",
                            // url: `https://${host}/admin/themes/current/editor?context=apps&template=index&activateAppId=6fc55d2f-a7e3-42e3-b138-a6cce6259a71/star_rating`,
                               url:`${url}`
                        }}
                    >
                    </CalloutCard>
                </Box>
            </div> */}

            <div style={{ paddingTop: "2%" }}>
                <Box paddingBlockEnd={"200"}>
                    <Grid columns={{ sm: 4 }}>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>
                            <Card>
                                <Text variant="headingSm" as="h2" alignment="center">Total coupons</Text>
                                <Text variant="headingXl" as="h3" alignment="center">{count}</Text>
                            </Card>
                        </Grid.Cell>

                        <Grid.Cell columnSpan={{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>
                            <Card>
                                <Text variant="headingSm" as="h2" alignment="center">Total active coupons</Text>
                                <Text variant="headingXl" as="h3" alignment="center">{activecount}</Text>
                            </Card>
                        </Grid.Cell>

                        <Grid.Cell columnSpan={{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>
                            <Card>
                                <Text variant="headingSm" as="h2" alignment="center">Total inactive coupons</Text>
                                <Text variant="headingXl" as="h3" alignment="center">{notactivecount}</Text>
                            </Card>
                        </Grid.Cell>
                    </Grid>
                </Box>
            </div>

            <Box paddingBlockStart="200">
                <Card roundedAbove="sm">
                    <BlockStack gap="200">
                        <div className="home-part-1">
                            <div className="hp-1">
                                 <InlineGrid columns={2}>
                                        <Text variant="headingMd" as="h6">
                                            About TORO Sales Popup Notifications
                                        </Text>
                                         <BlockStack inlineAlign="end">
                                            {open1 ? <Button
                                                size="slim"
                                                variant="plain"
                                                onClick={handleToggle1}
                                                ariaExpanded={open1}
                                                ariaControls="basic-collapsible"
                                                icon={CaretUpIcon}
                                            >
                                            </Button> : <Button
                                                size="slim"
                                                onClick={handleToggle1}
                                                variant="plain"
                                                ariaExpanded={open1}
                                                ariaControls="basic-collapsible"
                                                icon={CaretDownIcon}
                                            >
                                            </Button>}
                                         </BlockStack>
                                </InlineGrid>
                            </div>

                            
                        </div>
                        <Collapsible
                            open={open1}
                            id="basic-collapsible"
                            transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
                            expandOnPrint
                        >
                            <Box>
                                <List>
                                    <List.Item>
                                        <Text variant="bodyMd" as="p">This app shows & triggers various kinds of popup notifications on frontend to boost user experience, engagement, sales & revenue of your eCommerce store.</Text>
                                    </List.Item>
                                </List>
                            </Box>
                        </Collapsible>
                    </BlockStack>
                </Card>
            </Box>
            <Box paddingBlockStart="200">
                <Card roundedAbove="sm">
                    <BlockStack gap="200">
                        <div className="home-part-1">
                            <div className="hp-1">
                                <InlineGrid columns={2}>
                                    <Text variant="headingMd" as="h6">
                                        How it works
                                    </Text>
                                    <BlockStack inlineAlign="end">
                                            {open2 ? <Button
                                            size="slim"
                                            variant="plain"
                                            onClick={handleToggle2}
                                            ariaExpanded={open2}
                                            ariaControls="basic-collapsible"
                                            icon={CaretUpIcon}
                                        >
                                        </Button> : <Button
                                            size="slim"
                                            onClick={handleToggle2}
                                            variant="plain"
                                            ariaExpanded={open2}
                                            ariaControls="basic-collapsible"
                                            icon={CaretDownIcon}
                                        >
                                        </Button>}
                                    </BlockStack>
                               </InlineGrid>
                            </div>

                        </div>
                        <Collapsible
                            open={open2}
                            id="basic-collapsible"
                            transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
                            expandOnPrint
                        >
                            <Box>
                                <Grid columns={{ sm: 3 }}>
                                    <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 8, xl: 8 }}>

                                        <BlockStack gap="200">
                                            <Text variant="headingMd" as="h5">
                                                Creating Popup Notifications
                                            </Text>
                                            <Text as="p" variant="bodyMd">
                                                Generate various sorts of popup alerts to
                                                drive more sales.
                                            </Text>
                                            <List>
                                                <List.Item>
                                                    <Text
                                                        as="h3"
                                                        variant="headingSm"
                                                        fontWeight="medium"
                                                    >
                                                        Main Settings
                                                    </Text>
                                                </List.Item>
                                                <Text as="p" variant="bodyMd">
                                                    Set notification name, customer message,
                                                    coupon code, destination URL, CTA button
                                                    & upload an images for popup
                                                    notification.
                                                </Text>
                                                <br></br>
                                                <List.Item>
                                                    <Text
                                                        as="h3"
                                                        variant="headingSm"
                                                        fontWeight="medium"
                                                    >
                                                        Triggers{" "}
                                                    </Text>
                                                </List.Item>
                                                <Text as="p" variant="bodyMd">
                                                    Configure when & where to display popup
                                                    notifications. Set trigger events &
                                                    frequency for showing frontend alerts.
                                                    Schedule popup notifications.
                                                </Text>
                                                <br></br>
                                                <List.Item>
                                                    <Text
                                                        as="h3"
                                                        variant="headingSm"
                                                        fontWeight="medium"
                                                    >
                                                        Display{" "}
                                                    </Text>
                                                </List.Item>
                                                <Text as="p" variant="bodyMd">
                                                    Adjust direction & position of popup
                                                    alerts to showcase on frontend.
                                                </Text>
                                                <br></br>
                                                <List.Item>
                                                    <Text
                                                        as="h3"
                                                        variant="headingSm"
                                                        fontWeight="medium"
                                                    >
                                                        Customize{" "}
                                                    </Text>
                                                </List.Item>
                                                <Text as="p" variant="bodyMd">
                                                    Personalize the appearance of popup
                                                    notification widget by setting text
                                                    color, background color & pattern, CTA
                                                    button color, border style & more. Add
                                                    animation to fancify & enhance UX.
                                                </Text>
                                            </List>
                                        </BlockStack>

                                    </Grid.Cell>
                                    <Grid.Cell columnSpan={{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>

                                        <img src={democouponpage} alt="" style={{ width: "100%" }} />

                                    </Grid.Cell>
                                </Grid>

                            </Box>
                        </Collapsible>
                    </BlockStack>
                </Card>
            </Box>
            <Box paddingBlockStart="200">
                <Card roundedAbove="sm">
                    <BlockStack gap="200">
                        <div className="home-part-1">
                            <div className="hp-1">
                                <InlineGrid columns={2}>
                                    <Text variant="headingMd" as="h6">
                                        Adding popup coupon notifications
                                    </Text>
                                <BlockStack inlineAlign="end">
                                    {open3 ? <Button
                                        size="slim"
                                        variant="plain"
                                        onClick={handleToggle3}
                                        ariaExpanded={open3}
                                        ariaControls="basic-collapsible"
                                        icon={CaretUpIcon}
                                    >
                                    </Button> : <Button
                                        size="slim"
                                        onClick={handleToggle3}
                                        variant="plain"
                                        ariaExpanded={open3}
                                        ariaControls="basic-collapsible"
                                        icon={CaretDownIcon}
                                    >
                                    </Button>}
                                </BlockStack>
                                </InlineGrid>
                            </div>

                            
                        </div>
                        <Collapsible
                            open={open3}
                            id="basic-collapsible"
                            transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
                            expandOnPrint
                        >
                            <Box>
                                <BlockStack gap="200">
                                    <List>
                                        <List.Item>
                                            <Text
                                                as="p" variant="bodyMd"
                                            >
                                                Click create Notification to create various kinds of coupon notificatio to show on your store
                                            </Text>
                                        </List.Item>
                                        <List.Item>
                                            <Text as="p" variant="bodyMd">
                                                Set its status & assign a name.
                                            </Text>
                                        </List.Item>

                                        <List.Item>
                                            <Text as="p" variant="bodyMd">
                                                Customize its look.
                                            </Text>
                                        </List.Item>

                                        <List.Item>
                                            <Text as="p" variant="bodyMd">
                                                Set conditions for displaying.
                                            </Text>
                                        </List.Item>
                                    </List>
                                </BlockStack>
                            </Box>
                        </Collapsible>
                    </BlockStack>
                </Card>
            </Box>
             <Box paddingBlockStart="200">
                <Schedule/>
            </Box>

            <Box paddingBlockStart="200">
                <Blockpromo/>
            </Box>
            
        </Page>
    );
}
