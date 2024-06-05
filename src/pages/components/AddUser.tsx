import styles from "@/styles/components/AddUser.module.css";
import { useAuth } from "@/hooks/Auth";
import RegistrationForm from "@/pages/components/RegistrationForm";
import { UserProps } from "../painel";

interface AddUser {
  openForm: boolean;
  onOpenForm: (value: boolean) => void;
  userSelect?: UserProps;
  onRecharge: (value: boolean) => void;
  recharge: boolean;
  onUserSelect: (value: UserProps) => void;
}

const AddUser: React.FC<AddUser> = ({
  onOpenForm,
  openForm,
  userSelect,
  onRecharge,
  recharge,
  onUserSelect,
}) => {
  const { user } = useAuth();
  const isAdmin = user?.type === "ADMIN";

  return (
    <>
      <div className={styles.containerAddUser}>
        <div className={styles.containertext}>
          <h2>Painel de Usuário</h2>
          <span>
            {!!isAdmin
              ? `Visualize perfis de usuários e gerencie permissões.`
              : `Visualize perfis de usuários.`}
          </span>
        </div>
        {isAdmin && (
          <button
            onClick={() => {
              onOpenForm(!openForm);
              onUserSelect({
                email: "",
                id: 0,
                name: "",
                password: "",
                type: "USER",
              });
            }}
            className={styles.button}
          >
            {!openForm ? "Adicionar Usuário" : "Cancelar"}
          </button>
        )}
      </div>
      {openForm && (
        <RegistrationForm
          onOpenForm={onOpenForm}
          onRecharge={onRecharge}
          recharge={recharge}
          openForm={openForm}
          userSelect={userSelect}
        />
      )}
    </>
  );
};

export default AddUser;
