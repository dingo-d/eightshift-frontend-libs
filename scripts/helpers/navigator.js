/**
 * The `Navigator.vibrate()` method pulses the vibration hardware on the device, if such hardware exists.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate
 *
 * @access public
 *
 * @returns {string}
 *
 * Usage:
 * ```js
 * getNavigatorVibrate();
 * ```
 */
export const getNavigatorVibrate = () => {
	return navigator.vibrate ||
	navigator.webkitVibrate ||
	navigator.mozVibrate ||
	navigator.msVibrate;
};
