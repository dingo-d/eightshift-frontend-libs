import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import _ from 'lodash';
import { useSelect } from '@wordpress/data';
import { PanelBody, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { CustomSelect, icons, IconLabel, BlockIcon, ucfirst, getAttrKey, IconToggle, Responsive } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';
import { unescapeHTML } from '@eightshift/frontend-libs/scripts/helpers/text-helpers';

export const FeaturedPostsOptions = ({ attributes, setAttributes }) => {
	const {
		options: manifestOptions,
		allowed: {
			postTypes,
			taxonomies
		},
		attributes: manifestAttributes,
	} = manifest;

	const {
		featuredPostsQuery,
		featuredPostsQuery: {
			postType,
			taxonomy,
			terms,
			posts,
		},
		featuredPostsShowItems,
		featuredPostsExcludeCurrentPost,
	} = attributes;

	const breakpoints = ['large', 'desktop', 'tablet', 'mobile'];

	// Fetch all post types.
	// Filter allowed post types defined in the block manifest.
	const postTypeOptions = useSelect((select) => {
		const { getPostTypes } = select('core');

		const items = getPostTypes() ?? [];

		const data = items.filter(({ slug }) => postTypes.find((item) => slug === item)) ?? [];

		return data.map(({ slug, taxonomies }) => {
			return {
				label: ucfirst(slug),
				value: slug,
				taxonomies: taxonomies,
			};
		}) ?? [];
	});

	// Fetch all taxonomies based on the postType selected.
	// Filter allowed taxonomies defined in the block manifest.
	const taxonomyOptions = useSelect((select) => {
		const { getTaxonomy } = select('core');

		const availableTaxonomies = postTypeOptions.filter((element) => element.value === postType) ?? [];

		const taxonomiesList = availableTaxonomies.length ? availableTaxonomies[0].taxonomies : [];

		const allowedTaxonomies = taxonomiesList.filter((element) => taxonomies.find((item) => element === item)) ?? [];

		const data = allowedTaxonomies.map((element) => getTaxonomy(element)) ?? [];

		if (!data.length) {
			return [];
		}

		return [
			{
				label: __('All taxonomies', 'eightshift-frontend-libs'),
				value: null
			},
			...data.map(({ slug }) => {
				return {
					label: ucfirst(slug),
					value: slug,
				};
			})
		];
	});

	// Fetch all taxonomy terms based on the selected taxonomy and postType.
	const termsOptions = useSelect((select) => {
		const { getEntityRecords } = select('core');

		const termsList = getEntityRecords(
			'taxonomy',
			taxonomy,
			{
				per_page: -1,
			}
		) ?? [];

		return termsList.map(({ name, id }) => {
			return {
				label: name,
				value: id,
			};
		});
	});

	// Fetch all posts based on the selected postType.
	const postsOptions = useSelect((select) => {
		const { getEntityRecords } = select('core');

		const termsList = getEntityRecords(
			'postType',
			postType,
			{
				per_page: -1,
			}
		) ?? [];

		return termsList.map(({ title: { rendered }, id }) => {
			return {
				label: unescapeHTML(rendered),
				value: id,
			};
		});
	});

	return (
		<PanelBody title={__('Featured posts', 'eightshift-frontend-libs')}>
			{postTypeOptions &&
				<CustomSelect
					label={<IconLabel icon={icons.file} label={__('Post type', 'eightshift-frontend-libs')} />}
					value={postType}
					options={postTypeOptions}
					onChange={(value) => {
						setAttributes({
							featuredPostsQuery: {
								postType: value,
								taxonomy: '',
								terms: [],
								posts: [],
							},
						});
					}}
					isClearable={false}
					simpleValue
				/>
			}

			{postTypeOptions && taxonomyOptions && taxonomyOptions?.length > 0 &&
				<CustomSelect
					label={<IconLabel icon={icons.editOptions} label={__('Filter by taxonomy', 'eightshift-frontend-libs')} />}
					value={taxonomy}
					options={taxonomyOptions}
					onChange={(value) => {
						setAttributes({
							featuredPostsQuery: {
								...featuredPostsQuery,
								taxonomy: value,
								terms: [],
								posts: [],
							},
						});
					}}
					isClearable={false}
					simpleValue
				/>
			}

			{taxonomyOptions && taxonomy && termsOptions?.length > 0 &&
				<CustomSelect
					label={<IconLabel icon={icons.clipboard} label={sprintf(__('Show items from this %s', 'eightshift-frontend-libs'), taxonomy.toLowerCase())} />}
					options={termsOptions}
					value={terms}
					multiple={true}
					onChange={(value) => {
						setAttributes({
							featuredPostsQuery: {
								...featuredPostsQuery,
								terms: value[0] ? value : [],
								posts: [],
							},
						});
					}}
				/>
			}

			{postTypeOptions && !taxonomy &&
				<CustomSelect
					label={<IconLabel icon={<BlockIcon iconName='esf-select' />}  label={sprintf(__('Show only these %ss', 'eightshift-frontend-libs'), _.toLower(postType))} />}
					help={__('If blank, all are shown', 'eightshift-frontend-libs')}
					options={postsOptions}
					value={posts}
					multiple={true}
					onChange={(value) => {
						setAttributes({
							featuredPostsQuery: {
								...featuredPostsQuery,
								terms: [],
								posts: value,
							},
						});
					}}
				/>
			}

			<hr />

			<Responsive label={<IconLabel icon={icons.itemPerRow} label={__('Items per row', 'eightshift-frontend-libs')} />}>
				{breakpoints.map((keyName) => {
					const point = ucfirst(keyName);
					const attr = point === 'Large' ? `${getAttrKey('featuredPostsItemsPerLine', attributes, manifest)}` : `${getAttrKey('featuredPostsItemsPerLine', attributes, manifest)}${point}`;

					return (
						<Fragment key={keyName}>
							<RangeControl
								label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
								onChange={(value) => setAttributes({ [attr]: value })}
								resetFallbackValue={manifestAttributes[attr].default}
								value={attributes[attr]}
								min={manifestOptions.featuredPostsItemsPerLine.min}
								max={manifestOptions.featuredPostsItemsPerLine.max}
								step={manifestOptions.featuredPostsItemsPerLine.step}
								allowReset
							/>
						</Fragment>
					);
				})}
			</Responsive>

			<RangeControl
				label={<IconLabel icon={icons.totalItems} label={__('Maximum items', 'eightshift-frontend-libs')} />}
				value={featuredPostsShowItems}
				onChange={(value) => setAttributes({ [getAttrKey('featuredPostsShowItems', attributes, manifest)]: value })}
				min={1}
				step={1}
				allowReset
			/>

			<hr />

			<IconToggle
				icon={icons.none}
				label={__('Exclude current post', 'eightshift-frontend-libs')}
				checked={featuredPostsExcludeCurrentPost}
				help={__('This options can only be used in post single pages.', 'eightshift-frontend-libs')}
				onChange={(value) => setAttributes({ [getAttrKey('featuredPostsExcludeCurrentPost', attributes, manifest)]: value })}
			/>
		</PanelBody>
	);
};
