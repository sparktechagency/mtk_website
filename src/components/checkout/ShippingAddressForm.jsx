import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ShippingAddressForm = ({ shippingAddress, setShippingAddress }) => {
    return (
        <div className="p-6 rounded-lg border h-fit">
            <h2 className="text-2xl font-medium text-title mb-6">Shipping Address</h2>
            <from className="space-y-4 mb-8">
                <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Input
                        id="streetAddress"
                        placeholder={shippingAddress?.streetAddress || "123 Main St"}
                        value={shippingAddress?.streetAddress}
                        onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, streetAddress: e.target.value })
                        }
                        className="h-12 text-base"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            placeholder={shippingAddress?.city || "New York"}
                            value={shippingAddress?.city}
                            onChange={(e) =>
                                setShippingAddress({ ...shippingAddress, city: e.target.value })
                            }
                            className="h-12 text-base"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                            id="state"
                            placeholder={shippingAddress?.state || "NY"}
                            value={shippingAddress?.state}
                            onChange={(e) =>
                                setShippingAddress({ ...shippingAddress, state: e.target.value })
                            }
                            className="h-12 text-base"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                        id="zipCode"
                        placeholder={shippingAddress?.zipCode || "10001"}
                        value={shippingAddress?.zipCode}
                        onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
                        }
                        className="h-12 text-base"
                    />
                </div>
            </from>
        </div>
    );
};

export default ShippingAddressForm;
