import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { VideoEditor } from './components/video-editor';
import { VideoOptions } from './components/video-options';

export const Video = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <VideoOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <VideoEditor
        attributes={attributes}
      />
    </Fragment>
  );
};