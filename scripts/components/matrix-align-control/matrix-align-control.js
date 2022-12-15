import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { icons, OptionSelector, PopoverWithTrigger } from '../../../scripts';
import { camelize } from '../../../scripts/helpers';
import { ucfirst } from '../../../scripts/editor';

/**
 * A component that can provide a 3x3 or a 2x2 grid of positions to pick from.
 * Replaces the default Gutenberg `AlignmentMatrixControl`/`BlockAlignmentMatrixControl`/`BlockAlignmentMatrixToolbar`.
 *
 * @param {object} props                             - MatrixAlignControl options.
 * @param {'wp'|'tileButton'} [props.type='wp']      - Style of the option trigger. `wp` replicates the default Gutenberg control, `tileButton` shows a regular button that fits with a `tileButton` IconToggle well.
 * @param {'3x3'|'2x2'} [props.size='3x3']           - Defines the matrix size to show. Can be either `3x3` or `2x2`.
 * @param {React.Component?} [props.label]           - Label displayed on the trigger button. (tooltip when style is `wp`, text label below icon when style is `tileButton`)
 * @param {string} props.value                       - Current value.
 * @param {function} [props.onChange]                - Function that is called on every value change.
 * @param {string?} [props.additionalTriggerClasses] - If provided, the classes are appended to the trigger button.
 */
export const MatrixAlignControl = (props) => {
	const {
		type = 'wp',
		size = '3x3',
		label = __('Position', 'eightshift-frontend-libs'),

		value,
		onChange,
		additionalTriggerClasses,
	} = props;

	const allSizeOptions = [
		{
			value: 'top left',
			label: __('Top-left', 'eightshift-frontend-libs'),
			availableOn: ['3x3', '2x2']
		},
		{
			value: 'top center',
			label: __('Top-center', 'eightshift-frontend-libs'),
			availableOn: ['3x3']
		},
		{
			value: 'top right',
			label: __('Top-right', 'eightshift-frontend-libs'),
			availableOn: ['3x3', '2x2']
		},
		{
			value: 'center left',
			label: __('Center-left', 'eightshift-frontend-libs'),
			availableOn: ['3x3']
		},
		{
			value: 'center center',
			label: __('Center', 'eightshift-frontend-libs'),
			availableOn: ['3x3']
		},
		{
			value: 'center right',
			label: __('Center-right', 'eightshift-frontend-libs'),
			availableOn: ['3x3']
		},
		{
			value: 'bottom left',
			label: __('Bottom-left', 'eightshift-frontend-libs'),
			availableOn: ['3x3', '2x2']
		},
		{
			value: 'bottom center',
			label: __('Bottom-center', 'eightshift-frontend-libs'),
			availableOn: ['3x3']
		},
		{
			value: 'bottom right',
			label: __('Bottom-right', 'eightshift-frontend-libs'),
			availableOn: ['3x3', '2x2']
		},
	];

	// Set icons for (in)active options.
	const sizeOptions = allSizeOptions.filter(({availableOn}) => availableOn.includes(size)).map((item) => ({
		...item,
		icon: item.value === value ? icons.matrixAlignControlDotActive : icons.matrixAlignControlDotInactive,
	}));

	const [currentValue, setCurrentValue] = useState(value);

	return (
		<PopoverWithTrigger
			additionalCloseActions={() => onChange(currentValue)}
			contentClass='es-min-w-auto! es-min-h-auto! es-p-1.5!'
			trigger={
				({ ref, setIsOpen, isOpen }) => {
					if (type === 'wp') {
						return (
							<Button
								className={additionalTriggerClasses}
								onClick={() => setIsOpen(!isOpen)}
								ref={ref}
								label={label}
								icon={icons[`position${size}${ucfirst(camelize(value))}`]}
							/>
						);
					}

					return (
						<Button
							icon={icons[`position${size}${ucfirst(camelize(value))}`]}
							onClick={() => setIsOpen(!isOpen)}
							ref={ref}
							className={`es-button-icon-24 es-slight-button-border-cool-gray-300 es-hover-slight-button-border-cool-gray-500 es-flex-grow-0 es-flex-shrink-0 es-rounded-1! es-has-v2-gutenberg-button-active-state es-flex-col es-gap-1.25! es-w-17! es-h-17! es-button-no-icon-spacing es-content-center! es-text-3! es-line-h-1 es-p-0! es-nested-flex-shrink-0 ${additionalTriggerClasses}`}
						>
							{label}
						</Button>
					);
				}
			}
		>
			<OptionSelector
				options={sizeOptions}
				onChange={(value) => setCurrentValue(value)}
				value={currentValue ?? (size === '3x3' ? 'center center' : 'top left')}
				border='none'
				alignment='center'
				additionalClass={size === '3x3' ? 'es-w-27!' : 'es-w-18!'}
				additionalButtonClass='es-rounded-1!'
				noBottomSpacing
				iconOnly
			/>
		</PopoverWithTrigger>
	);
};
