"use client";
import Image from "next/image";

const ProfileSidebar = () => {
    return (
        <>
            <Image
                src="/images/profile-cartton.jpg"
                alt="Profile"
                width={1000}
                height={1080}
                className="w-full h-full object-cover"
            />
        </>
    );
};

export default ProfileSidebar;
