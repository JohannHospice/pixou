import { logout } from "../../api/authentification";
import Layout from "../../components/Layout";

export default function AccountPage() {
  return (
    <Layout>
      account
      <button
        onClick={() => {
          logout();
        }}
      >
        logout()
      </button>
    </Layout>
  );
}
