import styles from "@/styles/components/RegistrationForm.module.css";
import { UserProps } from "../painel";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import api from "@/services/api";
import { useAuth } from "@/hooks/Auth";

interface RegistrationFormProps {
  userSelect?: UserProps;
  onRecharge: (value: boolean) => void;
  recharge: boolean;
  onOpenForm: (value: boolean) => void;
  openForm: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  userSelect,
  onRecharge,
  recharge,
  onOpenForm,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("USER");

  const { token } = useAuth();

  useEffect(() => {
    if (userSelect) {
      setEmail(userSelect.email || "");
      setName(userSelect.name || "");
      setType(userSelect.type || "USER");
      setPassword(""); // Não setamos a senha para um usuário existente
    }
  }, [userSelect]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      
      console.log(userSelect)
      
      if (userSelect?.id && Number.isInteger(userSelect.id)) {
        await api.patch(
          `/users/${userSelect.id}`,
          {
            email,
            password: password || undefined, // Enviar apenas se a senha foi preenchida
            name,
            type,
          },
          config
        );
      } else {
        await api.post(
          "/register",
          {
            email,
            password,
            name,
            type,
          },
          config
        );
      }

      onOpenForm(false);
      onRecharge(!recharge);

      toast.success("Operação realizada com sucesso!", {
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
      
    } catch (err) {
      toast.error("Erro na operação, verifique as credenciais.", {
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
    <div>
      <form
        className={styles.form}
        onSubmit={(e) => handleSubmit(e)}

      >
        <div className={styles.card}>
          
          <div className={styles.containerInput}>
            <label className={styles.text}>Nome</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do usuário"
            />
          </div>
          <div className={styles.containerInput}>
            <label className={styles.text}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o email do usuário"
            />
          </div>
          <div className={styles.containerInput}>
            <label className={styles.text}>Senha</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite uma senha"
            />
          </div>
          <div className={styles.containerInput}>
            <label className={styles.text}>Permissão</label>
            <div className={styles.selectContainer}>
              <select
                className={styles.select}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="USER">Usuário</option>
                <option value="ADMIN">Administrador</option>
              </select>
              <div className={styles.selectArrow}></div>
            </div>
          </div>
          <button className={styles.buttonsalve} type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
