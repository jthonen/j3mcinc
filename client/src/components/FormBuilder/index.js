import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function switchFormInput (input) {
    switch (input.type) {
        case "text":
            return (
                <input onKeyPress={(e) => {input.onKeyPress(e);}}
                    onChange={(e) => {input.onChange(e);}}
                    className="form-builder-input"
                    placeholder={input.placeholder}
                    value={input.value}
                    id={input.id}
                    type="text" required/>
            );
        case "password":
            return (
                <input onKeyPress={(e) => {input.onKeyPress(e);}}
                    onChange={(e) => {input.onChange(e);}}
                    className="form-builder-input"
                    placeholder={input.placeholder}
                    value={input.value}
                    id={input.id}
                    type="password" required/>
            );
        case "datalist":
            return (
                <span className="form-builder-input">

                    <input className="form-builder-datalist-input"
                        placeholder={input.placeholder}
                        id={input.id}
                        value={input.value}
                        list={input.id + "-list"}
                        onKeyPress={(e) => {input.onKeyPress(e);}}
                        onChange={(e) => {input.onChange(e);}}
                        required
                    />

                    <datalist className="form-builder-datalist-input" id={input.id + "-list"}>
                        {input.options.map((option) => {
                            return (
                                <option key={option} value={option}/>
                            );
                        })}
                    </datalist>
                </span>
            );
        case "textarea":
            return (
                <textarea className="form-builder-input"
                    placeholder={input.placeholder}
                    rows={input.dimensions.rows}
                    cols={input.dimensions.cols}
                    id={input.id}
                    onKeyPress={(e) => {input.onKeyPress(e);}}
                    onChange={(e) => {input.onChange(e);}}
                    value={input.value}
                    required
                />
            );
        case "radio":
            return (
                <span className="form-builder-input" >
                    {input.options.map((option) => {
                        return (
                            <span key={"radio-" + option.key} className="form-builder-radio-input-span">
                                <input className="form-builder-radio-input"
                                    checked={input.value === option.value}
                                    onChange={(e) => {input.onChange(e);}}
                                    id={input.id + "-" + option.key}
                                    value={option.value}
                                    type="radio"
                                    required/>
                                {option.value}
                            </span>
                        );
                    })}
                </span>
            );
        default: return null;
    }
}

export default function FormBuilder (props) {
    return (
        <form id={props.form.form.id} className={props.form.form.className + " form-builder-form"}>
            <span className="form-builder-row form-builder-header-row">
                <h2 id={props.form.header.id}>
                    {props.form.header.text}
                </h2>
            </span>
            {props.form.components.map((component) => {
                return (
                    <span key={component.key} className="form-builder-row">
                        <label className="form-builder-label">
                            {component.label.text}
                        </label>
                        {switchFormInput(component.input)}
                    </span>
                );
            })}
            <span className="form-builder-row form-builder-submit-button-row">
                {props.isValidated ?
                    <button id="form-builder-submit-button" onClick={(event) => {
                        event.preventDefault();
                        return props.form.submit.handleClick();
                    }}>
                        {props.form.submit.text}
                    </button> :
                    <button id="form-builder-submit-button-locked" onClick={(event) => {
                        event.preventDefault();
                        return console.log("Make sure you've properly filled in all input fields");
                    }}>
                        {props.form.submit.lockedText}
                    </button>
                }
            </span>
        </form>
    );
}

FormBuilder.propTypes = {
    isValidated: PropTypes.bool,
    form: PropTypes.object
};
