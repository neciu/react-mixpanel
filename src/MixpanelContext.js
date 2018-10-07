import React from 'react';
import PropTypes from 'prop-types';

const {Provider, Consumer} = React.createContext();

Provider.propTypes = {
	value: PropTypes.shape({
		init: PropTypes.func.isRequired,
		track: PropTypes.func.isRequired,
	})
};

export class MixpanelProvider extends React.Component {
	render() {
		return <Provider value={this.props.value}>
			{this.props.children}
		</Provider>
	}
}

export const mixpanelShape = PropTypes.shape({
	init: PropTypes.func.isRequired,
	track: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	people: PropTypes.object.isRequired,
});

MixpanelProvider.propTypes = {
	children: PropTypes.node.isRequired,
	value: mixpanelShape
};

export const MixpanelConsumer = Consumer;