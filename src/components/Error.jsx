/* eslint-disable react/prop-types */
export const Error = ({ title, message }) => {
  return (
    <div className='error'>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};
