import React from 'react';
import { Link } from 'gatsby';
import github from '../img/github-icon.svg';
import logo from '../img/logo.png';
import ServicelistitemRoll from './ServicelistitemRoll';
import { BsArrowRight } from 'react-icons/bs';
import { css, cx } from '@emotion/css';
import './navbar.css';
import Collapsible from 'react-collapsible';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

const Mobilenav = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			navBarActiveClass: ''
		};
	}

	toggleHamburger = () => {
		this.setState(
			{
				active: !this.state.active
			},
			() => {
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
							data-target='navMob'
							onClick={() => this.toggleHamburger()}>
							<span />
							<span />
							<span />
						</div>
					</div>
					<div id='navMob' className={`navbar-menu ${this.state.navBarActiveClass}`}>
						<div className='navbar-start has-text-left'>
							{/* <Link className='navbar-item' to='/about'>
								About
							</Link>
							<Link className='navbar-item' to='/products'>
								Products
							</Link>
							<Link className='navbar-item' to='/blog'>
								Blog
							</Link> */}
							<Accordion atomic={true}>
								<AccordionItem title='Products & Solutions'>
									<div className=''>
										<div>
											<h6 className='sub-title'>Analytics</h6>
											<div className='sub-drop'>
												<Link to='/service/2021-02-23-automation/'>Analytics One</Link>
												<Link to='/service/2021-02-23-automation/'>Analytics Two</Link>
												<Link to='/service/2021-02-23-automation/'>Analytics Three</Link>
												<Link to='/service/2021-02-23-automation/'>Analytics Four</Link>
											</div>
										</div>
										<div>
											<h6 className='sub-title'>Automation</h6>
											<div className='sub-drop'>
												<Link to='/service/2021-02-23-automation/'>Automation One</Link>
												<Link to='/service/2021-02-23-automation/'>Automation Two</Link>
												<Link to='/service/2021-02-23-automation/'>Automation Three</Link>
												<Link to='/service/2021-02-23-automation/'>Automation Four</Link>
											</div>
										</div>
									</div>
								</AccordionItem>

								<AccordionItem title='Services & Consulting'>
									<div className=''>
										<div>
											<h6 className='sub-title'>Analytics</h6>
											<div className='sub-drop'>
												<Link to='/service/2021-02-23-automation/'>Analytics One</Link>
												<Link to='/service/2021-02-23-automation/'>Analytics Two</Link>
												<Link to='/service/2021-02-23-automation/'>Analytics Three</Link>
												<Link to='/service/2021-02-23-automation/'>Analytics Four</Link>
											</div>
										</div>
										<div>
											<h6 className='sub-title'>Automation</h6>
											<div className='sub-drop'>
												<Link to='/service/2021-02-23-automation/'>Automation One</Link>
												<Link to='/service/2021-02-23-automation/'>Automation Two</Link>
												<Link to='/service/2021-02-23-automation/'>Automation Three</Link>
												<Link to='/service/2021-02-23-automation/'>Automation Four</Link>
											</div>
										</div>
									</div>
								</AccordionItem>
							</Accordion>
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
					</div>
				</div>
			</nav>
		);
	}
};

export default Mobilenav;