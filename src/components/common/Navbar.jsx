"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Heart, User, Menu, LogOut, UserPlus, ChevronDown, ShoppingBasket, ShoppingCart, MoonIcon, SunIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/auth";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMe } from "@/hooks/useGetMe";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useInitializeCart from "@/hooks/useCart";

import { toast } from "sonner";
import { useState, useEffect } from "react";

const Navbar = () => {
    const { theme, setTheme } = useTheme()
    const token = useAuthStore.getState().token;
    const clearToken = useAuthStore.getState().clearToken;
    const { user, isLoading } = useGetMe();
    const { cartData: cart } = useInitializeCart();
    const handleAuthRedirect = useAuthRedirect();

    const [mounted, setMounted] = useState(false);



    const isLoggedIn = !!token && !!user;
    const userName = user?.fullName || "Guest";
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Help", href: "/help" },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogOut = () => {
        clearToken();
        toast.success("Logout successful!");
        window.location.reload();
    }

    return (
        <nav className="h-[81px]">
            <div className="shadow-sm bg-content-bg fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 xl:px-0 py-2">
                    <div className="flex items-center justify-between h-16">
                        <div className="lg:hidden flex items-center">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="">
                                        <Menu className="h-6 w-6 text-subtitle" />
                                        <span className="sr-only">Toggle navigation menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[250px] sm:w-[320px]">
                                    <SheetHeader>
                                        <Link href="/" className="flex items-center">
                                            <Image
                                                src="/images/logo.png"
                                                alt="Company Logo"
                                                priority
                                                width={120}
                                                height={48}
                                                className="md:h-12 h-10 w-auto" style={{ width: 'auto', height: 'auto' }}
                                            />
                                        </Link>
                                        <SheetTitle className="sr-only">Main Menu</SheetTitle>
                                        <SheetDescription className="sr-only">Navigation links for the website.</SheetDescription>
                                    </SheetHeader>
                                    <nav className="mt-6 flex flex-col space-y-4 pl-8">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className={`font-medium text-subtitle hover:text-title transition-colors ${pathname === link.href ? "text-title underline font-bold" : ""
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </nav>

                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Center Logo - Visible on all screen sizes */}
                        <div className="flex-1 flex justify-center lg:flex-none lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/images/logo.png"
                                    alt="TripleM Collectibles"
                                    width={124}
                                    height={32}
                                    priority
                                    className="md:h-14 h-10 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation Links - Hidden on small screens */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-subtitle hover:text-title transition-colors font-medium duration-200 text-sm ${pathname === link.href ? "text-title underline font-bold" : ""}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Action Icons */}
                        <div className="flex items-center space-x-2 lg:ml-auto">
                            <div onClick={(e) => handleAuthRedirect(e, '/wishlist')}>
                                <Button variant="ghost" size="icon" className="">
                                    <Heart className="h-5 w-5 text-subtitle" />
                                    <span className="sr-only">Favorites</span>
                                </Button>
                            </div>

                            <div onClick={(e) => handleAuthRedirect(e, '/cart')}>
                                <Button variant="ghost" size="icon" className="relative">
                                    <ShoppingCart className="h-5 w-5 text-subtitle" />
                                    <span className="sr-only">Shopping Cart</span>
                                    {cart && cart.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cart?.length}</span>
                                    )}
                                </Button>
                            </div>
                            {/* User Profile Icon */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center cursor-pointer">
                                        <Button variant="ghost" size="icon" className="">
                                            <User className="h-5 w-5 text-subtitle" />
                                            <span className="sr-only">Profile</span>
                                        </Button>
                                        {isLoading ? (
                                            <div className="flex items-center gap-1">
                                                <Skeleton className="h-4 w-23" />
                                                <Skeleton className="h-4 w-4" />
                                            </div>
                                        ) : isLoggedIn && (
                                            <div className="flex items-center gap-1">
                                                <span className="hidden md:block text-subtitle text-sm font-medium">{userName}</span>
                                                <ChevronDown className="hidden md:block h-4 w-4 text-subtitle" />
                                            </div>
                                        )}
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="md:w-48">
                                    {isLoggedIn ? (
                                        <div>
                                            <DropdownMenuLabel className="md:hidden text-center">{userName}</DropdownMenuLabel>
                                            <DropdownMenuSeparator className={"md:hidden"} />
                                            <Link href="/profile">
                                                <DropdownMenuItem className={"cursor-pointer"}>
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>My Account</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuSeparator />
                                            <Link href="/my-orders">
                                                <DropdownMenuItem className={"cursor-pointer"}>
                                                    <ShoppingBasket className="mr-2 h-4 w-4" />
                                                    <span>My Order</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                            </Link>
                                            <DropdownMenuItem onClick={handleLogOut} className={"cursor-pointer"}>
                                                <LogOut className="mr-2 h-4 w-4 text-red-500" />
                                                <span className="text-red-500">Logout</span>
                                            </DropdownMenuItem>
                                        </div>
                                    ) : (
                                        <>
                                            <Link href="/auth/sign-up">
                                                <DropdownMenuItem className={"cursor-pointer"}>
                                                    <UserPlus className="mr-2 h-4 w-4" />
                                                    <span>Sign Up</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuSeparator />
                                            <Link href="/auth/login">
                                                <DropdownMenuItem className={"cursor-pointer"}>
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>Login</span>
                                                </DropdownMenuItem>
                                            </Link>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>


                            {mounted && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="relative"
                                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                                >
                                    <SunIcon
                                        size={18}
                                        className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
                                            }`}
                                    />
                                    <MoonIcon
                                        size={18}
                                        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
                                            }`}
                                    />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;