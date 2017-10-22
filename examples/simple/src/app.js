import React from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import MixpanelProvider from 'react-mixpanel';
import mixpanel from 'mixpanel-browser';


mixpanel.init('24f9321d57326888b6ce1512cf6e5229');

class App extends React.Component {
    componentDidMount() {
        this.context.mixpanel.track('App, componentDidMount');
        console.info(`"App, componentDidMount" sent!`);
    }

    render() {
        return (
            <div>
                <h1>App</h1>
                <Inner/>
            </div>
        );
    }
}
App.contextTypes = {
    mixpanel: PropTypes.object.isRequired
};

class Inner extends React.Component {
    componentDidMount() {
        this.context.mixpanel.track('Inner, componentDidMount');
        console.info(`"Inner, componentDidMount" sent!`);
    }

    render() {
        return (
            <div>
                <h2>Inner</h2>
            </div>
        );
    }
}
Inner.contextTypes = {
    mixpanel: PropTypes.object.isRequired
};

ReactDOM.render(
    <MixpanelProvider mixpanel={mixpanel}>
        <App/>    
    </MixpanelProvider>,
    document.getElementById('app')
);
