import React, { useState, useEffect } from 'react';
import { Box, Page, Tabs } from '@shopify/polaris';
import Details from './details';
import Countdownsetup from './countdownsetup';
import Style from './style';
import Visibility from './visibility';
import Preeview from './preeview';
import { useNavigate, useParams } from 'react-router-dom';
import BannerContext, { useBannerData } from './bannercontext';

export default function Banneredit() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const bannerData = useBannerData();
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchBannerData = async (bannerId) => {
    try {
      const response = await fetch(`/api/getbannerid/${bannerId}`);
      const result = await response.json();
      if (result.success && result.data?.details?.[0]) {
        return result.data;
      } else {
        console.error('Error fetching banner:', result.message);
        return {};
      }
    } catch (error) {
      console.error('Error fetching banner:', error);
      return {};
    }
  };

  const saveBannerData = async () => {
  try {
    if (id) {
      const data = {
        name: bannerData.name,
        details: [
          {
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
            countdisplay: bannerData.countdisplay,
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
          },
        ],
      };

      const response = await fetch(`/api/updatebanner/${id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        navigate('/bannerlist');
        shopify.toast.show('Banner Update Sucessfully!');
      } else {
        console.error('Failed to update banner:', result.message);
      }
    }
  } catch (error) {
    console.error('Error saving banner:', error);
  }
};

  useEffect(() => {
    if (id && !hasInitialized) {
      fetchBannerData(id).then((data) => {
        if (!data || !data.details || !data.details[0]) return;
        const banner = data.details[0];

        bannerData.setName(data.name || '');
        bannerData.setBannerContent(banner.bannerContent || '');
        bannerData.setPageUrl(banner.pageUrl || '');
        bannerData.setHidePageUrl(banner.hidePageUrl || '');
        bannerData.setButtonText(banner.buttonText || '');
        bannerData.setDestinationUrl(banner.destinationUrl || '');
        bannerData.setSelected(banner.selected || 'none');
        bannerData.setChecked(banner.checked || false);
        bannerData.setSelectenddate(banner.selectenddate || 'till end date');
        bannerData.setDateTime(banner.dateTime || '');
        bannerData.setDays(banner.days || '');
        bannerData.setHours(banner.hours || '');
        bannerData.setMinutes(banner.minutes || '');
        bannerData.setSelectedplace(banner.selectedplace || 'right');
        bannerData.setDayslbl(banner.dayslbl || '');
        bannerData.setHourslbl(banner.hourslbl || '');
        bannerData.setMinuteslbl(banner.minuteslbl || '');
        bannerData.setSecondslbl(banner.secondslbl || '');
        bannerData.setDigitColor(banner.digitColor || '#000000');
        bannerData.setLabelColor(banner.labelColor || '#000000');
        bannerData.setBackgroundColor(banner.backgroundColor || '');
        bannerData.setLabelgap(banner.labelgap || 'none');
        bannerData.setCountdisplay(typeof banner.countdisplay === 'boolean' ? banner.countdisplay : true);
        bannerData.setSpecificdate(banner.specificdate || '');
        bannerData.setBackgroundColorbanner(banner.backgroundColorbanner || '');
        bannerData.setTextColor(banner.textColor || '#000000');
        bannerData.setButtonTextColor(banner.buttonTextColor || '#ffffff');
        bannerData.setButtonBackgroundColor(banner.buttonBackgroundColor || '#000000');
        bannerData.setSelectedbanner(banner.selectedbanner || 'center');
        bannerData.setRangeValue(banner.rangeValue || '60');
        bannerData.setFontValue(banner.fontValue || 15);
        bannerData.setFontType(banner.fontType || 'none');
        bannerData.setButtonWidth(banner.buttonWidth || '100');
        bannerData.setButtonHeight(banner.buttonHeight || '40');
        bannerData.setSelectedBackgroundImage(banner.selectedBackgroundImage || null);
        bannerData.setBannerpos(banner.bannerpos || 'top');
        bannerData.setClosebtn(banner.closebtn || false);
        bannerData.setStartDate(banner.startDate || '');
        bannerData.setEndDate(banner.endDate || '');
        bannerData.setShow(banner.show || '0 seconds');
        bannerData.setHide(banner.hide || 'today');
        bannerData.setSticky(banner.sticky || false);

        setHasInitialized(true);  
      });
    }
  }, [id, hasInitialized]);

  const handleTabChange = (selectedTabIndex) => setSelected(selectedTabIndex);

  const handleSave = () => {
    saveBannerData();
  };

  const tabs = [
    {
      id: 'Basic-Details',
      content: 'Basic Details',
      render: () => <Details />,
    },
    {
      id: 'Countdown-Setup',
      content: 'Countdown Setup',
      render: () => <Countdownsetup />,
    },
    {
      id: 'Style-settings',
      content: 'Style Settings',
      render: () => <Style />,
    },
    {
      id: 'Visibility-settings',
      content: 'Visibility Settings',
      render: () => <Visibility />,
    },
  ];

  return (
    <Page
      title="Edit Banner"
      backAction={{ onAction: () => navigate('/bannerlist') }}
      primaryAction={{
        content: 'Update Banner',
        onAction: handleSave,
      }}
    >
      <BannerContext.Provider value={bannerData}>
        <Preeview />
        <Box paddingBlock="300" />
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          {tabs[selected].render()}
        </Tabs>
      </BannerContext.Provider>
    </Page>
  );
}
