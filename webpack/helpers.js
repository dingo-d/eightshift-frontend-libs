/* eslint-disable valid-typeof */

/**
 * File holding webpack helpers used to create project webpack build setup.
 *
 */

const path = require('path');

/**
 * Generate all paths required for Webpack build to work.
 *
 * @param {string} projectDir Current project directory absolute path.
 * @param {string} proxyUrl Used for providing browsersync functionality.
 * @param {string} projectPathConfig Project path relative to project root.
 * @param {string} assetsPathConfig Assets path after projectPath location.
 * @param {string} outputPathConfig Public output path after projectPath location.
 * @param {string} blocksManifestSettingsPath Main global settings manifest.json path after projectPath location.
 *
 */
function getConfig(projectDir, proxyUrl, projectPathConfig, assetsPathConfig = 'assets', blocksAssetsPathConfig = 'src/blocks/assets', outputPathConfig = 'public', blocksManifestSettingsPath = 'src/blocks/manifest.json') {

  if (typeof projectDir === 'undefined') {
    throw 'projectDir parameter is empty, please provide. This key represents: Current project directory absolute path. For example: __dirname'; // eslint-disable-line no-throw-literal
  }

  if (typeof proxyUrl === 'undefined') {
    throw 'proxyUrl parameter is empty, please provide. This key represents: Development Url for providing browsersync functionality. For example: dev.boilerplate.com'; // eslint-disable-line no-throw-literal
  }

  if (typeof projectPathConfig === 'undefined') {
    throw 'projectPath parameter is empty, please provide. This key represents: Project path relative to project root. For example: wp-content/themes/eightshift-boilerplate'; // eslint-disable-line no-throw-literal
  }

  // Clear all slashes from user config.
  const projectPathConfigClean = projectPathConfig.replace(/^\/|\/$/g, '');
  const assetsPathConfigClean = assetsPathConfig.replace(/^\/|\/$/g, '');
  const blocksAssetsPathConfigClean = blocksAssetsPathConfig.replace(/^\/|\/$/g, '');
  const outputPathConfigClean = outputPathConfig.replace(/^\/|\/$/g, '');
  const blocksManifestSettingsPathClean = blocksManifestSettingsPath.replace(/^\/|\/$/g, '');

  // Create absolute path from the projects relative path.
  const absolutePath = `${projectDir}`;

  return {
    proxyUrl,
    absolutePath,

    // Output files absolute location.
    outputPath: path.resolve(absolutePath, outputPathConfigClean),

    // Output files relative location, added before every output file in manifes.json. Should start and end with "/".
    publicPath: path.join('/', projectPathConfigClean, outputPathConfigClean, '/'),

    // Source files entries absolute locations.
    applicationEntry: path.resolve(absolutePath, assetsPathConfigClean, 'application.js'),
    applicationAdminEntry: path.resolve(absolutePath, assetsPathConfigClean, 'application-admin.js'),
    applicationBlocksEntry: path.resolve(absolutePath, blocksAssetsPathConfigClean, 'application-blocks.js'),
    applicationBlocksEditorEntry: path.resolve(absolutePath, blocksAssetsPathConfigClean, 'application-blocks-editor.js'),

    blocksManifestSettingsPath: path.resolve(absolutePath, blocksManifestSettingsPathClean),
  };
}

/**
 * Convert Recursive Json data only for colors to SASS valid output.
 *
 * @param object Json data only for colors.
 */
function convertJsonColorsToSass(data) {
  let output = '';

  for (const property in data) {
    if (data.hasOwnProperty(property)) {

      if (typeof data[property] === 'string' && property === 'color') {
        output += data[property];
      }

      if (typeof data[property] === 'object') {
        output += `${data[property].slug}: ${convertJsonColorsToSass(data[property])},`;
      }
    }
  }

  return output;
}

/**
 * Convert Recursive Json data to SASS valid output.
 *
 * @param object Json data to convert.
 */
function convertJsonToSassGeneral(data) {
  let output = '';

  for (const property in data) {
    if (data.hasOwnProperty(property)) {
      switch (typeof data[property]) {
        case 'object':
          if (property === 'colors') {
            output += `${property}: (${convertJsonColorsToSass(data[property])}),`;
          } else {
            output += `${property}: (${convertJsonToSassGeneral(data[property])}),`;
          }
          break;
        default:
          output += `${property}: ${data[property]},`;
          break;
      }
    }
  }

  return output;
}

/**
 * Convert Json to SASS valid output and prefix it with map key.
 *
 * @param object Json Data object.
 */
function convertJsonToSass(data) {
  return `$global-variables: (${convertJsonToSassGeneral(data)});`;
}

module.exports = {
  getConfig,
  convertJsonToSass,
};