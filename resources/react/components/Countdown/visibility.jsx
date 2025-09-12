import { Box, Card, Checkbox, Grid, InlineGrid, Select, Text, TextField, Tooltip } from '@shopify/polaris'
import React, { useCallback, useContext, useState } from 'react'
import BannerContext from './bannercontext';

export default function Visibility() {
    const context = useContext(BannerContext);

    const {
                bannerpos,setBannerpos,closebtn,setClosebtn,
                show,setShow,hide,
                setHide,sticky,setSticky,
     } = context;

    const handlebannerpos = useCallback(
        (value) => setBannerpos(value),
        [],
    );

    const banner = [
        {label: 'Top', value: 'top'},
        {label: 'Bottom', value: 'bottom'},
    ];

    const handleclosebtn = useCallback(
        (newChecked) => setClosebtn(newChecked),
        [],
    );

    const handleshow = useCallback(
        (value) => setShow(value),
        [],
    );

    const showoptions = [
        {label: '0 Seconds', value: '0 seconds'},
        {label: '2 Seconds', value: '2 seconds'},
        {label: '5 Seconds', value: '5 seconds'},
        {label: '10 Seconds', value: '10 seconds'},
        {label: '15 Seconds', value: '15 seconds'},
        {label: '20 Seconds', value: '20 seconds'},
    ];

    const handlehide = useCallback(
        (value) => setHide(value),
        [],
    );

    const hideoptions = [
        {label: '0 Seconds', value: '0 seconds'},
        {label: '2 Seconds', value: '2 seconds'},
        {label: '5 Seconds', value: '5 seconds'},
        {label: '10 Seconds', value: '10 seconds'},
        {label: '20 Seconds', value: '20 seconds'},
        {label: '30 Seconds', value: '30 seconds'},
        {label: '40 Seconds', value: '40 seconds'},
        {label: '50 Seconds', value: '50 seconds'},
        {label: '60 Seconds', value: '60 seconds'},
    ];

    const handlestickybtn = useCallback(
        (newChecked) => setSticky(newChecked),
        [],
    );

  return (
    <Card>
          <Text variant="headingSm" as="h6">
                Content Visibility
          </Text>
           <Box  paddingBlock={200}/>
          <Grid>
                <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                    <Tooltip content="Set the banner to display at the top or bottom.">
                    <Select
                        label="Banner Position"
                        options={banner}
                        onChange={handlebannerpos}
                        value={bannerpos}
                    /></Tooltip>
                </Grid.Cell>
                <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                        <Checkbox
                            label="Hide Close Button"
                            checked={closebtn}
                            onChange={handleclosebtn}
                            helpText="Hide the 'X' button to prevent users from closing the banner."
                        />
                        <Checkbox
                            label="Sticky Bar"
                            checked={sticky}
                            onChange={handlestickybtn}
                            helpText="Always visible while scrolling"
                        />
                </Grid.Cell>
          </Grid>



            <Text variant="headingSm" as="h6">
                   Visibility Duration
            </Text>
            <Box  paddingBlock={100}/>

           <InlineGrid columns={2} gap="300">
                    <Tooltip content="Select how many seconds to wait before showing the banner.">
                        <Select
                            label="Show after (in seconds)"
                            options={showoptions}
                            onChange={handleshow}
                            value={show}
                        /></Tooltip>

                     <Tooltip content="Set the number of seconds until the banner hides itself.">
                        <Select
                            label="Hide after (in seconds)"
                            options={hideoptions}
                            onChange={handlehide}
                            value={hide}
                       /></Tooltip>
          </InlineGrid>
    </Card>
  )
}
