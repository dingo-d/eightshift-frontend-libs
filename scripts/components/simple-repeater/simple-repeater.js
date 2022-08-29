import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { IconLabel, icons } from '@eightshift/frontend-libs/scripts';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';

import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './sortable-item';

/**
 * A simple repeater.
 *
 * @param {object} props                             - SimpleRepeater options.
 * @param {React.Component?} [props.icon]            - Icon to display above the repeater.
 * @param {React.Component?|string} props.label      - Label to display above the repeater.
 * @param {React.Component?|string} [props.subtitle] - Subtitle to display under the title.
 * @param {array} props.items                        - Array of items to display.
 * @param {string} props.attributeName               - Name of the attribute for items.
 * @param {function} props.setAttributes             - The `setAttributes` callback from component/block attributes.
 * @param {array<SimpleRepeaterItem>} props.children - Child items, mapped from `items`. Contains all the option for child items.
 */
export const SimpleRepeater = ({
	icon,
	label,
	subtitle,

	items,
	attributeName,
	setAttributes,

	children,
}) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			const items = items.map(({ id }) => id);
			const oldIndex = items.indexOf(active.id);
			const newIndex = items.indexOf(over.id);

			setAttributes({ [attributeName]: arrayMove([...items], oldIndex, newIndex) });
		}
	};

	return (
		<>
			<div className='es-flex-between'>
				<IconLabel
					icon={icon}
					label={label}
					subtitle={subtitle}
					standalone
				/>

				<Button
					onClick={() => setAttributes({ [attributeName]: [...items, { id: (items?.length ?? 0) + 1 }] })}
					icon={icons.plusCircle}
					className='es-button-icon-24 es-nested-color-cool-gray-650 es-rounded-1.0 es-mr-1.5'
					label={__('Add item', 'eightshift-frontend-libs')}
				/>
			</div>

			<div>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
					modifiers={[restrictToVerticalAxis, restrictToParentElement]}
				>
					<SortableContext
						items={items.map(({ id }) => id)}
						strategy={verticalListSortingStrategy}
					>
						{children.map((item, i) => (
							<SortableItem
								key={item.props.id}
								id={item.props.id}
								icon={item.props.icon}
								title={item.props.title}
								subtitle={item.props.subtitle}
								onRemove={item.props.onRemove ?? (
									() => {
										const newArray = [...items].filter((_, index) => index !== i);
										setAttributes({ [attributeName]: newArray });
									}
								)}
								isFirst={i === 0}
								isLast={i === items?.length - 1}
							>
								{item.props.children}
							</SortableItem>
						))}
					</SortableContext>
				</DndContext>
			</div>
		</>
	);
};
