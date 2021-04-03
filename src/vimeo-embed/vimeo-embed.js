/**
 * BLOCK: shirley-blockset
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { PanelBody, Button, ResponsiveWrapper, TextControl } = wp.components;
const { Fragment } = wp.element;
const { withSelect } = wp.data;
const { __ } = wp.i18n;

//  Import CSS.
import "./editor.scss";
import "./style.scss";
const BlockEdit = (props) => {
	const { attributes, setAttributes } = props;

	const removeMedia = () => {
		props.setAttributes({
			media1Id: 0,
			media1Url: "",
			media2Id: 0,
			media2Url: "",
		});
	};

	const onSelectMedia1 = (media) => {
		props.setAttributes({
			media1Id: media.id,
			media1Url: media.url,
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
				<PanelBody title={__("Vimeo Embed", "awp")} initialOpen={false}>
					<TextControl
						label="Video embed URL"
						value={attributes.vimeoUrl}
						onChange={(vimeoUrl) => setAttributes({ vimeoUrl })}
					/>
				</PanelBody>
				<PanelBody title={__("Video Placeholder", "awp")} initialOpen={true}>
					<div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia1}
								value={attributes.media1Id}
								allowedTypes={["image/gif"]}
								render={({ open }) => (
									<Button
										className={
											attributes.media1Id == 0
												? "editor-post-featured-image__toggle"
												: "editor-post-featured-image__preview"
										}
										onClick={open}
									>
										{attributes.media1Id == 0 && __("Choose an image", "awp")}
										{props.media1 != undefined && (
											<ResponsiveWrapper
												naturalWidth={props.media1.media_details.width}
												naturalHeight={props.media1.media_details.height}
											>
												<img src={props.media1.source_url} />
											</ResponsiveWrapper>
										)}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{attributes.media1Id != 0 && (
							<MediaUploadCheck>
								<MediaUpload
									title={__("Replace image", "awp")}
									value={attributes.media1Id}
									onSelect={onSelectMedia1}
									allowedTypes={["image/gif"]}
									render={({ open }) => (
										<Button onClick={open} isDefault isLarge>
											{__("Replace image", "awp")}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						)}
						{attributes.media1Id != 0 && (
							<MediaUploadCheck>
								<Button onClick={removeMedia} isLink isDestructive>
									{__("Remove image", "awp")}
								</Button>
							</MediaUploadCheck>
						)}
					</div>
				</PanelBody>
			</InspectorControls>
			<div className="row" style={paddingStyles}>
				<div className="col-12 col-md-10">
					<img
						class="editor-video-placeholder"
						src={attributes.media1Url}
						alt=""
					/>
				</div>
			</div>
		</Fragment>
	);
};
registerBlockType("shirley/vimeo-embed", {
	title: __("Shirley — Vimeo Embed"),
	icon: "shield",
	category: "common",
	keywords: [__("Shirley — Vimeo Embed")],

	attributes: {
		vimeoUrl: {
			type: "string",
			default: "",
		},
		media1Id: {
			type: "number",
			default: 0,
		},
		media1Url: {
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
			media1: props.attributes.media1Id
				? select("core").getMedia(props.attributes.media1Id)
				: undefined,
		};
	})(BlockEdit),
	save: (props) => {
		const paddingStyles = {
			paddingTop: `${props.attributes.paddingTop}px`,
			paddingBottom: `${props.attributes.paddingBottom}px`,
		};
		return (
			<div className="row" style={paddingStyles}>
				<div className="col-12 col-md-10">
					<iframe
						title="vimeo video"
						id="video"
						frameborder="0"
						width="100%"
						src={props.attributes.vimeoUrl}
					></iframe>
				</div>
			</div>
		);
	},
});
