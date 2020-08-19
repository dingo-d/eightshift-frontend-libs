<?php
/**
 * Template for the Button Block view.
 *
 * @package EightshiftBoilerplate
 */

$this->render_block_view(
  '/components/button/button.php',
  [
    'blockClass' => $attributes['blockClass'] ?? '',
    'button'     => $attributes['button'] ?? [],
  ]
);
