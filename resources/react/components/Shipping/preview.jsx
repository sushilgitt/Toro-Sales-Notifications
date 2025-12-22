import { Box, Card, Text } from "@shopify/polaris";
import React from "react";
import { useBannerData } from "./contextbanner";
import useShopCurrency from "../../pages/ShopCurrency";

export default function Preview() {
  const {
    shippingcontent,
    shippingamount,
    bgcolor,
    txtcolor,
    alignment,
    fontsize,
    height,
    amountcolor,
    amountsize,
  } = useBannerData();

  const { currencyData, loading: currencyLoading, formatMoney } = useShopCurrency();

  return (
    <Card>
      <Box paddingBlockEnd="300">
        <Text variant="headingMd" as="h6">
          Preview
        </Text>
      </Box>

      <Box
        padding="4"
        borderRadius="2"
        style={{
          backgroundColor: bgcolor,
          color: txtcolor,
          textAlign: alignment,
          height: `${height}px`,
          display: "flex",
          alignItems: "center",
          fontSize: `${fontsize}px`,
        }}
      >
        <div style={{ width: "100%", textAlign: alignment }}>
          <Text>
            {shippingcontent}{" "}
            <span style={{ color: amountcolor, fontSize: `${amountsize}px` }}>
            {!currencyLoading ? (currencyData?.currencySymbol || "") : ""}{shippingamount}
            </span>
          </Text>
        </div>
      </Box>
    </Card>
  );
}