import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateShippingAddress } from "@/api/user/updateShippingAddress";

export const useUpdateShippingAddress = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateAddress, isPending: isAddressUpdatePending, isSuccess: isAddressUpdateSuccess } =
    useMutation({
      mutationFn: updateShippingAddress,
      onSuccess: () => {
        // toast.success("Address updated successfully.");
        queryClient.invalidateQueries({ queryKey: ["shipping-address"] });
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to update address.");
      },
    });

  return { mutateAddress, isAddressUpdatePending, isAddressUpdateSuccess };
};
