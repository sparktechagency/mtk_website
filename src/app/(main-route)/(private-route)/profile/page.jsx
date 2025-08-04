
"use client";

import { useState } from "react";
import SimpleHero from "@/components/common/SimpleHero";
import PageLayout from "@/components/layout/PageLayout";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import AccountDetailsTab from "@/components/profile/AccountDetailsTab";
import EditProfileTab from "@/components/profile/EditProfileTab";
import ChangePasswordTab from "@/components/profile/ChangePasswordTab";
import ChangeAddressTab from "@/components/profile/ChangeAddressTab";
import { useGetMe } from "@/hooks/useGetMe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/user/updateProfile";
import { toast } from "sonner";
import { updatePassword } from "@/api/user/updatePassword";
import { useGetShippingAddress } from "@/hooks/useGetShippingAddress";
import { useUpdateShippingAddress } from "@/hooks/useUpdateShippingAddress";

const ProfilePage = () => {
    const queryClient = useQueryClient();
    const heroLinks = [
        { name: "Home", href: "/" },
        { name: "Profile", isCurrent: true },
    ];
    const [activeTab, setActiveTab] = useState("accountDetails");


    // Get Current User
    const { user: currentUser, isPending: isUserLoading } = useGetMe()
    const user = {
        fullName: currentUser?.fullName,
        email: currentUser?.email,
        phoneNumber: currentUser?.phone,
    };

    // Update Profile
    const { mutate: mutateProfile, isPending: isProfilePending } = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            toast.success("Profile updated successfully.");
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to update profile."); 
        }
    })
    // Update Password
    const { mutate: mutatePassword, isPending: isPasswordPending } = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            toast.success("Password updated successfully.");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to update password.");
        }
    })

    // Get Shipping Address
    const { addressData, isAddressPending } = useGetShippingAddress()

    // Update Address
    const { mutateAddress, isAddressUpdatePending, isAddressUpdateSuccess } = useUpdateShippingAddress()

    // Update Profile
    const handleUpdateProfile = (data) => {
        if (!data.phoneNumber?.trim()) {
            toast.error("Phone number is required.");
            return;
        }
        const profileData = {
            fullName: data?.fullName,
            phone: data?.phoneNumber
        }
        mutateProfile(profileData)
    }
    // Update Password
    const handleUpdatePassword = (data) => {
        const { currentPassword, newPassword, confirmNewPassword } = data;
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            toast.error("All fields are required.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        const password = {
            currentPassword,
            newPassword
        }
        mutatePassword(password)
    }

    const handleUpdateAddress = (data) => {
        mutateAddress(data)
        if (isAddressUpdateSuccess) {
            toast.success("Address updated successfully.");
        }
    }




    const renderTabContent = () => {
        switch (activeTab) {
            case "accountDetails":
                return <AccountDetailsTab
                    user={user}
                    isUserLoading={isUserLoading}
                    addressData={addressData}
                    setActiveTab={setActiveTab}
                    isAddressPending={isAddressPending}
                />;
            case "editProfile":
                return (
                    <EditProfileTab
                        user={user}
                        setActiveTab={setActiveTab}
                        handleUpdateProfile={handleUpdateProfile}
                        isProfilePending={isProfilePending}
                    />
                );
            case "changePassword":
                return (
                    <ChangePasswordTab
                        handleUpdatePassword={handleUpdatePassword}
                        setActiveTab={setActiveTab}
                        isPasswordPending={isPasswordPending}
                    />
                );
            case "changeAddress":
                return (
                    <ChangeAddressTab
                        addressData={addressData}
                        setActiveTab={setActiveTab}
                        handleUpdateAddress={handleUpdateAddress}
                        isAddressUpdatePending={isAddressUpdatePending}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-minus-header">
            <SimpleHero title="Profile" links={heroLinks} />

            <PageLayout>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProfileSidebar user={user} />

                        {/* Right Section: Tab Content */}
                        <div className="grid-cols-1">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </PageLayout>
        </div>
    );
};

export default ProfilePage;