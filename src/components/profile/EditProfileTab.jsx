
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const EditProfileTab = ({ user, setActiveTab, handleUpdateProfile, isProfilePending }) => {
    const [editableData, setEditableData] = useState({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber 
    })

    return (
        <div>
            <h2 className="text-xl medium text-title mb-6">Edit Profile</h2>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="fullName" className="text-subtitle mb-3">Full Name</Label>
                    <Input
                        id="fullName"
                        placeholder="Full Name"
                        value={editableData.fullName}
                        onChange={(e) => setEditableData({ ...editableData, fullName: e.target.value })}
                        className="text-base h-10"
                    />
                </div>
                <div>
                    <Label htmlFor="email" className="text-subtitle mb-3">Email</Label>
                    <Input
                        id="email"
                        placeholder="Email"
                        value={user.email}
                        disabled
                        className="text-base h-10"
                    />
                </div>
                <div>
                    <Label htmlFor="phone" className="text-subtitle mb-3">Phone Number</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={editableData.phoneNumber}
                        onChange={(e) => setEditableData({ ...editableData, phoneNumber: e.target.value })}
                        className="text-base h-10"
                    />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => setActiveTab("accountDetails")}
                    >
                        Back
                    </Button>
                    <Button className="rounded-xs" onClick={() => handleUpdateProfile(editableData)} disabled={isProfilePending}>
                        {isProfilePending ? <><Loader2 className="h-4 w-4 animate-spin" /> Updating</>: "Update"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileTab;
