# React Mixpanel

[![Build Status](https://travis-ci.org/neciu/react-mixpanel.svg?branch=master)](https://travis-ci.org/neciu/react-mixpanel)

The project provides simple wrapper over [mixpanel-browser](https://github.com/mixpanel/mixpanel-js) to ease using Mixpanel in your React app.


## Usage

Install with: `npm i react-mixpanel --save`

Then use it like you would use [Context API](https://reactjs.org/docs/context.html). In your root `App.js`:

1. Import required modules:
```
import mixpanel from 'mixpanel-browser';
import { MixpanelProvider, MixpanelConsumer } from 'react-mixpanel';
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
4. Then, everytime you'd like to use mixpanel you can get it using `MixpanelConsumer`:
```
const App = () => 
    <Foo>
        <MixpanelConsumer/>
            {mixpanel => ...}
        </MixpanelConsumer>
    </Foo>;
```
You can use mixpanel in lifecycle methods by passing it via prop!
```
class INeedMixpanel extends React.Component {
    componentDidMount() {
        this.props.mixpanel.track('Hello mixpanel!');
    }

    render() {
        return <div>Bar</div>;  
    }
}

const App = () => 
    <Foo>
        <MixpanelConsumer/>
            {mixpanel => <INeedMixpanel mixpanel={mixpanel}/>}
        </MixpanelConsumer>
    </Foo>;

```

## Example

You can play with included example *App* in `examples` directory.
