/* eslint-disable no-unused-vars */

import React from 'react';
import { assign } from 'lodash';
import classnames from 'classnames';
import { createHigherOrderComponent } from '@wordpress/compose';
import { select } from '@wordpress/data';
import { responsiveSelectors } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

// Add options to the Gutenberg markup.
const parentComponentBlock = createHigherOrderComponent((BlockListBlock) => {
  return (innerProps) => {
    const {
      name,
      attributes: {
        blockClass,
        width,
        offset,
        hide,
      },
      rootClientId,
    } = innerProps;

    let updatedProps = innerProps;

    // Remove wrapper from all blocks inside column block.
    const parent = select('core/editor').getBlocksByClientId(rootClientId);

    if (parent[0] !== null && parent[0].name === `${globalManifest.namespace}/${manifest.blockName}`) {
      innerProps.attributes.hasWrapper = false;
    }

    // Move selectors to the parent div in DOM.
    if (name === `${globalManifest.namespace}/${manifest.blockName}`) {
      const componentClass = classnames(
        blockClass,
        'eightshift-block',
        `${responsiveSelectors(width, 'width', blockClass)}`,
        `${responsiveSelectors(offset, 'offset', blockClass)}`,
        `${responsiveSelectors(hide, 'hide', blockClass, false)}`,
      );

      updatedProps = assign(
        {},
        innerProps,
        {
          className: componentClass,
        }
      );
    }

    return wp.element.createElement(
      BlockListBlock,
      updatedProps
    );
  };
}, 'parentComponentBlock');

wp.hooks.addFilter('editor.BlockListBlock', globalManifest.namespace, parentComponentBlock);