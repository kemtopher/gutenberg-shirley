/**
 * BLOCK: shirley-blockset
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { RichText } = wp.editor;
const { Fragment } = wp.element;
const { withSelect } = wp.data;
const { __ } = wp.i18n;

//  Import CSS.
import "./editor.scss";
import "./style.scss";

// BLOCK EDITOR
const BlockEdit = (props) => {
	const { attributes, setAttributes } = props;
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
				<PanelBody title={__("First Section", "awp")} initialOpen={false}>
					<TextControl
						label="Header"
						value={attributes.firstTitle}
						onChange={(firstTitle) => setAttributes({ firstTitle })}
					/>
					<RichText
						tagName="div"
						value={attributes.firstBody}
						onChange={(firstBody) => setAttributes({ firstBody })}
						placeholder={__("Enter text...", "custom-block")}
						keepPlaceholderOnFocus={true}
					/>
				</PanelBody>
				<PanelBody title={__("Second Section", "awp")} initialOpen={false}>
					<TextControl
						label="Header"
						value={attributes.secondTitle}
						onChange={(secondTitle) => setAttributes({ secondTitle })}
					/>
					<RichText
						tagName="div"
						value={attributes.secondBody}
						onChange={(secondBody) => setAttributes({ secondBody })}
						placeholder={__("Enter text...", "custom-block")}
						keepPlaceholderOnFocus={true}
					/>
				</PanelBody>
				<PanelBody title={__("Top Section", "awp")} initialOpen={false}>
					<TextControl
						label="Header"
						value={attributes.topTitle}
						onChange={(topTitle) => setAttributes({ topTitle })}
					/>
					<RichText
						tagName="div"
						value={attributes.topBody}
						onChange={(topBody) => setAttributes({ topBody })}
						placeholder={__("Enter text...", "custom-block")}
						keepPlaceholderOnFocus={true}
					/>
				</PanelBody>
				<PanelBody title={__("Middle Section", "awp")} initialOpen={false}>
					<TextControl
						label="Header"
						value={attributes.middleTitle}
						onChange={(middleTitle) => setAttributes({ middleTitle })}
					/>
					<RichText
						tagName="div"
						value={attributes.middleBody}
						onChange={(middleBody) => setAttributes({ middleBody })}
						placeholder={__("Enter text...", "custom-block")}
						keepPlaceholderOnFocus={true}
					/>
				</PanelBody>
				<PanelBody title={__("Bottom Section", "awp")} initialOpen={false}>
					<TextControl
						label="Header"
						value={attributes.bottomTitle}
						onChange={(bottomTitle) => setAttributes({ bottomTitle })}
					/>
					<RichText
						tagName="p"
						value={attributes.bottomBody}
						onChange={(bottomBody) => setAttributes({ bottomBody })}
						placeholder={__("Enter text...", "custom-block")}
						keepPlaceholderOnFocus={true}
					/>
				</PanelBody>
			</InspectorControls>
			<div class="first-row row" style={paddingStyles}>
				<div class="col-12 col-md-6">
					<div class="description top">
						<div class="description-title">{attributes.firstTitle}</div>
						<div class="description-text">{attributes.firstBody}</div>
					</div>

					<div class="description before-pic">
						<div class="description-title">{attributes.secondTitle}</div>
						<div class="description-text">{attributes.secondBody}</div>
					</div>
				</div>

				<div class="col-12 col-md-6">
					<div class="description top">
						<div class="description-title">{attributes.topTitle}</div>
						<div class="description-text">{attributes.topBody}</div>
					</div>

					<div class="description">
						<div class="description-title">{attributes.middleTitle}</div>
						<div class="description-text">{attributes.middleBody}</div>
					</div>

					<div class="description">
						<div class="description-title">{attributes.bottomTitle}</div>
						<div class="description-text">{attributes.bottomBody}</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

registerBlockType("shirley/project-brief", {
	title: __("Shirley — Project Breif"),
	icon: "shield",
	category: "common",
	keywords: [__("Shirley — Project Brief")],

	attributes: {
		mediaId: {
			type: "number",
			default: 0,
		},
		firstTitle: {
			type: "string",
			default: "THE CHALLENGE",
		},
		firstBody: {
			type: "html",
			selector: "div",
		},
		secondTitle: {
			type: "string",
			default: "BACKGROUND",
		},
		secondBody: {
			type: "html",
			selector: "div",
		},
		topTitle: {
			type: "string",
			default: "MY ROLE",
		},
		topBody: {
			type: "html",
			selector: "div",
		},
		middleTitle: {
			type: "string",
			default: "TIME",
		},
		middleBody: {
			type: "html",
			selector: "div",
		},
		bottomTitle: {
			type: "string",
			default: "CREDIT",
		},
		bottomBody: {
			type: "html",
			selector: "div",
		},
		paddingTop: {
			type: "string",
			default: "0",
		},
		paddingBottom: {
			type: "string",
			default: "0",
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
			<div class="first-row row" style={paddingStyles}>
				<div class="col-12 col-md-6">
					<div class="description top">
						<div class="description-title">{props.attributes.firstTitle}</div>
						<div class="description-text">{props.attributes.firstBody}</div>
					</div>

					<div class="description before-pic">
						<div class="description-title">{props.attributes.secondTitle}</div>
						<div class="description-text">{props.attributes.secondBody}</div>
					</div>
				</div>

				<div class="col-12 col-md-6">
					<div class="description top">
						<div class="description-title">{props.attributes.topTitle}</div>
						<div class="description-text">{props.attributes.topBody}</div>
					</div>

					<div class="description">
						<div class="description-title">{props.attributes.middleTitle}</div>
						<div class="description-text">{props.attributes.middleBody}</div>
					</div>

					<div class="description">
						<div class="description-title">{props.attributes.bottomTitle}</div>
						<div class="description-text">{props.attributes.bottomBody}</div>
					</div>
				</div>
			</div>
		);
	},
});
