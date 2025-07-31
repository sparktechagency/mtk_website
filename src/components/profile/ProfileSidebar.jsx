
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import useWebsiteInfoStore from "@/store/websiteInfo";
import { FaTelegramPlane } from "react-icons/fa";

const ProfileSidebar = () => {
    const { info, fetchInfo } = useWebsiteInfoStore();

    useEffect(() => {
        if (!info) {
            fetchInfo();
        }
    }, [info, fetchInfo]);

    const { email, phone, address, instagram, telegram } = info || {};
    return (
        <div className="grid-cols-1">
            <h2 className="text-2xl font-medium text-title mb-4">Welcome to your account!</h2>
            <p className="text-subtitle mb-12">
                Update your details, manage addresses, and keep your account secure.
            </p>
            <p className="text-subtitle mb-6">
                If you need any help{" "}
                <Link href="/contact" className="text-primary hover:underline">
                    contact us
                </Link>
                :
            </p>
            <div className="space-y-3">
                <div className="flex items-center text-subtitle">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <span>{phone || "Phone not available"}</span>
                </div>
                <div className="flex items-center text-subtitle">
                    <Mail className="w-5 h-5 mr-3 text-primary" />
                    <span>{email || "Email not available"}</span>
                </div>
                <div className="flex items-center text-subtitle">
                    <MapPin className="w-5 h-5 mr-3 text-primary" />
                    <span>{address || "Address not available"}</span>
                </div>
                <div className="flex items-center text-subtitle">
                    <Instagram className="w-6 h-6 mr-3 text-primary" />
                    <Link href={`${instagram}`}>{instagram.slice(1, 46) || "Instagram not available"}</Link>
                </div>
                <div className="flex items-center text-subtitle">
                    <FaTelegramPlane className="w-5 h-5 mr-3 text-primary" />
                    <Link href={`${telegram}`}>{telegram || "Telegram not available"}</Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
