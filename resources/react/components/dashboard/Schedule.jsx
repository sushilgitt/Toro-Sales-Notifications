import React from "react";
import {
    Page,
    Box,
    MediaCard,
    Grid,
    Card,
    BlockStack,
    Text,
    List,
    Button,
    ButtonGroup,
    InlineStack,
    Divider,
    Icon,
    LegacyCard,
} from "@shopify/polaris";
const Schedule = () => {
    return (
        <Card>
            <Box paddingBlock={100}>
                <Text  as="h2" variant="headingMd">
                    Schedule 1-1 onboarding call with experts
                </Text>
            </Box>

            <Box>
                <Box paddingBlock={200}>
                    <p>
                        Set your app lanuched faster and smoother with our experts
                        guidance on best practices,setup and lanuche
                    </p>
                </Box>
            </Box>

            <Box>
                <InlineStack gap="400" paddingInline="400">
                    <Button
                        variant="primary"
                        onClick={() =>
                            window.open(
                                // "https://calendly.com/magecomp/shopify-app-on-boarding",
                                "https://calendly.com/krishamin-magecomp/30min",
                                "_blank"
                            )
                        }
                    >
                        Schedule Now
                    </Button>
                    <Button
                        onClick={() =>
                            window.open("mailto:support@magecomp.com", "_blank")
                        }
                        accessibilityLabel="Contact support"
                    >
                        Contact Us
                    </Button>
                </InlineStack>
            </Box>
        </Card>
    );
};

export default Schedule;
