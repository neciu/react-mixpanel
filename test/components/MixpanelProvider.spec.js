import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React, {PropTypes} from 'react';
import TestUtils from 'react-addons-test-utils';
import mixpanel from 'mixpanel-browser';
import MixpanelProvider from '../../src/components/MixpanelProvider';


chai.use(sinonChai);

describe('React MixpanelProvider', () => {
    class Child extends React.Component {
        render() {
            return <div/>;
        }
    }
    Child.contextTypes = {
        mixpanel: PropTypes.object.isRequired
    };

    it('should add mixpanel to the child context', () => {
        sinon.spy(console, 'error');
        const tree = TestUtils.renderIntoDocument(
            <MixpanelProvider mixpanel={mixpanel}>
                <Child/>
            </MixpanelProvider>
        );
        expect(console.error).not.to.be.called;
        console.error.restore();

        const child = TestUtils.findRenderedComponentWithType(tree, Child);
        expect(child.context.mixpanel).to.be.eql(mixpanel);
    });
});
