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
const { __ } = wp.i18n;

//  Import CSS.
import "./editor.scss";
import "./style.scss";

registerBlockType("shirley/section-header", {
	title: __("Shirley — Section Header"),
	icon: "shield",
	category: "common",
	keywords: [__("Shirley — Section Header")],

	attributes: {
		sectionHeader: {
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

	edit: (props) => {
		const { attributes, setAttributes } = props;
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
					<PanelBody title={__("Section Header", "awp")} initialOpen={false}>
						<TextControl
							label="Header"
							value={attributes.sectionHeader}
							onChange={(sectionHeader) => setAttributes({ sectionHeader })}
						/>
					</PanelBody>
				</InspectorControls>
				<div className="col-12 section-header" style={paddingStyles}>
					{attributes.sectionHeader}
				</div>
			</Fragment>
		);
	},
	save: (props) => {
		const paddingStyles = {
			paddingTop: `${props.attributes.paddingTop}px`,
			paddingBottom: `${props.attributes.paddingBottom}px`,
		};
		return (
			<div className="col-12 section-header" style={paddingStyles}>
				{props.attributes.sectionHeader}
			</div>
		);
	},
});
