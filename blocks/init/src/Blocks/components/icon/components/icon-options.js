import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey, getOption, UseToggle, RSOption, Select, generateUseToggleConfig } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { RSSingleValue } from '@eightshift/frontend-libs/scripts/components/custom-select/react-select-component-wrappers';

const {
	icons: manifestIcons,
} = manifest;

const IconPickerOption = props => (
	<RSOption {...props}>
		<div className='es-h-spaced es-gap-2.5!'>
			<i className='es-line-h-0! es-w-6 es-h-6 es-display-flex es-items-center es-content-center' dangerouslySetInnerHTML={{ __html: manifestIcons[props.value] }}></i>
			<span>{props.label}</span>
		</div>
	</RSOption>
);

const IconPickerValueDisplay = ({ children, ...props }) => (
	<RSSingleValue {...props}>
		<div className='es-h-spaced es-gap-2.5!'>
			<i className='es-line-h-0! es-w-6 es-h-6 es-display-flex es-items-center es-content-center es-nested-color-cool-gray-500' dangerouslySetInnerHTML={{ __html: manifestIcons[props.data.value] }}></i>
			<span>{children}</span>
		</div>
	</RSSingleValue>
);

export const IconOptions = (attributes) => {
	const {
		setAttributes,
		hideSizePicker = false,
	} = attributes;

	const iconName = checkAttr('iconName', attributes, manifest);
	const iconSize = checkAttr('iconSize', attributes, manifest);

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'iconUse')}>
			<div className='es-h-spaced'>
				<Select
					value={iconName}
					options={getOption('iconName', attributes, manifest)}
					placeholder={__('Select an icon', 'eightshift-frontend-libs')}
					customMenuOption={IconPickerOption}
					customValueDisplay={IconPickerValueDisplay}
					onChange={(value) => setAttributes({ [getAttrKey('iconName', attributes, manifest)]: value })}
					additionalClasses='es-flex-grow-1'
					noBottomSpacing
					simpleValue
				/>

				{!hideSizePicker &&
					<Select
						value={iconSize}
						options={getOption('iconSize', attributes, manifest)}
						onChange={(value) => setAttributes({ [getAttrKey('iconSize', attributes, manifest)]: value })}
						additionalSelectClasses='es-max-w-14'
						additionalClasses='es-flex-shrink-0'
						noBottomSpacing
						simpleValue
						noSearch
					/>
				}
			</div>
		</UseToggle>
	);
};
