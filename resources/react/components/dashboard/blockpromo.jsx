import {
  BlockStack,
  Box,
  Button,
  Card,
  Icon,
  InlineStack,
  MediaCard,
  Text,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { CircleDownIcon, XIcon } from "@shopify/polaris-icons";
// import { PlanGlobalAPIcall } from "../../config/PlanApiUtils";
 
const Blockpromo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
  const fetchSessionStatus = async () => {
    try {
      const response = await fetch('/api/getPromptdata'); 
      const data = await response.json();

      setIsVisible(data.promo === 0);
    } catch (error) {
      console.error("Error fetching promo status:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchSessionStatus();
}, []);

 
 
 const handleClose = async () => {
  setIsVisible(false);
  try {
    const response = await fetch('/api/closePromo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',  
      },
      body: JSON.stringify({
        closedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to close promo');
    }

    const result = await response.json();
    console.log('Promo closed:', result);
  } catch (error) {
    console.error('Error closing promo card:', error);
  }
};
 
  if (loading || !isVisible) return null;
 
  const steps = [
    <>
      <strong>80% of online traffic comes from mobile.</strong> If you don’t
      have a mobile app, you’re missing almost 60% of sales.
    </>,
    <>
      <strong>Unlimited push notifications.</strong> Send instant deals and
      updates to your customers.
    </>,
    <>
      <strong>Better shopping experience.</strong> Mobile apps are faster,
      easier to use, and more personal.
    </>,
    <>
      <strong>Brand loyalty & repeat orders.</strong> Apps help you stay
      top-of-mind for your customers.
    </>,
  ];
 
  const description = (
    <>
      <ul style={{ paddingLeft: "10px", marginTop: "5px" }}>
        {steps.map((step, index) => (
          <li key={index}>
            <Text variant="bodyMd">{step}</Text>
          </li>
        ))}
      </ul>
      <Button
        variant="primary"
        icon={<Icon source={CircleDownIcon} />}
        onClick={() => {
          window.open(
            "https://apps.shopify.com/mobile-app-builder-by-magecomp?st_source=autocomplete&surface_detail=autocomplete_apps",
            "_blank"
          );
        }}
      >
        Get app
      </Button>
    </>
  );
 
  return (
    <Card>
      <BlockStack gap="200">
        <InlineStack align="space-between" blockAlign="center">
          <Text variant="headingLg" as="h5">
            🚀 Why does your Shopify store need a mobile app?
          </Text>
          <Button
            variant="plain"
            onClick={handleClose}
            icon={<Icon source={XIcon} />}
            accessibilityLabel="Close promotion card"
          />
        </InlineStack>
        <Box padding={200}>
          <MediaCard description={description}>
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: "contain",
                objectPosition: "center",
              }}
              src="/images-icon/block.png"
            />
          </MediaCard>
        </Box>
      </BlockStack>
    </Card>
  );
};
 
export default Blockpromo;