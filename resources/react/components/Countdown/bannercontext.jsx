import { createContext, useState,useEffect } from 'react';

const BannerContext = createContext();

export const useBannerData = () => {
    //details
  const [name, setName] = useState('');
  const [bannerContent, setBannerContent] = useState('🎉 Hurry! Sale Ends Soon!');
  const [pageUrl, setPageUrl] = useState('');
  const [hidePageUrl, setHidePageUrl] = useState('');
  const [buttonText, setButtonText] = useState('Shop Now');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [selected, setSelected] = useState('none');
  const [checked, setChecked] = useState(false);

  //countdownsetup
  const [selectenddate, setSelectenddate] = useState('specific dates'); 
  const [dateTime, setDateTime] = useState('');
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [selectedplace, setSelectedplace] = useState('right');
  const [dayslbl, setDayslbl] = useState('');
  const [hourslbl, setHourslbl] = useState('');
  const [minuteslbl, setMinuteslbl] = useState('');
  const [secondslbl, setSecondslbl] = useState('');
  const [digitColor, setDigitColor] = useState('#000000');
  const [labelColor, setLabelColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [labelgap, setLabelgap] = useState('none');
  const [countdisplay,setCountdisplay] = useState(true);
  const [specificdate,setSpecificdate] = useState('');

  //style
  const [backgroundColorbanner, setBackgroundColorbanner] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [buttonTextColor, setButtonTextColor] = useState('#ffffff');
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState('#000000');
  const [selectedbanner, setSelectedbanner] = useState('center');
  const [rangeValue, setRangeValue] = useState('60');
  const [fontValue, setFontValue] = useState(15);
  const [fontType, setFontType] = useState('none');
  const [buttonWidth, setButtonWidth] = useState('106');
  const [buttonHeight, setButtonHeight] = useState('40');
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(null);

  //visibility
  const [bannerpos, setBannerpos] = useState('top');
  const [closebtn, setClosebtn] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [show, setShow] = useState('0 seconds');
  const [hide, setHide] = useState('0 seconds');
  const [sticky,setSticky]=useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    };

    useEffect(() => {
      if (dateTime && bannerContent === '🎉 Hurry! Sale Ends Soon!') {
        const currentDate = new Date();
        const endDateTime = new Date(dateTime);

        const timeDiff = endDateTime - currentDate;
        const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

        const isEndingTonight =
          endDateTime.getDate() === currentDate.getDate() &&
          endDateTime.getMonth() === currentDate.getMonth() &&
          endDateTime.getFullYear() === currentDate.getFullYear();

        if (isEndingTonight) {
          setBannerContent(`🎉 It's Here! ${remainingDays} Day Sale Ends Tonight!`);
        } else {
          setBannerContent(`🎉 Hurry! ${remainingDays} Day Sale Ends Soon!`);
        }
      }
  }, [dateTime, bannerContent]);

   useEffect(() => {
        if (startDate && endDate && bannerContent === '🎉 Hurry! Sale Ends Soon!') {
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);
            setBannerContent(`🕒 Sale Period: From ${formattedStartDate} To ${formattedEndDate}`);
        }
    }, [startDate, endDate, bannerContent]);

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '';
      }
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

    useEffect(() => {
      if (specificdate && bannerContent === '🎉 Hurry! Sale Ends Soon!') {
        const targetDate = new Date(specificdate);
        if (isNaN(targetDate.getTime())) {
          return;
        }
        const currentDate = new Date();
        const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const targetDateOnly = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
        const endOfTargetDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 23, 59, 59, 999);

        if (currentDateOnly.getTime() === targetDateOnly.getTime()) {
          if (currentDate > endOfTargetDate) {
            setBannerContent('⚠️ The One-Day Sale Has Ended. Stay Tuned for More Offers!');
          } else {
            setBannerContent("🎉 It's Here! One-Day Sale Ends Tonight!");
          }
        } else if (targetDateOnly > currentDateOnly) {
          const formattedDate = formatDateShort(specificdate);
          if (formattedDate) {
            setBannerContent(`⏳ Big Sale Coming on ${formattedDate}!`);
          }
        } else {
          setBannerContent('⚠️ The One-Day Sale Has Ended. Stay Tuned for More Offers!');
        }
      }
    }, [specificdate,bannerContent]);

    useEffect(() => {
        if (!startDate && !endDate && !dateTime && !specificdate) {
            setBannerContent('🎉 Hurry! Sale Ends Soon!');
        }
    }, [startDate, endDate, dateTime,specificdate]);

    useEffect(() => {
      if (!startDate && !endDate && !dateTime && !specificdate && bannerContent === '🎉 Hurry! Sale Ends Soon!') {
        setBannerContent('🎉 Hurry! Sale Ends Soon!');
      }
  }, [startDate, endDate, dateTime, bannerContent,specificdate]);
  
  return {
    name, setName,
    bannerContent,setBannerContent,
    pageUrl,setPageUrl,
    hidePageUrl,setHidePageUrl,
    buttonText,setButtonText,
    destinationUrl,setDestinationUrl,
    selected, setSelected,
    checked,setChecked,
    selectenddate,setSelectenddate,
    dateTime,setDateTime,
    days,setDays,
    hours,setHours,
    minutes,setMinutes,
    selectedplace,setSelectedplace,
    dayslbl,setDayslbl,
    hourslbl,setHourslbl,
    minuteslbl,setMinuteslbl,
    secondslbl,setSecondslbl,
    digitColor,setDigitColor,
    labelColor,setLabelColor,
    backgroundColor,setBackgroundColor,
    labelgap,setLabelgap,
    countdisplay,setCountdisplay,
    specificdate,setSpecificdate,
    backgroundColorbanner,setBackgroundColorbanner,
    textColor,setTextColor,
    buttonTextColor,setButtonTextColor,
    buttonBackgroundColor,setButtonBackgroundColor,
    selectedbanner,setSelectedbanner,
    rangeValue,setRangeValue,
    fontValue,setFontValue,
    fontType,setFontType,
    buttonWidth,setButtonWidth,
    buttonHeight,setButtonHeight,
    selectedBackgroundImage,setSelectedBackgroundImage,
    bannerpos,setBannerpos,
    closebtn,setClosebtn,
    startDate,setStartDate,
    endDate,setEndDate,
    show,setShow,
    hide,setHide,
    sticky,setSticky
  };
};

export default BannerContext;