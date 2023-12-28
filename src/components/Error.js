export const Error = ({ title, message, onConfirm }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm}>Okay</button>
        </div>
      )}
    </div>
  );
};
