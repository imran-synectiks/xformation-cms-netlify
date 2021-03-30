import React from 'react';
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby';
import './navbar.css';
import logo from '../img/logo.png';
import { BsArrowRight } from 'react-icons/bs';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			navBarActiveClass: '',
			activeMenu: 0
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

	onMouseOver = (index) => {
		this.setState({
			activeMenu: index
		});
	};

	render() {
		const { data } = this.props;
		const { edges: posts } = data.allMarkdownRemark;
		const { activeMenu } = this.state;
		return (
			<nav className='navbar is-transparent' role='navigation' aria-label='main-navigation'>
				<div className='container'>
					<div className='navbar-brand'>
						<Link to='/' className='logo' title='Logo'>
							<img src={logo} alt='Kaldi' style={{ width: '88px' }} />
						</Link>
						<div
							className={`navbar-burger burger ${this.state.navBarActiveClass}`}
							data-target='navMob'
							onClick={() => this.toggleHamburger()}>
							<span />
							<span />
							<span />
						</div>
					</div>
					<div id="navMenu" className={`navbar-menu ${this.state.navBarActiveClass}`}>
						<div className="navbar-start has-text-centered">
							<ul className="navbar-nav">
								<li className="navbar-item">
									<Link to="/about" className="navbar-link">About</Link>
								</li>
								<li className="navbar-item">
									<Link to="/products" className="navbar-link">Products</Link>
								</li>
								<li className="navbar-item">
									<Link to="/blog" className="navbar-link">Blog</Link>
								</li>
								<li className="navbar-item dropdown">
									<Link to="/service" className="navbar-link">Services & Consulting</Link>
									<div className='main-sub-menu'>
										<ul className="default-active">
											{posts.map(({ node: post }, index) => (
												<li onMouseOver={() => this.onMouseOver(index)} key={post.id} className={`${activeMenu === index ? 'active' : ''}`}>
													<Link to={post.fields.slug} className="navbar-link">
														{post.frontmatter.title}
														<BsArrowRight className='sub-icon' />
													</Link>
													<ul className="sub-menu">
														{post.frontmatter.page.map((heading, index) => (
															<li key={post.heading}>
																<Link to={`${post.fields.slug.slice(0, -1)}#${index}`} className="navbar-link">
																	{heading.heading}
																</Link>
															</li>
														))}
													</ul>
												</li>
											))}
										</ul>
									</div>
								</li>
								<li className="navbar-item">
									<Link to="/workflowpost" className="navbar-link">Workflow</Link>
								</li>
								<li className="navbar-item">
									<Link to="/contact" className="navbar-link">Contact</Link>
								</li>
								<li className="navbar-item">
									<Link to="/contact/examples" className="navbar-link">Form Examples</Link>
								</li>
								<li className="navbar-item">
									<Link to="/slider" className="navbar-link">Slider</Link>
								</li>
								<li className="navbar-item">
									<Link to="/survey" className="navbar-link">Survey Form</Link>
								</li>
								<li className="navbar-item">
									<Link to="/catalogue" className="navbar-link">Catalogue</Link>
								</li>
								<li className="navbar-item">
									<Link to="/scenario" className="navbar-link">Scenario</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
}

export default () => (
	<StaticQuery
		query={graphql`
			query NavbarQuery {
				allMarkdownRemark(
					sort: { order: DESC, fields: [frontmatter___date] }
					filter: { frontmatter: { templateKey: { eq: "service-post" } } }
				) {
					edges {
						node {
							excerpt(pruneLength: 400)
							id
							fields {
								slug
							}
							frontmatter {
								title
								page {
									heading
								}
							}
						}
					}
				}
			}
		`}
		render={(data, count) => <Navbar data={data} count={count} />}
	/>
)
