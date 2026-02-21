import AureaAi from "./AureaAi";

export default function AureaAiPage(props) {
  return (
    <AuthenticatedLayout user={props.auth.user} title="Aurea AI">
      <AureaAi />
    </AuthenticatedLayout>
  );
}
