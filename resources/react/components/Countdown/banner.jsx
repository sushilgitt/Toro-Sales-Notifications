import React, { useState, createContext } from "react";
import { Box, Page, Tabs } from "@shopify/polaris";
import Details from "./details";
import Countdownsetup from "./countdownsetup";
import Style from "./style";
import Visibility from "./visibility";
import Preeview from "./preeview";
import BannerList from "../../pages/bannerlist";
import { useNavigate } from "react-router-dom";
import BannerContext, { useBannerData } from "./bannercontext";

export const UserContext = createContext();

export default function Banner() {
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();
    const bannerData = useBannerData();

    const handleTabChange = (selectedTabIndex) => setSelected(selectedTabIndex);

    const tabs = [
        {
            id: "Basic-Details",
            content: "Basic Details",
            render: () => <Details />,
        },
        {
            id: "Countdown-Setup",
            content: "Countdown Setup",
            render: () => <Countdownsetup/>,
        },
        {
            id: "Style-settings",
            content: "Style Settings",
            render: () => <Style />,
        },
        {
            id: "Visibility-settings",
            content: "Visibility Settings",
            render: () => <Visibility />,
        },
    ];

   const handleSave = async () => {
     if (!bannerData.name || bannerData.name.trim() === '') {
        shopify.toast.show('Banner Name is required', { isError: true });
        return;
     }
     if (bannerData.pageUrl && bannerData.hidePageUrl && bannerData.pageUrl === bannerData.hidePageUrl) {
        shopify.toast.show('Page URL and Hide Page URL cannot be the same', { isError: true });
        return;
     }
     
  try {
    const response = await fetch('/api/storebanner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: bannerData.name,
        details: {
          bannerContent: bannerData.bannerContent,
          pageUrl: bannerData.pageUrl,
          hidePageUrl: bannerData.hidePageUrl,
          buttonText: bannerData.buttonText,
          destinationUrl: bannerData.destinationUrl,
          selected: bannerData.selected,
          checked: bannerData.checked,
          selectenddate: bannerData.selectenddate,
          dateTime: bannerData.dateTime,
          days: bannerData.days,
          hours: bannerData.hours,
          minutes: bannerData.minutes,
          selectedplace: bannerData.selectedplace,
          dayslbl: bannerData.dayslbl,
          hourslbl: bannerData.hourslbl,
          minuteslbl: bannerData.minuteslbl,
          secondslbl: bannerData.secondslbl,
          digitColor: bannerData.digitColor,
          labelColor: bannerData.labelColor,
          backgroundColor: bannerData.backgroundColor,
          labelgap: bannerData.labelgap,
          countdisplay:bannerData.countdisplay,
          specificdate:bannerData.specificdate,
          backgroundColorbanner: bannerData.backgroundColorbanner,
          textColor: bannerData.textColor,
          buttonTextColor: bannerData.buttonTextColor,
          buttonBackgroundColor: bannerData.buttonBackgroundColor,
          selectedbanner: bannerData.selectedbanner,
          rangeValue: bannerData.rangeValue,
          fontValue: bannerData.fontValue,
          fontType: bannerData.fontType,
          buttonWidth: bannerData.buttonWidth,
          buttonHeight: bannerData.buttonHeight,
          selectedBackgroundImage: bannerData.selectedBackgroundImage,
          bannerpos: bannerData.bannerpos,
          closebtn: bannerData.closebtn,
          startDate: bannerData.startDate,
          endDate: bannerData.endDate,
          show: bannerData.show,
          hide: bannerData.hide,
          sticky: bannerData.sticky,
        }
      })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      navigate('/bannerlist');
      shopify.toast.show('Banner Created Sucessfully!');
    } else {
      console.error('Failed to save banner:', result.message || result.error);
    }
  } catch (error) {
    console.error('Error saving banner:', error);
  }
};
    return (
        <Page title="Create Banner" backAction={{ onAction: () =>  navigate('/bannerlist')}}
         primaryAction={{content: 'Save',onAction: handleSave}}>
         
            <BannerContext.Provider value={bannerData}>
                <Preeview/>
                <Box paddingBlock={300}/>
                <Tabs
                    tabs={tabs}
                    selected={selected}
                    onSelect={handleTabChange}
                >
                    {tabs[selected].render && tabs[selected].render()}
                </Tabs>
         </BannerContext.Provider>
        </Page>
    );
}
