import { Dialog, Text } from "@rneui/themed";
import { useMutation, useQuery } from "@tanstack/react-query";
import { listOrganizations } from "../../../services/organization/list-organizations";
import { changePlanOrganization } from "../../../services/plan/change-plan-organization";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { View } from "react-native";

interface IAssignedPlanInOrg {
  isOpen: boolean;
  toggleDialog: () => void;
  planExternalId: string;
}
export const AssignedPlanInOrg = ({
  isOpen,
  toggleDialog,
  planExternalId,
}: IAssignedPlanInOrg) => {
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { data: organizations = [], isLoading } = useQuery({
    queryKey: ["list-organizations"],
    queryFn: async () => listOrganizations(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["change-plan-organization"],
    mutationFn: async ({
      planExternalId,
      organizationExternalId,
    }: {
      planExternalId: string;
      organizationExternalId: string;
    }) => changePlanOrganization(planExternalId, organizationExternalId),
    onSuccess: () => {
      toggleDialog();
    },
  });

  const handleConfirm = () => {
    if (!selectedOrganization) {
      setError("Selecione uma organização");
      return;
    }
    mutateAsync({
      planExternalId,
      organizationExternalId: selectedOrganization,
    });
  };

  return (
    <Dialog isVisible={isOpen} onBackdropPress={toggleDialog}>
      <Dialog.Title title="Atribuir planejamento à organização" />
      <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Dropdown
          data={organizations}
          labelField="name"
          valueField="id"
          onChange={(item) => setSelectedOrganization(item.externalId)}
        />
        {error && <Text style={{ color: "red" }}>{error}</Text>}
      </View>
      <Dialog.Actions>
        <Dialog.Button
          title="CONFIRM"
          onPress={handleConfirm}
          disabled={isPending}
        />
        <Dialog.Button
          title="CANCEL"
          onPress={toggleDialog}
          disabled={isPending}
        />
      </Dialog.Actions>
    </Dialog>
  );
};
