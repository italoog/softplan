import { useAuth } from "@/hooks/Auth";
import styles from "@/styles/components/User.module.css";
import api from "@/services/api";
import { Bounce, toast } from "react-toastify";
import { UserProps } from "../painel";

interface UserComponetProps {
  name: string;
  email: string;
  type: "ADMIN" | "USER";
  id: number;
  password: string;
  onRecharge: (value: boolean) => void;
  recharge: boolean;
  onOpenForm: (value: boolean) => void;
  onUserSelect: (value: UserProps) => void;
}

const User: React.FC<UserComponetProps> = ({
  email,
  name,
  type,
  id,
  password,
  onRecharge,
  recharge,
  onOpenForm,
  onUserSelect,
}) => {
  const { user, token } = useAuth();
  const isAdmin = user?.type === "ADMIN";

  const onDeleteUser = async (id: number) => {
    try {
      const response = await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onRecharge(!recharge);

      toast.success("Usuário deletado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      console.log("Usuário deletado com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);

      toast.error("Erro ao deletar usuário!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className={styles.user}>
      <div className={styles.contente}>
        <span className={styles.text}>{name}</span>
      </div>

      <div className={styles.containerEmail}>
        <span className={styles.text}>{email}</span>
      </div>

      <div className={styles.containerType}>
        <span className={styles.text}>{type}</span>
      </div>

      {isAdmin && (
        <div className={styles.containerEdit}>
          <button
            onClick={() => {
              onOpenForm(true);
              onUserSelect({
                email: email,
                id: id,
                type: "USER",
                name: name,
                password:  password,
              });
            }}
            className={styles.edit}
          >
            Editar
          </button>
        </div>
      )}

      {isAdmin && (
        <div className={styles.containerDelete}>
          <button
            onClick={() => {
              onDeleteUser(id);
            }}
            className={styles.delete}
          >
            Deletar
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
