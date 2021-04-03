/**
 * BLOCK: shirley-blockset
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
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
				<PanelBody title={__("Text Content", "awp")} initialOpen={false}>
					<TextControl
						label="Header"
						value={attributes.contentHeader}
						onChange={(contentHeader) => setAttributes({ contentHeader })}
					/>
					<TextControl
						label="Body Content"
						value={attributes.contentBody}
						onChange={(contentBody) => setAttributes({ contentBody })}
					/>
				</PanelBody>
			</InspectorControls>
			<div className="row" style={paddingStyles}>
				<div className="col-12 col-md-9 col-lg-7">
					<div className="description">
						<div className="description-title">{attributes.contentHeader}</div>
						<div className="description-text">{attributes.contentBody}</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

registerBlockType("shirley/text-content", {
	title: __("Shirley — Text Content"),
	icon: "shield",
	category: "common",
	keywords: [__("Shirley — Text Content")],

	attributes: {
		contentHeader: {
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
		return console.log("secret");
	})(BlockEdit),
	save: (props) => {
		const { attributes } = props;
		const paddingStyles = {
			paddingTop: `${props.attributes.paddingTop}px`,
			paddingBottom: `${props.attributes.paddingBottom}px`,
		};
		return (
			<div className="row" style={paddingStyles}>
				<div className="col-12 col-md-9 col-lg-7">
					<div className="description">
						<div className="description-title">
							{props.attributes.contentHeader}
						</div>
						<div className="description-text">
							{props.attributes.contentBody}
						</div>
					</div>
				</div>
			</div>
		);
	},
});
