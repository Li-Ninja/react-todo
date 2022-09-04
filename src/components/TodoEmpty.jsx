import React from 'react';

export default function TodoEmpty() {
  return (
    <div className="todoEmpty">
      <div className="title">
        目前尚無代辦事項
      </div>
      <div className="imageContainer">
        <div className="image" />
      </div>
    </div>
  );
}
