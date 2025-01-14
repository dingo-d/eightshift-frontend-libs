import React from 'react';
import _ from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose';
import { select } from '@wordpress/data';
import { STORE_NAME } from './store';

/**
 * Filter callback for setting up the correct data to the blocks.
 *
 * @abstract private
 */
 export const blocksFilterHook = createHigherOrderComponent((BlockListBlock) => {
	return (innerProps) => {
		const {
			name,
			clientId,
		} = innerProps;

		let updatedProps = innerProps;

		// Update only our blocks.
		if (name.split('/')[0] === select(STORE_NAME).getSettingsNamespace()) {
			updatedProps = _.assign(
				{},
				innerProps,
				{
					// Assign clientId to our internal attribute used for inline css variables.
					attributes: _.assign({}, innerProps.attributes, {
						blockClientId: clientId,
					}),
					block: {
						attributes: _.assign({}, innerProps.block.attributes, {
							blockClientId: clientId,
						}),
					},

					// Add className to block defined by our project.
					className: select(STORE_NAME).getSettingsGlobalVariablesCustomBlockName(),
				}
			);
		}
		return <BlockListBlock {...updatedProps} />;
	};
}, 'blocksFilterHook');
