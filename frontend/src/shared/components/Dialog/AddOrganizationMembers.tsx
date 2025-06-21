import { Button, Dialog, Text } from "@rneui/themed";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listOrganizations } from "../../../services/organization/list-organizations";
import { changePlanOrganization } from "../../../services/plan/change-plan-organization";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { TouchableOpacity, View } from "react-native";
import { changeOrganizationMembers } from "../../../services/organization/change-organization-members";
import { listFriendshipRequest } from "../../../services/friendship/list-friendship-request";
import { MemberItem, MemberName } from "../../../screen/Organization/styles";
import Toast from "react-native-toast-message";

interface IOrganizationUser {
  externalId: string;
  username: string;
}

interface IAddOrganizationMembers {
  isOpen: boolean;
  toggleDialog: () => void;
  organizationExternalId: string;
  alreadyMembers: IOrganizationUser[];
}
export const AddOrganizationMembers = ({
  isOpen,
  toggleDialog,
  organizationExternalId,
  alreadyMembers,
}: IAddOrganizationMembers) => {
  const [error, setError] = useState<string>("");
  const [members, setMembers] = useState<IOrganizationUser[]>([]);
  const queryClient = useQueryClient();

  const { data: friends = [] } = useQuery({
    queryKey: ["list-friends"],
    queryFn: async () => listFriendshipRequest("accept"),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["change-members-organization", organizationExternalId],
    mutationFn: async ({
      organizationExternalId,
      usersExternalId,
    }: {
      organizationExternalId: string;
      usersExternalId: string[];
    }) => changeOrganizationMembers(organizationExternalId, usersExternalId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization-details", organizationExternalId],
      });
      toggleDialog();
      Toast.show({
        type: "success",
        text1: "Membros atualizados com sucesso",
      });
    },
  });

  const handleEdit = (newMember: IOrganizationUser) => {
    const alreadyExists = members.some(
      (member) => member.externalId === newMember.externalId
    );

    if (alreadyExists) {
      Toast.show({
        type: "error",
        text1: "Membro já adicionado",
      });
      return;
    }

    setMembers((prev) => [
      ...prev,
      { externalId: newMember.externalId, username: newMember.username },
    ]);
  };

  const handleRemove = (member: IOrganizationUser) => {
    setMembers((prev) =>
      prev.filter((m) => m.externalId !== member.externalId)
    );
  };

  const handleConfirm = () => {
    const usersExternalId = members.map((m) => m.externalId);
    mutateAsync({
      organizationExternalId,
      usersExternalId,
    });
  };

  console.log("members", members);

  useEffect(() => {
    setMembers(alreadyMembers);
    console.log("members", members);
  }, [alreadyMembers]);

  return (
    <Dialog isVisible={isOpen} onBackdropPress={toggleDialog}>
      <Dialog.Title title="Editar membros da organização" />
      <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {members.length > 0 && (
          <Text style={{ color: "green" }}>
            Membros associados: {members.length}
          </Text>
        )}
        {members.length > 0 &&
          members.map((member) => (
            <MemberItem>
              <MemberName key={member.externalId}>{member.username}</MemberName>
              <Button onPress={() => handleRemove(member)}>
                <Text>Remover</Text>
              </Button>
            </MemberItem>
          ))}

        {members.length === 0 && (
          <Text style={{ color: "red" }}>Nenhum membro associado</Text>
        )}

        <Dropdown
          data={friends.map((friend) => ({
            label: friend.friend.username,
            value: friend.friend.externalId,
          }))}
          labelField="label"
          valueField="value"
          onChange={(item) =>
            handleEdit({ externalId: item.value, username: item.label })
          }
          placeholder="Selecione um membro"
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
