import React from 'react';
import PropTypes from 'prop-types';

import mixpanel from './MixpanelMock';
import MixpanelPropType from './MixpanelPropType';

const {Provider, Consumer} = React.createContext();

Provider.propTypes = {
	value: MixpanelPropType,
};

export class MixpanelProvider extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		mixpanel: MixpanelPropType,
	}

	static defaultProps = {
		mixpanel,
	};

	render() {
		return <Provider value={this.props.mixpanel}>
			{this.props.children}
		</Provider>
	}
}

export const MixpanelConsumer = Consumer;
