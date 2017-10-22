import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-addons-test-utils';
import mixpanel from 'mixpanel-browser';
import MixpanelProvider from '../../src/components/MixpanelProvider';


chai.use(sinonChai);

describe('React MixpanelProvider', () => {
    class Child extends React.Component {
        render() {
            return <div>
                <span>Child</span>
                {this.props.children}
            </div>;
        }
    }
    Child.contextTypes = {
        mixpanel: PropTypes.object.isRequired
    };

    class InnerChild extends React.Component {
        render() {
            return <span>InnerChild</span>;
        }
    }
    InnerChild.contextTypes = {
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

    it('should add mixpanel to the inner child context too', () => {
        sinon.spy(console, 'error');
        const tree = TestUtils.renderIntoDocument(
            <MixpanelProvider mixpanel={mixpanel}>
                <Child>
                    <InnerChild/>
                </Child>
            </MixpanelProvider>
        );
        expect(console.error).not.to.be.called;
        console.error.restore();

        const child = TestUtils.findRenderedComponentWithType(tree, Child);
        expect(child.context.mixpanel).to.be.eql(mixpanel);

        const innerChild = TestUtils.findRenderedComponentWithType(tree, InnerChild);
        expect(innerChild.context.mixpanel).to.be.eql(mixpanel);
    });
});
