import {
  reactExtension,
  BlockStack,
  Banner,
  Text,
  useApi,
  useSubscription,
  useShop
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

  useEffect(() => {
    async function fetchShippingRule() {
      try {
        const res = await fetch(
          'https://keno-roman-highs-doctor.trycloudflare.com/api/coupon_data',
          { method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            shop: shop.myshopifyDomain, 
          }),
          }
        );

        const data = await res.json();

        if (data?.shippingbanner?.length) {
          const parsedDetails = JSON.parse(data.shippingbanner[0].details);
          setShippingRule(parsedDetails);
        }
      } catch (error) {
        console.error('Shipping banner fetch error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchShippingRule();
  }, []);

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
