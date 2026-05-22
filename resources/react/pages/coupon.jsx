import {
    Page,
    Button,
    IndexTable,
    TextField,
    BlockStack,
    Box,
    Card,
    ButtonGroup,
    Modal,
    Text,
    IndexFilters,
    useSetIndexFiltersMode,
    LegacyCard,
} from "@shopify/polaris";
// import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { EditIcon, DeleteIcon } from "@shopify/polaris-icons";
import { useAppBridge } from "@shopify/app-bridge-react";
import ReactSwitch from "react-switch";
import { useIndexResourceState } from "@shopify/polaris";

export default function Coupon() {
    // const { t } = useTranslation();
    const navigate = useNavigate();
    const shopify = useAppBridge();
    // useSubscriptionCheck();

    const [currentPage, setCurrentPage] = useState(1);
    const [enabled, setEnabled] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [filteredCoupons, setFilteredCoupons] = useState([]);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
        useState(false);
    const [isBulkDeleteConfirmationOpen, setIsBulkDeleteConfirmationOpen] =
        useState(false);
    const [couponToDelete, setCouponToDelete] = useState(null);
    const [queryValue, setQueryValue] = useState("");
    const [sortSelected, setSortSelected] = useState(["id asc"]);
    const { mode, setMode } = useSetIndexFiltersMode();
    const PAGE_SIZE = 3;

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(filteredCoupons, {
            resourceIDResolver: (coupon) => coupon.id.toString(),
        });

    const fetchCoupons = useCallback(() => {
        fetch("/api/settings")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setCoupons(data);
                const filtered = queryValue
                    ? data.filter((coupon) =>
                          coupon.title
                              .toLowerCase()
                              .includes(queryValue.toLowerCase())
                      )
                    : data;
                setFilteredCoupons(filtered);
            })
            .catch((error) => {
                console.error("Error fetching settings:", error);
                shopify.toast.show("Failed to fetch coupons", {
                    duration: 2000,
                    isError: true,
                });
            });
    }, [queryValue]);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    const handleFiltersQueryChange = useCallback(
        (value) => {
            setQueryValue(value);
            const filtered = coupons.filter((coupon) =>
                coupon.title.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCoupons(filtered);
            setCurrentPage(1);
        },
        [coupons]
    );

    const handleFiltersClearAll = useCallback(() => {
        setQueryValue("");
        setSortSelected(["id asc"]);
        setFilteredCoupons(coupons);
        setCurrentPage(1);
    }, [coupons]);

    const handleBulkDeleteClick = () => {
        if (selectedResources.length === 0) {
            shopify.toast.show("No coupons selected for deletion", {
                duration: 2000,
                isError: true,
            });
            return;
        }
        setIsBulkDeleteConfirmationOpen(true);
    };

    const handleBulkDelete = async () => {
        if (selectedResources.length === 0) {
            shopify.toast.show("No coupons selected for deletion", {
                duration: 2000,
                isError: true,
            });
            return;
        }

        try {
            const results = await Promise.allSettled(
                selectedResources.map((id) =>
                    fetch(`/api/destroy/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                `Failed to delete coupon with ID ${id}`
                            );
                        }
                        return id;
                    })
                )
            );

            const successfulDeletions = results.filter(
                (result) => result.status === "fulfilled"
            ).length;
            const failedDeletions = results.length - successfulDeletions;

            if (successfulDeletions > 0) {
                shopify.toast.show(
                    `${successfulDeletions} coupon(s) deleted successfully`,
                    { duration: 2000 }
                );
                fetchCoupons();
            }

            if (failedDeletions > 0) {
                shopify.toast.show(
                    `${failedDeletions} coupon(s) failed to delete`,
                    { duration: 2000, isError: true }
                );
            }
        } catch (error) {
            console.error("Bulk delete error:", error);
            shopify.toast.show("An error occurred during bulk deletion", {
                duration: 2000,
                isError: true,
            });
        }
    };

    const confirmBulkDelete = async () => {
        setIsBulkDeleteConfirmationOpen(false);
        await handleBulkDelete();
    };

    const handleToggle = (id) => {
        const newEnabledState = !enabled;
        setEnabled(newEnabledState);
        fetch("/api/status", {
            method: "POST",
            body: JSON.stringify({ id, enabled: newEnabledState ? 0 : 1 }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    fetchCoupons();
                    shopify.toast.show("Status updated", { duration: 2000 });
                } else {
                    throw new Error("Failed to update status");
                }
            })
            .catch((error) => {
                console.error("Error updating status:", error);
                setEnabled(!newEnabledState);
                shopify.toast.show("Failed to update status", {
                    duration: 2000,
                    isError: true,
                });
            });
    };

    const handleDeleteClick = async (id) => {
        setCouponToDelete(id);
        setIsDeleteConfirmationOpen(true);
    };

    const confirmDelete = async () => {
        if (couponToDelete) {
            fetch(`/api/destroy/${couponToDelete}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    fetchCoupons();
                    shopify.toast.show("Coupon deleted", { duration: 2000 });
                })
                .catch((error) => {
                    console.error("Error deleting coupon:", error);
                    shopify.toast.show("Failed to delete coupon", {
                        duration: 2000,
                        isError: true,
                    });
                })
                .finally(() => {
                    setIsDeleteConfirmationOpen(false);
                    setCouponToDelete(null);
                });
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(filteredCoupons.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentPageData = filteredCoupons.slice(startIndex, endIndex);

    return (
        <Page
            title="Notifications"
            primaryAction={
                <Button
                    variant="primary"
                    onClick={() => navigate("/createnotification")}
                >
                    Create notification
                </Button>
            }
            secondaryActions={[
                {
                    content: "Delete Selected",
                    destructive: true,
                    icon: DeleteIcon,
                    disabled: selectedResources.length === 0,
                    onAction: handleBulkDeleteClick,
                },
            ]}
        >
            <LegacyCard>
                <Box padding={200}>
                    <IndexFilters
                        queryValue={queryValue}
                        queryPlaceholder="Search notifications"
                        onQueryChange={handleFiltersQueryChange}
                        onQueryClear={() => handleFiltersQueryChange("")}
                        sortSelected={sortSelected}
                        mode={mode}
                        setMode={setMode}
                        cancelAction={{
                            content: "Cancel",
                            onAction: handleFiltersClearAll,
                            disabled: !queryValue,
                        }}
                        tabs={[]}
                        filters={[]}
                        onClearAll={handleFiltersClearAll}
                    />
                </Box>
                <IndexTable
                    resourceName={{
                        singular: "coupon",
                        plural: "coupons",
                    }}
                    itemCount={filteredCoupons.length}
                    selectedItemsCount={
                        allResourcesSelected ? "All" : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                    headings={[
                        // { title: "ID" },
                        { title: "Notifications" },
                        { title: "Date created" },
                        {
                            title: (
                                <BlockStack inlineAlign="center">
                                    Status
                                </BlockStack>
                            ),
                        },
                        {
                            title: (
                                <BlockStack inlineAlign="center">
                                    Actions
                                </BlockStack>
                            ),
                        },
                    ]}
                    pagination={{
                        hasPrevious: currentPage > 1,
                        onPrevious: () => handlePageChange(currentPage - 1),
                        hasNext: currentPage < totalPages,
                        onNext: () => handlePageChange(currentPage + 1),
                    }}
                    selectable={true}
                >
                    {currentPageData.map((coupon, index) => (
                        <IndexTable.Row
                            id={coupon.id.toString()}
                            key={coupon.id}
                            selected={selectedResources.includes(
                                coupon.id.toString()
                            )}
                            position={(currentPage - 1) * PAGE_SIZE + index}
                        >
                            <IndexTable.Cell>{coupon.title}</IndexTable.Cell>
                            <IndexTable.Cell>
                                {new Date(coupon.created_at).toDateString()}
                            </IndexTable.Cell>
                            <IndexTable.Cell>
                                <BlockStack inlineAlign="center">
                                    <ReactSwitch
                                        id={`setting-toggle-${coupon.id}`}
                                        checked={coupon.status ? true : false}
                                        onChange={(checked, event) => {
                                            event.stopPropagation(); // Prevent click from selecting the row
                                            handleToggle(coupon.id);
                                        }}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        onColor="#303030"
                                        offColor="#CCCCCC"
                                    />
                                </BlockStack>
                            </IndexTable.Cell>
                            <IndexTable.Cell>
                                <BlockStack inlineAlign="center">
                                    <ButtonGroup>
                                        <Button
                                            icon={EditIcon}
                                            tone="success"
                                            variant="tertiary"
                                            accessibilityLabel={`Edit ${coupon.title}`}
                                            onClick={(event) => {
                                                event.stopPropagation(); // Prevent click from selecting the row
                                                navigate(
                                                    `/coupon/${coupon.id}`
                                                );
                                            }}
                                        />
                                        <Button
                                            icon={DeleteIcon}
                                            variant="plain"
                                            tone="critical"
                                            accessibilityLabel={`Delete ${coupon.title}`}
                                            onClick={(event) => {
                                                event.stopPropagation(); // Prevent click from selecting the row
                                                handleDeleteClick(coupon.id);
                                            }}
                                        />
                                    </ButtonGroup>
                                </BlockStack>
                            </IndexTable.Cell>
                        </IndexTable.Row>
                    ))}
                </IndexTable>
            </LegacyCard>
            <Modal
                open={isDeleteConfirmationOpen}
                onClose={() => setIsDeleteConfirmationOpen(false)}
                title="Confirmation"
                primaryAction={{
                    content: "Delete",
                    destructive: true,
                    onAction: confirmDelete,
                }}
            >
                <Modal.Section>
                    <Text as={"h1"}>Are you sure you want to delete?</Text>
                </Modal.Section>
            </Modal>
            <Modal
                open={isBulkDeleteConfirmationOpen}
                onClose={() => setIsBulkDeleteConfirmationOpen(false)}
                title="Confirm Bulk Deletion"
                primaryAction={{
                    content: "Delete",
                    destructive: true,
                    onAction: confirmBulkDelete,
                }}
                secondaryActions={[
                    {
                        content: "Cancel",
                        onAction: () => setIsBulkDeleteConfirmationOpen(false),
                    },
                ]}
            >
                <Modal.Section>
                    <Text as="h1">
                        Are you sure you want to delete{" "}
                        {selectedResources.length} coupon(s)?
                    </Text>
                </Modal.Section>
            </Modal>
        </Page>
    );
}
