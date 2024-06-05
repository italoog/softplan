import styles from "@/styles/Painel.module.css";
import Search from "./components/Search";
import AddUser from "./components/AddUser";
import User from "./components/User";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/hooks/Auth";

export interface UserProps {
  email: string;
  id: number;
  name: string;
  password: string;
  type: "ADMIN" | "USER";
}

export interface UserPropsSeletct {
  email: string;
  id: number;
  name: string;
  password: string;
  type: "ADMIN" | "USER";
}

const Painel: React.FC = () => {
  const { token } = useAuth();
  const [data, setdata] = useState<UserProps[]>();
  const [recharge, setRecharge] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [userSelect, setUserSelect] = useState<UserProps>();
  const [search, setSearch] = useState<UserProps[]>([]);

  const getUsers = async () => {
    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setdata(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  
  useEffect(() => {
    getUsers();
  }, [token, recharge]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Search onSearch={setSearch} />
        <AddUser
          onUserSelect={setUserSelect}
          recharge={recharge}
          onRecharge={setRecharge}
          userSelect={userSelect}
          openForm={openForm}
          onOpenForm={setOpenForm}
        />

        <div>
          <h3 className={styles.label}>Lista de Usuário</h3>

          <div className={styles.card}>
            {search?.length > 0
              ? search.map((item) => (
                  <User 
                    key={item.id}
                    email={item.email}
                    name={item.name}
                    type={item.type}
                    id={item.id}
                    password={item.password}
                    onRecharge={setRecharge}
                    recharge={recharge}
                    onOpenForm={setOpenForm}
                    onUserSelect={setUserSelect}
                  />
                ))
              : data?.map((item) => (
                  <User
                    key={item.id}
                    email={item.email}
                    name={item.name}
                    type={item.type}
                    id={item.id}
                    password={item.password}
                    onRecharge={setRecharge}
                    recharge={recharge}
                    onOpenForm={setOpenForm}
                    onUserSelect={setUserSelect}
                  />
                ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Painel;
