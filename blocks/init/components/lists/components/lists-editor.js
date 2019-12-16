import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/editor';

export const ListsEditor = (props) => {
  const {
    blockClass,
    content,
    onChangeContent,
    ordered,
    onChangeOrdered,
  } = props;

  const componentClass = 'lists';

  const listsClass = `
    ${componentClass}
    ${blockClass}__lists
  `;

  return (
    <RichText
      tagName={ordered}
      multiline="li"
      className={listsClass}
      placeholder={__('Add your list item', 'eightshift-boilerplate')}
      onChange={onChangeContent}
      value={content}
      onTagNameChange={onChangeOrdered}
    />
  );
};
