import Layout from "../../components/Layout";
import { PageTitle } from "../../components/Page";
import { WorkInProgess } from "../DashboardPage";

export default function SettingsPage() {
  return (
    <PageTitle title="Paramètres - Pixou">
      <Layout>
        <WorkInProgess />
      </Layout>
    </PageTitle>
  );
}
