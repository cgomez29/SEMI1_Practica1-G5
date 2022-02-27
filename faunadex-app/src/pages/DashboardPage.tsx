import { PreviewImage } from '../components/PreviewImage';
import { ButtonDashboard } from '../components/ButtonDashboard';

export const DashboardPage = () => {
  return (
    <div className="animate__animated animate__fadeIn animate__fast p-2 dash-main-container">
      <div className="dashboard-container mb-5">
        <PreviewImage />
        <div className="d-flex flex-column ms-5">
          <h2 className="name-title">Elmer Gustavo Sanchez</h2>
          <h5>
            <i className="fa-solid fa-user me-2"></i> Usuario: sklfdjalsd
          </h5>
          <h5>
            <i className="fa-solid fa-sd-card me-3"></i>
            Álbumes: 5
          </h5>
        </div>
      </div>

      <div className="dashboard-btns mb-1">
        <ButtonDashboard
          description="Editar perfil"
          icon="fa-solid fa-address-card me-2"
          styleClass="btn btn-primary"
          navigateTo="/profile"
        />
        <ButtonDashboard
          description="Editar Álbumes"
          icon="fa-solid fa-photo-film me-2"
          styleClass="btn btn-info"
          navigateTo="/album"
        />
        <ButtonDashboard
          description="Subir foto"
          icon="fa-solid fa-cloud-arrow-up me-2"
          styleClass="btn btn-success"
          navigateTo="/upload"
        />
        <ButtonDashboard
          description="Ver fotos"
          icon="fa-solid fa-image me-2"
          styleClass="btn btn-primary"
          navigateTo="/photo"
        />
      </div>
    </div>
  );
};
