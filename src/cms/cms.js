import CMS from 'netlify-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import AboutPagePreview from './preview-templates/AboutPagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import ServicePostPreview from './preview-templates/ServicePostPreview';
import ProductPagePreview from './preview-templates/ProductPagePreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';
import WorkflowPreview from './preview-templates/WorkflowPreview';

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('products', ProductPagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);
CMS.registerPreviewTemplate('service', ServicePostPreview);
CMS.registerPreviewTemplate('workflowpost', WorkflowPreview);
