import React, { useEffect, useState, useRef } from "react";
import { Box, Grid, InlineGrid, Page, Spinner, Tabs } from "@shopify/polaris";
import { useNavigate, useParams } from "react-router-dom";
import Detail from "./detail";
import Stylesetting from "./stylesetting";
import Preview from "./preview";
import { BannerProvider, useBannerData } from "./contextbanner";
import { SaveBar, useAppBridge } from "@shopify/app-bridge-react";
import Step from "./step";

function BannerContent() {
    const navigate = useNavigate();
    const shopify = useAppBridge();
    const bannerData = useBannerData();
    const [selected, setSelected] = useState(0);
    const [loading, setLoading] = useState(true);

    const isDiscardingRef = useRef(false);
    const [showSaveBar, setShowSaveBar] = useState(false);

    const {
        shippingname, setShippingname,
        shippingcontent,setShippingcontent,
        shippingamount,setShippingamount,
        startdate,setStartdate,
        enddate,setEnddate,
        showpageurl,setShowpageurl,
        hidepageurl, setHidepageurl,
        selectedTags,setSelectedTags,
        bgcolor,setBgcolor,
        txtcolor,setTxtcolor,
        alignment,setAlignment,
        fontsize,setFontsize,
        height,setHeight,
        bannerpos,setBannerpos,
        amountcolor,setAmountcolor,
        amountsize,setAmountsize,
        status, setStatus,
    } = bannerData;

    const [previousCouponData, setPreviousCouponData] = useState({
        shippingname,
        shippingcontent,
        shippingamount,
        startdate,
        enddate,
        showpageurl,
        hidepageurl,
        selectedTags,
        bgcolor,
        txtcolor,
        alignment,
        fontsize,
        height,
        bannerpos,
        amountcolor,
        amountsize,
    });

    const handleDiscard = () => {
        if (!previousCouponData) return;

        isDiscardingRef.current = true;

        setShippingname(previousCouponData.shippingname);
        setShippingcontent(previousCouponData.shippingcontent);
        setShippingamount(previousCouponData.shippingamount);
        setStartdate(previousCouponData.startdate);
        setEnddate(previousCouponData.enddate);
        setShowpageurl(previousCouponData.showpageurl);
        setHidepageurl(previousCouponData.hidepageurl);
        setSelectedTags(previousCouponData.selectedTags);
        setBgcolor(previousCouponData.bgcolor);
        setTxtcolor(previousCouponData.txtcolor);
        setAlignment(previousCouponData.alignment);
        setFontsize(previousCouponData.fontsize);
        setHeight(previousCouponData.height);
        setBannerpos(previousCouponData.bannerpos);
        setAmountcolor(previousCouponData.amountcolor);
        setAmountsize(previousCouponData.amountsize);

        setShowSaveBar(false);
        // shopify.saveBar.hide("my-save-bar");

        setTimeout(() => {
            isDiscardingRef.current = false;
        }, 0);
    };

    useEffect(() => {
        if (isDiscardingRef.current) return;

        const currentData = {
            shippingname,
            shippingcontent,
            shippingamount,
            startdate,
            enddate,
            showpageurl,
            hidepageurl,
            selectedTags,
            bgcolor,
            txtcolor,
            alignment,
            fontsize,
            height,
            bannerpos,
            amountcolor,
            amountsize,
        };

        const hasChanges =
            JSON.stringify(currentData) !== JSON.stringify(previousCouponData);

        if (hasChanges) {
            setShowSaveBar(true);
            // shopify.saveBar.show("my-save-bar");
        } else {
            setShowSaveBar(false);
            // shopify.saveBar.hide("my-save-bar");
        }
    }, [
        shippingname,
        shippingcontent,
        shippingamount,
        startdate,
        enddate,
        showpageurl,
        hidepageurl,
        selectedTags,
        bgcolor,
        txtcolor,
        alignment,
        fontsize,
        height,
        bannerpos,
        amountcolor,
        amountsize,
        previousCouponData,
    ]);

    useEffect(() => {
            setLoading(true);
            fetch(`/api/shippingbanner`)
                .then((res) => res.json())
                .then((response) => {
                    if (response.success) {
                        const b = response.data;
                        const details = JSON.parse(b.details);

                        setShippingname(b.name);
                        setShippingcontent(details.shippingcontent);
                        setShippingamount(details.shippingamount);
                        setStartdate(details.startdate);
                        setEnddate(details.enddate);
                        setShowpageurl(details.showpageurl);
                        setHidepageurl(details.hidepageurl);
                        setSelectedTags(details.selectedTags);
                        setBgcolor(details.bgcolor);
                        setTxtcolor(details.txtcolor);
                        setAlignment(details.alignment);
                        setFontsize(details.fontsize);
                        setHeight(details.height);
                        setBannerpos(details.bannerpos);
                        setAmountcolor(details.amountcolor);
                        setAmountsize(details.amountsize);
                        setStatus(b.shipping === true ? "active" : "inactive");

                        const statusValue = b.shipping;  
                       
                        
                        
                        setPreviousCouponData({
                            shippingname: b.name,
                            shippingcontent: details.shippingcontent,
                            shippingamount: details.shippingamount,
                            startdate: details.startdate,
                            enddate: details.enddate,
                            showpageurl: details.showpageurl,
                            hidepageurl: details.hidepageurl,
                            selectedTags: details.selectedTags,
                            bgcolor: details.bgcolor,
                            txtcolor: details.txtcolor,
                            alignment: details.alignment,
                            fontsize: details.fontsize,
                            height: details.height,
                            bannerpos: details.bannerpos,
                            amountcolor: details.amountcolor,
                            amountsize: details.amountsize,
                            status: b.shipping === true ? "active" : "inactive",
                        });
                    }
                })
                .catch((err) => console.log("Edit fetch error:", err))
                .finally(() => setLoading(false));
        
    },[]);

    const handleTabChange = (selectedTabIndex) => setSelected(selectedTabIndex);

    const tabs = [
        { id: "Details", content: "Details", render: () => <Detail /> },
        {
            id: "Style-settings",
            content: "Style Settings",
            render: () => <Stylesetting />,
        },
    ];

    const handleSave = async () => {
    if (!bannerData.shippingname.trim()) {
        shopify.toast.show("Banner Name is required", { isError: true });
        return;
    }

    if (!bannerData.startdate) {
        shopify.toast.show("Please select a start date", { isError: true });
        return;
    }

    if (!bannerData.enddate) {
        shopify.toast.show("Please select an end date", { isError: true });
        return;
    }

    const payload = {
        name: bannerData.shippingname,
        details: {
            shippingcontent: bannerData.shippingcontent,
            shippingamount: bannerData.shippingamount,
            startdate: bannerData.startdate,
            enddate: bannerData.enddate,
            showpageurl: bannerData.showpageurl,
            hidepageurl: bannerData.hidepageurl,
            selectedTags: bannerData.selectedTags,
            bgcolor: bannerData.bgcolor,
            txtcolor: bannerData.txtcolor,
            alignment: bannerData.alignment,
            fontsize: bannerData.fontsize,
            height: bannerData.height,
            bannerpos: bannerData.bannerpos,
            amountcolor: bannerData.amountcolor,
            amountsize: bannerData.amountsize,
        },
    };

    const response = await fetch("/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.status === "success") {
        shopify.toast.show(data.message);

        // snapshot for SaveBar
        setPreviousCouponData({
            shippingname: bannerData.shippingname,
            shippingcontent: bannerData.shippingcontent,
            shippingamount: bannerData.shippingamount,
            startdate: bannerData.startdate,
            enddate: bannerData.enddate,
            showpageurl: bannerData.showpageurl,
            hidepageurl: bannerData.hidepageurl,
            selectedTags: bannerData.selectedTags,
            bgcolor: bannerData.bgcolor,
            txtcolor: bannerData.txtcolor,
            alignment: bannerData.alignment,
            fontsize: bannerData.fontsize,
            height: bannerData.height,
            bannerpos: bannerData.bannerpos,
            amountcolor: bannerData.amountcolor,
            amountsize: bannerData.amountsize,
        });

        setShowSaveBar(false);
        shopify.saveBar.hide("my-save-bar");
        // navigate("/shipping");
    } else {
        shopify.toast.show(data.message || "Error saving banner", { isError: true });
    }
};

    return (
        <>
        {/* <Step/> */}
        <Page
            title="Free shipping bar"
            // backAction={{ onAction: () => navigate(-1) }}
            // primaryAction={{ content: "Save", onAction: handleSave }}
        >
            {loading ? (
                <Box
                    padding="500"
                    display="flex"
                    align="center"
                    justify="center"
                    minHeight="60vh"
                >
                    <Spinner
                        accessibilityLabel="Loading campaigns"
                        size="large"
                    />
                </Box>
            ) : (
                <>
                   <Box paddingBlock={300} />
                    <Preview />

                    <Box paddingBlock={300} />

                <InlineGrid columns={['twoThirds','oneThird']} gap={200}>
                        <Tabs
                            tabs={tabs}
                            selected={selected}
                            onSelect={handleTabChange}
                        >
                            {tabs[selected].render()}
                        </Tabs>

                        <Box paddingBlock={1000}>
                            <Step/>
                        </Box>
                </InlineGrid>

                        <SaveBar id="my-save-bar" open={showSaveBar}>
                            <button variant="primary" onClick={handleSave}>
                                Save
                            </button>
                            <button onClick={handleDiscard}>Discard</button>
                        </SaveBar>
                </>
            )}
        </Page>
        </>
    );
}

export default function Shippingbanner(props) {
    return (
        <BannerProvider>
            <BannerContent />
        </BannerProvider>
    );
}
