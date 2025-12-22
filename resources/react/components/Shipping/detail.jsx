import { Badge, Box, Card, Grid, InlineStack, TextField, Tooltip } from '@shopify/polaris'
import React, { useState } from 'react'
import MultiSelectTag from './multiselecttag';
import { useBannerData } from "./contextbanner";
import useShopCurrency from '../../pages/ShopCurrency';

export default function Detail() {

    const {
        shippingname,
        setShippingname,
        shippingcontent,
        setShippingcontent,
        shippingamount,
        setShippingamount,
        startdate,
        setStartdate,
        enddate,
        setEnddate,
        showpageurl,
        setShowpageurl,
        hidepageurl,
        setHidepageurl,
        selectedTags,
        setSelectedTags,
        status
    } = useBannerData();

    const { currencyData, loading: currencyLoading, formatMoney } = useShopCurrency();

    const badgeText = status === "active" ? "Active" : "Inactive";
    const tooltipText = status === "active" 
        ? "Free shipping bar is active" 
        : "Free shipping bar is inactive";

  return (
    <Card>
                 <Tooltip content={tooltipText}>
                    <Badge tone={status === "active" ? "success" : "critical"}>
                        {badgeText}
                    </Badge>
                </Tooltip>
                <Box paddingBlock={200}/>
            <Grid>
                    <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                      <TextField
                            label="Shipping name"
                            value={shippingname}
                            onChange={(v)=>setShippingname(v)}
                            autoComplete="off"
                        />

                        <Box paddingBlock={200}/>

                        <TextField
                            label="Shipping Content"
                            value={shippingcontent}
                            onChange={(v)=>setShippingcontent(v)}
                            multiline={4}
                            autoComplete="off"
                        />

                        <Box paddingBlock={300}/>

                        <TextField
                            label="Show On Page URL"
                            placeholder="Enter URL e.g. https://example.com/home"
                            value={showpageurl}
                            onChange={(v) => setShowpageurl(v)}
                        />
                    </Grid.Cell>

                    <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>

                        <InlineStack gap={400}>
                            <Box width='300px'>
                                <TextField
                                    label="Shipping amount"
                                    value={shippingamount}
                                    onChange={(v)=>setShippingamount(v)}
                                    autoComplete="off"
                                    type='number'
                                    suffix={!currencyLoading ? (currencyData?.currencySymbol || "") : ""}
                                />
                            </Box>

                            <Box width='300px'>
                                <MultiSelectTag
                                    label="Show on all Pages"
                                    selectedOptions={selectedTags}
                                    setSelectedOptions={setSelectedTags}
                                />
                            </Box>
                            
                        </InlineStack>

                        <Box paddingBlock={100}/>

                        <InlineStack>
                            {/* <Box width='100px'> */}
                                <TextField
                                    label="Start date"
                                    value={startdate}
                                    onChange={(v)=>setStartdate(v)}
                                    autoComplete="off"
                                    type='date'
                                />
                            {/* </Box> */}
                            
                            {/* <Box width='100px'> */}
                                <TextField
                                    label="End date"
                                    value={enddate}
                                    onChange={(v)=>setEnddate(v)}
                                    autoComplete="off"
                                    type='date'
                                />
                            {/* </Box> */}

                        </InlineStack>

                        <Box paddingBlock={200}/>

                        <TextField
                            label="Hide On Page URL"
                            placeholder="Enter URL e.g. https://example.com/home"
                            value={hidepageurl}
                            onChange={(v) => setHidepageurl(v)}
                        />
                    </Grid.Cell>
            </Grid>
    </Card>
  )
}
