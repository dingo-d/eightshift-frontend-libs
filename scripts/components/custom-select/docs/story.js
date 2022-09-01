import React from 'react';
import readme from './readme.mdx';
import { icons } from '@eightshift/frontend-libs/scripts';
import { CustomSelect, CustomSelectCustomOption, CustomSelectCustomValueDisplay, CustomSelectCustomMultipleValueDisplay, CustomSelectCustomMultipleValueDisplayContainer, CustomSelectCustomMultipleValueRemoveButton } from '../custom-select';

export default {
	title: 'Options/Custom Select',
	parameters: {
		docs: {
			page: readme
		}
	},
};

const defaultProps = {
	onChange: () => { },
	value: 'Color',
	placeholder: 'Select an item'
};

const data = [
	{
		'label': 'Item 1',
		'value': 1,
	},
	{
		'label': 'Item 2',
		'value': 2,
	},
	{
		'label': 'Item 3',
		'value': 3,
	},
	{
		'label': 'Item 4',
		'value': 4,
	},
	{
		'label': 'Item 5',
		'value': 5,
	},
	{
		'label': 'Item 6',
		'value': 6,
	},
];

const getData = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data);
		}, 3000);
	});
};

const getSearchableData = (inputValue) => {
	const filterData = ({ label }) => label.toLowerCase().includes(inputValue.toLowerCase());
	return new Promise((resolve) => {
		setTimeout(() => {
			if (!inputValue) {
				resolve(data.slice(0, 3));
			}

			resolve(data.filter(filterData));
		}, 3000);
	});
};

const CustomPickerOption = props => (
	<CustomSelectCustomOption {...props}>
		<div>
			<span role='img' aria-label='pointing to the right'>👉 &nbsp;</span>
			<span>{props.label}</span>
		</div>
	</CustomSelectCustomOption>
);

const CustomValueDisplay = ({ children, ...props }) => (
	<CustomSelectCustomValueDisplay {...props}>
		<div>
			<span role='img' aria-label='pointing to the right'>👉 &nbsp;</span>
			<span>{children}</span>
		</div>
	</CustomSelectCustomValueDisplay>
);

const CustomMultiValueDisplay = (props) => {
	return (
		<CustomSelectCustomMultipleValueDisplay {...props}>
			<div>
				<span role='img' aria-label='pointing to the right'>👉 &nbsp;</span>
				<span>{props.children}</span>
			</div>
		</CustomSelectCustomMultipleValueDisplay>
	);
};

const CustomMultiValueDisplayContainer = (props) => {
	const customProps = {
		...props,
		innerProps: {
			...props.innerProps,
			style: {
				backgroundColor: 'yellow',
				flexDirection: 'row-reverse',
				padding: '0.125rem 0.25rem',
				borderRadius: '100rem',
			},
		}
	};
	return (
		<CustomSelectCustomMultipleValueDisplayContainer {...customProps} />
	);
};

const CustomMultiValueRemoveButton = (props) => {
	return (
		<CustomSelectCustomMultipleValueRemoveButton {...props}>
			{icons.trash}
		</CustomSelectCustomMultipleValueRemoveButton>
	);
};

export const SelectSingle = () => {
	return (
		<CustomSelect
			{...defaultProps}
			label={'Single synchrounous select'}
			options={data}
		/>
	);
};

export const SelectMultiple = () => {
	return (
		<CustomSelect
			{...defaultProps}
			multiple={true}
			label={'Multiple synchrounous select'}
			placeholder={'Select an item'}
			options={data}
		/>
	);
};

export const AsyncSelectSingle = () => {
	return (
		<CustomSelect
			{...defaultProps}
			label={'Single async select'}
			options={data}
			loadOptions={getData}
		/>
	);
};

export const AsyncSelectMultiple = () => {
	return (
		<CustomSelect
			{...defaultProps}
			multiple={true}
			label={'Multiple async select'}
			loadOptions={getData}
		/>
	);
};

export const AsyncSelectMultipleWithRefetch = () => {
	return (
		<CustomSelect
			{...defaultProps}
			multiple={true}
			label={'Multiple async select with refetch'}
			help={'Try searching for \'item\''}
			loadOptions={getSearchableData}
			reFetchOnSearch={true}
		/>
	);
};

export const CustomRendering = () => {
	return (
		<>
			<p>Custom dropdown items</p>
			<CustomSelect
				{...defaultProps}
				multiple={false}
				label={'My cool single select menu'}
				customOptionComponent={CustomPickerOption}
				options={data}
			/>

			<p>Custom value label</p>
			<CustomSelect
				{...defaultProps}
				multiple={false}
				label={'My cool single select menu'}
				customSingleValueDisplayComponent={CustomValueDisplay}
				options={data}
			/>

			<p>Custom dropdown items and value label</p>
			<CustomSelect
				{...defaultProps}
				multiple={false}
				label={'My cool single select menu'}
				customOptionComponent={CustomPickerOption}
				customSingleValueDisplayComponent={CustomValueDisplay}
				options={data}
			/>


			<p>Custom dropdown items on multi-select menu</p>
			<CustomSelect
				{...defaultProps}
				multiple={true}
				label={'My cool multiple select menu'}
				customOptionComponent={CustomPickerOption}
				options={data}
			/>

			<p>Custom multi-select value display</p>
			<CustomSelect
				{...defaultProps}
				multiple={true}
				label={'Multiple synchrounous select'}
				placeholder={'Select an item'}
				options={data}
				customMultiValueDisplayComponent={CustomMultiValueDisplay}
			/>

			<p>Custom multi-select value container</p>
			<CustomSelect
				{...defaultProps}
				multiple={true}
				label={'Multiple synchrounous select'}
				placeholder={'Select an item'}
				options={data}
				customMultiValueDisplayContainerComponent={CustomMultiValueDisplayContainer}
			/>

			<p>Custom multi-select item remove button</p>
			<CustomSelect
				{...defaultProps}
				multiple={true}
				label={'Multiple synchrounous select'}
				placeholder={'Select an item'}
				options={data}
				customMultiValueRemoveButton={CustomMultiValueRemoveButton}
			/>

			<p>Fully customized multi-select item</p>
			<CustomSelect
				{...defaultProps}
				multiple={true}
				label={'Multiple synchrounous select'}
				placeholder={'Select an item'}
				options={data}
				customMultiValueRemoveButton={CustomMultiValueRemoveButton}
				customMultiValueDisplayComponent={CustomMultiValueDisplay}
				customMultiValueDisplayContainerComponent={CustomMultiValueDisplayContainer}
			/>
		</>
	);
};
