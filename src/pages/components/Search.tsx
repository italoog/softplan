import styles from "@/styles/components/Search.module.css";
import IconSearch from "@/assets/IconSearch.svg";
import Image from "next/image";
import { useAuth } from "@/hooks/Auth";
import api from "@/services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";
import getValidationError from "@/utils/getValidationErrors";
import { useCallback } from "react";
import { useRouter } from "next/router";

interface SearchFormData {
  email: string;
}

interface SearchProps {
  onSearch: (value: []) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const { token, signOut } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>();

  const onSubmit = useCallback(
    async (data: SearchFormData) => {
      try {
        const response = await api.get(`/users?email=${data.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        onSearch(response.data);

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
        if (err instanceof Yup.ValidationError) {
          const validationErrors = getValidationError(err);

          Object.values(validationErrors).forEach((message) =>
            toast.error(message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            })
          );

          return;
        }
        toast.error("Erro na autenticação, cheque as credenciais.", {
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
    },
    [router]
  );

  return (
    <div className={styles.containerSearch}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <input
            className={styles.input}
            type="text"
            {...register("email")}
            placeholder="Procure os usuarios pelo email"
          />
          <button className={styles.button} type="submit">
            <Image src={IconSearch} alt="Icone de Lupa" width={16} />
          </button>
        </div>
      </form>
      <button
        onClick={() => {
          signOut();
        }}
        className={styles.signOut}
      >
        Sair
      </button>
    </div>
  );
};

export default Search;
