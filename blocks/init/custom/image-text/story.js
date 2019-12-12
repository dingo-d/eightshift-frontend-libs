import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import readme from './readme.md';
import { Gutenberg, blockDetails, hasWrapperDecorator } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Image Text',
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
};

export const block = () => (
  <Gutenberg props={
    {
      blocks: [
        {
          attributes: {
            ...blockDetails(manifest.blockName),
            styleFullHeight: manifest.attributes.styleFullHeight.default,
            media: {
              id: 0,
              url: 'https://picsum.photos/400/400',
              title: 'Image Text Title',
            },
            heading: 'Heading Title',
            paragraph: 'Paragraph Content',
            imagePosition: manifest.attributes.imagePosition.default,
            buttonTitle: 'Button Title',
            buttonUrl: '',
            buttonStyleSize: manifest.attributes.buttonStyleSize.default,
            buttonStyleSizeWidth: manifest.attributes.buttonStyleSizeWidth.default,
            buttonStyleColor: manifest.attributes.buttonStyleColor.default,
            buttonId: '',
            buttonIcon: manifest.attributes.buttonIcon.default,
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
