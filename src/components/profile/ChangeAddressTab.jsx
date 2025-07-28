
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { Loader2 } from "lucide-react";

const ChangeAddressTab = ({ addressData, setActiveTab, handleUpdateAddress, isAddressUpdatePending }) => {

    const [addressFields, setAddressFields] = useState({
        streetAddress: addressData?.streetAddress,
        city: addressData?.city,
        state: addressData?.state,
        zipCode: addressData?.zipCode
    })
    return (
        <div>
            <h2 className="text-xl font-medium text-title mb-6">Shipping Address</h2>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="streetAddress" className="text-subtitle mb-3">Street Address</Label>
                    <Input
                        id="streetAddress"
                        placeholder="Street Address"
                        value={addressFields?.streetAddress}
                        onChange={(e) =>
                            setAddressFields({ ...addressFields, streetAddress: e.target.value })
                        }
                        className="h-10 text-base "
                    />
                </div>
                <div>
                    <Label htmlFor="city" className="text-subtitle mb-3">City</Label>
                    <Input
                        id="city"
                        placeholder="City"
                        value={addressFields?.city}
                        onChange={(e) =>
                            setAddressFields({ ...addressFields, city: e.target.value })
                        }
                        className="h-10 text-base "
                    />
                </div>
                <div>
                    <Label htmlFor="state" className="text-subtitle mb-3">State</Label>
                    <Input
                        id="state"
                        placeholder="State"
                        value={addressFields?.state}
                        onChange={(e) =>
                            setAddressFields({ ...addressFields, state: e.target.value })
                        }
                        className="h-10 text-base "
                    />
                </div>
                <div>
                    <Label htmlFor="zipCode" className="text-subtitle mb-3">Zip Code</Label>
                    <Input
                        id="zipCode"
                        placeholder="Zip Code"
                        value={addressFields?.zipCode}
                        onChange={(e) =>
                            setAddressFields({ ...addressFields, zipCode: e.target.value })
                        }
                        className="h-10 text-base "
                    />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        variant="outline"
                        className=""
                        onClick={() => setActiveTab("accountDetails")}
                    >
                        Cancel
                    </Button>
                    <Button disabled={isAddressUpdatePending} onClick={() => handleUpdateAddress(addressFields)}>
                        { isAddressUpdatePending && <Loader2 className="h-4 w-4 animate-spin" /> }
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChangeAddressTab;
