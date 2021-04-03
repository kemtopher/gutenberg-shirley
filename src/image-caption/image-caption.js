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

	const blockStyle = {
		backgroundImage:
			attributes.mediaUrl != "" ? 'url("' + attributes.mediaUrl + '")' : "none",
	};
	const paddingStyles = {
		paddingTop: `${props.attributes.paddingTop}px`,
		paddingBottom: `${props.attributes.paddingBottom}px`,
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
				<PanelBody
					title={__("Select block background image", "awp")}
					initialOpen={true}
				>
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
				<PanelBody title={__("Set image caption", "awp")} initialOpen={false}>
					<TextControl
						label="Image Caption (optional)"
						value={attributes.mediaCaption}
						onChange={(mediaCaption) => setAttributes({ mediaCaption })}
					/>
				</PanelBody>
			</InspectorControls>
			<div className="row before-border" style={paddingStyles}>
				<div className="col-12 col-md-10">
					<img src={attributes.mediaUrl} alt="Manda" />
					<div className="pic-desc">{attributes.mediaCaption}</div>
				</div>
			</div>
		</Fragment>
	);
};

registerBlockType("shirley/image-caption", {
	title: __("Shirley — Image + Caption"),
	icon: "shield",
	category: "common",
	keywords: [__("Shirley — Image + Caption")],

	attributes: {
		mediaId: {
			type: "number",
			default: 0,
		},
		mediaUrl: {
			type: "string",
			default: "",
		},
		mediaCaption: {
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
		function onTextChange(changes) {
			setAttributes({
				textString: changes,
			});
		}
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
		const { attributes } = props;
		const blockStyle = {
			backgroundImage:
				attributes.mediaUrl != ""
					? 'url("' + attributes.mediaUrl + '")'
					: "none",
		};
		return (
			<div className="row" style={paddingStyles}>
				<div className="col-12 col-md-10">
					<img src={props.attributes.mediaUrl} alt="Manda" />
					<div className="pic-desc">{props.attributes.mediaCaption}</div>
				</div>
			</div>
		);
	},
});
