import { Card, InlineStack, Text, Box, Button, Icon } from "@shopify/polaris";
import React, { useContext, useEffect, useState } from "react";
import { XIcon } from "@shopify/polaris-icons";
import BannerContext from "./bannercontext";
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

export default function Preeview() {
    const context = useContext(BannerContext);

    if (!context) {
        console.error(
            "BannerContext is undefined. Ensure Preeview is wrapped in BannerContext.Provider.",
        );
        return (
            <Text variant="bodyMd" as="p">
                Error: Context not provided
            </Text>
        );
    }

    const {
        bannerContent,buttonText,destinationUrl,selected,checked,
        days: contextDays,hours: contextHours, minutes: contextMinutes,
        dayslbl,hourslbl,minuteslbl,secondslbl,
        digitColor,labelColor,backgroundColor,labelgap,
        countdisplay,specificdate,selectedplace,dateTime,backgroundColorbanner,
        textColor,buttonTextColor,buttonBackgroundColor,
        selectedbanner,rangeValue,fontValue,fontType,
        buttonWidth,buttonHeight,selectedBackgroundImage,closebtn,endDate,startDate,
    } = context;

    const gapMap = {
        none: "5px",
        small: "10px",
        medium: "20px",
        large: "30px",
        "extra large": "40px",
    };

    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

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
    ];

     const getImageUrlById = (id) => {
        const img = images.find(img => img.id == id);
        return img ? img.src : "";
    };

    const imaheurll = getImageUrlById(selectedBackgroundImage);


    useEffect(() => {
        let targetDate;

        const now = new Date();
        const specific = specificdate ? new Date(specificdate) : null;
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());


        if (specific) {
            const specificStart = new Date(specific.getFullYear(), specific.getMonth(), specific.getDate());
            const isSameDay = specificStart.getTime() === todayStart.getTime();

            if (isSameDay) {
                targetDate = new Date(
                    specific.getFullYear(),
                    specific.getMonth(),
                    specific.getDate(),
                    23, 59, 59, 999
                );
            } else {
                setTimeLeft({
                    days: "00",
                    hours: "00",
                    minutes: "00",
                    seconds: "00",
                });
                return;
            }
        }

     else if (start && end) {
            const nowTime = now.getTime();
            const startTime = start.getTime();
            const endTime = end.getTime();

            if (nowTime >= startTime && nowTime <= endTime) {
                targetDate = end;
            } else {
                setTimeLeft({
                    days: "00",
                    hours: "00",
                    minutes: "00",
                    seconds: "00",
                });
                return;
            }
        } else {
            targetDate = dateTime || endDate;
        }

        const isValidTargetDate = targetDate && !isNaN(new Date(targetDate).getTime());

        if (!isValidTargetDate) {
            setTimeLeft({
                days: contextDays ? String(contextDays).padStart(2, "0") : "00",
                hours: contextHours ? String(contextHours).padStart(2, "0") : "00",
                minutes: contextMinutes ? String(contextMinutes).padStart(2, "0") : "00",
                seconds: "00",
            });
            return;
        }

        const target = new Date(targetDate).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const diff = target - now;

            if (diff <= 0) {
                setTimeLeft({
                    days: "00",
                    hours: "00",
                    minutes: "00",
                    seconds: "00",
                });
                clearInterval(interval);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft({
                days: String(days).padStart(2, "0"),
                hours: String(hours).padStart(2, "0"),
                minutes: String(minutes).padStart(2, "0"),
                seconds: String(seconds).padStart(2, "0"),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [specificdate, startDate, endDate, dateTime, contextDays, contextHours, contextMinutes]);

    return (
        <Card padding="400">
            <Box paddingBlockEnd="300">
                <Text variant="headingMd" as="h6">
                    Preview
                </Text>
            </Box>
            <Box
                padding="400"
                borderRadius="300"
                style={{
                    backgroundColor: backgroundColorbanner || "#d9e6fa",
                    backgroundImage: selectedBackgroundImage
                        ? `url(${imaheurll})`
                        : "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: rangeValue || "60px",
                    fontSize: fontValue,
                    fontFamily: fontType,
                    justifyContent: selectedbanner === 'left' ? 'flex-start' :selectedbanner === 'right' ? 'flex-end' :'center',
                   backgroundOrigin: 'border-box', 
                   backgroundSize: 'contain', 
                }}
            >
                <InlineStack
                    gap="400"
                    align="center"
                    wrap={false}
                    blockAlign="center"
                    style={{
                        flexDirection:
                            selectedplace === "left" ? "row" : "row-reverse",
                    }}
                >
                    <Box
                        style={{
                            display: "flex",
                            order: selectedplace === "left" ? 2 : 1,
                            alignItems: "center",
                            minHeight: "60px",
                        }}
                    >
                        <p style={{ color: textColor }}>
                            {bannerContent || " 🎉 Hurry! Sale Ends Soon!"}
                        </p>
                    </Box>
                    <Box
                        style={{
                            display: "flex",
                            order: selectedplace === "left" ? 1 : 2,
                            alignItems: "center",
                            justifyContent: "center",
                            gap: gapMap[labelgap] || "400",
                            padding: "200",
                            borderRadius: "200",
                        }}
                    >
                    {countdisplay && (
                     <>
                            <Box style={{ textAlign: "center" }}>
                                <p style={{ color: digitColor, backgroundColor }}>
                                    {timeLeft.days}
                                </p>
                                <p style={{ color: labelColor }}>
                                    {dayslbl || "Days"}
                                </p>
                            </Box>
                            <Box style={{ textAlign: "center" }}>
                                <p style={{ color: digitColor, backgroundColor }}>
                                    {timeLeft.hours}
                                </p>
                                <p style={{ color: labelColor }}>
                                    {hourslbl || "Hours"}
                                </p>
                            </Box>
                            <Box style={{ textAlign: "center" }}>
                                <p style={{ color: digitColor, backgroundColor }}>
                                    {timeLeft.minutes}
                                </p>
                                <p style={{ color: labelColor }}>
                                    {minuteslbl || "Minutes"}
                                </p>
                            </Box>
                            <Box style={{ textAlign: "center" }}>
                                <p style={{ color: digitColor, backgroundColor }}>
                                    {timeLeft.seconds}
                                </p>
                                <p style={{ color: labelColor }}>
                                    {secondslbl || "Seconds"}
                                </p>
                            </Box>
                     </>
                     )}
                        {selected !== "none" && (
                            <Box
                                style={{
                                    display: "inline-block",
                                    overflow: "hidden",
                                }}
                            >
                                <button
                                    onClick={() =>
                                        window.open(
                                            destinationUrl,
                                            checked ? "_blank" : "_self",
                                        )
                                    }
                                    style={{
                                        color:
                                            selected === "text link"
                                                ? "black"
                                                : buttonTextColor,
                                        backgroundColor:
                                            selected === "text link"
                                                ? "transparent"
                                                : buttonBackgroundColor,
                                        width: `${buttonWidth}px`,
                                        height: `${buttonHeight}px`,
                                        borderRadius:
                                            selected === "round button"
                                                ? "50px"
                                                : selected === "square button"
                                                  ? "0px"
                                                  : selected ===
                                                      "default button"
                                                    ? "4px"
                                                    : selected === "text link"
                                                      ? "0px"
                                                      : "4px",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    {buttonText || "SHOP NOW"}
                                </button>
                            </Box>
                        )}
                    </Box>
                    <Box
                        style={{
                            position: "absolute",
                            top: "48px",
                            right: "20px",
                            cursor: "pointer",
                            display: closebtn ? "none" : "block",
                        }}
                    >
                        <Icon source={XIcon} tone="base" />
                    </Box>
                </InlineStack>
            </Box>
        </Card>
    );
}
