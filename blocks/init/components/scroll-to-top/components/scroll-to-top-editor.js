import { __ } from '@wordpress/i18n';
import React from 'react'; // eslint-disable-line no-unused-vars

export const ScrollToTopEditor = () => {
  return (
    <a href='#' className='js-scroll-to-top scroll-to-top'>
      {__('To Top', 'eightshift-boilerplate')}
    </a>
  );
};