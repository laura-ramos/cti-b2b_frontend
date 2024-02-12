

interface Props {
  title: string;
  iconClasses: string;
  desactivarBtn: boolean;
  onClick: () => void;

  //onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // to handle onClick functions
  color?: "primary" | "secondary"; // two styling options
  disabled?: boolean; // make the button disabled or not
}

export const ActionButton = ({title, iconClasses, desactivarBtn, onClick} : Props) => {

  return (
      <button className="btn btn-sm" title={title} onClick={onClick}>
        <i className={iconClasses}></i>
      </button>
    );
}

ActionButton.defaultProps = {
  type: "link"
}