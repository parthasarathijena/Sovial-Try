import React, { useState } from 'react'
import './editModal.css'
import { DescriptionOutlined, LocationCity, LocationOnOutlined, Wc } from '@mui/icons-material'
import Select from 'react-select';

function EditModal() {
    const [selectedRelationship, setSelectedRelationship] = useState();
    const relationshipOptions = [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "Other", label: "Other" }
    ];
    function handleRelationshipSelect(data) {
        setSelectedRelationship(data);
    }

    const editHandler = async (e) => {
        e.preventDefault();
    }
    return (
        <div className="modal fade" id="EditModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modalBox">
                <div className="modal-content editBox" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header editHeader">
                        <h1 className="modal-title fs-5" id="EditTitle">User Information</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='editForm' onSubmit={editHandler}>
                            <div className='editDiv'>
                                <div className='editIconDiv'><DescriptionOutlined className='editIcon' /></div>
                                <input type='text' placeholder='Description' required className='editInput' />
                            </div>
                            <div className='editDiv'>
                                <div className='editIconDiv'><LocationCity className='editIcon' /></div>
                                <input type='text' placeholder='City' required className='editInput' />
                            </div>
                            <div className='editDiv'>
                                <div className='editIconDiv'><LocationOnOutlined className='editIcon' /></div>
                                <input type='text' placeholder='From' required className='editInput' />
                            </div>
                            <div className='editDiv'>
                                <div className='editIconDiv'><Wc className='editIcon' /></div>
                                <Select
                                    className='selectInput'
                                    options={relationshipOptions}
                                    placeholder="Relationship"
                                    value={selectedRelationship}
                                    onChange={handleRelationshipSelect}
                                // isSearchable={true}
                                />
                            </div>
                            <button type='submit' className='editButton'>Edit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal