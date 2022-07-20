/**
 * Device check helper
 *
 * Detect a certain device, so specific functionality can be implemented for it.
 *
 * @access public
 *
 * Usage:
 * ```js
 * device.iPhone();
 * ```
 */
export const device = {
	/**
	 * Detect iPhone
	 *
	 * @returns {boolean}
	 */
	iPhone() {
		let checkIphone = false;

		if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
			checkIphone = true;
		}

		return checkIphone;
	},
};
