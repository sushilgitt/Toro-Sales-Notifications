import {
    Badge,
    Box,
    Card,
    Divider,
    Grid,
    InlineGrid,
    InlineStack,
    Page,
    Select,
    Text,
    TextField,
    Tooltip,
} from "@shopify/polaris";
import React, { useCallback, useState, useContext } from "react";
import BannerContext from "./bannercontext";
import ReactSwitch from "react-switch";

export default function Countdownsetup() {
    const context = useContext(BannerContext);

    const {
        selectenddate,
        setSelectenddate,
        dateTime,
        setDateTime,
        days,
        setDays,
        hours,
        setHours,
        minutes,
        setMinutes,
        dayslbl,
        setDayslbl,
        hourslbl,
        setHourslbl,
        minuteslbl,
        setMinuteslbl,
        secondslbl,
        setSecondslbl,
        countdisplay,
        setCountdisplay,
        specificdate,
        setSpecificdate,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
    } = context;
    // Custom CSS for the OR divider
    const orDividerStyle = {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        margin: "16px 0",
    };

    const dividerLineStyle = {
        flex: 1,
        borderBottom: "1px solid #D9DCE1", // Matches Polaris divider color
    };

    const orTextStyle = {
        color: "#637381", // Matches Polaris secondary text color
        fontSize: "14px",
        fontWeight: 600,
    };
    const handleSelectday = useCallback((value) => {
        if (value === "" || Number(value) >= 0) {
            setDays(value);
        }
    }, []);

    const handleSelecthours = useCallback((value) => {
        if (value === "" || Number(value) >= 0) {
            setHours(value);
        }
    }, []);

    const handleSelectminutes = useCallback((value) => {
        if (value === "" || Number(value) >= 0) {
            setMinutes(value);
        }
    }, []);
    const handleSelectChange = useCallback(
        (value) => setSelectenddate(value),
        []
    );
    const handleChange = (newValue) => {
        setDateTime(newValue);
    };
    const handlespcificdate = (newValue) => {
        setSpecificdate(newValue);
    };

    const options = [
        { label: "Specific dates", value: "specific dates" },
        { label: "Till End Date", value: "till end date" },
        { label: "Duration", value: "duration" },
    ];

    const handlecountdisplay = useCallback(
        (newChecked) => setCountdisplay(newChecked),
        []
    );

    const handleChangeDayslbl = useCallback((value) => {
        setDayslbl(value);
    }, []);

    const handleChangeHourslbl = useCallback((value) => {
        setHourslbl(value);
    }, []);

    const handleChangeMinuteslbl = useCallback((value) => {
        setMinuteslbl(value);
    }, []);

    const handleChangeSecondslbl = useCallback((value) => {
        setSecondslbl(value);
    }, []);

    return (
        <Card>
            <Text variant="headingMd" as="h6">
                Date Selection
            </Text>
            <Box paddingBlock={100} />
            <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <InlineStack gap="400" wrap={false}>
                        <Box width="250px">
                            <Select
                                label="Date range"
                                options={options}
                                onChange={handleSelectChange}
                                value={selectenddate}
                            />
                        </Box>
                        <Box width="250px" paddingBlock={600}>
                            <InlineStack align="center" gap="100">
                                <Tooltip content="Show a timer counting down to the end of the event.">
                                    <Text>Show Countdown Timer</Text>
                                </Tooltip>
                                <ReactSwitch
                                    checked={countdisplay}
                                    onChange={handlecountdisplay}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                />
                            </InlineStack>
                        </Box>
                    </InlineStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    {selectenddate === "specific dates" && (
                        <>
                            <Box width="100%">
                                <Tooltip content="Only the date you choose will be counted for the countdown.">
                                    <TextField
                                        type="date"
                                        label="Select Specific date "
                                        value={specificdate}
                                        onChange={handlespcificdate}
                                    />
                                </Tooltip>
                            </Box>
                        </>
                    )}

                    {selectenddate === "till end date" && (
                        <>
                            <Box width="100%">
                                <Tooltip content="Choose the date and time the countdown will end">
                                    <TextField
                                        type="datetime-local"
                                        label="Select till date & time"
                                        value={dateTime}
                                        onChange={handleChange}
                                    />
                                </Tooltip>
                            </Box>
                        </>
                    )}

                    {selectenddate === "duration" && (
                        <InlineGrid columns={2} gap="200">
                            <Tooltip content="Set the date and time to begin the countdown">
                                <TextField
                                    type="datetime-local"
                                    label="Start Date (Your Local Time)"
                                    value={startDate}
                                    onChange={(value) => setStartDate(value)}
                                />
                            </Tooltip>
                            <Tooltip content="Select the date and time when the countdown ends">
                                <TextField
                                    type="datetime-local"
                                    label="End Date (Your Local Time)"
                                    value={endDate}
                                    onChange={(value) => setEndDate(value)}
                                />
                            </Tooltip>
                        </InlineGrid>
                    )}

                    {/* <Text variant="headingSm" as="h6">
                        Timer Labels
                    </Text>
                      <InlineGrid columns={4} gap="200">
                        <TextField  placeholder='Days'  value={dayslbl} onChange={handleChangeDayslbl}/>
                        <TextField  placeholder='Hours' value={hourslbl} onChange={handleChangeHourslbl}/>
                        <TextField  placeholder='Minutes' value={minuteslbl} onChange={handleChangeMinuteslbl}/>
                        <TextField  placeholder='Seconds' value={secondslbl} onChange={handleChangeSecondslbl}/>
                    </InlineGrid > */}
                </Grid.Cell>
            </Grid>

            <Box style={orDividerStyle}>
                <div style={dividerLineStyle}></div>
                <Text variant="bodyMd" as="span" style={orTextStyle}>
                    OR
                </Text>
                <div style={dividerLineStyle}></div>
            </Box>
            <Text variant="headingMd" as="h6">
                Countdown Duration
            </Text>
            <InlineGrid columns={3} gap="300">
                <Tooltip content="Countdown will use only this number of days.">
                    <TextField
                        type="number"
                        label="Days"
                        onChange={handleSelectday}
                        value={days}
                    />
                    <Box paddingBlock={100}>
                        <Badge progress="complete">
                            Countdown will use only this number of days.
                        </Badge>
                    </Box>
                </Tooltip>
                <Tooltip content="Countdown will use only these hours.">
                    <TextField
                        type="number"
                        label="Hours"
                        onChange={handleSelecthours}
                        value={hours}
                    />
                    <Box paddingBlock={100}>
                        <Badge progress="complete">
                            Countdown will use only these hours.
                        </Badge>
                    </Box>
                </Tooltip>
                <Tooltip content="Countdown will use only these minutes.">
                    <TextField
                        type="number"
                        label="Minutes"
                        onChange={handleSelectminutes}
                        value={minutes}
                    />
                    <Box paddingBlock={100}>
                        <Badge progress="complete">
                            Countdown will use only these minutes.
                        </Badge>
                    </Box>
                </Tooltip>
            </InlineGrid>
        </Card>
    );
}
