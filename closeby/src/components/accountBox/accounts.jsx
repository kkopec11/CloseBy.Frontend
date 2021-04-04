import React from "react";

export function Account(props) {
  const { id, fullName, email, password, onDelete } = props;

  return (
    <div className="account-wrapper">
      <div className="account-container">
        <div className="account-id">{id}</div>
        <div className="account-name">{fullName}</div>
        <div className="account-email">{email}</div>
        <div className="account-password">{password}</div>
      </div>
      <span className="account-remove" onClick={() => onDelete(id)}>
        ❌
      </span>
    </div>
  );
}