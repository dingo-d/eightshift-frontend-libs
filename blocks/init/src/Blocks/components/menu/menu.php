<?php

/**
 * Menu component responsible for rendering and styling just the menu.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Menu\Menu;
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$use = $attributes['use'] ?? true;

if (!$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'menu';

$name = $attributes['menu'] ?? 'header_main_nav';
$modifier = $attributes['modifier'] ?? '';
$variation = isset($attributes['variation']) ? "{$componentClass}-{$attributes['variation']}" : $componentClass;
$jsClass = $attributes['jsClass'] ?? '';

$parentClasses = Components::classnames([
	$jsClass ? "js-{$jsClass}" : '',
]);

// @phpstan-ignore-next-line
$bemMenu = Menu::bemMenu(
	$name,
	$variation,
	$parentClasses,
	$modifier ? "{$variation}--{$modifier}" : ''
);

if (!empty($bemMenu) && !$bemMenu) {
	echo esc_html($bemMenu);
}
