/**
 * BLOCK: shirley-blockset
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
const { RichText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { PanelBody, Button, ResponsiveWrapper, TextControl } = wp.components;
const { Fragment } = wp.element;
const { withSelect } = wp.data;
const { __ } = wp.i18n;

//  Import CSS.
import "./editor.scss";
import "./style.scss";

// BLOCK EDITOR
const BlockEdit = (props) => {
	const { attributes, setAttributes } = props;

	const removeMedia = () => {
		props.setAttributes({
			mediaId: 0,
			mediaUrl: "",
		});
	};

	const onSelectMedia = (media) => {
		props.setAttributes({
			mediaId: media.id,
			mediaUrl: media.url,
		});
	};
	const paddingStyles = {
		paddingTop: `${attributes.paddingTop}px`,
		paddingBottom: `${attributes.paddingBottom}px`,
	};
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__("Section Padding", "awp")} initialOpen={false}>
					<TextControl
						label="Padding Top"
						value={attributes.paddingTop}
						onChange={(paddingTop) => setAttributes({ paddingTop })}
					/>
					<TextControl
						label="Padding Bottom"
						value={attributes.paddingBottom}
						onChange={(paddingBottom) => setAttributes({ paddingBottom })}
					/>
				</PanelBody>
				<PanelBody title={__("Choose Image", "awp")} initialOpen={true}>
					<div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia}
								value={attributes.mediaId}
								allowedTypes={["image"]}
								render={({ open }) => (
									<Button
										className={
											attributes.mediaId == 0
												? "editor-post-featured-image__toggle"
												: "editor-post-featured-image__preview"
										}
										onClick={open}
									>
										{attributes.mediaId == 0 && __("Choose an image", "awp")}
										{props.media != undefined && (
											<ResponsiveWrapper
												naturalWidth={props.media.media_details.width}
												naturalHeight={props.media.media_details.height}
											>
												<img src={props.media.source_url} />
											</ResponsiveWrapper>
										)}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{attributes.mediaId != 0 && (
							<MediaUploadCheck>
								<MediaUpload
									title={__("Replace image", "awp")}
									value={attributes.mediaId}
									onSelect={onSelectMedia}
									allowedTypes={["image"]}
									render={({ open }) => (
										<Button onClick={open} isDefault isLarge>
											{__("Replace image", "awp")}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						)}
						{attributes.mediaId != 0 && (
							<MediaUploadCheck>
								<Button onClick={removeMedia} isLink isDestructive>
									{__("Remove image", "awp")}
								</Button>
							</MediaUploadCheck>
						)}
					</div>
				</PanelBody>
				<PanelBody title={__("Set Content", "awp")} initialOpen={false}>
					<TextControl
						label="Header"
						value={attributes.contentTitle}
						onChange={(contentTitle) => setAttributes({ contentTitle })}
					/>
					<TextControl
						label="Body Copy"
						value={attributes.contentBody}
						onChange={(contentBody) => setAttributes({ contentBody })}
					/>
				</PanelBody>
			</InspectorControls>
			<div className="row" style={paddingStyles}>
				<div className="col-12 col-md-5">
					<div className="description no-padding">
						<div className="description-title">{attributes.contentTitle}</div>
						<div className="description-text">{attributes.contentBody}</div>
					</div>
				</div>
				<div className="col-8 offset-2 col-md-2 offset-md-1 col-lg-3 offset-lg-1">
					<img className="phone-pic" alt="FFF" src={attributes.mediaUrl} />
				</div>
			</div>
		</Fragment>
	);
};
registerBlockType("shirley/image-content", {
	title: __("Shirley — Image + Content"),
	icon: "shield",
	category: "common",
	keywords: [__("Shirley — Image + Content")],

	attributes: {
		mediaId: {
			type: "number",
			default: 0,
		},
		mediaUrl: {
			type: "string",
			default: "",
		},
		contentTitle: {
			type: "string",
			default: "",
		},
		contentBody: {
			type: "string",
			default: "",
		},
		paddingTop: {
			type: "string",
			default: "50",
		},
		paddingBottom: {
			type: "string",
			default: "50",
		},
	},

	edit: withSelect((select, props) => {
		return {
			media: props.attributes.mediaId
				? select("core").getMedia(props.attributes.mediaId)
				: undefined,
		};
	})(BlockEdit),

	save: (props) => {
		const paddingStyles = {
			paddingTop: `${props.attributes.paddingTop}px`,
			paddingBottom: `${props.attributes.paddingBottom}px`,
		};
		return (
			<div>
				<div className="row" style={paddingStyles}>
					<div className="col-12 col-md-5">
						<div className="description no-padding">
							<div className="description-title">
								{props.attributes.contentTitle}
							</div>
							<div className="description-text">
								{props.attributes.contentBody}
							</div>
						</div>
					</div>
					<div className="col-8 offset-2 col-md-2 offset-md-1 col-lg-3 offset-lg-1">
						<img
							className="phone-pic"
							alt="FFF"
							src={props.attributes.mediaUrl}
						/>
					</div>
				</div>
			</div>
		);
	},
});
