import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import mixpanel from 'mixpanel-browser';
import {MixpanelProvider, MixpanelConsumer} from "react-mixpanel";

// initialize mixpanel
mixpanel.init('c1e2d6f3a7599132482ecd7f66670ae0');

// Root app
class App extends React.Component {
	render() {
		return <MixpanelAwareComponent/>
	}
}

// Component that will be aware of Mixpanel existence - it will pass Mixpanel
// instance down to it's child
class MixpanelAwareComponent extends React.Component {
	render() {
		return <MixpanelConsumer>
			{mixpanel => <MixpanelDependantComponent mixpanel={mixpanel}/>}
		</MixpanelConsumer>
	}
}

// Proper Mixpanel consumer, it gets Mixpanel instance by props
class MixpanelDependantComponent extends React.Component {
	static propTypes = {
		mixpanel: PropTypes.object.isRequired,
	};
	
	componentDidMount() {
		const {mixpanel} = this.props;
		mixpanel.track('App, componentDidMount');
		console.info(`"App, componentDidMount" sent!`);
	}
	
	render() {
		return <div>Hello World! Please check the console.</div>;
	}
}

ReactDOM.render(<MixpanelProvider value={mixpanel}>
	<App/>
</MixpanelProvider>, document.getElementById('root'));
