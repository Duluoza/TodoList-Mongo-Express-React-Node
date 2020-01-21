import React, {Component} from 'react';

import './item-add-form.css'

class ItemAddForm extends Component {

    state = {
        label: '',
        t_id: '',
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
            t_id: this.props.t_id,
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state);
        this.setState({
            label: '',
            t_id: '',
        });
    };

    render() {

        return (
            <>
                <form className='item-add-form d-flex'
                      onSubmit={this.onSubmit}>
                    <input type="text"
                           className='form-control'
                           onChange={this.onLabelChange}
                           placeholder="What needs to be done"
                           value={this.state.label}
                    />
                    <button
                        className="btn btn-outline-secondary mr-1"
                    >
                        Add
                    </button>
                </form>
            </>
        );
    };
};

export default ItemAddForm;
