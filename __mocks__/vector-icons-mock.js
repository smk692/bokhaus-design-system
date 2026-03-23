const React = require('react');
const MockIcon = ({ name, size, color }) => React.createElement('span', { style: { fontSize: size, color } }, name);
module.exports = MockIcon;
module.exports.default = MockIcon;
