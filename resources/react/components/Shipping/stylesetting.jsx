import { Box, Card, Grid, InlineGrid, InlineStack, RangeSlider, Select } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import McColorPicker from '../Colorbutton/McColorPicker';
import { useBannerData } from "./contextbanner";

export default function Stylesetting() {

    const {
        bgcolor,
        setBgcolor,
        txtcolor,
        setTxtcolor,
        alignment,
        setAlignment,
        fontsize,
        setFontsize,
        height,
        setHeight,
        bannerpos,
        setBannerpos,
        amountcolor,
        setAmountcolor,
        amountsize,
        setAmountsize,
    } = useBannerData();

    const options = [
        { label: "Center", value: "center" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
    ];

    const banner = [
        {label: 'Top', value: 'top'},
        {label: 'Bottom', value: 'bottom'},
    ];


  return (
    <Card>

        <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
               
                        <McColorPicker
                            width="100%"
                            label="Bg Color"
                            placeholder="Select color"
                            color={bgcolor}
                            setColor={(v) => { setBgcolor(v); }}
                        />
                     <Box paddingBlock={200}/>

                        <McColorPicker
                            width="100%"
                            label="Txt Color"
                            placeholder="Select color"
                            color={txtcolor}
                            setColor={(v) => { setTxtcolor(v); }}
                        />
                   

                <Box paddingBlock={200}/>

               
                        <RangeSlider
                            label="Banner Height"
                            value={height}
                            onChange={(v)=>setHeight(v)}
                            output
                        />

                    <Box paddingBlock={200}/>
                
                        <Select
                                label="Banner Position"
                                options={banner}
                                onChange={(v)=>setBannerpos(v)}
                                value={bannerpos}
                        />

            </Grid.Cell>

            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>

                    <Select
                        label="Alignment"
                        options={options}
                        onChange={(v)=>setAlignment(v)}
                        value={alignment}
                    />
                  <Box paddingBlock={300}/>

                    <RangeSlider
                        label="Font Size"
                        value={fontsize}
                        onChange={(v)=>setFontsize(v)}
                        output
                    />

               <Box paddingBlock={200}/>

                        <McColorPicker
                            width="100%"
                            label="Amount Color"
                            placeholder="Select color"
                            color={amountcolor}
                            setColor={(v) => { setAmountcolor(v); }}
                        />

                    <Box paddingBlock={200}/>

                        <RangeSlider
                            label="Amount Font Size"
                            value={amountsize}
                            onChange={(v)=>setAmountsize(v)}
                            output
                        />

            </Grid.Cell>
        </Grid>


    </Card>
  )
}
