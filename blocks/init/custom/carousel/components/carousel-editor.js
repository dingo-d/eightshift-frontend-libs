import React from 'react'; // eslint-disable-line no-unused-vars
import { InnerBlocks } from '@wordpress/editor';
import { CarouselNavigation } from '../../../components/carousel-navigation/carousel-navigation';

export const CarouselEditor = (props) => {
  const {
    attributes: {
      blockClass,
      blockJsClass,
      allowedBlocks,
    },
  } = props;

  const componentClass = `
    ${blockClass}
    ${blockJsClass}
  `;

  const navigationClass = `${blockClass}__navigation`;

  return (
    <div className={componentClass}>
      <InnerBlocks
        allowedBlocks={(typeof allowedBlocks === 'undefined') || allowedBlocks}
      />
      <div className={navigationClass}>
        <CarouselNavigation />
      </div>
    </div>
  );
};