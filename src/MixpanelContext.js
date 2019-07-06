import React from 'react';
import PropTypes from 'prop-types';

const MixpanelContext = React.createContext();
export default MixpanelContext

MixpanelContext.Provider.propTypes = {
	value: PropTypes.shape({
		init: PropTypes.func.isRequired,
		track: PropTypes.func.isRequired,
	})
};

export class MixpanelProvider extends React.Component {
	render() {
		return <MixpanelContext.Provider value={this.props.mixpanel}>
			{this.props.children}
		</MixpanelContext.Provider>
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
	mixpanel: mixpanelShape
};

export const MixpanelConsumer = MixpanelContext.Consumer;