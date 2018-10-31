import React from 'react';
import { Link } from "react-router-dom"; 

function IndexHeader () {
	return (
		<header>
			<div className='header'>
        <Link to="/current" className="tablink">Current Streams</Link>
				<Link to="/scheduled" className="tablink">Scheduled Streams</Link>
				<Link to="/archived" className="tablink">Archived Streams</Link>
			</div>
		</header>
	)
}

export default IndexHeader;

// import React from 'react';
// import FilterLink from '../../HelperComponents/FilterLink.jsx';
// import { fetchScheduledStreams, fetchActiveStreams, fetchArchivedStreams } from '../../redux/ducks/streamsDuck.js';

// function IndexHeader () {
// 	return (
// 		<header>
// 			<div className='header'>
// 				<FilterLink filter={fetchScheduledStreams.SCHEDULED_STREAMS_UPDATE} to="/current" className="tablink">Current Streams</FilterLink>
			
// 				<FilterLink filter={fetchActiveStreams.ACTIVE_STREAMS_UPDATE} to="/scheduled" className="tablink">Scheduled Streams</FilterLink>
				
// 				<FilterLink filter={fetchArchivedStreams.ARCHIVED_STREAMS_UPDATE} to="/archived" className="tablink">Archived Streams</FilterLink>
// 			</div>
// 		</header>
// 	)
// }

// export default IndexHeader;