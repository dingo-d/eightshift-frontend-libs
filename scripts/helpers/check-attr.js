import _ from 'lodash';

/**
 * Check if attribute exist in attributes list and add default value if not.
 * This is used because Block editor will not output attributes that don't have default value.
 *
 * @param {string} key                       - Key to check.
 * @param {array} attributes                 - Array of attributes.
 * @param {object} manifest                  - Components/blocks manifest.json
 * @param {boolean} [undefinedAllowed=false] - Allowed detection of undefined values.
 *
 * @return {mixed}
 */
export const checkAttr = (key, attributes, manifest, undefinedAllowed = false) => {

	// Get the correct key for the check in the attributes object.
	const newKey = getAttrKey(key, attributes, manifest);

	// If key exists in the attributes object, just return that key value.
	if (Object.prototype.hasOwnProperty.call(attributes, newKey)) {
		return attributes[newKey];
	}

	// Check current component attributes.
	const manifestKey = manifest.attributes[key];

	// Bailout if key is missing.
	if (typeof manifestKey === 'undefined') {
		if ('blockName' in manifest) {
			throw Error(`${key} key does not exist in the ${manifest.blockName} block manifest. Please check your implementation.`);
		} else {
			throw Error(`${key} key does not exist in the ${manifest.componentName} component manifest. Please check your implementation.`);
		}
	}

	// If undefinedAllowed is true and attribute is missing default just return undefined to be able to unset attribute in blocke editor.
	if (!Object.prototype.hasOwnProperty.call(manifestKey, 'default') && undefinedAllowed) {
		return undefined;
	}

	// Check type.
	const defaultType = manifestKey.type;

	let defaultValue;

	// Output "default values" if none are defined.
	switch (defaultType) {
		case 'boolean':
			defaultValue = Object.prototype.hasOwnProperty.call(manifestKey, 'default') ? manifestKey.default : false;
			break;
		case 'array':
			defaultValue = Object.prototype.hasOwnProperty.call(manifestKey, 'default') ? manifestKey.default : [];
			break;
		case 'object':
			defaultValue = Object.prototype.hasOwnProperty.call(manifestKey, 'default') ? manifestKey.default : {};
			break;
		default:
			defaultValue = Object.prototype.hasOwnProperty.call(manifestKey, 'default') ? manifestKey.default : '';
			break;
	}

	return defaultValue;
};

/**
 * Map and check attributes for responsive object.
 *
 * @param {string} keyName                   - Key name to find in responsiveAttributes object.
 * @param {array} attributes                 - Array of attributes.
 * @param {object} manifest                  - Components/blocks manifest.json
 * @param {boolean} [undefinedAllowed=false] - Allowed detection of undefined values.
 *
 * @returns {mixed}
 */
export const checkAttrResponsive = (keyName, attributes, manifest, undefinedAllowed = false) => {
	const output = {};

	// Bailout if missing keys.
	if (! _.has(manifest, 'responsiveAttributes')) {
		if (typeof manifest['blockName'] === 'undefined') {
			throw Error(`It looks like you are missing responsiveAttributes key in your ${manifest['blockName']} block manifest.`);
		} else {
			throw Error(`It looks like you are missing responsiveAttributes key in your ${manifest['componentName']} component manifest.`);
		}
	}

	// Bailout if attribute keys is missing.
	if (!_.has(manifest.responsiveAttributes, keyName)) {
		throw Error(`It looks like you are missing ${keyName} key in your manifest responsiveAttributes object.`);
	}

	// Iterate keys in responsiveAttributes object and use checkAttr helper.
	for (const [key, value] of Object.entries(manifest.responsiveAttributes[keyName])) {
		output[key] = checkAttr(value, attributes, manifest, undefinedAllowed);
	}

	return output;
}

/**
 * Check if attributes key has prefix and outputs the correct attribute name.
 *
 * @param {string} key       - Key to check.
 * @param {array} attributes - Array of attributes.
 * @param {object} manifest  - Components/blocks manifest.json
 *
 * @return string
 */
export const getAttrKey = (key, attributes, manifest) => {
	let prefix = '';

	// Just skip if attribute is wrapper.
	if (key.includes('wrapper')) {
		return key;
	}

	// Populate prefix key for recursive checks of attribute names.
	// If prefix is empty use blockName as prefix.
	if (typeof attributes.prefix === 'undefined') {
		prefix = manifest.blockName;
	} else {
		prefix = attributes.prefix;
	}

	prefix = _.camelCase(prefix);

	// If prefix from attributes is the same as block name just append prefix to the attribute name.
	if (attributes.prefix === attributes.blockName) {
		return `${prefix}${_.upperFirst(key)}`;
	}

	// No need to test if this is block or component because on top level block there is no prefix.
	// If there is a prefix, remove the attribute component name prefix and replace it with the new prefix.
	return key.replace(_.camelCase(manifest.componentName), prefix);
}
