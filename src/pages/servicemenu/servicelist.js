import React from 'react';
import Layout from '../../components/Layout';
import ServicelistitemRoll from '../../components/ServicelistitemRoll';

export default class ServiceIndexPage extends React.Component {
	render() {
		return (
			<Layout>
				<section className='section'>
					<div className='container'>
						<div className='content'>
							<ServicelistitemRoll />
						</div>
					</div>
				</section>
			</Layout>
		);
	}
}
