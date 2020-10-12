import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToolbarGroup } from '@wordpress/components';

export const ImageToolbar = (props) => {
	const {
		media: {
			url,
			use = true,
		},
		showControls = true,
		onChangeMedia,
	} = props;

	const removeMedia = () => {
		onChangeMedia({});
	};

	if (!showControls) {
		return null;
	}

	return (
		<Fragment>
			{use &&
				<Fragment>
					{url &&
						<ToolbarGroup
							controls={[
								{
									icon: 'trash',
									title: __('Remove', 'eightshift-boilerplate'),
									isActive: false,
									onClick: removeMedia,
								},
							]}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
