
function myJQueryCode() {
    // console.log("showModal is called");
    $host_data = $("#host_url").data();
    $brand_dec = $("#brand-description").data();
    $brand_img = $("#brand-image").data();
    // console.log("host", $brand_img.src);
    // console.log("mcAppData", mcAppData);

    const appBaseUrl = (window.couponCodeAppBaseUrl || "").replace(/\/$/, "");
    if (!appBaseUrl) {
        console.warn("Coupon Code app base URL is not configured.");
        return;
    }

    fetch(
        `${appBaseUrl}/api/coupon_data`,
        {
            method: "POST",
            body: JSON.stringify(mcAppData),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        },
    )
        .then((response) => response.json())
        .then((data) => {
            const { mainSettings } = data;
            // console.log("data", data);
            if (data && Array.isArray(mainSettings)) {
                // console.log(setting.customizes[0].displayRadio);
                const modalContent = `<div id="modal-container" style="z-index: 999999;">
                        <div class="modal_left_top" style="position:fixed;top:0;left:0;display: flex;flex-direction: column-reverse;gap:10%;"></div>

                        <div class="modal_left_center" style="position:fixed;left: 50%; transform: translateX(-50%); top: 0;display: flex;flex-direction: column-reverse;gap:10%;"></div>

                        <div class="modal_right_top" style="position:fixed;right: 0; top: 0;display: flex;flex-direction: column-reverse;gap:10%;"></div>

                        <div class="modal_middle_left" style="position:fixed;left: 0; top: 50%; transform: translateY(-50%);display: flex;flex-direction: column-reverse;gap:10%;"></div>

                        <div class="modal_middle_center" style="position:fixed;left: 50%; top: 50%; transform: translate(-50%, -50%);display: flex;flex-direction: column-reverse;gap:10%;"></div>

                        <div class="modal_middle_right" style="position:fixed;right: 0; top: 50%; transform: translateY(-50%);display: flex;flex-direction: column-reverse;gap:10%;"></div>

                        <div class="modal_bottom_left" style="position:fixed;left: 0; bottom: 0;display: flex;flex-direction: column-reverse;gap:10%;"></div>

                        <div class="modal_bottom_center" style="position:fixed;left: 50%; transform: translateX(-50%); bottom: 0;display: flex;flex-direction: column-reverse;gap:10%;"></div>
                        
                        <div class="modal_bottom_right" style="position:fixed;right: 0; bottom: 0;display: flex;flex-direction: column-reverse;gap:10%;"></div>

                    </div>`;
                $("body").append(modalContent);

                mainSettings.forEach((setting, index) => {
                    // console.log("setting----", setting);
                    // console.log("999999", setting.triggers.displayFrequency);

                    const mainimage = setting?.image ? setting?.image :
                        main_image;

                    var parentDiv = ".modal_middle_center";
                    const closeStyle =
                        setting.displays.checkedClose === 0 ? "none" : "";

                    switch (setting.displays.triggerType) {
                        case "Top Left":
                            parentDiv = ".modal_left_top";
                            break;
                        case "Top Center":
                            parentDiv = ".modal_left_center";
                            break;
                        case "Top Right":
                            parentDiv = ".modal_right_top";
                            break;
                        case "Middle Left":
                            parentDiv = ".modal_middle_left";
                            break;
                        case "Middle Center":
                            parentDiv = ".modal_middle_center";
                            break;
                        case "Middle Right":
                            parentDiv = ".modal_middle_right";
                            break;
                        case "Bottom Left":
                            parentDiv = ".modal_bottom_left";
                            break;
                        case "Bottom Center":
                            parentDiv = ".modal_bottom_center";
                            break;
                        case "Bottom Right":
                            parentDiv = ".modal_bottom_right";
                            break;
                        default:
                            parentDiv = ".modal_middle_center";
                            break;
                    }

                    const getAnimationStyle = (selectedAnimation, selectedEntrance) => {
                        switch (selectedAnimation || selectedEntrance) {
                            case "Heartbeat":
                                return 'beat 0.25s infinite alternate';
                            case "Bounce":
                                return 'bounce 0.5s infinite alternate';
                            case "Flash":
                                return 'flash 0.3s infinite alternate';
                            case "Pulse":
                                return 'pulse 0.5s infinite alternate';
                            case "Fade In":
                                return 'fade-in 0.85s cubic-bezier(0.65, 0, 0.35, 1) both';
                            case "Slide In Up":
                                return 'slide-up 0.85s cubic-bezier(0.65, 0, 0.35, 1) both';
                            case "Slide In Down":
                                return 'slideDown 0.85s cubic-bezier(0.65, 0, 0.35, 1) both';
                            case "Zoom In":
                                return 'zoomIn 2s';
                            case "Bounce In":
                                return 'bounce-in 2s';
                            default:
                                return 'unset';
                        }
                    };

                    const getBorderRadius = (displayRadio) => {
                        switch (displayRadio) {
                            case 'Straight':
                                return '0';
                            case 'Rounded':
                                return '12px';
                            case 'Highly rounded':
                                return '20px';
                            default:
                                return '0';
                        }
                    };

                    const getTransformTransition = (selectedhover) => {
                        switch (selectedhover) {
                            case 1.1:
                                return 'transform 0.2s ease';
                            case 1.05:
                                return 'transform 0.5s ease';
                            case 0.9:
                                return 'transform 0.2s ease';
                            case 0.95:
                                return 'transform 0.5s ease';
                            default:
                                return '';
                        }
                    };

                    const getBackgroundImageUrl = (url) => {
                        // console.log("url", url);
                        // console.log("imageUrl", image1);

                        let imageUrl = "";

                        switch (url) {
                            case "image-1":
                                imageUrl = image1;
                                break;
                            case "image-2":
                                imageUrl = image2;
                                break;
                            case "image-3":
                                imageUrl = image3;
                                break;
                            case "image-4":
                                imageUrl = image4;
                                break;
                            case "image-5":
                                imageUrl = image5;
                                break;
                            case "image-6":
                                imageUrl = image6;
                                break;
                            case "image-7":
                                imageUrl = image7;
                                break;
                            case "image-8":
                                imageUrl = image8;
                                break;
                            case "image-9":
                                imageUrl = image9;
                                break;
                            default:
                                imageUrl = "";
                        }
                        return `url(${imageUrl})`;
                    };
                    
                    const getButton = (checkedNewTab, buttonColor, buttonTextColor, buttonURL, buttonText) => {
                        return checkedNewTab === 1
                            ? `<button class="claim_btn" style="font-weight: bold; border: 1px solid rgb(42, 112, 255); background-color:${buttonColor}; width: 200px; padding: 10px; margin-top: 12%; color: ${buttonTextColor}; margin-bottom: 4%;">
                              <a href="${buttonURL}" style="text-decoration: none; color: white;">${buttonText}</a>
                             </button>`
                            : `<button class="claim_btn" style="font-weight: bold; border: 1px solid rgb(42, 112, 255); background-color: ${buttonColor}; width: 200px; padding: 10px; margin-top: 12%; color: ${buttonTextColor}; margin-bottom: 4%;">${buttonText}</button>`;
                    }

                    const getBrand = (checkedBrand, description, src) => {
                        return checkedBrand === 1
                            ? `<div> 
                                  <img src="${src}" style="max-width: 35%; float:right; margin-left: 6px; ">                                 
                               </div>`
                            : '';
                    }

                    const modal = `
                    <div id="cpwidgetdiv-${index}" dir="${setting.displays.triggerDirection === 'Right to left' ? 'rtl' : ''}" class="content cpwidgetdiv"
                      style="
                        box-shadow: ${setting.customizes.checkedshedow === 1 ? 'rgba(0, 0, 0, 0.3) 0px 6px 6px' : ''};
                        margin-top: 6%;
                        // direction: ${setting.displays.triggerDirection === 'Right to left' ? 'rtl' : 'ltr'}
                        // float: left;
                        animation: ${getAnimationStyle(setting.customizes.selectedanimation, setting.customizes.selectedentrance)};
                        z-index: 99999;
                        background-color: ${setting.customizes.BackgroundColor};
                        background-image: ${getBackgroundImageUrl(setting.customizes.selectedBackgroundImage)};
                        padding: ${setting.customizes.rangeValuePadding}px;
                        border-width: ${setting.customizes.rangeValueWidth}px;
                        border-color: ${setting.customizes.BorderColor};
                        border-radius: ${getBorderRadius(setting.customizes.displayRadio)};
                        transition: ${getTransformTransition(setting.customizes.selectedhover)};
                      ">
                      <span class="close" id="close-${index}" style="float: ${setting.displays.triggerDirection === 'Right to left' ? 'left' : 'right'};">

                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" style="display: ${closeStyle}; fill: ${setting.customizes.CloseButtonTextColor};" viewBox="0 0 512 512">
                          <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>
                        </svg>
                      </span>
                  
                    <div class="main-div" style="display: flex; justify-content: center;align-items: center;">
                    
                    <div class="main-div-child" style=" display: flex; align-items: center; justify-content: center; gap: 20px;">
                         <div> 
                          <img src="${mainimage}" alt="${setting.altText}" style="max-width: 100%; max-height: 100%; border-radius: 15%; padding:20px; filter: drop-shadow(8px 8px 16px rgba(0, 0, 0, 0.6));"> 
                         </div>
                         <div class="vertical" style="border-left: 4px dotted ${setting.customizes.verticalLine};height: 331px;">&nbsp;</div>
                          <div style="text-align: center; ">
                                <div class="description" style="font-weight: bold; color: ${setting.customizes.TitleColor}; font-size:${setting.customizes.TitleFontSize + 'px'}; text-shadow: 1px 1px ${setting.customizes.TitleColor};">${setting.description}
                                </div>
                                <h3  class="subdescription" style="margin-top: 10px; margin-bottom: 20px; color: ${setting.customizes.DecriptionColor}; font-size:${setting.customizes.DecriptionFontSize + 'px'}; font-weight: 500;">${setting.subdescription}</h3>

                             <div> 
                               <div class="coupon-container" style="color:${setting.customizes.CouponColor}; background-color: ${setting.customizes.CouponBgColor}; border-style:${setting.customizes.CouponBorderStyle}; border-width:${setting.customizes.CouponBorderSize + 'px'}; border-color:${setting.customizes.CouponBorderColor};">
                                    <span class="coupon-code" id="couponcode">${setting.couponCode}</span>
                                     <button class="copy-button" id="copyButton" style="color:${setting.customizes.copyButtonColor}; background-color: ${setting.customizes.copyButtonbgColor};">Copy</button>
                               </div>
                             <div> 
                    
                            <div>
                              ${getButton(setting.checkedNewTab, setting.customizes.ButtonColor, setting.customizes.ButtonTextColor, setting.ButtonURL, setting.buttonText)}
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  `;

                    $(document).on("click", "#copyButton", function () {
                        handlecopy(setting.couponCode);
                    });



                    if (setting.triggers.schedule == 1) {
                        var currentDate = new Date();
                        console.log(currentDate, "currentDate");
                        // console.log(setting.triggers.endDate);
                        // console.log(setting.triggers.startDate);
                        var startDate = new Date(setting.triggers.startDate);
                        var endDate = new Date(setting.triggers.endDate);
                        if (currentDate >= startDate && currentDate <= endDate) {
                            if (setting.triggers.displaytriggerType == "Delay") {
                                setTimeout(function () {
                                    triggers();
                                }, setting.triggers.cssSelector * 1000);
                            } if (setting.triggers.displaytriggerType == "Mouse click") {

                                $(`${setting.triggers.cssSelector}`).click(function () {
                                    triggers();
                                });
                            } if (setting.triggers.displaytriggerType == "Mouse hover") {
                                $(`${setting.triggers.cssSelector}`).hover(function () {
                                    triggers();
                                });
                            } if (setting.triggers.displaytriggerType == "Scroll Percentage") {
                                $(window).scroll(function () {
                                    if ($(this).scrollTop() >= setting.triggers.cssSelector) {
                                        triggers();
                                    }
                                });
                            } if (setting.triggers.displaytriggerType == "Exit Intent") {
                                console.log("mouseclick", setting.triggers.displaytriggerType);
                                $(window).mouseout(function () {
                                    triggers();
                                });
                            }

                        } else {
                            console.log("this date is not between start date and end date");
                            $(`#cpwidgetdiv-${index}`).hide();
                        }
                    } else {
                        if (setting.triggers.displaytriggerType == "Delay") {
                            setTimeout(function () {
                                triggers();
                            }, setting.triggers.cssSelector * 1000);
                        } if (setting.triggers.displaytriggerType == "Mouse click") {

                            $(`${setting.triggers.cssSelector}`).click(function () {
                                triggers();
                            });
                        } if (setting.triggers.displaytriggerType == "Mouse hover") {

                            $(`${setting.triggers.cssSelector}`).hover(function () {
                                triggers();
                            });
                        } if (setting.triggers.displaytriggerType == "Scroll Percentage") {
                            $(window).scroll(function () {
                                if ($(this).scrollTop() >= setting.triggers.cssSelector) {
                                    triggers();
                                }
                            });
                        } if (setting.triggers.displaytriggerType == "Exit Intent") {
                            console.log("mouseclick", setting.triggers.displaytriggerType);
                            $(window).mouseout(function () {
                                triggers();
                            });
                        }
                    }

                    if (setting.triggers.displayFrequency == "All the time") {
                        $(`#modal-container ${parentDiv}`).append(modal);
                    }

                    if (setting.triggers.displayFrequency == "Once per browser") {
                        const couponKey = `popState-${setting?.id}`;
                        console.log("once per brwoser", couponKey);
                        console.log(localStorage);
                        if (localStorage.getItem(couponKey) != 'shown') {
                            $(`#modal-container ${parentDiv}`).append(modal);
                            console.log("call local");
                            // $(`#cpwidgetdiv-${index}`).hide();
                            // localStorage.setItem('popState', 'shown');
                            localStorage.setItem(couponKey, 'shown');
                        } else {
                            console.log("else call 258");
                            $(`#cpwidgetdiv-${index}`).hide();
                        }
                    }

                    setTimeout(function () {
                        $(`#cpwidgetdiv-${index}`).hide();
                    }, setting.displays.value * 1000);


                    function triggers() {
                        if (setting.customizes.selectedanimation != "null") {
                            setInterval(function () {
                                if (setting.triggers.checkedAllpage === 0) {
                                    // console.log("check");
                                    // console.log("aaaaaaa",setting.triggers.fullUrl);
                                    if (
                                        setting.triggers.selectedpage == "Exact match"
                                    ) {
                                        // console.log(setting.triggers.selectedpage);
                                        if (
                                            setting.triggers.fullUrl == $host_data.url
                                        ) {
                                            console.log("if");
                                            $(`#cpwidgetdiv-${index}`).show();
                                        } else {
                                            console.log("else");
                                        }
                                    }
                                    if (
                                        setting.triggers.selectedpage ==
                                        "Does not match exact"
                                    ) {
                                        // console.log(setting.triggers.selectedpage);
                                        if (
                                            setting.triggers.fullUrl === $host_data.url
                                        ) {
                                            console.log("dose");
                                            $(`#cpwidgetdiv-${index}`).hide();
                                        } else {
                                            console.log("dose not");
                                            $(`#cpwidgetdiv-${index}`).show();
                                        }
                                    }
                                    if (setting.triggers.selectedpage == "Contains") {
                                        if (
                                            $host_data.url.indexOf(
                                                setting.triggers.fullUrl,
                                            ) !== -1
                                        ) {
                                            // console.log(1);
                                            $(`#cpwidgetdiv-${index}`).show(); 
                                        } else {
                                            // console.log(0);
                                            $(`#cpwidgetdiv-${index}`).hide(); 
                                        }
                                    }
                                    if (
                                        setting.triggers.selectedpage ==
                                        "Does not contain"
                                    ) {
                                        if (
                                            $host_data.url.indexOf(
                                                setting.triggers.fullUrl,
                                            ) !== -1
                                        ) {
                                            $(`#cpwidgetdiv-${index}`).hide();
                                        } else {
                                            $(`#cpwidgetdiv-${index}`).show();
                                        }
                                    }
                                    if (
                                        setting.triggers.selectedpage == "Starts with"
                                    ) {
                                        if (
                                            $host_data.url.startsWith(
                                                setting.triggers.fullUrl,
                                            )
                                        ) {
                                            $(`#cpwidgetdiv-${index}`).show();
                                        } else {
                                            $(`#cpwidgetdiv-${index}`).hide();
                                        }
                                    }
                                    if (
                                        setting.triggers.selectedpage ==
                                        "Does not start with"
                                    ) {
                                        if (
                                            $host_data.url.startsWith(
                                                setting.triggers.fullUrl,
                                            )
                                        ) {
                                            $(`#cpwidgetdiv-${index}`).hide();
                                        } else {
                                            $(`#cpwidgetdiv-${index}`).show();
                                        }
                                    }
                                    if (setting.triggers.selectedpage == "Ends with") {
                                        if (
                                            $host_data.url.endsWith(
                                                setting.triggers.fullUrl,
                                            )
                                        ) {
                                            $(`#cpwidgetdiv-${index}`).show();
                                        } else {
                                            $(`#cpwidgetdiv-${index}`).hide();
                                        }
                                    }
                                    if (
                                        setting.triggers.selectedpage ==
                                        "Does not end with"
                                    ) {
                                        if (
                                            $host_data.url.endsWith(
                                                setting.triggers.fullUrl,
                                            )
                                        ) {
                                            $(`#cpwidgetdiv-${index}`).hide();
                                        } else {
                                            $(`#cpwidgetdiv-${index}`).show();
                                        }
                                    }
                                    if (
                                        setting.triggers.selectedpage == "Page Contains"
                                    ) {
                                        const entirePageContent =
                                            document.documentElement.innerHTML;
                                        const isTishaPresent =
                                            entirePageContent.includes(
                                                setting.triggers.fullUrl,
                                            );
                                        if (isTishaPresent) {
                                            console.log(1);
                                            $(`#cpwidgetdiv-${index}`).show();
                                        } else {
                                            console.log(0);
                                            $(`#cpwidgetdiv-${index}`).hide();
                                        }
                                    }
                                } else {
                                    $(`#cpwidgetdiv-${index}`).show();
                                }
                            }, setting.customizes.weight * 1000);
                        }
                    }

                    $(`#cpwidgetdiv-${index}`).hide();
                    $(`#close-${index}`).click(function () {
                        console.log("click callllllll");
                        if (setting.customizes.selectedexit === "Fade Out") {
                            $(`#cpwidgetdiv-${index}`).css("animation", "fade-out 0.85s cubic-bezier(0.65, 0, 0.35, 1) both");

                        } else if (setting.customizes.selectedexit === "Slide Out Up") {
                            $(`#cpwidgetdiv-${index}`).css("animation", "slide-out-up 0.85s cubic-bezier(0.65, 0, 0.35, 1) both");

                        } else if (setting.customizes.selectedexit === "Slide Out Down") {
                            $(`#cpwidgetdiv-${index}`).css("animation", "slideoutDown 0.85s cubic-bezier(0.65, 0, 0.35, 1) both");

                        } else if (setting.customizes.selectedexit === "Zoom Out") {
                            $(`#cpwidgetdiv-${index}`).css("animation", "zoomOut 2s");

                        } else if (setting.customizes.selectedexit === "Bounce Out") {
                            $(`#cpwidgetdiv-${index}`).css("animation", "bounce-out 2s");

                        } else {
                            $(`#cpwidgetdiv-${index}`).remove();
                        }
                        $(`#cpwidgetdiv-${index}`).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
                            $(this).remove();
                        });
                    });

                    $(`#cpwidgetdiv-${index}`).mouseover(function () {
                        $(this).css("transform", `scale(${setting.customizes.selectedhover})`);
                    });
                    $(`#cpwidgetdiv-${index}`).mouseout(function () {
                        $(this).css("transform", "none");
                    });

                });
            } else {
                console.error(
                    "Expected data.mainSettings array, but got:",
                    data,
                );
            }

        const { countdown } = data;
        if (data && Array.isArray(countdown)) {
            
            countdown.forEach((setting, index) => {
                // console.log(`countdown ${index} selectedbanner:`, setting.details[0]?.selectedbanner);

                const detail = setting.details[0];

                const currentPageUrl = window.location.href;

                if ((detail.pageUrl && detail.pageUrl !== currentPageUrl) ||
                    (detail.hidePageUrl && detail.hidePageUrl === currentPageUrl)) {
                    return;
                }

                const justifyContent = detail.selectedbanner === "left"
                    ? "flex-start"
                    : detail.selectedbanner === "right"
                    ? "flex-end"
                    : "center";

                const closeBtnDisplay = detail.closebtn === true ? 'none' : 'inline';

                let labelGap = '20px';
                switch (detail.labelgap) {
                    case 'small':
                        labelGap = '10px';
                        break;
                    case 'medium':
                        labelGap = '30px';
                        break;
                    case 'large':
                        labelGap = '40px';
                        break;
                    case 'extra large':
                        labelGap = '50px';
                        break;
                    default:
                        labelGap = '20px';
                }

                const newtab = detail.checked === true || detail.checked === "true" || detail.checked === "True";
                const buttonLink = detail.destinationUrl || "#";

                const buttontype = detail.selected === 'default button' || detail.selected === 'text link' || detail.selected === 'square button' || detail.selected === 'round button';
                const buttonStyle = `
                    ${buttontype ? (
                        detail.selected === 'text link' ? 'display: inline; background-color: transparent; text-decoration: underline; cursor: pointer;' :
                        detail.selected === 'square button' ? 'border-radius: 0;' :
                        detail.selected === 'round button' ? 'border-radius: 50%;' :
                        'border-radius: 4px; '
                    ) : 'border-radius: 4px;'}
                `;

                const BackgroundImagebanner = (url) => {
                    const imageKey = url?.split('/').pop()?.replace('.jpg', '').trim();
                    let imagebanner = "";
                    switch (imageKey) {
                        case "bg":
                            imagebanner = bg;
                            break;
                        case "bg1":
                            imagebanner = bg1;
                            break;
                        case "bg2":
                            imagebanner = bg2;
                            break;
                        case "bg3":
                            imagebanner = bg3;
                            break;
                        case "bg4":
                            imagebanner = bg4;
                            break;
                        case "bg5":
                            imagebanner = bg5;
                            break;
                        case "bg6":
                            imagebanner = bg6;
                            break;
                        case "bg7":
                            imagebanner = bg7;
                            break;
                        case "bg8":
                            imagebanner = bg8;
                            break;
                        case "bg9":
                            imagebanner = bg9;
                            break;
                        default:
                            imagebanner = "";
                    }
                    return imagebanner ? `url(${imagebanner})` : "none";
                };


                    const initialHours = Number(detail.hours) || 0;
                    const initialDays = Number(detail.days) || 0;
                    const initialMinutes = Number(detail.minutes) || 0;

                    const startdate = detail.startDate;
                    const enddate = detail.endDate;
                    const datetime = detail.dateTime;
                    const specificDate = detail.specificdate;

                    const bannerId = `countdown-banner-${index}`;
                    const daysId = `countdown-days-${index}`;
                    const hoursId = `countdown-hours-${index}`;
                    const minutesId = `countdown-minutes-${index}`;
                    const secondsId = `countdown-seconds-${index}`;

                    const uniqueKey = `countdown-target-${index}`;
                    const buttonId = `countdown-button-${index}`;
                    let targetTime = null;

                   let bannerMessage = '';

                    const now = new Date();

                    if (specificDate) {
                        const specific = new Date(specificDate);
                        const specificDayStart = new Date(specific.getFullYear(), specific.getMonth(), specific.getDate());
                        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

                        const isSameDay = specificDayStart.getTime() === todayStart.getTime();
                        const isBefore = specificDayStart.getTime() > todayStart.getTime();
                        const isAfter = specificDayStart.getTime() < todayStart.getTime();

                        if (isSameDay) {
                            targetTime = new Date(specific.getFullYear(), specific.getMonth(), specific.getDate(), 23, 59, 59, 999);
                            bannerMessage = "🎉 It's Here! One-Day Sale Ends Tonight!";
                        } else if (isBefore) {
                            targetTime = null;
                             const formattedDate = specific.toLocaleDateString('en-GB', {
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric'
                            });
                            bannerMessage = `⏳ Big Sale Coming on ${formattedDate}!`;
                        } else if (isAfter) {
                            targetTime = null;
                            bannerMessage = '⚠️ The One-Day Sale Has Ended. Stay Tuned for More Offers!';
                        }

                    } else if(datetime) {
                        targetTime = new Date(datetime);  
                    } else if (startdate && enddate) {
                        const start = new Date(startdate);
                        const end = new Date(enddate);
                        const now = new Date();

                        if (now < start) {
                            targetTime = null;  
                        }
                        else if (now >= start && now <= end) {
                            targetTime = end;  
                        }
                        else {
                            targetTime = null;
                        }
                    } else {
                        const now = new Date();
                        targetTime = new Date(
                            now.getTime() + 
                            (initialDays * 24 * 60 * 60 * 1000) +  
                            (initialHours * 60 * 60 * 1000) +      
                            (initialMinutes * 60 * 1000)           
                        );
                    }
                    detail.bannerContent = bannerMessage;

                    function calculateCountdown() {
                        if (targetTime) {
                            const now = new Date();
                            let diff = targetTime - now;
                            if (diff < 0) diff = 0;  

                            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                            const minutes = Math.floor((diff / (1000 * 60)) % 60);
                            const seconds = Math.floor((diff / 1000) % 60);

                            if (days === 1 && hours === 0 && minutes === 0 && seconds === 0) {
                                return {
                                    days: '01',
                                    hours: '00',
                                    minutes: '00',
                                    seconds: '00',
                                    message: '1 Day Left!'
                                };
                            }

                            return {
                                days: String(days).padStart(2, '0'),
                                hours: String(hours).padStart(2, '0'),
                                minutes: String(minutes).padStart(2, '0'),
                                seconds: String(seconds).padStart(2, '0'),
                                message: '' 
                            };
                        } else {
                            return { days: '00', hours: '00', minutes: '00', seconds: '00', message: '' };
                        }
                    }

                    function updateCountdown() {
                        const { days, hours, minutes, seconds, message } = calculateCountdown();

                        $(`#${daysId}`).text(days);
                        $(`#${hoursId}`).text(hours);
                        $(`#${minutesId}`).text(minutes);
                        $(`#${secondsId}`).text(seconds);

                        if (days === '00' && hours === '00' && minutes === '00' && seconds === '00' && message) {
                        }
                    }
               
                // const positionStyle = detail.sticky === true ? 'fixed' : 'absolute';

                let positionStyle = 'relative';
                let positionOffset = '';

                if (detail.bannerpos === 'bottom') {
                    if (detail.sticky === true) {
                        positionStyle = 'fixed';
                        positionOffset = 'bottom: 0; top: auto;';
                    } else {
                        positionStyle = 'relative';  
                        positionOffset = '';         
                    }
                } else {
                    positionStyle = detail.sticky === true ? 'fixed' : 'absolute';
                    positionOffset = detail.sticky === true ? 'top: 0; bottom: auto;' : 'top: 0; bottom: auto;';
                }
                
                const banner = `<div id="${bannerId}" class="countdown-banner" style="z-index: 999999; background-color:${detail.backgroundColorbanner || '#ADD8E6'};
                    padding: 10px; text-align: center; border-radius: 5px; position: ${positionStyle}; width:100%; height:${detail.rangeValue || 60}px;
                    background-image: ${BackgroundImagebanner(detail.selectedBackgroundImage)};background-origin: border-box;
                   background-size: contain;
                     ${positionOffset}">
                    <div style="display: flex;justify-content: ${justifyContent}; align-items: center; gap: ${labelGap}; flex-wrap: wrap; font-size:${detail.fontValue || 15}px;font-family:${detail.fontType}">
                        <div style="${detail.selectedplace === 'left' ? 'order: 6;' : ''};color: ${detail.textColor || '#4634eb'}; font-weight: bold; margin-bottom: 10px;">
                            ${detail.bannerContent || '🚨 Hurry! Sale Ends Soon!'}
                        </div>
                        <div style="display: ${detail.countdisplay ? 'flex' : 'none'}; flex-direction: column; align-items: center;">
                            <span id="${daysId}" style="font-weight: bold;color: ${detail.digitColor || '#000000'}; background-color:${detail.backgroundColor}"></span>
                            <span style="color: ${detail.labelColor || '#000000'}">${detail.dayslbl || 'Days'}</span>
                        </div>
                        <div style="color: #333; display: ${detail.countdisplay ? 'flex' : 'none'}; flex-direction: column; align-items: center;">
                            <span id="${hoursId}" style="font-weight: bold;color: ${detail.digitColor || '#000000'};background-color:${detail.backgroundColor}"></span>
                            <span style="color: ${detail.labelColor || '#000000'}">${detail.hourslbl || 'Hours'}</span>
                        </div>
                        <div style="color: #333; display: ${detail.countdisplay ? 'flex' : 'none'}; flex-direction: column; align-items: center;">
                            <span id="${minutesId}" style="font-weight: bold;color: ${detail.digitColor || '#000000'};background-color:${detail.backgroundColor}"></span>
                            <span style="color: ${detail.labelColor || '#000000'}">${detail.minuteslbl || 'Minutes'}</span>
                        </div>
                        <div style="color: #333; display: ${detail.countdisplay ? 'flex' : 'none'}; flex-direction: column; align-items: center;">
                            <span id="${secondsId}" style="font-weight: bold;color: ${detail.digitColor || '#000000'};background-color:${detail.backgroundColor}"></span>
                            <span style="color: ${detail.labelColor || '#000000'}">${detail.secondslbl || 'Seconds'}</span>
                        </div>
                        <button id="${buttonId}" style="color:${detail.buttonTextColor || '#fff'}; background-color:${detail.buttonBackgroundColor || '#333'}; font-size: 16px; font-weight: bold; padding: 8px 10px; border: none; border-radius: 4px; cursor: pointer; 
                         width:${detail.buttonWidth || 106}px; height:${detail.buttonHeight || 40}px; ${buttonStyle}">
                            ${detail.buttonText || 'Shop Now'}
                        </button>
                    </div>
                    <span style="position: absolute; top: -5px; right: 5px; cursor: pointer; color: #333; display:${closeBtnDisplay}" class="close-banner" id="close-banner-${index}">✖</span>
                </div>`;

                $('#modal-container').append(banner);

                $(`#${buttonId}`).on("click", (e) => {
                    e.preventDefault(); 
                    console.log(`Button ${buttonId} clicked - newtab:`, newtab, "buttonLink:", buttonLink);
                    if (newtab) {
                        window.open(buttonLink, "_blank", "noopener,noreferrer");
                    } else {
                        window.location.href = buttonLink;
                    }
                });

              if (targetTime) {
                    updateCountdown();
                    setInterval(updateCountdown, 1000);  
                } else {
                    updateCountdown();
                }

                $(`#close-banner-${index}`).click(function () {
                    $(`#${bannerId}`).hide();
                });

                const showDelay = parseInt(detail.show) || 0;
                const hideDelay = parseInt(detail.hide) || 0;

                if (showDelay > 0) {
                    $(`#${bannerId}`).hide();
                    setTimeout(() => {
                        $(`#${bannerId}`).show();
                        if (hideDelay > 0) {
                            setTimeout(() => {
                                $(`#${bannerId}`).hide();
                            }, hideDelay * 1000);
                        }
                    }, showDelay * 1000);
                } else {
                    $(`#${bannerId}`).show();
                    if (hideDelay > 0) {
                        setTimeout(() => {
                            $(`#${bannerId}`).hide();
                        }, hideDelay * 1000);
                    }
                }

            });
        }



        })
        .catch((error) => console.error("Error fetching data:", error));
}

function handlecopy(couponCode) {
    navigator.clipboard.writeText(couponCode);
    alert(`Copied the coupon code: ${couponCode}`);
}


if (typeof jQuery == "undefined") {
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement("script");
    jqTag.type = "text/javascript";
    jqTag.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    jqTag.defer = "defer";
    jqTag.onload = myJQueryCode;
    headTag.appendChild(jqTag);
} else {
    myJQueryCode();
}
