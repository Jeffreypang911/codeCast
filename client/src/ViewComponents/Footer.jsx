import React from 'react';

import FilterLink from '../HelperComponents/FilterLink.jsx';
import { fetchScheduledStreams, fetchActiveStreams, fetchArchivedStreams } from '../redux/ducks/streamsDuck.js';
const Footer = () => (
  <p>
    Show: <FilterLink filter={fetchScheduledStreams.SCHEDULED_STREAMS_UPDATE}>All</FilterLink>
    {', '}
    <FilterLink filter={fetchActiveStreams.ACTIVE_STREAMS_UPDATE}>Active</FilterLink>
    {', '}
    <FilterLink filter={fetchArchivedStreams.ARCHIVED_STREAMS_UPDATE}>Completed</FilterLink>
  </p>
)

export default Footer;