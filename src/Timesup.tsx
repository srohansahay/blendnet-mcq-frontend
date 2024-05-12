import React from 'react';
import { Link } from 'react-router-dom';

const Timesup: React.FC = () => (
	<div>
		<h1>Times Up!</h1>
  <Link to="/" className='btn-1'>Go back to Main Page</Link>
	</div>
);

export default Timesup;