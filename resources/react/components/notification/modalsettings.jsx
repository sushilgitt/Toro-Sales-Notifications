import React from 'react';
import { XIcon } from "@shopify/polaris-icons";
import {
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
} from "/public/images-icon";
import { Card, Icon, InlineGrid, Modal, LegacyCard } from '@shopify/polaris';
import {
    ClipboardIcon
} from '@shopify/polaris-icons'; 

export function ModalSettings({ checkedClose, backgroundColorbox, backgroundImage, padding, border, backgroundColor, direction, file, image, description, altText, subdescription, couponCode, buttonText, showModal, setShowModal, TitleColor, DecriptionColor, BackgroundColor, ButtonColor, CloseButtonTextColor, ButtonTextColor, titleFontSize, decriptionFontSize, couponColor, couponBgColor, couponBorderColor, couponBorderSize, couponBorderStyle, verticalLine, copyButtonColor, copyButtonbgColor }) {

    console.log("backgroundImage", backgroundImage);
    console.log("checkedClose", checkedClose);

    const handleModalClose = () => setShowModal(false);
    const handleModalOpen = () => setShowModal(true);

    const images = [
        { src: null, alt: "Image 0", id: "image-0" },
        { src: image1, alt: "Image 1", id: "image-1" },
        { src: image2, alt: "Image 2", id: "image-2" },
        { src: image3, alt: "Image 3", id: "image-3" },
        { src: image4, alt: "Image 4", id: "image-4" },
        { src: image5, alt: "Image 5", id: "image-5" },
        { src: image6, alt: "Image 6", id: "image-6" },
        { src: image7, alt: "Image 7", id: "image-7" },
        { src: image8, alt: "Image 8", id: "image-8" },
        { src: image9, alt: "Image 9", id: "image-9" },
        { src: image3, alt: "Image 10", id: "image-10" },
    ];

    const getImageUrlById = (id) => {
        console.log("id  --", id);
        const img = images.find(img => img.id == id);
        console.log("img getImageUrlById", img);

        return img ? img.src : "";
    };

    const imaheurll = getImageUrlById(backgroundImage);
    console.log("imaheurl", imaheurll);

    const imaheurl = image ? image : "https://66socialproof.com/demo/themes/altum/assets/images/notifications/summer.jpg";

    const verticalleft = direction !== "Right to left" ? `4px dotted ${verticalLine}` : 'none';
    const verticalright = direction === "Right to left" ? `4px dotted ${verticalLine}` : 'none'

    return (<>
        <LegacyCard>
            <div style={{
                direction: `${direction === 'Right to left' ? 'rtl' : 'ltr'}`,
                padding: `10px`,
                // border: `${border}px solid`,
                borderColor: `${backgroundColor}`,
                backgroundImage: `url(${imaheurll})`,
                backgroundColor: `${backgroundColorbox}`
            }}>
                <InlineGrid columns={2}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={imaheurl}
                            alt={altText}
                            style={{
                                maxWidth: "100%",
                                // maxHeight: "50%",
                                borderRadius: "15%",
                                padding: "20px",
                                filter: "drop-shadow(8px 8px 16px rgba(0, 0, 0, 0.6))"
                            }}
                        />
                    </div>

                    <div style={{
                        borderLeft: verticalleft, borderRight: verticalright,
                        textAlign: "center"
                    }}>
                        <div style={{ float: `${direction === 'Right to left' ? 'left' : 'right'}`, color: CloseButtonTextColor }}>
                            <div id='closebtn' style={{ fontSize: "13px", borderColor: CloseButtonTextColor, color: CloseButtonTextColor, display: `${checkedClose == true ? 'block' : 'none'}`, fontWeight: "600" }}>x</div>

                            {/* <Icon source={XIcon} tone="base" /> */}
                        </div>
                        <div style={{
                            paddingLeft: `${direction === 'Right to left' ? '20px' : '20px'}`,
                            paddingRight: `${direction === 'Right to left' ? '20px' : '20px'}`
                        }}>
                            <p
                                style={{
                                    marginBottom: 10,
                                    fontWeight: "bold",
                                    color: TitleColor,
                                    fontSize: titleFontSize + 'px',
                                    textShadow: `1px 1px ${TitleColor}`,
                                    lineHeight: '27px',
                                    marginTop: '25px',
                                }}
                            >
                                {description}
                            </p>
                            <p
                                style={{
                                    marginBottom: 10,
                                    color: DecriptionColor,
                                    fontSize: decriptionFontSize + 'px',
                                    fontWeight: 500,
                                    marginTop: "5%",
                                }}
                            >
                                {subdescription}
                            </p>

                            <div>
                                {couponCode && (
                                    <div className="coupon-row" style={{
                                        color: couponColor,
                                        backgroundColor: couponBgColor,
                                        borderColor: couponBorderColor,
                                        borderStyle: couponBorderStyle,
                                        borderWidth: couponBorderSize + 'px',
                                        fontWeight: "bold",
                                        // textAlign: "center",
                                        padding: "5%",
                                        width: "100%",
                                        fontSize: "15px",
                                        marginTop: "7%",
                                        textAlign: `${direction === 'Right to left' ? 'left' : 'start'}`
                                    }}>
                                        <span id="cpnCode" style={{ fontSize: "14px" }}>{couponCode}</span>
                                        <button style={{ backgroundColor: copyButtonbgColor, color: copyButtonColor, border: "none", borderRadius: "0.25rem", cursor: "pointer", float: "right", padding: "6%", paddingLeft: "5%", paddingBottom: "4%", paddingTop: "3%" }}><Icon
                                            source={ClipboardIcon}
                                            tone="base"
                                        /></button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <button
                                    onClick={handleModalOpen}
                                    style={{
                                        fontWeight: "bold",
                                        border: "1px solid",
                                        backgroundColor: ButtonColor,
                                        borderColor: ButtonColor,
                                        width: "97%",
                                        padding: "10px",
                                        marginTop: "10%",
                                        color: ButtonTextColor,
                                        marginBottom: "10px"
                                    }}
                                >
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </InlineGrid>
            </div>
        </LegacyCard>

        {/* <Modal
            open={showModal}
            onClose={handleModalClose}
            title="Coupon Code"
            primaryAction={{
                content: "Close",
                onAction: handleModalClose,
            }}
        >
            <Modal.Section>
                <p style={{ fontWeight: "bold" }}>{couponCode}</p>
            </Modal.Section>
        </Modal> */}
    </>)

}


