import {
  Tag,
  Listbox,
  Combobox,
  Icon,
  TextContainer,
  LegacyStack,
  AutoSelection
} from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useState, useCallback, useMemo } from 'react';

export default function MultiSelectTags({ label, selectedOptions, setSelectedOptions }) {
  const deselectedOptions = useMemo(
    () => [
      { value: 'home', label: 'Home Page' },
      { value: 'product', label: 'Product Page' },
      // { value: 'pages', label: 'Pages' },
      { value: 'collection', label: 'Collection Page' },
      { value: 'cart', label: 'Cart Page' },
      // { value: 'blog', label: 'Blog' },
    //   { value: 'password', label: 'Password Page' },
    ],
    []
  );

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const escapeSpecialRegExCharacters = useCallback(
    (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    []
  );

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), 'i');
      setOptions(deselectedOptions.filter((option) => option.label.match(filterRegex)));
    },
    [deselectedOptions, escapeSpecialRegExCharacters]
  );

  const updateSelection = useCallback(
    (selected) => {
      if (selectedOptions.includes(selected)) {
        setSelectedOptions(selectedOptions.filter((option) => option !== selected));
      } else {
        setSelectedOptions([...selectedOptions, selected]);
      }
      updateText('');
    },
    [selectedOptions, setSelectedOptions, updateText]
  );

//   const removeTag = useCallback(
//     (tag) => () => {
//       setSelectedOptions(selectedOptions.filter((option) => option !== tag));
//     },
//     [selectedOptions, setSelectedOptions]
//   );

//   const tagsMarkup = selectedOptions.length > 0 ? (
//     <LegacyStack spacing="tight">
//       {selectedOptions.map((option) => (
//         <Tag key={option} onRemove={removeTag(option)}>
//           {option}
//         </Tag>
//       ))}
//     </LegacyStack>
//   ) : null;

  const optionsMarkup =
    options.length > 0
      ? options.map(({ label, value }) => (
          <Listbox.Option
            key={value}
            value={value}
            selected={selectedOptions.includes(value)}
            accessibilityLabel={label}
          >
            {label}
          </Listbox.Option>
        ))
      : null;

  return (
    <div>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            label={label}
            value={inputValue}
            onChange={updateText}
            // prefix={<Icon source={SearchIcon} />}
            placeholder="Select"
            autoComplete="off"
          />
        }
      >
        {optionsMarkup && (
          <Listbox autoSelection={AutoSelection.None} onSelect={updateSelection}>
            {optionsMarkup}
          </Listbox>
        )}
      </Combobox>

      {/* <TextContainer>{tagsMarkup}</TextContainer> */}
    </div>
  );
}
