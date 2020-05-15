
# Change Log for the Eightshift Frontend Libs
All notable changes to this project will be documented in this file.

This projects adheres to [Semantic Versioning](https://semver.org/) and [Keep a CHANGELOG](https://keepachangelog.com/).

## [Unreleased]

## [3.2.1] - 2020-05-13

### Added
* Option to add [transforms](https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#transforms-optional) inside manifest.json file.
* Option to add custom [svg](https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#icon-optional) icon inside manifest.json file.
* Featured Posts - block that enables selecting specific posts to display on page
* `font-face` - mixin for generating `@font-face` definitions

### Fixed
* Fixed issue #96 - Plugin name / description now correctly renamed during setup
* Fixed issue #116 - Copy storybook during setup
* Eightshift Boilerplate asci-art split into two lines to better break on narrow terminals

### Changes
* Adding transforms and custom svg icon is optional. To enable this options in your existing project you need change registerBlocks method inside [application-blocks-editor.js](https://github.com/infinum/eightshift-frontend-libs/blob/master/blocks/init/src/blocks/assets/scripts/application-blocks-editor.js) file.


## [3.2.0] - 2020-05-06

### Breaking change
There has been some breaking changes in this release.
Follow this migration script in order for you project to work correctly with the new changes.

* We have removed all Webpack aliases, to fix this search and replace this strings inside you project:
  * `import 'EightshiftBlocksWhatwgFetch'`                                 -----> `import 'whatwg-fetch'`
  * `import Swiper from 'EightshiftBlocksSwiper'`                          -----> `import Swiper from 'swiper'`
  * `import 'EightshiftBlocksSwiperIE'`                                    -----> `import 'swiper/js/swiper.min'`
  * `import 'EightshiftBlocksBabelPolyfill'`                               -----> `import '@babel/polyfill'`
  * `import 'EightshiftBlocksAutoprefixer'`                                -----> `import 'autoprefixer'`
  * `@import 'EightshiftBlocksNormalize'`                                  -----> `@import 'normalize-scss'`
  * `@import 'EightshiftBlocksMediaBlender'`                               -----> `@import 'media-blender'`
  * `@import 'EightshiftBlocksSwiperStyle'`                                -----> `@import '~swiper/swiper.scss'`
  * `import { dynamicImport } from 'EightshiftBlocksDynamicImport'`        -----> `import { dynamicImport } from '@eightshift/frontend-libs/scripts/helpers'`
  * `import { registerBlocks } from 'EightshiftBlocksRegisterBlocks'`      -----> `import { registerBlocks } from '@eightshift/frontend-libs/scripts/editor'`
  * `import { ucfirst } from 'EightshiftBlocksUcfirst'`                    -----> `import { ucfirst } from '@eightshift/frontend-libs/scripts/editor'`
  * `import { getActions } from 'EightshiftBlocksGetActions'`              -----> `import { getActions } from '@eightshift/frontend-libs/scripts/editor'`
  * `import { getActions } from 'EightshiftBlocksGetActions'`              -----> `import { getActions } from '@eightshift/frontend-libs/scripts/editor'`
  * `import { ... } from 'EightshiftBlocksUtilityHelpersPath/...'`         -----> `import { ... } from '@eightshift/frontend-libs/scripts/helpers'`
  * `@import 'EightshiftFrontendLibs'`                                     -----> `@import '@eightshift/frontend-libs/styles/index.scss'`
  * `@import 'EightshiftEditorStyleOverride'`                              -----> `@import '@eightshift/frontend-libs/styles/override-editor.scss'`
  * `import { ColorPaletteCustom } from 'EightshiftComponentColorPalette'` -----> `import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components'`
  * `import { HeadingLevel } from 'EightshiftComponentHeadingLevel'`       -----> `import { HeadingLevel } from '@eightshift/frontend-libs/scripts/components'`
* Storybook scripts and helpers have been moved and restructured. To fix this just recopy all Storybook config files in your project. Files can be found [here](https://github.com/infinum/eightshift-frontend-libs/tree/master/blocks/init/storybook).

### Added
* Missing registerBlocks import.
* Scroll-to-target component that has two options: target element to scroll to and text of the scroll-to link.
* Fixed a bug with centering where logo wouldn't be quite centered on mobile - seemingly due to having `flex-basis` set to auto. Setting it to any other value (such as `1px`) fixed the issue.
* Fixed a bug where `drawer` wouldn't work if `page-overlay` did not exist.
* Added support for `behind` and `top` drawers / mobile menus (slide from top or fade in).
* Better vertical / horizontal centering (more `flex`, less `height`, proper justifying).
* Removed some `height: 100%` which made styling links difficult and coupled to header / footer height.
* `page-overlay` added to script init project.
* `editor-color-palette` - Modified the `ColorPaletteCustom` component to get colors by default from WordPress's global store.
* `editor-color-palette` - Modified all uses of `ColorPaletteCustom` component to not override default colors (except for wrapper).
* `editor-color-palette` - Added a helper (using React hooks) for reading colors from WordPress's global store.
* Added docs for `editor-color-palette`.

### Changed
- js loader to be able to handle components from the lib

## [3.1.1] - 2020-03-05

### Fixed
* Wrong namespace in components helpers.
* Removing unnecessary map keys for components style.
* Fixing drawer styles.
* Fixing menu styles.
* Loading z-index from external map.
* Fixing typo translate3D to translate3d.
* Removing display: inline-block;
* Fixing logo styles.
* Fixing broken scroll to top method.

## [3.1.0] - 2020-03-04

### Added
- Added copying of components used by header & footer
- Added `.travis.yml`.
- Added integration test for setting up a plugin using `npx create-wp-project plugin`.
- Added `create-wp-project` tests run in travis.
- Added auto detection of React version to eslint config..
- Added footer & header to copy blocks script.
- Added foreground color for icons.
- Added underline-text mixin.
- Added underline mixin.
- Added for-each-attribute mixin.
- Added block manifest registration ability to register blocks in different manifest than global settings.
- Added new alias `EightshiftBlocksSwiperIE` for Swiper slider with IE 11 support.
- Added component - `header`.
- Added component - `menu`.
- Added component - `menu-drawer`.
- Added component - `hamburger`.
- Added component - `footer`.
- Added component - `copyright`.
- Added 2 possible modifiers to menu for media-specific display property.

### Changed
- Moved all tests from `create-wp-project` to `eightshift-frontend-libs`.
- Refactoring stories to simpler setup.
- Linting fixes.
- Removed jQuery from scroll-to-top component and carousel.

### Removed
- Removed hardcoded media-specific display properties

## [3.0.11] - 2020-01-29

### Changed
- Reverting override styles.

## [3.0.10] - 2020-01-29

### Changed
- Fixed externals import.

## [3.0.9] - 2020-01-29

### Changed
- Fixed lodash import.

## [3.0.8] - 2020-01-29

### Changed
- Added align support full to block registration
- Added align full as default align for wrapper
- Removed some of editor style overrides.
- Adding wrapper default align style.

## [3.0.7] - 2020-01-27

### Changed
- Searched and replaced all instances of Eightshift with Eightshift.

## [3.0.6] - 2020-01-27

### Removed
- Removing docs to new repository

### Changed
- Fixing options to include storybook inside a project.

## [3.0.4] - 2020-01-23

### Added

- Fixed theme setup script
- Added setup script for plugin
- Added absolute-position scss placeholder
- Updating documentation
- updating packages and fixing vulnerabilities

## [3.0.3] - 2020-01-16

### Added
- Added new divider block.
- Added blocksAssetsPathConfig also as a default value in Webpack helper.
- Added assetsPath and outputPath to default values in Webpack helper.
- Added option to not load webpack entrypoint file if it doesn't exist.

### Changed
- Changed setup script for boilerplate.
- Changed Webpack overrides key from object to array.
- Changed CleanWebpackPlugin option to fix removing items in watch mode.
- Changed readme and docs.
- Changed documentation.
- Changed setup script new structure.

### Moved
- Decoupled normal assets from blocks for extra flexibility.
- Moved all src/blocks/layout/... to src/blocks/components.
- Moved initial blocks setup to a separate folder.

## [3.0.2] - 2019-12-19

### Changed
- Fixing Scss build process
- Updating webpack config
- Updating readme and docs

## [3.0.1] - 2019-12-19

### Changed
- Added option to override any Webpack build options
- Removed postcss
- Changed readme docs for Webpack
- Updating aliases
- Removing unnecessary packages
- Optimizations for storybook

## [3.0.0] - 2019-12-18

### Added
- Installed `sassdoc`
- Added `npm run build-sassdoc` script which builds `sassdoc` (generated file: `sassdoc/index.html`)
- Added `.gitattributes`
- Storybook
- Merged sassdocs from @IvanGrginovInf
- Merged docpress from @dingo-d
- Added readme for every block
- Added multiple block/components
- Added Gutenberg playground
- Added multiple new helpers
- Merged multipleProps and media props from @tihomirselak
- Blocks refactor

## [2.0.7] - 2019-11-28

### Added
- Changelog for `2.0.6`

## [2.0.6] - 2019-11-28

### Added
- `%visually-hidden` placeholder - hide an element visually without preventing element rendering (like `display: none;` does) and without hiding from accessibility tools - [reference](https://www.w3.org/WAI/tutorials/forms/labels/#hiding-the-label-element)

## [2.0.5] - 2019-11-13

### Changed
- Changing block get actions method to fix a bug.

## [2.0.4] - 2019-11-12

### Changed
- Changing block get actions method to incorporate objects and media.

### Added
- Blocks Storybook preparations

## [2.0.3] - 2019-11-12

### Changed
- Changing postcss setup.

### Removed
- Classnames package from package.json.

## [2.0.2] - 2019-11-06

### Added
- Fixing readme logo image.
- Fixing Wrapper block spacing.

## [2.0.1] - 2019-11-06

### Added
- Rename script for [Eightshift Boilerplate](https://github.com/infinum/eightshift-boilerplate).
- Logo and Gif animation.

## [2.0.0] - 2019-11-04

- Complete refactor on project organization.
- Moving, Babel, Webpack, linters config from boilerplate to eightshift-frontend-libs.
- Adding blocks init and blocks example.
- Creating components to reuse on blocks project.

## [1.0.19] - 2019-09-18

- Adding new column-offset-modifiers mixin

## [1.0.18] - 2019-08-01

- Apply suggestions from code review

## [1.0.17] - 2019-07-19

- Initial tagged release.

[Unreleased]: https://github.com/infinum/eightshift-frontend-libs/compare/master...HEAD

[3.2.1]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.2.0...v3.2.1
[3.2.0]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.1.1...v3.2.0
[3.1.1]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.1.0...v3.1.1
[3.1.0]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.11...v3.1.0
[3.0.11]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.10...v3.0.11
[3.0.10]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.9...v3.0.10
[3.0.9]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.8...v3.0.9
[3.0.8]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.7...v3.0.8
[3.0.7]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.6...v3.0.7
[3.0.6]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.4...v3.0.6
[3.0.4]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.3...v3.0.4
[3.0.3]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.2...v3.0.3
[3.0.2]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.1...v3.0.2
[3.0.1]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.7...v3.0.0
[2.0.7]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.6...v2.0.7
[2.0.6]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.5...v2.0.6
[2.0.5]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.4...v2.0.5
[2.0.4]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.3...v2.0.4
[2.0.3]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/1.0.19...v2.0.0
[1.0.19]: https://github.com/infinum/eightshift-frontend-libs/compare/1.0.18...1.0.19
[1.0.18]: https://github.com/infinum/eightshift-frontend-libs/compare/1.0.17...1.0.18
[1.0.17]: https://github.com/infinum/eightshift-frontend-libs/compare/6d7b3d4fe8f8f2d183d6b54a39e6ce7f0250ed5b...1.0.17