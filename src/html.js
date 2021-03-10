import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        	<meta name='format-detection' content='telephone=no' />
				<meta httpEquiv='x-ua-compatible' content='ie=edge' />
        {/* slick slider */}
				<link rel='stylesheet prefetch' href='https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css' />
				<link rel='stylesheet prefetch' href='https://kenwheeler.github.io/slick/slick/slick-theme.css' />
				{/* slick slider */}
        <script
					src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'
					integrity='sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN'
					crossOrigin='anonymous'
				/>
				{/* slick slider script */}
				<script src='https://cdn.jsdelivr.net/jquery.slick/1.5.9/slick.min.js' />
				<script src='https://hydrolog.weblider24.pl/wp-content/themes/taco/js/js-sliderWithProgressbar.js' />
				{/* slick slider script */}
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
