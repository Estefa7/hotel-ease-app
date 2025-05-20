import './ConfirmModal.css'; // Optional CSS

function ConfirmModal({ title, message, onCancel, onConfirm, confirmDisabled = false }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content p-4 rounded shadow bg-white">
        <h5>{title}</h5>
        <p>{message}</p>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          {!confirmDisabled && (
            <button className="btn btn-danger" onClick={onConfirm}>Yes, Delete</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
