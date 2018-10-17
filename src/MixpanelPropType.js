import PropTypes from 'prop-types';

const mixpanelShape = PropTypes.shape({
  init: PropTypes.func.isRequired,
  track: PropTypes.func.isRequired,
  track_links: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  identify: PropTypes.func.isRequired,
  register_once: PropTypes.func.isRequired,
  people: PropTypes.object.isRequired,
});

export default mixpanelShape;
