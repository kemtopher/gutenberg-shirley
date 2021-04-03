/**
 * BLOCK: shirley-blockset
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { PanelBody, Button, ResponsiveWrapper } = wp.components;
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
	const onSelectMedia2 = (media) => {
		props.setAttributes({
			media2Id: media.id,
			media2Url: media.url,
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
				<PanelBody title={__("First Column", "awp")} initialOpen={true}>
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
				<PanelBody title={__("Second Column", "awp")} initialOpen={true}>
					<div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia2}
								value={attributes.media2Id}
								allowedTypes={["image"]}
								render={({ open }) => (
									<Button
										className={
											attributes.media2Id == 0
												? "editor-post-featured-image__toggle"
												: "editor-post-featured-image__preview"
										}
										onClick={open}
									>
										{attributes.media2Id == 0 && __("Choose an image", "awp")}
										{props.media2 != undefined && (
											<ResponsiveWrapper
												naturalWidth={props.media2.media_details.width}
												naturalHeight={props.media2.media_details.height}
											>
												<img src={props.media2.source_url} />
											</ResponsiveWrapper>
										)}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{attributes.media2Id != 0 && (
							<MediaUploadCheck>
								<MediaUpload
									title={__("Replace image", "awp")}
									value={attributes.media2Id}
									onSelect={onSelectMedia2}
									allowedTypes={["image"]}
									render={({ open }) => (
										<Button onClick={open} isDefault isLarge>
											{__("Replace image", "awp")}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						)}
						{attributes.media2Id != 0 && (
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
				<div className="col-12 col-md-5">
					<img className="nike-white" alt="" src={attributes.media1Url} />
				</div>
				<div className="col-12 col-md-5">
					<img className="nike-white" alt="" src={attributes.media2Url} />
				</div>
			</div>
		</Fragment>
	);
};
registerBlockType("shirley/two-column", {
	title: __("Shirley — Two Column"),
	icon: "shield",
	category: "common",
	keywords: [__("Shirley — Two Column")],

	attributes: {
		media1Id: {
			type: "number",
			default: 0,
		},
		media1Url: {
			type: "string",
			default: "",
		},
		media2Id: {
			type: "number",
			default: 0,
		},
		media2Url: {
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
			media2: props.attributes.media2Id
				? select("core").getMedia(props.attributes.media2Id)
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
				<div className="col-12 col-md-5">
					<img className="nike-white" alt="" src={props.attributes.media1Url} />
				</div>
				<div className="col-12 col-md-5">
					<img className="nike-white" alt="" src={props.attributes.media2Url} />
				</div>
			</div>
		);
	},
});
