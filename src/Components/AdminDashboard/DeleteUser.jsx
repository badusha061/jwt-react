import React, { useState } from 'react';

const DeleteUser = ({ onDelete, onCancel }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="modal fade" id="deleteEmployeeModal" tabIndex="-1" role="dialog" aria-labelledby="deleteEmployeeModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="deleteEmployeeModalLabel">Delete Employee</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete these Records?</p>
            <p className="text-warning"><small>This action cannot be undone.</small></p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={onCancel}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
