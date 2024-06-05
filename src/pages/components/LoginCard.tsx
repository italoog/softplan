import { useCallback } from "react";
import { useAuth } from "@/hooks/Auth";
import styles from "@/styles/components/LoginCard.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Bounce, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import getValidationError from "@/utils/getValidationErrors";
import { useRouter } from "next/router";



interface SignInFormData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().required("E-mail obrigatório").email("Digite um e-mail válido"),
  password: Yup.string().required("Senha obrigatória"),
});

const LoginCard: React.FC = () => {
  const { signIn } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
        });

        toast.success("Login realizado com sucesso!", {
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

        router.push('/painel');
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
    [signIn, router]
  );

  return (
    <div className={styles.loginCard}>
      <h2 className={styles.heading}>UserHub</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.text}>Nome de usuário</label>
        <input className={styles.input} type="email" {...register("email")} />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <label className={styles.text}>Senha:</label>
        <input className={styles.input} type="password" {...register("password")} />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}

        <button className={styles.button} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginCard;
