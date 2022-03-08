import { logout } from "../../api/authentification";
import Layout from "../../components/Layout";
import { ReactComponent as Logo } from "../../assets/logos/logo-text-img.svg";

export default function AccountPage() {
  return (
    <Layout title={<Logo />}>
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
