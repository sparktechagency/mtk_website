"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SimpleHero from "@/components/common/SimpleHero";
import PageLayout from "@/components/layout/PageLayout";
import { Mail, Phone, MapPin, Loader2, ArrowBigRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "@/api/contact/sendMessage";
import { toast } from "sonner";

const heroLinks = [
    { name: "Home", href: "/" },
    { name: "Contact Us", isCurrent: true }
];

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    message: z.string().min(1, { message: "Message is required" })
});

const ContactPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema)
    });

    const { mutate, isPending } = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            toast.success("Message sent successfully.");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to send message.");
        },
    })

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <div className="min-h-minus-header">
            <SimpleHero title="Contact Us" links={heroLinks} />
            <PageLayout>
                <div>
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-title mb-4">Contact Info</h2>
                        <p className="text-base text-subtitle mb-8">
                            Get in touch with our team for legal support, inquiries, or consultation appointments.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-start p-4 rounded-lg shadow-sm">
                                <MapPin className="w-6 h-6 mr-3 text-primary mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-title">Location:</p>
                                    <p className="text-sm text-subtitle">6391 Elgin St. Celina, Delaware 10299</p>
                                </div>
                            </div>
                            <div className="flex items-start p-4 rounded-lg shadow-sm">
                                <Mail className="w-6 h-6 mr-3 text-primary mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-title">Email:</p>
                                    <p className="text-sm text-subtitle">info@mtkecommerceweb.com</p>
                                </div>
                            </div>
                            <div className="flex items-start p-4 rounded-lg shadow-sm">
                                <Phone className="w-6 h-6 mr-3 text-primary mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-title">Phone:</p>
                                    <p className="text-sm text-subtitle">+974 4491 3355</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="h-full">
                            <h2 className="text-2xl font-bold text-title mb-6">Contact Us</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <Label htmlFor="email" className="text-subtitle">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        className="mt-1 "
                                        {...register("email")}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="phone" className="text-subtitle">Phone Number</Label>
                                    <Input
                                        type="tel"
                                        id="phone"
                                        placeholder="Enter your phone number"
                                        className="mt-1 "
                                        {...register("phone")}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="message" className="text-subtitle">Message</Label>
                                    <Textarea
                                        id="message"
                                        rows={10}
                                        placeholder="Write here"
                                        className="mt-1 "
                                        {...register("message")}
                                    />
                                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                                </div>
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                    className=" text-white"
                                >
                                    {isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending</> : <>Send Message <ArrowBigRight /></>}
                                </Button>
                            </form>
                        </div>
                        <div className="mt-8 md:mt-0 min-h-full">
                            <Image
                                src="/images/contact.jpg"
                                alt="Contact Us"
                                width={600}
                                height={400}
                                className="rounded-sm w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </div>
    );
};

export default ContactPage;