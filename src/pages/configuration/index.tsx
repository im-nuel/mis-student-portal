import { Card, Container, TextInput } from "@mantine/core";
import { IResourceComponentsProps, useList, useUpdate } from "@refinedev/core";
import _find from "lodash/find";
import _keyBy from "lodash/keyBy";
import { SiteConfigSchema } from "../../provider/schema/site-config";
import { DocumentPicker } from "../../components/document_picker/DocumentPicker";

export const ConfigurationPage: React.FC<IResourceComponentsProps> = () => {
  const { data } = useList<SiteConfigSchema>({ resource: "site-config" });

  const getDocument = (name: string) => {
    return _keyBy(data?.data, "name")[name] || {};
  };

  const { mutate, isLoading } = useUpdate();

  return (
    <Container size={"sm"}>
      <Card>
        <div>
          <DocumentPicker
            label="Student Document Template"
            onSubmit={function (value) {
              mutate({
                resource: "site-config",
                values: {
                  ...getDocument("student-document-template"),
                  value,
                },
                id: getDocument("student-document-template").id,
              });
            }}
            value={getDocument("student-document-template").value}
          />
        </div>
      </Card>
    </Container>
  );
};
