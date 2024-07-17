/* eslint-disable react/prop-types */
export const Button = ({ children, textOnly, className, ...props }) => {
  let cssClass = textOnly ? `text-button` : `button`;
  cssClass += ' ' + className;
  return (
    <button {...props} className={cssClass}>
      {children}
    </button>
  );
};
