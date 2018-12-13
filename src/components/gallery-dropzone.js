/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { mediaUpload } = wp.editor;
const { DropZone } = wp.components;

/**
 * Internal dependencies
 */
import * as helper from './../utils/helper';

/**
 * Gallery Drop Zone Component
 */
class GalleryDropZone extends Component {

	constructor() {
		super( ...arguments );

		this.addFiles = this.addFiles.bind( this );
	}

	addFiles( files ) {
		const currentImages = this.props.attributes.images || [];
		const { noticeOperations, setAttributes, allowed = helper.ALLOWED_MEDIA_TYPES } = this.props;
		mediaUpload( {
			allowedTypes: allowed,
			filesList: files,
			onFileChange: ( images ) => {
				const imagesNormalized = images.map( ( image ) => helper.pickRelevantMediaFiles( image ) );
				setAttributes( {
					images: currentImages.concat( imagesNormalized ),
				} );
			},
			onError: noticeOperations.createErrorNotice,
		} );
	}

	render() {

		const {
			attributes,
			className,
			noticeOperations,
			noticeUI,
			label,
			allowed = helper.ALLOWED_MEDIA_TYPES,
		} = this.props;

		return (
			<Fragment>
				<DropZone
					onFilesDrop={ this.addFiles }
					label={ this.props.label }
				/>
			</Fragment>
		);
	}
}

export default GalleryDropZone;