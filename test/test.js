import React from 'react';


import MixpanelContext, {MixpanelConsumer, MixpanelProvider} from '../src/index';
import {mount} from "enzyme";

it('should complain when wrong mixpanel shape given', () => {
	const brokenMixpanel = {
		init: 'it should be a function, not a string!'
	};
	
	console.error = jest.fn(error => {
		throw new Error(error);
	});
	
	expect(() => {
		<MixpanelProvider mixpanel={brokenMixpanel}><div>FOO</div></MixpanelProvider>
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
		<MixpanelProvider mixpanel={workingMixpanel}><div>FOO</div></MixpanelProvider>
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
		<MixpanelProvider mixpanel={mixpanel}>
			<MixpanelConsumer>
				{mixpanel => <SomeComponent mixpanel={mixpanel}/>}
			</MixpanelConsumer>
		</MixpanelProvider>
	;
	
	mount(<App/>);
	
	expect(mixpanel.init).toBeCalledWith('Hello fromSomeComponent!');
});

it('should work with default MixpanelContext used', () => {
	const mixpanel = {
		init: () => {},
		track: () => {},
		register: () => {},
		people: {},
	};

	console.error = jest.fn(error => {
		throw new Error(error);
	});

	expect(() => {
		<MixpanelContext.Provider mixpanel={mixpanel}><div>FOO</div></MixpanelContext.Provider>
	}).not.toThrow();
});

