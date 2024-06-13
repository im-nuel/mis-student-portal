import React, { useEffect } from "react";
import { DocumentFolderSchema } from "../../provider/schema/document-folders";
import { useListState } from "@mantine/hooks";
import { useDelete, useList } from "@refinedev/core";
import {
  UseListState,
  UseListStateHandlers,
} from "@mantine/hooks/lib/use-list-state/use-list-state";

export type DocumentProps = DocumentFolderSchema & {};

export interface DocumentPickerContextProps {
  opened: boolean;
  folder: string;
  value: string;
  onClose: () => void;
  onSubmit: (value: string, file: DocumentFolderSchema) => void;
}

export interface DocumentPickerContextValue extends DocumentPickerContextProps {
  selected: DocumentProps | null;
  setSelected: (document: DocumentProps | null) => void;

  documents: DocumentFolderSchema[];
  documentsHandler: Omit<
    UseListStateHandlers<DocumentFolderSchema>,
    "remove"
  > & {
    remove: (fileId: string, id: number) => void;
  };

  isFetching: boolean;
  isSubmitting: boolean;
  setIsSubmitting: (state: boolean) => void;

  refetch: () => void;
}

export const DocumentPickerContext =
  React.createContext<DocumentPickerContextValue>(
    {} as DocumentPickerContextValue
  );

export const DocumentPickerProvider: React.FC<
  DocumentPickerContextProps & React.PropsWithChildren
> = ({ children, ...props }) => {
  const [selected, setSelected] =
    React.useState<DocumentPickerContextValue["selected"]>(null);

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [documents, documentsHandler] = useListState<DocumentFolderSchema>([]);

  const { mutate } = useDelete();

  const { data, isFetching, refetch } = useList<DocumentFolderSchema>({
    queryOptions: {
      retry: 0,
    },
    resource: "document-folders",
    filters: [
      {
        operator: "eq",
        field: "folder",
        value: props.folder,
      },
    ],
  });

  useEffect(() => {
    if (!data) return;
    documentsHandler.setState(data.data);
  }, [data]);

  const handleDocumentDelete = (id: string) => {
    mutate({
      resource: "document-folders",
      id,
    });
  };

  return (
    <DocumentPickerContext.Provider
      value={{
        selected,
        setSelected: (selected) => selected && setSelected(selected),

        documents,
        documentsHandler: {
          ...documentsHandler,
          remove: async (fileId: string, id: number) => {
            await handleDocumentDelete(fileId);
            await documentsHandler.remove(id);
          },
        },

        refetch,

        isFetching,
        isSubmitting,
        setIsSubmitting(state) {
          setIsSubmitting(state);
        },

        ...props,
      }}
    >
      {children}
    </DocumentPickerContext.Provider>
  );
};

export const useDocumentPickerContext = () => {
  const context = React.useContext(DocumentPickerContext);
  if (!context) {
    throw new Error(
      "useDocumentPickerContext must be used within a DocumentPickerProvider"
    );
  }
  return context;
};
