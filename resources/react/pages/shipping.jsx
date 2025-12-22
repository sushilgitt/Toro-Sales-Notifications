import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Page,
  Button,
  ButtonGroup,
  IndexFilters,
  useSetIndexFiltersMode,
  Box,
  Spinner,
} from '@shopify/polaris';
import React, { useCallback, useState, useEffect } from 'react';
import { DeleteIcon, EditIcon } from '@shopify/polaris-icons';
import { useNavigate } from 'react-router-dom';
import { Modal, TitleBar, useAppBridge } from '@shopify/app-bridge-react';

export default function Shipping() {
  const [queryValue, setQueryValue] = useState('');
  const [sortSelected, setSortSelected] = useState(['id asc']);
  const { mode, setMode } = useSetIndexFiltersMode();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const shopify = useAppBridge();

  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [bannerToDeleteId, setBannerToDeleteId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    setLoading(true);
    fetch("/api/shippingget", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setBanners(response.data);
          setFilteredBanners(response.data);
        }
      })
      .catch((error) => console.log("API Fetch Error:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleFiltersQueryChange = useCallback(
    (value) => {
      setQueryValue(value);
      const filtered = banners.filter((banner) =>
        banner?.name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBanners(filtered);
      setCurrentPage(1);
    },
    [banners]
  );

  const handleFiltersClearAll = useCallback(() => {
    setQueryValue('');
    setSortSelected(['id asc']);
    setFilteredBanners(banners);
    setCurrentPage(1);
  }, [banners]);

  const resourceName = { singular: 'banner', plural: 'banners' };
  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState(filteredBanners);

  const handleDelete = (id) => {
    const updated = banners.filter((x) => x.id !== id);
    setBanners(updated);
    setFilteredBanners(updated);
    setBannerToDeleteId(null);
  };

    const handleClickedDelete = async () => {
    if (!bannerToDeleteId) return;

    try {
      const response = await fetch(`/api/shipping/${bannerToDeleteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        const updated = banners.filter((x) => x.id !== bannerToDeleteId);
        setBanners(updated);
        setFilteredBanners(updated);

        shopify.toast.show('Banner deleted successfully');
      } else {
        shopify.toast.show(result.message || 'Failed to delete banner', { isError: true });
      }
    } catch (error) {
      console.error("Delete error:", error);
      shopify.toast.show('Error deleting banner', { isError: true });
    } finally {
      setBannerToDeleteId(null);
      shopify.modal.hide('delete-modal');
    }
  };

    const handleBulkDeleteClick = async () => {
      if (selectedResources.length === 0) return;

      let successCount = 0;

      for (const id of selectedResources) {
        try {
          const res = await fetch(`/api/shipping/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          if (data.success) successCount++;
        } catch (error) {
          console.error(`Failed to delete banner ${id}:`, error);
        }
      }

      const updated = banners.filter((banner) => !selectedResources.includes(banner.id));
      setBanners(updated);
      setFilteredBanners(updated);

      if (successCount > 0) {
        shopify.toast.show({
          message: `${successCount} banner(s) deleted successfully`,
          duration: 2000,
        });
      } else {
        shopify.toast.show({
          message: `No banners were deleted`,
          duration: 2000,
          isError: true,
        });
      }
    };

  const paginatedBanners = filteredBanners.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const hasNext = currentPage * pageSize < filteredBanners.length;
  const hasPrevious = currentPage > 1;

  const rowMarkup = paginatedBanners.map(({ id, name }, index) => (
    <IndexTable.Row
      id={id}
      key={id}
      selected={selectedResources.includes(id)}
      position={index}
    >
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {name || '(No Name)'}
        </Text>
      </IndexTable.Cell>

      <IndexTable.Cell>
        <ButtonGroup>
          <Button
            variant="monochromePlain"
            icon={EditIcon}
            onClick={() => navigate(`/shipbanneredit/${id}`)}
          />
          <Button
            variant="plain"
            tone="critical"
            icon={DeleteIcon}
            onClick={() => {
              shopify.modal.show('delete-modal');
              setBannerToDeleteId(id);
            }}
          />
        </ButtonGroup>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Page
      title="Shipping Banner"
      primaryAction={{ content: 'Create Banner', onAction: () => navigate('/shipping/create') }}
      secondaryActions={[
        selectedResources.length > 0 && {
          content: 'Delete Selected',
          destructive: true,
          icon: DeleteIcon,
          onAction: handleBulkDeleteClick,
        },
      ].filter(Boolean)}
    >
      <LegacyCard>
        <Box paddingBlock={200}>
          <IndexFilters
            queryValue={queryValue}
            queryPlaceholder="Search banners by name"
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={() => handleFiltersQueryChange('')}
            sortSelected={sortSelected}
            onSort={setSortSelected}
            mode={mode}
            setMode={setMode}
            cancelAction={{ content: 'Cancel', onAction: handleFiltersClearAll, disabled: !queryValue }}
            tabs={[]}
            filters={[]}
            onClearAll={handleFiltersClearAll}
          />
        </Box>

        {loading ? (
          <Box
          padding="500"
          display="flex"
          align="center"
          justify="center"
          minHeight="60vh"
        >
          <Spinner accessibilityLabel="Loading campaigns" size="large" />
        </Box>
        ) : (
        <IndexTable
          resourceName={resourceName}
          itemCount={filteredBanners.length}
          selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
          onSelectionChange={handleSelectionChange}
          headings={[{ title: 'Name' }, { title: 'Actions' }]}
          pagination={{
            hasNext,
            hasPrevious,
            onNext: () => setCurrentPage((prev) => prev + 1),
            onPrevious: () => setCurrentPage((prev) => Math.max(1, prev - 1)),
          }}
        >
          {rowMarkup}
        </IndexTable>
      )}

        <Modal id="delete-modal" variant="base">
          <Box padding={400}>
            <Text variant="headingMd" as="h6">
              Are you sure you want to delete this record?
            </Text>
          </Box>
          <TitleBar title="Delete">
            <button variant="primary" tone="critical" onClick={handleClickedDelete}>
              Delete
            </button>
            <button onClick={() => shopify.modal.hide('delete-modal')}>Cancel</button>
          </TitleBar>
        </Modal>
      </LegacyCard>
    </Page>
  );
}
