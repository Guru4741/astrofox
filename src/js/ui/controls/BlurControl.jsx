'use strict';

const React = require('react');

const UIComponent = require('../UIComponent');
const NumberInput = require('../inputs/NumberInput.jsx');
const RangeInput = require('../inputs/RangeInput.jsx');
const SelectInput = require('../inputs/SelectInput.jsx');
const { Control, Row } = require('./Control.jsx');

const types = [
    'Box',
    'Circular',
    'Gaussian',
    'Zoom'
];

class BlurControl extends UIComponent {
    constructor(props) {
        super(props);

        this.state = this.props.display.options;
        this.shouldUpdate = false;
    }

    componentDidUpdate() {
        this.shouldUpdate = false;
    }

    shouldComponentUpdate() {
        return this.shouldUpdate;
    }

    onChange(name, val) {
        let obj = {},
            display = this.props.display;

        obj[name] = val;

        this.shouldUpdate = true;

        this.setState(obj, () => {
            display.update(obj);
        });
    }

    render() {
        return (
            <Control title="BLUR">
                <Row label="Type">
                    <SelectInput
                        name="type"
                        size="20"
                        items={types}
                        value={this.state.type}
                        onChange={this.onChange}
                    />
                </Row>
                <Row label="Amount">
                    <NumberInput
                        name="amount"
                        size="3"
                        value={this.state.amount}
                        min={0}
                        max={1.0}
                        step={0.01}
                        onChange={this.onChange}
                    />
                    <div className="input flex">
                        <RangeInput
                            name="amount"
                            min={0}
                            max={1.0}
                            step={0.01}
                            value={this.state.amount}
                            onChange={this.onChange}
                        />
                    </div>
                </Row>
            </Control>
        );
    }
}

module.exports = BlurControl;