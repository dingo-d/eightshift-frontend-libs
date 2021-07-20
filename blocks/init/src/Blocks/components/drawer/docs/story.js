import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts/editor';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { DrawerEditor } from '../components/drawer-editor';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const attributes = getExample('drawer', manifest);

const open = () => document.body.classList.add('menu-is-open');

export const Left = () => {
	open();

	return (
		<DrawerEditor {...props('drawer', attributes)} />
	);
};

export const Right = () => {
	open();

	return (
		<DrawerEditor
			{...props('drawer', attributes, {
				drawerPosition: 'right',
				drawerMenu: 'Menu Drawer Open From the Right',
			})}
		/>
	);
};

export const Top = () => {
	open();

	return (
		<DrawerEditor
			{...props('drawer', attributes, {
				drawerPosition: 'top',
				drawerMenu: 'Menu Drawer Open From the Top',
			})}
		/>
	);
};

export const Behind = () => {
	open();

	return (
		<DrawerEditor
			{...props('drawer', attributes, {
				drawerPosition: 'behind',
				drawerMenu: 'Menu Drawer Open From the Behind',
			})}
		/>
	);
};
