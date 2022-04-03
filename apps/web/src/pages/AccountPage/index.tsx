import { logout } from "../../api/authentification";
import Layout from "../../components/Layout";
import { PageTitle } from "../../components/Page";

export default function AccountPage() {
  return (
    <PageTitle title="Compte - Pixou">
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
    </PageTitle>
  );
}
