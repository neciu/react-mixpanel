import {Component, Children} from 'react';
import PropTypes from 'prop-types';
import mixpanelShape from '../utils/mixpanelShape';


export default class MixpanelProvider extends Component {
    constructor(props, context) {
        super(props, context);
        this._mixpanel = props.mixpanel;
    }

    getChildContext() {
        return {mixpanel: this._mixpanel};
    }

    render() {
        const {children} = this.props;
        return Children.only(children);
    }
}
MixpanelProvider.propTypes = {
    mixpanel: mixpanelShape.isRequired,
    children: PropTypes.element.isRequired
};
MixpanelProvider.childContextTypes = {
    mixpanel: mixpanelShape.isRequired
};
