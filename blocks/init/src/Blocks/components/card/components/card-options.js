import React from 'react';
import { Fragment } from '@wordpress/element';
import { ImageOptions } from '../../image/components/image-options';
import { HeadingOptions } from '../../heading/components/heading-options';
import { ParagraphOptions } from '../../paragraph/components/paragraph-options';
import { ButtonOptions } from '../../button/components/button-options';

export const CardOptions = (attributes) => {
	const {
		setAttributes,
		options,
		introColor,
		introSize,
	} = attributes;

	return (
		<Fragment>

			<ImageOptions
				{...attributes}
				setAttributes={setAttributes}
			/>

			<hr />

			<HeadingOptions
				{...attributes}
				componentName={'intro'}
				label={'Intro'}
				headingColor={introColor}
				headingSize={introSize}
				setAttributes={setAttributes}
				options={options}
			/>

			<hr />

			<HeadingOptions
				{...attributes}
				setAttributes={setAttributes}
				options={options}
			/>


			<hr />

			<ParagraphOptions
				{...attributes}
				setAttributes={setAttributes}
				options={options}
			/>

			<hr />

			<ButtonOptions
				{...attributes}
				setAttributes={setAttributes}
				options={options}
			/>

		</Fragment>
	);
};
