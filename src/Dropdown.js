import React from 'react'

export default function Dropdown(props) {

    const dropdownChanged = e => {
        props.changed (e.target.value);
    }

    return (
        <div className='col-sm-6 form-group row mt-4 px-0'>
            <label className='form-label col-sm-2'>{props.label}</label>
            <select value={props.selectedValue} onChange={dropdownChanged} className='form-control form-control-sm col-sm-10'>
                {props.option.map((item, idx) => <option key={idx} value={item.id}>{item.name}</option> )}
            </select>
        </div>
    )
}
