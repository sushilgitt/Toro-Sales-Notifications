import { Card, Text, Link, BlockStack, Page, Divider ,Banner} from '@shopify/polaris';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Step() {
    const [param] = useSearchParams();

    const host = param.get("host");
    const storeDomain = atob(host);
   

    const shippingLink = `https://${storeDomain}/settings/shipping`;
  return (
        <Card>
            
        <BlockStack gap="200">
                <Text variant="headingMd" as="h6">
                Follow these steps to free shipping method 
                </Text>

            <Divider borderColor="border-inverse"/>

            <Text as="p">
            <strong>1:</strong> Go to <strong>Settings</strong> →{' '}
            <Link url={shippingLink} external>
                Shipping and delivery
            </Link>
            .
            </Text>

            <Text as="p">
                <strong>2:</strong> Shipping section <strong> Click the shipping arrow (›) icon</strong> 
            </Text>

            <Text as="p">
            <strong>3:</strong> Click <strong>+ Add rate</strong> →{' '}
            <strong>Add Customer rate name</strong>.
            </Text>

            <Text as="p">
            <strong>4:</strong> Click{' '}
            <strong>Done </strong> button.
            </Text>

            <Text as="p">
            <strong>5:</strong> Get back to this section & save{' '}
            <strong>Free shipping</strong> method.
            </Text>
        </BlockStack>
    </Card>
    
  );
}
