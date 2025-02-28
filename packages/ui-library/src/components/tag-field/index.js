import { ExclamationCircleIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import PropTypes from "prop-types";
import Label from "../../elements/label";
import TagInput from "../../elements/tag-input";
import { useDescribedBy, useSvgAria } from "../../hooks";

/**
 * @param {string} id The ID of the input.
 * @param {string} label The label.
 * @param {JSX.node} [labelSuffix] Extra elements after the label.
 * @param {string} [className] The HTML class.
 * @param {JSX.node} [description] A description.
 * @param {boolean} [disabled] The disabled state.
 * @param {JSX.node} [error] An error "message".
 * @param {Object} [props] Any extra properties for the TagInput.
 * @returns {JSX.Element} The tag field.
 */
const TagField = ( {
	id,
	label,
	labelSuffix = null,
	disabled = false,
	className = "",
	description = null,
	error = null,
	...props
} ) => {
	const { ids, describedBy } = useDescribedBy( id, { error, description } );
	const svgAriaProps = useSvgAria();

	return (
		<div className={ classNames( "yst-tag-field", disabled && "yst-tag-field--disabled", className ) }>
			<div className="yst-flex yst-items-center yst-mb-2">
				<Label className="yst-tag-field__label" htmlFor={ id } label={ label } />
				{ labelSuffix }
			</div>
			<div className="yst-relative">
				<TagInput
					id={ id }
					disabled={ disabled }
					className={ classNames(
						"yst-tag-field__input",
						error && "yst-tag-field__input--error",
					) }
					aria-describedby={ describedBy }
					{ ...props }
				/>
				{ error && <div className="yst-tag-field__error-icon">
					<ExclamationCircleIcon { ...svgAriaProps } />
				</div> }
			</div>
			{ error && <p id={ ids.error } className="yst-tag-field__error">{ error }</p> }
			{ description && <p id={ ids.description } className="yst-tag-field__description">{ description }</p> }
		</div>
	);
};

TagField.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	labelSuffix: PropTypes.node,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	description: PropTypes.node,
	error: PropTypes.node,
};

export default TagField;
