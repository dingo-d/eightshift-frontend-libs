/**
 * Project config used only in development and production build.
 *
 */

const fs = require('fs');

module.exports = (options) => {
	const entry = {};
	const output = {
		path: options.config.outputPath,
		publicPath: options.config.publicPath,

		// If you are using the multiple webpack builds with dynamic import you must provide different name here in order to avoid collision.
		library: '[name]',
	};

	// Load Application Entrypoint.
	if (!options.overrides.includes('application') && fs.existsSync(options.config.applicationEntry)) {
		entry.application = options.config.applicationEntry;
	}

	// Load ApplicationAdmin Entrypoint.
	if (!options.overrides.includes('applicationAdmin') && fs.existsSync(options.config.applicationAdminEntry)) {
		entry.applicationAdmin = options.config.applicationAdminEntry;
	}

	// Load ApplicationBlocks Entrypoint.
	if (!options.overrides.includes('applicationBlocks') && fs.existsSync(options.config.applicationBlocksEntry)) {
		entry.applicationBlocks = options.config.applicationBlocksEntry;
	}

	// Load ApplicationBlocksEditor Entrypoint.
	if (!options.overrides.includes('applicationBlocksEditor') && fs.existsSync(options.config.applicationBlocksEditorEntry)) {
		entry.applicationBlocksEditor = options.config.applicationBlocksEditorEntry;
	}

		// Load applicationBlocksFrontend Entrypoint.
		if (!options.overrides.includes('applicationBlocksFrontend') && fs.existsSync(options.config.applicationBlocksFrontendEntry)) {
			entry.applicationBlocksFrontend = options.config.applicationBlocksFrontendEntry;
		}

	// Load filename Output.
	if (!options.overrides.includes('filename')) {
		output.filename = `${options.config.filesOutput}.js`;
	}

	return {
		entry,
		output,
	};
};
