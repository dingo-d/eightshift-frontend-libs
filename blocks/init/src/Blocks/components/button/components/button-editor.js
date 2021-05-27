import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr, selector } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ButtonEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentName: manifestComponentName,
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),

		buttonUse = checkAttr('buttonUse', attributes, manifest),

		buttonContent = checkAttr('buttonContent', attributes, manifest),
		buttonUrl = checkAttr('buttonUrl', attributes, manifest),
	} = attributes;

	const buttonClass = classnames([
		componentClass,
		selector(!(buttonContent && buttonUrl), `${componentClass}-placeholder`),
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{buttonUse &&
				<>
					{outputCssVariables(attributes, manifest, unique, globalManifest)}

					<RichText
						placeholder={placeholder}
						value={buttonContent}
						onChange={(value) => setAttributes({ [`${componentName}Content`]: value })}
						className={buttonClass}
						keepPlaceholderOnFocus
						allowedFormats={[]}
						data-id={unique}
					/>
				</>
			}
		</>
	);
};
