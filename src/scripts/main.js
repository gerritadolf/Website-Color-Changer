import React from 'react'
import ReactDOM from 'react-dom'
import {Colors, AllColorDictionary, ColorDictionary, __newColorsDictKey} from './utils.js'
import {ColorsList, Tabs, ColorPickerComponent} from './ui.js'
import NotificationCenter from './notification-center.js'

(function initNotificationCenter() {
	const notificationCenter = new NotificationCenter();
	notificationCenter.registerEvent('on-color-change');
	notificationCenter.registerEvent('on-color-set-change');
	notificationCenter.registerEvent('pick-color-for');
	window.notificationCenter = notificationCenter;
})();

window.load = (colors) => {
	const tabsContainerNode =  document.getElementById('tabs-container');
	const colosListContainerNode = document.getElementById('colors-list-container');
	const colorPickerContainerNode = document.getElementById('color-picker-container');

	const defaultColorsSet = 'text';
	const colorSetsNames = Object.keys(colors);

	alert(colosListContainerNode);
	alert(JSON.stringify(colorSetsNames));
	
	ReactDOM.render(React.createElement(ColorPickerComponent, {defaultColorsSet: defaultColorsSet, colors: colors}), colorPickerContainerNode);
	ReactDOM.render(React.createElement(Tabs, {items: colorSetsNames, defaultItemName: defaultColorsSet}), tabsContainerNode);
	ReactDOM.render(React.createElement(ColorsList, {colors: colors, defaultColorsSet: defaultColorsSet}), colosListContainerNode);
};

window.setColors = (_colors) => {
	let colors = parseColors(_colors);
	load(colors);
}

window.parseColors = (_colors) => {
	let colors = {
		text: 		_colors.text.reduce(function(p, c) { p[c] = [{}]; return p; }, new Object()),
		background: _colors.background.reduce(function(p, c) { p[c] = [{}]; return p; }, new Object())
	}

	colors.text.__proto__ = colors.background.__proto__ = ColorDictionary.prototype;
	colors.text[__newColorsDictKey] = {};
	colors.background[__newColorsDictKey] = {};

	return colors;
}