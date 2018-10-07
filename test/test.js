import React from 'react';


import {MixpanelConsumer, MixpanelProvider} from '../src/MixpanelContext';
import {mount} from "enzyme";

it('should complain when wrong mixpanel shape given', () => {
	const brokenMixpanel = {
		init: 'it should be a function, not a string!'
	};
	
	console.error = jest.fn(error => {
		throw new Error(error);
	});
	
	expect(() => {
		<MixpanelProvider value={brokenMixpanel}><div>FOO</div></MixpanelProvider>
	}).toThrow();
});

it('should not complain when correct mixpanel shape given', () => {
	const workingMixpanel = {
		init: () => {},
		track: () => {},
		register: () => {},
		people: {},
	};
	
	console.error = jest.fn(error => {
		throw new Error(error);
	});
	
	expect(() => {
		<MixpanelProvider value={workingMixpanel}><div>FOO</div></MixpanelProvider>
	}).not.toThrow();
});

it('consumer should fire passed mixpanel functions', () => {
	const mixpanel = {
		init: jest.fn(),
		track: () => {},
		register: () => {},
		people: {},
	};
	
	class SomeComponent extends React.Component {
		componentDidMount() {
			this.props.mixpanel.init('Hello fromSomeComponent!');
		}
		
		render() {
			return <div>FOO</div>
		}
	}
	
	const App = () =>
		<MixpanelProvider value={mixpanel}>
			<MixpanelConsumer>
				{mixpanel => <SomeComponent mixpanel={mixpanel}/>}
			</MixpanelConsumer>
		</MixpanelProvider>
	;
	
	mount(<App/>);
	
	expect(mixpanel.init).toBeCalledWith('Hello fromSomeComponent!');
});


