import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/editor';
import { ButtonEditor } from '../../../components/button/components/button-editor';
import { ImageEditor } from '../../../components/image/components/image-editor';

export const CardListEditor = (props) => {
  const {
    attributes: {
      blockClass,
      heading,
      paragraph,
      mediaPosition,
      media,
      buttonStyleSize,
      buttonStyleSizeWidth,
      buttonStyleColor,
      buttonIcon,
      buttonTitle,
    },
    actions: {
      onChangeHeading,
      onChangeParagraph,
    },
  } = props;

  const componentClass = `
    ${blockClass}
    ${blockClass}__media-position--${mediaPosition}
  `;

  return (
    <div className={componentClass}>
      <div className={`${blockClass}__media`}>
        <ImageEditor
          blockClass={blockClass}
          media={media}
        />
      </div>
      <div className={`${blockClass}__content`}>
        <div className={`${blockClass}__heading`}>
          <RichText
            placeholder={__('Add your heading', 'eightshift-boilerplate')}
            onChange={onChangeHeading}
            value={heading}
          />
        </div>
        <div className={`${blockClass}__paragraph`}>
          <RichText
            placeholder={__('Add your paragraph', 'eightshift-boilerplate')}
            onChange={onChangeParagraph}
            value={paragraph}
          />
        </div>
        <ButtonEditor
          blockClass={blockClass}
          styleColor={buttonStyleColor}
          styleSize={buttonStyleSize}
          styleSizeWidth={buttonStyleSizeWidth}
          icon={buttonIcon}
          title={buttonTitle}
        />
      </div>
    </div>
  );
};
