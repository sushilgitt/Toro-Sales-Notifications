import {
  reactExtension,
  BlockStack,
  Banner,
  Text,
  useApi,
  useSubscription,
  useShop,
  useAppMetafields
} from '@shopify/ui-extensions-react/checkout';
import { useEffect, useState } from 'react';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />
);

function Extension() {
  const { cost,i18n } = useApi();
  const shop = useShop();

  const subtotalAmount = useSubscription(cost.subtotalAmount);

  const [shippingRule, setShippingRule] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const appMetafields = useAppMetafields();
  

 useEffect(() => {
    const configEntry = appMetafields.find(
      (entry) =>
        entry.target.type === 'shop' &&
        entry.metafield.namespace === 'shipping_banner' &&
        entry.metafield.key === 'config'
    );
    

    if (configEntry?.metafield?.value) {
      try {
        const parsed = JSON.parse(configEntry.metafield.value);
        
        if (parsed.shipping_active === true) {
          setShippingRule(parsed.details); 
        }
      } catch (error) {
        console.error('Failed to parse shipping_banner.config metafield:', error);
      }
    }

    setLoading(false);
  }, [appMetafields]);

  function getCurrencySymbol(currencyCode) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
  });

  const parts = formatter.formatToParts(1);
  const currencyPart = parts.find((part) => part.type === 'currency');

  return currencyPart?.value ?? currencyCode;
}

  useEffect(() => {
    if (!shippingRule || !subtotalAmount) return;

    const minAmount = Number(shippingRule.shippingamount || 0);
    const content = shippingRule.shippingcontent || '';
    const startDateStr = shippingRule.startdate;
    const endDateStr = shippingRule.enddate;

    if (!startDateStr || !endDateStr) {
      setMessage('');
      return;
    }

    const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(startDateStr);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(endDateStr);
  endDate.setHours(0, 0, 0, 0);

  if (today < startDate || today > endDate) {
    setMessage('');
    return;
  }
    
  const currencySymbol = getCurrencySymbol(subtotalAmount.currencyCode);

    if (subtotalAmount.amount >= minAmount && minAmount > 0) {
      setMessage('🎉 Congratulations! Your order will be shipped free of charge.');
    } else if (minAmount > 0) {
      setMessage(`${content} ${currencySymbol}${minAmount}`);
    } else {
      setMessage('');
    }
  }, [shippingRule, subtotalAmount]);

  if (loading || !message) return null;

  return (
    <BlockStack padding="base">
      <Banner status="info" title="Shipping Information">
        <Text>{message}</Text>
      </Banner>
    </BlockStack>
  );
}
