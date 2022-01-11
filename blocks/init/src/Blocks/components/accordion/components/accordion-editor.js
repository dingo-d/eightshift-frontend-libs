import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr, getAttrKey, classnames } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const AccordionEditor = (attributes) => {
	const {
		componentClass,
		resources: { icon },
	} = manifest;

	const {
		setAttributes,
		selectorClass = componentClass,
		additionalClass,
		blockClass,
		placeholder = __('Add content', 'eightshift-frontend-libs'),
	} = attributes;

	const accordionUse = checkAttr('accordionUse', attributes, manifest);
	const accordionTitle = checkAttr('accordionTitle', attributes, manifest);
	const accordionContent = checkAttr('accordionContent', attributes, manifest);

	if (!accordionUse) {
		return null;
	}

	const accordionClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	const accordionTriggerClass = selector(componentClass, componentClass, 'trigger');
	const accordionIconClass = selector(componentClass, componentClass, 'icon');
	const accordionPanelClass = selector(componentClass, componentClass, 'panel');
	const accordionContentClass = selector(componentClass, componentClass, 'content');

	const [open, setOpen] = useState(accordionTitle?.length ? false : true);

	return (
		<div className={accordionClass} data-accordion-open={open}>
			<button className={accordionTriggerClass} onClick={() => setOpen(!open)}>
				<RichText
					placeholder={placeholder}
					value={accordionTitle}
					onChange={(value) => setAttributes({ [getAttrKey('accordionTitle', attributes, manifest)]: value })}
					keepPlaceholderOnFocus
					allowedFormats={[]}
				/>
				<i
					className={accordionIconClass}
					dangerouslySetInnerHTML={{ __html: icon }}
				></i>
			</button>

			<section className={accordionPanelClass}>
				<div className={accordionContentClass}>
					{accordionContent}
				</div>
			</section>
		</div>
	);
};
