"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const passwordSchema = z.object({
    currentPassword: z.string().min(1, { message: "Current password is required" }),
    newPassword: z.string().min(6, { message: "New password must be at least 6 characters long" }),
    confirmNewPassword: z.string()
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
}).refine(data => data.currentPassword !== data.newPassword, {
    message: "New password must be different from the current password",
    path: ["newPassword"],
});

const ChangePasswordTab = ({ handleUpdatePassword, setActiveTab, isPasswordPending }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(passwordSchema),
        mode: 'onChange'
    });

    const onSubmit = (data) => {
        handleUpdatePassword(data);
    };

    return (
        <div>
            <h2 className="text-xl font-medium text-title mb-6">Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Current Password */}
                <div>
                    <Label htmlFor="currentPassword" className="text-subtitle mb-3">Current Password</Label>
                    <div className="relative">
                        <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Current Password"
                            {...register("currentPassword")}
                            className="h-10 text-base pr-10"
                        />
                        <span
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-subtitle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </span>
                    </div>
                    {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
                </div>

                {/* New Password */}
                <div>
                    <Label htmlFor="newPassword" className="text-subtitle mb-3">New Password</Label>
                    <div className="relative">
                        <Input
                            id="newPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            {...register("newPassword")}
                            className="h-10 text-base pr-10"
                        />
                        <span
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-subtitle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </span>
                    </div>
                    {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                    <Label htmlFor="confirmNewPassword" className="text-subtitle mb-3">Confirm New Password</Label>
                    <div className="relative">
                        <Input
                            id="confirmNewPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm New Password"
                            {...register("confirmNewPassword")}
                            className="h-10 text-base pr-10"
                        />
                        <span
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-subtitle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </span>
                    </div>
                    {errors.confirmNewPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveTab("accountDetails")}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPasswordPending || !isValid}>
                        {isPasswordPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Updating</> : "Change Password"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordTab;
