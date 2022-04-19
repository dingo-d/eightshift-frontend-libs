import { useSelect } from '@wordpress/data';

/**
 * Use this hook to read editor-color-palette colors directly from WP built in store.
 *
 * Requires WP => 5.3
 *
 * @access public
 *
 *
 * @returns {object}
 *
 * Usage:
 * ```js
 * getPaletteColors()
 * ```
 */
export const getPaletteColors = () => useSelect((select) => {
	const settings = select('core/block-editor').getSettings();
	return settings.colors.reduce(
		(obj, item) => ({
			...obj,
			[item.slug]: item,
		}),
		{}
	);
});
