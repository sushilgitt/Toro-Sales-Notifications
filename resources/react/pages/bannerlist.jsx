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
} from '@shopify/polaris';
import React, { useCallback, useState, useEffect } from 'react';
import { DeleteIcon, EditIcon } from '@shopify/polaris-icons';
import { useNavigate } from 'react-router-dom';
import {Modal, TitleBar, useAppBridge} from '@shopify/app-bridge-react';

export default function BannerList() {
  const [queryValue, setQueryValue] = useState('');
  const [sortSelected, setSortSelected] = useState(['id asc']);
  const { mode, setMode } = useSetIndexFiltersMode();
  const navigate = useNavigate();

  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [bannerToDeleteId, setBannerToDeleteId] = useState(null);

   const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

   const shopify = useAppBridge();

  useEffect(() => {
    fetch('/api/getbanner', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // console.log('banner datasd',data.data);
          // console.log('banner datasd',data.data[0].details[0].bannerContent);
          setBanners(data.data);
          setFilteredBanners(data.data);
        } else {
          console.error('Failed to fetch banners:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching banners:', error);
        shopify.toast.show("Failed to fetch Banner", { duration: 2000, isError: true });
      });
  }, []);

  const handleFiltersQueryChange = useCallback(
    (value) => {
      setQueryValue(value);
      const filtered = banners.filter((banner) =>
        banner.name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBanners(filtered);
    },
    [banners]
  );

  const handleFiltersClearAll = useCallback(() => {
    setQueryValue('');
    setSortSelected(['id asc']);
    setFilteredBanners(banners);
  }, [banners]);

  const resourceName = {
    singular: 'banner',
    plural: 'banners',
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(filteredBanners);


  const handleDelete = (id) => {

    fetch(`/api/deletebanner/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const updatedBanners = banners.filter((banner) => banner.id !== id);
          setBanners(updatedBanners);
          setFilteredBanners(updatedBanners);
        } else {
          alert('Failed to delete banner: ' + data.message);
        }
      })
      .catch((error) => {
        alert('Error deleting banner: ' + error.message);
      });
  };

  const handlclickedelte =()=>{
       handleDelete(bannerToDeleteId);
       shopify.modal.hide('delete-modal')
  }

   const handleBulkDeleteClick = async () => {
      if (selectedResources.length === 0) return;

      let successCount = 0;

      for (const id of selectedResources) {
        try {
          const res = await fetch(`/api/deletebanner/${id}`, { method: 'DELETE' });
          const data = await res.json();
          if (data.success) successCount++;
        } catch {
          // ignore errors for simplicity
        }
      }

      setBanners(banners.filter(b => !selectedResources.includes(b.id)));
      setFilteredBanners(filteredBanners.filter(b => !selectedResources.includes(b.id)));

      if (successCount > 0) {
        shopify.toast.show(`${successCount} banner(s) deleted successfully`, { duration: 2000 });
      }
  };


   const paginatedBanners = filteredBanners.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const hasNext = currentPage * pageSize < filteredBanners.length;
  const hasPrevious = currentPage > 1;

  const rowMarkup = paginatedBanners.map(({ id, name, details }, index) => {
    // const bannerContent = details[0].labelColor 
    // console.log('bannerContent:', bannerContent);
    return (
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
      {/* <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {bannerContent}
        </Text>
      </IndexTable.Cell> */}
      
      <IndexTable.Cell>
        <ButtonGroup>
          <Button
            variant="monochromePlain"
            icon={EditIcon}
            accessibilityLabel="Edit"
            onClick={() => navigate(`/banneredit/${id}`)}
          />
          <Button
            variant="plain"
            tone="critical"
            icon={DeleteIcon}
            accessibilityLabel="Delete"
            onClick={() => {shopify.modal.show('delete-modal'),setBannerToDeleteId(id)}}
          />
        </ButtonGroup>
      </IndexTable.Cell>
    </IndexTable.Row>
   );
});

  return (
    <Page
      title="Banner"
      primaryAction={{
        content: 'Create Banner',
        onAction: () => navigate('/banner'),
      }}
      secondaryActions={[
        selectedResources.length > 0 && {
          content: "Delete Selected",
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
            cancelAction={{
              content: 'Cancel',
              onAction: handleFiltersClearAll,
              disabled: !queryValue,
            }}
            tabs={[]}
            filters={[]}
            onClearAll={handleFiltersClearAll}
          />
        </Box>
        <IndexTable
          resourceName={resourceName}
          itemCount={filteredBanners.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: 'Name' },
            // {title:'banner content'},
            { title: 'Actions' },
            
          ]}
           pagination={{
            hasNext,
            hasPrevious,
            onNext: () => setCurrentPage((prev) => prev + 1),
            onPrevious: () => setCurrentPage((prev) => Math.max(1, prev - 1)),
          }}
        >
          {rowMarkup}
        </IndexTable>

        <Modal id="delete-modal" variant='base'>
              <Box padding={400}>
                <Text variant="headingMd" as="h6">Are you sure want to delete this record?</Text>
              </Box>
              <TitleBar title="Delete ">
                <button variant="primary" tone="critical" onClick={handlclickedelte}>Delete</button>
                <button  onClick={() => shopify.modal.hide('delete-modal')}>Cancel</button>
              </TitleBar>
      </Modal>

      </LegacyCard>
    </Page>
  );
}
