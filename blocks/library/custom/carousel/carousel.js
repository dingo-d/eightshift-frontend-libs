import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { CarouselOptions } from './components/carousel-options';
import { CarouselEditor } from './components/carousel-editor';

export const Carousel = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <CarouselOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <CarouselEditor
        attributes={attributes}
      />
    </Fragment>
  );
};
