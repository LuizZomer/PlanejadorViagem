import { Dialog, Text } from "@rneui/themed";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { deletePlan } from "../../../services/plan/delete-plan";
import { useQueryClient } from "@tanstack/react-query";

export const ConfirmDeletePlan = ({
  isOpen,
  toggleDialog,
  planExternalId,
}: {
  isOpen: boolean;
  toggleDialog: VoidFunction;
  planExternalId: string;
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: ["delete-plan"],
    mutationFn: async (planExternalId: string) => deletePlan(planExternalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-cities"] });
    },
  });

  const handleDelete = () => {
    mutateAsync(planExternalId);
    toggleDialog();
  };

  return (
    <Dialog isVisible={isOpen} onBackdropPress={toggleDialog}>
      <Dialog.Title title="Apagar " />
      <Text>Tem certeza que deseja apagar este planejamento?</Text>
      <Dialog.Actions>
        <Dialog.Button title="Cancelar" onPress={toggleDialog} />
        <Dialog.Button title="Apagar" onPress={handleDelete} />
      </Dialog.Actions>
    </Dialog>
  );
};
