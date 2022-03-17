import React from 'react';
import Select, { components } from 'react-select';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
import AsyncSelect from "react-select/async";

/**
 * Determines the CustomSelect border style.
 *
 * - `MATCH_WP` - matches the WP Admin theme color.
 * - `BLACK` - black.
 * - `DEFAULT` - 80% gray.
 */
export const CustomSelectStyle = {
	MATCH_WP: 'var(--wp-admin-theme-color, #111111)',
	BLACK: 'hsla(0, 0%, 0%, 1)',
	DEFAULT: 'hsla(0, 0%, 80%, 1)',
	WP_INPUTS: 'hsla(0, 0%, 46%, 1)',
};

/**
 * Custom option for CustomSelect.
 * 
 * (a wrapper for `components.Option` from `react-select`)
 *
 * @param {object} props - components.Option props.
*/
export const CustomSelectCustomOption = (props) => (
	<components.Option {...props} />
);

/**
 * Custom value display for CustomSelect.
 * 
 * (a wrapper for `components.SingleValue` from `react-select`)
 *
 * @param {object} props - components.SingleValue props.
*/
export const CustomSelectCustomValueDisplay = (props) => (
	<components.SingleValue {...props} />
);

/**
 * Custom multiple value display for CustomSelect.
 * 
 * (a wrapper for `components.MultiValueLabel` from `react-select`)
 *
 * @param {object} props - components.MultiValueLabel props.
*/
export const CustomSelectCustomMultipleValueDisplay = (props) => (
	<components.MultiValueLabel {...props} />
);

/**
 * Custom multiple value display container for CustomSelect.
 * 
 * (a wrapper for `components.MultiValueContainer` from `react-select`)
 *
 * @param {object} props - components.MultiValueContainer props.
*/
export const CustomSelectCustomMultipleValueDisplayContainer = (props) => (
	<components.MultiValueContainer {...props} />
);

/**
 * Custom multiple value remove button for CustomSelect.
 * 
 * (a wrapper for `components.MultiValueRemove` from `react-select`)
 *
 * @param {object} props - components.MultiValueRemove props.
*/
export const CustomSelectCustomMultipleValueRemoveButton = (props) => (
	<components.MultiValueRemove {...props} />
);

/**
 * A modern, flexible and customizable select menu.
 *
 * @param {object} props                                                       - CustomSelect options.
 * @param {string?} [props.label]                                              - Label displayed above the control.
 * @param {string?} [props.help]                                               - Help text displayed below the control.
 * @param {boolean} [props.multiple=false]                                     - If `true`, allows multiple items to be selected.
 * @param {array?} props.options                                               - Options to choose. Option should be in `{label: '', value: ''}` format.
 * @param {object} props.value                                                 - Current value
 * @param {function} props.onChange                                            - Function called when the selection is changed.
 * @param {boolean} [props.isCompact=false]                                    - If `true`, the component will slightly reduce height so it fits nicely with WP Buttons and similar components.
 * @param {boolean} [props.isClearable=true]                                   - If `true`, the currently selected item can be cleared. `null` is set as the value.
 * @param {boolean} [props.isSearchable=true]                                  - If `true`, the options can be searched through.
 * @param {boolean} [props.closeMenuOnSelect=false]                            - If single-select mode is active, after a selection is made the dropdown is closed.
 * @param {boolean} [props.cacheOptions=true]                                  - If in async mode (`loadOptions` is set) and set to `true`, the options are cached internally.
 * @param {boolean} [props.reFetchOnSearch=false]                              - If in async mode (`loadOptions` is set) and set to `true`, after a character is typed the `loadOptions` callback runs again with the provided search text as an argument.
 * @param {function?} props.loadOptions                                        - An async callback that fetches an array of `{label: '', value: ''}`-formatted items.
 * @param {string?} [props.placeholder]                                        - Placeholder text when no item is selected.
 * @param {string} [props.sortAxis=y]                                          - If multiple-select mode is active, determines the axis the items can be sorted on. Can be `x`, `y` or `xy`.
 * @param {React.Component?} [props.customOptionComponent]                     - If provided, this control replaces the default option displayed in the dropdown.
 * @param {React.Component?} [props.customSingleValueDisplayComponent]         - If provided and in single-select mode, this control replaces the default current value display when the dropdown is closed.
 * @param {React.Component?} [props.customMultiValueDisplayComponent]          - If provided and in multi-select mode, this control replaces the default current value display of each selected item.
 * @param {React.Component?} [props.customMultiValueDisplayContainerComponent] - If provided and in multi-select mode, this control replaces the default wrapper of the current value display of each selected items (contains item label and remove button).
 * @param {React.Component?} [props.customMultiValueRemoveButton]              - If provided and in multi-select mode, this control replaces the default item remove button.
 * @param {React.Component?} [props.customIndicatorSeparator]                  - If provided, adds a separator between the select content and the dropdown arrow on the right.
 * @param {boolean} [props.simpleValue=false]                                  - If in single-item (`multiple = false`) mode and this option set to `true`, you only need to provide the value to the component instead of an object. The return type also changes to value-only.
 * @param {boolean} [props.disabled=false]                                     - If set to `true`, renders the component as disabled.
 * @param {boolean} [props.loading=false]                                      - If set to `true`, renders the component in a loading state.
 * @param {boolean} [props.blurInputOnSelect=false]                            - If set to `true`, focus is removed from the input once an option is selected.
 * @param {boolean} [props.hideSelected=false]                                 - If set to `true`, the selected option is hidden from the menu.
 * @param {string} [props.loadingMessage='Loading']                            - Text to display when loading options.
 * @param {string} [props.noOptionsMessage='No options']                       - Text to display when no options are available.
 * @param {function} [props.filterAsyncOptions]                                - Allows modifying (filtering, grouping, ...) options output after the items have been dynamically fetched. Please make sure to include `label` and `value` keys, additional fields can be added as required.
 * @param {CustomSelectStyle} [props.style=CustomSelectStyle.DEFAULT]          - Style of the CustomSelect.
 */
export const CustomSelect = (props) => {
	const {
		label,
		help,
		multiple = false,
		options,
		value,
		onChange,
		isCompact = false,
		isClearable = true,
		isSearchable = true,
		closeMenuOnSelect = false,
		cacheOptions = true,
		reFetchOnSearch = false,
		loadOptions,
		placeholder,
		sortAxis = 'y',
		customOptionComponent,
		customSingleValueDisplayComponent,
		customMultiValueDisplayComponent,
		customMultiValueDisplayContainerComponent,
		customMultiValueRemoveButton,
		customIndicatorSeparator,
		simpleValue = false,
		disabled = false,
		loading = false,
		blurInputOnSelect = false,
		hideSelected = false,
		loadingMessage = __('Loading', 'eightshift-frontend-libs'),
		noOptionsMessage = __('No options', 'eightshift-frontend-libs'),
		filterAsyncOptions = (options) => options,
		style = CustomSelectStyle.DEFAULT,
	} = props;

	const { Option, SingleValue, MultiValue, MultiValueLabel, MultiValueContainer, MultiValueRemove } = components;

	const isSynchronous = !loadOptions;

	const arrayMove = (array, from, to) => {
		// eslint-disable-next-line no-param-reassign
		array = array.slice();
		array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
		return array;
	};

	const SortableMultiValue = SortableElement((propsSortable) => {
		// This prevents the menu from being opened/closed when the user clicks
		// on a value to begin dragging it. ideally, detecting a click (instead of
		// a drag) would still focus the control and toggle the menu, but that
		// requires some magic with refs that are out of scope for this example
		const onMouseDown = (e) => {
			e.preventDefault();
			e.stopPropagation();
		};
		const innerProps = { onMouseDown };
		return <MultiValue {...propsSortable} innerProps={innerProps} />;
	}, []);

	const SortableMultiValueLabel = sortableHandle((props) => {
		const CustomMultiValue = customMultiValueDisplayComponent;

		if (customMultiValueDisplayComponent) {
			return <CustomMultiValue {...props} />;
		}

		return (
			<MultiValueLabel {...props} />
		);
	});

	const SortableSelect = SortableContainer(isSynchronous ? Select : AsyncSelect);

	const [selected, setSelected] = useState(value);
	const [defaultOptions, setDefaultOptions] = useState(true);

	const filterOptions = (inputValue, label) => label.toLowerCase().includes(inputValue.toLowerCase());

	const customLoadOptions = async (inputValue) => {
		// Reload the selected item.
		setSelected(selected);

		if (!Array.isArray(defaultOptions)) {
			const options = await loadOptions(inputValue);
			setDefaultOptions(filterAsyncOptions(options));
		}

		if (reFetchOnSearch && inputValue.length) {
			const options = await loadOptions(inputValue);
			return new Promise((resolve) => resolve(filterAsyncOptions(options)));
		}

		return new Promise((resolve) => {
			if (!inputValue.length) {
				resolve(filterAsyncOptions(defaultOptions));
			} else {
				resolve(filterAsyncOptions([...defaultOptions].filter(({ label }) => filterOptions(inputValue, label))));
			}
		});
	};

	const onChangeInternal = (selectedOptions) => {
		if (selectedOptions === undefined || selectedOptions === null) {
			setSelected(undefined);
			onChange(undefined);
		}

		let output;

		// Compare current selected posts with the API and sync them.
		// This will remove posts that are trashed, deleted or drafted.
		// This will change the title if the post title has changed.
		if (multiple) {
			output = selectedOptions.reduce((arr, curr) => {
				const updatedItem = (options ?? defaultOptions)?.find((element) => element.value === curr.value);

				if (updatedItem) {
					return [...arr, updatedItem];
				}

				return [...arr, curr];
			}, []);
		} else {
			output = simpleValue ? selectedOptions?.value : selectedOptions;
		}

		if (simpleValue && selectedOptions && selectedOptions?.value) {
			const selectionCache = window.localStorage.getItem('es-custom-select-cache');

			if (selectionCache === null || selectionCache === false || selectionCache === undefined) {
				window.localStorage.setItem('es-custom-select-cache', JSON.stringify({ [selectedOptions.value]: selectedOptions }));
			} else {
				const parsedSelectionCache = JSON.parse(selectionCache ?? '{}');
				window.localStorage.setItem('es-custom-select-cache', JSON.stringify({ ...parsedSelectionCache, [selectedOptions.value]: selectedOptions }));
			}
		}

		setSelected(output);
		onChange(output);
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		const newValue = arrayMove(selected, oldIndex, newIndex);
		setSelected(newValue);
		onChange(newValue);
	};

	const getValue = () => {
		if (
			selected === undefined
			|| selected === null
			|| Object.prototype.hasOwnProperty.call(selected, 'value') && selected.value === undefined
			|| Object.prototype.hasOwnProperty.call(selected, 'value') && selected.value === null
			|| (Array.isArray(selected) && selected?.length < 1)
			|| ((typeof selected).toLowerCase() === 'object' && Object.keys(selected).length === 0)
			|| ((typeof selected).toLowerCase() === 'number' && Number.isNaN(selected))
		) {
			return undefined;
		}

		if (multiple || !simpleValue) {
			return selected;
		}

		if (options) {
			return options.filter(({ value }) => value === selected);
		}

		if (Array.isArray(defaultOptions) && defaultOptions?.length > 0) {
			const itemFromAsyncOptions = defaultOptions.filter(({ value }) => value === selected)[0];

			if (itemFromAsyncOptions) {
				return itemFromAsyncOptions;
			}
		}

		const selectionCache = JSON.parse(window?.localStorage?.getItem('es-custom-select-cache') ?? '{}');

		if (selectionCache && selectionCache[selected]) {
			return selectionCache[selected];
		}

		if (Number.isNaN(selected)) {
			return {
				label: 'Item',
				value: selected,
			};
		}

		return {
			label: `Item ${selected}`,
			value: selected,
		};
	};

	const customSelectClass = 'components-custom-select';

	const selectControl = (
		<SortableSelect
			useDragHandle
			axis={sortAxis}
			onSortEnd={onSortEnd}
			distance={4}
			getHelperDimensions={({ node }) => node.getBoundingClientRect()}
			value={getValue()}
			loadOptions={customLoadOptions}
			cacheOptions={cacheOptions}
			className={customSelectClass}
			placeholder={placeholder}
			defaultOptions={defaultOptions}
			onChange={onChangeInternal}
			options={options}
			isMulti={multiple}
			isSearchable={isSearchable}
			isClearable={isClearable}
			isDisabled={disabled}
			isLoading={loading}
			blurInputOnSelect={blurInputOnSelect}
			hideSelectedOptions={hideSelected}
			loadingMessage={() => (<span>{loadingMessage}</span>)}
			noOptionsMessage={() => (<span>{noOptionsMessage}</span>)}
			components={{
				MultiValue: SortableMultiValue,
				MultiValueLabel: SortableMultiValueLabel,
				Option: customOptionComponent ?? Option,
				SingleValue: customSingleValueDisplayComponent ?? SingleValue,
				IndicatorSeparator: customIndicatorSeparator ?? null,
				MultiValueContainer: customMultiValueDisplayContainerComponent ?? MultiValueContainer,
				MultiValueRemove: customMultiValueRemoveButton ?? MultiValueRemove,
			}}
			closeMenuOnSelect={closeMenuOnSelect}
			theme={(theme) => ({
				...theme,
				borderRadius: 2,
				colors: {
					...theme.colors,
					primary25: 'hsla(0, 0%, 90%, 1)',
					primary50: 'hsla(0, 0%, 80%, 1)',
					primary75: 'hsla(0, 0%, 70%, 1)',
					primary: 'hsla(0, 0%, 0%, 1)'
				},
			})}
			styles={{
				menu: (provided) => {
					let bgColor = provided?.backgroundColor ?? 'rgba(255 255 255 / 0.75)';

					if (bgColor.includes('hsl') && !bgColor.includes('hsla')) {
						bgColor = bgColor.replaceAll(',', '').replace(')', ' / 0.75)');
					}

					return {
						...provided,
						borderTopLeftRadius: '0',
						borderTopRightRadius: '0',
						zIndex: 5,
						marginTop: 1,
						backgroundColor: bgColor,
						backdropFilter: 'blur(1rem) saturate(150%)',
					};
				},
				control: (provided, state) => ({
					...provided,
					position: 'static',
					borderBottomLeftRadius: state.menuIsOpen ? 0 : state.theme.borderRadius,
					borderBottomRightRadius: state.menuIsOpen ? 0 : state.theme.borderRadius,
					zIndex: state.menuIsOpen ? 4 : null,
					borderColor: style,
					minHeight: isCompact ? '2.25rem' : provided.minHeight,
					height: isCompact ? '2.25rem' : provided.height,
				}),
				option: (provided, state) => ({
					...provided,
					margin: '0.125rem 0.375rem',
					width: 'calc(100% - 0.75rem)',
					borderRadius: '0.25rem',
					transition: 'all 0.3s ease-out',
					...(state.isSelected ? { backgroundColor: 'var(--wp-admin-theme-color, #111111)' } : {}),
				}),
				valueContainer: (provided) => {
					if (!isCompact) {
						return provided;
					}

					return {
						...provided,
						padding: '0 0.5rem',
						height: '2.125rem',
					};
				},
				indicatorsContainer: (provided) => {
					if (!isCompact) {
						return provided;
					}

					return {
						...provided,
						height: '2.125rem',
					};
				}
			}}
		/>
	);

	if (!label) {
		return selectControl;
	}

	return (
		<BaseControl label={label} help={help}>
			{selectControl}
		</BaseControl>
	);
};
