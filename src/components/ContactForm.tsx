import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

type FormData = {
    name: string;
    email: string;
    message: string;
};

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const form = useForm<FormData>({
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const handleSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);

        // Add the access key to the form data
        const payload = {
            ...data,
            access_key: "62e2f460-313e-44d8-8921-b2618243d192",
        };

        // Show loading toast
        // const loadingToast = toast.loading("Sending message...");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.status === 200) {
                setSuccessMessage("Message sent successfully!");
                form.reset();
            } else {
                setError(result.message || "Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setError("Something went wrong! Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <ExclamationTriangleIcon />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {successMessage && (
                    <Alert variant="default" className="mb-6">
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                rules={{ required: "Name is required" }}
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <input
                                                {...field}
                                                type="text"
                                                className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <input
                                                {...field}
                                                type="email"
                                                className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                rules={{ required: "Message is required" }}
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <textarea
                                                {...field}
                                                rows={4}
                                                className="block w-full rounded-md bg-background px-3.5 py-2 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-3.5 py-2.5"
                            >
                                {isSubmitting ? "Sending..." : "Submit Form"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
