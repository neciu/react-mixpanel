# React Mixpanel

[![Build Status](https://travis-ci.org/neciu/react-mixpanel.svg?branch=master)](https://travis-ci.org/neciu/react-mixpanel)

The project provides `MixpanelProvider` which uses [mixpanel-browser](https://github.com/mixpanel/mixpanel-js) to ease using Mixpanel in your React app.


## Usage

Install with: `npm i react-mixpanel --save`

Then use it like you would use [react-redux](https://github.com/reactjs/react-redux). In your root `App.js`:

1. Import required modules:
```
import mixpanel from 'mixpanel-browser';
import MixpanelProvider from 'react-mixpanel';
```
2. Initialize your Mixpanel instance:
```
mixpanel.init("YOUR_TOKEN");
```
3. Render your app using `MixpanelProvider`:
```
ReactDOM.render(
    <MixpanelProvider mixpanel={mixpanel}>
        <App/>
    </MixpanelProvider>,
    document.getElementById('app')
);
```
4. Then all child components will be able to use `mixpanel` from their `context`:
```
class App extends React.Component {
    componentDidMount() {
        this.context.mixpanel.track('App did mount.');
    }

    render() {
        return <span>This is the app!</span>;
    }
}
App.contextTypes = {
    mixpanel: PropTypes.object.isRequired
};
```
Note that you have to add `contextTypes` property to your component.