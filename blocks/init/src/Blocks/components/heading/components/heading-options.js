import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { icons, getOption, checkAttr, getAttrKey, IconLabel, UseToggle, OptionSelector, ucfirst, Select, ColorPicker, Section, generateUseToggleConfig } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const HeadingOptions = (attributes) => {
	const {
		setAttributes,

		hideColor = false,
		hideSize = false,
		hideFontWeight = false,

		hideHeadingLevel = false,

		additionalControls,
		additionalControlsBeforeHeadingLevel,
	} = attributes;

	const headingColor = checkAttr('headingColor', attributes, manifest);
	const headingSize = checkAttr('headingSize', attributes, manifest);
	const headingLevel = checkAttr('headingLevel', attributes, manifest);

	const [fontSize, fontWeight] = checkAttr('headingSize', attributes, manifest)?.split(':') ?? '';

	const fontSizes = getOption('headingSize', attributes, manifest).reduce((all, { label, value, weights }) => ({
		...all,
		[value]: {
			label: label,
			value: value,
			weights: weights,
			weightOptions: weights.map((weight) => ({ label: ucfirst(weight), value: weight })),
		},
	}), {});

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'headingUse')}>
			<Section
				showIf={!hideColor || !hideSize || !hideFontWeight}
				additionalClasses='es-h-spaced'
				reducedBottomSpacing={additionalControlsBeforeHeadingLevel}
				noBottomSpacing={!additionalControlsBeforeHeadingLevel && !additionalControls && hideHeadingLevel}
			>
				{!hideColor &&
					<ColorPicker
						label={(!hideSize && !hideFontWeight) ? null : <IconLabel icon={icons.color} label={__('Color', 'eightshift-frontend-libs')} />}
						colors={getOption('headingColor', attributes, manifest, true)}
						value={headingColor}
						onChange={(value) => setAttributes({ [getAttrKey('headingColor', attributes, manifest)]: value })}
						type='textColor'
						additionalTriggerClasses='es-slight-button-border-cool-gray-400 es-button-square-36 es-rounded-1!'
						colorPaletteLayout='list'
						noBottomSpacing
					/>
				}

				{!hideSize &&
					<Select
						value={fontSize}
						options={Object.values(fontSizes)}
						onChange={(value) => setAttributes({ [getAttrKey('headingSize', attributes, manifest)]: `${value}:${fontSizes[value]?.weights[0] ?? 'bold'}` })}
						additionalSelectClasses='es-w-16'
						placeholder={__('Size', 'eightshift-frontend-libs')}
						noBottomSpacing
						simpleValue
						noSearch
					/>
				}

				{!hideFontWeight && fontSizes[fontSize]?.weightOptions?.length > 2 &&
					<Select
						value={fontWeight}
						options={fontSizes[fontSize]?.weightOptions}
						onChange={(value) => setAttributes({ [getAttrKey('headingSize', attributes, manifest)]: `${fontSize}:${value}` })}
						additionalSelectClasses='es-min-w-20 es-flex-shrink-0 es-flex-grow-1'
						placeholder={__('Weight', 'eightshift-frontend-libs')}
						disabled={fontSizes[fontSize]?.weights.length < 2}
						noBottomSpacing
						simpleValue
						noSearch
					/>
				}

				{!hideFontWeight && fontSizes[fontSize]?.weightOptions?.length <= 2 &&
					<Button
						isPressed={headingSize.includes('bold')}
						icon={icons.bold}
						className='es-button-icon-24 es-is-v2-gutenberg-input-matched-button'
						onClick={() => {
							const otherWeight = fontSizes[fontSize]?.weightOptions.map((w) => w.value).find((w) => w !== fontWeight);

							setAttributes({ [getAttrKey('headingSize', attributes, manifest)]: `${fontSize}:${otherWeight}` });
						}}
						disabled={fontSizes[fontSize]?.weightOptions?.length < 2}
					/>
				}
			</Section>

			{additionalControlsBeforeHeadingLevel}

			{!hideHeadingLevel &&
				<OptionSelector
					label={__('Heading level', 'eightshift-frontend-libs')}
					options={[
						{ label: 'H1', tooltip: __('Heading 1', 'eightshift-frontend-libs'), value: 1 },
						{ label: 'H2', tooltip: __('Heading 2', 'eightshift-frontend-libs'), value: 2 },
						{ label: 'H3', tooltip: __('Heading 3', 'eightshift-frontend-libs'), value: 3 },
						{ label: 'H4', tooltip: __('Heading 4', 'eightshift-frontend-libs'), value: 4 },
						{ label: 'H5', tooltip: __('Heading 5', 'eightshift-frontend-libs'), value: 5 },
						{ label: 'H6', tooltip: __('Heading 6', 'eightshift-frontend-libs'), value: 6 },
					]}
					value={headingLevel}
					onChange={(value) => setAttributes({ [getAttrKey('headingLevel', attributes, manifest)]: value })}
					additionalButtonClass='es-button-square-36 es-text-4 es-font-weight-300'
					additionalContainerClass='es-max-w-29!'
					noBottomSpacing={!additionalControls}
				/>
			}

			{additionalControls}
		</UseToggle>
	);
};
