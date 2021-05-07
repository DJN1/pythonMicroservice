import React, {
  PropsWithRef,
  SyntheticEvent,
  useState,
  useEffect,
} from 'react';
import { Redirect } from 'react-router-dom';
import { Product } from '../interfaces/product';

import Wrapper from './Wrapper';

const ProductsEdit = (props: PropsWithRef<any>) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:8000/api/products/${props.match.params.id}`
      );
      const product: Product = await response.json();
      setTitle(product.title);
      setImage(product.image);
    })();
  }, [props.match.params.id]);

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await fetch(`http://localhost:8000/api/products/${props.match.params.id}`, {
      method: 'PUT',
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
            defaultValue={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="text"
            name="image"
            className="form-control"
            defaultValue={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductsEdit;
