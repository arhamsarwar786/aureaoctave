import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AureaAi from "./AureaAi";

export default function AureaAiPage(props) {
  return (
    <AuthenticatedLayout user={props.auth.user} title="Aurea AI">
      <AureaAi />
    </AuthenticatedLayout>
  );
}
