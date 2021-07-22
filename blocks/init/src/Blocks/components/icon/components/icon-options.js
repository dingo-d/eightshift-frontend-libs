import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { checkAttr, getAttrKey, getOption, CustomSelect } from '@eightshift/frontend-libs/scripts';
import { components } from 'react-select';
import manifest from './../manifest.json';

const {
	icons: manifestIcons,
} = manifest;

const IconPickerOption = props => (
	<components.Option {...props}>
		<div className={'icon-option-row'}>
			<i dangerouslySetInnerHTML={{ __html: manifestIcons[props.value] }}></i>
			<span>{props.label}</span>
		</div>
	</components.Option>
);

const IconPickerValueDisplay = ({ children, ...props }) => (
	<components.SingleValue {...props}>
		<div className={'icon-option-row'}>
			<i dangerouslySetInnerHTML={{ __html: manifestIcons[props.data.value] }}></i>
			<span>{children}</span>
		</div>
	</components.SingleValue>
);

export const IconOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;


	const {
		setAttributes,
		label = manifestTitle,
		showIconOptions = true,
	} = attributes;

	if (!showIconOptions) {
		return null;
	}

	const iconUse = checkAttr('iconUse', attributes, manifest);
	const iconName = checkAttr('iconName', attributes, manifest);

	return (
		<>
			{label && <h3 className={'options-label'}>{label}</h3>}

			<ToggleControl
				label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
				checked={iconUse}
				onChange={(value) => setAttributes({ [getAttrKey('iconUse', attributes, manifest)]: value })}
			/>

			{iconUse && (
				<CustomSelect
					label={__('Icon', 'eightshift-frontend-libs')}
					value={iconName}
					options={getOption('iconName', attributes, manifest)}
					placeholder={__('Select an icon', 'eightshift-frontend-libs')}
					customOptionComponent={IconPickerOption}
					customSingleValueDisplayComponent={IconPickerValueDisplay}
					onChange={(value) => setAttributes({[getAttrKey('iconName', attributes, manifest)]: value?.value})}
				/>
			)}
		</>
	);
};
