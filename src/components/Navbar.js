import React from 'react';
import { Link } from 'gatsby';
import github from '../img/github-icon.svg';
import logo from '../img/logo.svg';
import ServicelistitemRoll from './ServicelistitemRoll';
import { BsArrowRight } from 'react-icons/bs';
import { css, cx } from '@emotion/css';
import './navbar.css'

const Navbar = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			navBarActiveClass: ''
		};
	}

	toggleHamburger = () => {
		// toggle the active boolean in the state
		this.setState(
			{
				active: !this.state.active
			},
			// after state has been updated,
			() => {
				// set the class in state for the navbar accordingly
				this.state.active
					? this.setState({
							navBarActiveClass: 'is-active'
						})
					: this.setState({
							navBarActiveClass: ''
						});
			}
		);
	};

	render() {
		return (
			<nav className='navbar is-transparent' role='navigation' aria-label='main-navigation'>
				<div className='container'>
					<div className='navbar-brand'>
						<Link to='/' className='navbar-item' title='Logo'>
							<img src={logo} alt='Kaldi' style={{ width: '88px' }} />
						</Link>
						{/* Hamburger menu */}
						<div
							className={`navbar-burger burger ${this.state.navBarActiveClass}`}
							data-target='navMenu'
							onClick={() => this.toggleHamburger()}>
							<span />
							<span />
							<span />
						</div>
					</div>
					<div id='navMenu' className={`navbar-menu ${this.state.navBarActiveClass}`}>
						<div className='navbar-start has-text-centered'>
							<Link className='navbar-item' to='/about'>
								About
							</Link>
							<Link className='navbar-item' to='/products'>
								Products
							</Link>
							<Link className='navbar-item' to='/blog'>
								Blog
							</Link>
							<Link className='navbar-item' to='/service'>
								Services & Consulting
								<div className='main-sub-menu'>
										<Link className='sub-menu' to='/service/2021-02-23-automation/'>Automation<BsArrowRight className='sub-icon'/>
											<div className='default-active'>
												<Link to='/service/2021-02-23-automation/'>Product 1 One</Link>
												<Link to='/service/2021-02-23-automation/'>Product 1 Two</Link>
												<Link to='/service/2021-02-23-automation/'>Product 1 Three</Link>
												<Link to='/service/2021-02-23-automation/'>Product 1 Four</Link>
											</div>
										</Link>
										<Link className='sub-menu' to='/service/2021-02-23-automation/'>Analytics<BsArrowRight className='sub-icon'/>
											<div className='sub-menu-list'>
												<Link to='/service/2021-02-23-automation/'>Product 2 One</Link>
												<Link to='/service/2021-02-23-automation/'>Product 2 Two</Link>
												<Link to='/service/2021-02-23-automation/'>Product 2 Three</Link>
												<Link to='/service/2021-02-23-automation/'>Product 2 Four</Link>
											</div>
										</Link>
								</div>
							</Link>
							<Link className='navbar-item' to='/workflowpost'>
								Workflow
							</Link>
							<Link className='navbar-item' to='/contact'>
								Contact
							</Link>
							<Link className='navbar-item' to='/contact/examples'>
								Form Examples
							</Link>
							<Link className='navbar-item' to='/slider'>
								Slider
							</Link>
							<Link className='navbar-item' to='/survey'>
								Survey Form
							</Link>
							<Link className='navbar-item' to='/catalogue'>
								Catalogue
							</Link>
						</div>
						<div className='navbar-end has-text-centered'>
							<a
								className='navbar-item'
								href='https://github.com/netlify-templates/gatsby-starter-netlify-cms'
								target='_blank'
								rel='noopener noreferrer'>
								<span className='icon'>
									<img src={github} alt='Github' />
								</span>
							</a>
						</div>
					</div>
				</div>
			</nav>
		);
	}
};

export default Navbar;
