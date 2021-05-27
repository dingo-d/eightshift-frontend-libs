import React from 'react';
import { __ } from '@wordpress/i18n';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { __experimentalBlockAlignmentMatrixToolbar as BlockAlignmentMatrixToolbar } from '@wordpress/block-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { HeadingToolbar } from '../../heading/components/heading-toolbar';
import { ButtonToolbar } from '../../button/components/button-toolbar';
import manifest from './../manifest.json';

export const JumbotronToolbar = (attributes) => {
	const {
		componentName: manifestComponentName,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		jumbotronShowControls = true,

		jumbotronUse = checkAttr('jumbotronUse', attributes, manifest),

		jumbotronContentPosition = checkAttr('jumbotronContentPosition', attributes, manifest),

		showJumbotronContentPosition = true,
	} = attributes;

	if (!jumbotronShowControls) {
		return null;
	}

	return (
		<>
			{jumbotronUse &&
				<>
					{showJumbotronContentPosition &&
						<BlockAlignmentMatrixToolbar
							label={__('Content Position', 'eightshift-frontend-libs')}
							value={jumbotronContentPosition}
							onChange={(value) => setAttributes({ [`${componentName}ContentPosition`]: value })}
						/>
					}

				<HeadingToolbar
					{...props(attributes, 'heading')}
					setAttributes={setAttributes}
				/>

				<ButtonToolbar
					{...props(attributes, 'button')}
					setAttributes={setAttributes}
				/>
				</>
			}
		</>
	);
};
