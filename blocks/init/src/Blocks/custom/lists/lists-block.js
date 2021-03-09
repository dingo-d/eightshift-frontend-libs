import React from 'react';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { ListsEditor } from './components/lists-editor';
import { ListsToolbar } from './components/lists-toolbar';
import { ListsOptions } from './components/lists-options';

export const Lists = (props) => {
	return (
		<>
			<InspectorControls>
				<ListsOptions {...props} />
			</InspectorControls>
			<BlockControls>
				<ListsToolbar {...props} />
			</BlockControls>
			<ListsEditor {...props} />
		</>
	);
};
