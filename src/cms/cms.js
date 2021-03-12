import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ServicePostPreview from './preview-templates/ServicePostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import SliderPagePreview from './preview-templates/SliderPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import SurveyTemplate from './preview-templates/SurveyPreview'
import CataloguePagePreview from './preview-templates/CataloguePagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('service', ServicePostPreview)
CMS.registerPreviewTemplate('slider', SliderPagePreview)
CMS.registerPreviewTemplate('survey', SurveyTemplate)
CMS.registerPreviewTemplate('catalogue', CataloguePagePreview)

