import { useNavigate } from 'react-router-dom';

interface Props {
  icon: string;
  description: string;
  styleClass: string;
  navigateTo: string;
}

export const ButtonDashboard = ({ icon, description, styleClass, navigateTo }: Props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(navigateTo);
  };
  return (
    <>
      <button className={styleClass} onClick={onClick}>
        <i className={icon}></i>
        {description}
      </button>
    </>
  );
};
