import React from 'react';
import { __ } from '@wordpress/i18n';
import RSSelect, { components } from 'react-select';
import { defaultEightshiftColorScheme, defaultEightshiftStyles } from './custom-select-style';
import { CustomSelectDefaultClearIndicator, CustomSelectDefaultDropdownIndicator } from './custom-select-default-components';
import { customOnChange, getValue } from './shared';

/**
 * A simple, customizable select menu.
 *
 * @param {object} props                                     - Select options.
 * @param {string?} [props.label]                            - Label displayed above the control.
 * @param {string?} [props.help]                             - Help text displayed below the control.
 * @param {array<{string, string}>?} props.options           - Options to choose from. Option should be in `{label: '', value: ''}` format.
 * @param {object} props.value                               - Current value
 * @param {boolean} [props.simpleValue=false]                - If `true`, instead of passing (and getting) a `{label: '', value: ''}` object from the component, only the value is returned.
 * @param {function} props.onChange                          - Function called when the selection is changed.
 * @param {boolean} [props.noClear=false]                    - If `true`, the items cannot be cleared/deleted all at once.
 * @param {boolean} [props.noSearch=false]                   - If `true`, the search functionality is disabled.
 * @param {boolean} [props.disabled=false]                   - If set `true`, the component is disabled.
 * @param {boolean} [props.closeMenuAfterSelect=false]       - If set `true`, the dropdown is closed immediately after selecting an option.
 * @param {string} [props.noOptionsMessage='No options']     - Text to display when no options are available.
 * @param {React.Component?} [props.customDropdownIndicator] - If provided, replaces the default dropdown arrow indicator.
 * @param {React.Component?} [props.customClearIndicator]    - If provided and `noClear` is `false`, replaces the default 'Clear all' button.
 * @param {React.Component?} [props.customMenuOption]        - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {React.Component?} [props.customValueDisplay]      - If provided, replaces the default current value display of each selected item (react-select's `components.SingleValue`).
 * @param {boolean} [props.noBottomSpacing=false]            - If `true`, the default bottom spacing is removed.
 * @param {string?} [props.additionalClasses='']             - If provided, the classes are added to the component container.
 * @param {string?} [props.additionalSelectClasses='']       - If provided, the classes are added to the Select element itself.
 * @param {object?} [props.additionalProps={}]               - If provided, the provided props will be passed to the Select control.
 */
export const Select = (props) => {
	const {
		label,
		help,

		options,
		value,

		simpleValue = false,

		onChange,

		noClear = false,
		noSearch = false,

		disabled = false,

		closeMenuAfterSelect = false,

		noOptionsMessage = __('No options', 'eightshift-frontend-libs'),

		customClearIndicator,
		customDropdownArrow,
		customMenuOption,
		customValueDisplay,

		noBottomSpacing = false,

		additionalClasses,
		additionalSelectClasses,
		additionalProps,
	} = props;

	return (
		<div className={`${noBottomSpacing ? '' : 'es-mb-5'} ${additionalClasses ?? ''}`}>
			{label &&
				<div className='es-mb-2'>{label}</div>
			}

			<RSSelect
				options={options}
				value={getValue(simpleValue, value, options)}
				onChange={(v) => customOnChange(simpleValue, v, onChange)}
				closeMenuOnSelect={closeMenuAfterSelect}
				isClearable={!noClear}
				isSearchable={!noSearch}
				isDisabled={disabled}
				className={additionalSelectClasses}
				noOptionsMessage={() => (<span>{noOptionsMessage}</span>)}
				theme={defaultEightshiftColorScheme}
				styles={defaultEightshiftStyles}
				components={{
					Option: customMenuOption ?? components.Option,
					SingleValue: customValueDisplay ?? components.SingleValue,
					IndicatorSeparator: null,
					DropdownIndicator: customDropdownArrow ?? CustomSelectDefaultDropdownIndicator,
					ClearIndicator: customClearIndicator ?? CustomSelectDefaultClearIndicator,
				}}
				{...additionalProps}
			/>

			{help &&
				<div className='es-mt-1 es-text-3 es-color-cool-gray-500'>{help}</div>
			}
		</div>
	);
};
