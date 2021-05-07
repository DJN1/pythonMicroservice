import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';

import Wrapper from './Wrapper';

const ProductsCreate = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        image,
      }),
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={'/admin/products'} />;
  }

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="text"
            name="image"
            className="form-control"
            onChange={(event) => setImage(event.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductsCreate;
