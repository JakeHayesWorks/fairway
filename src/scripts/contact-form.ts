import { toast } from "sonner";

export function initContactForm() {
    const form = document.getElementById("form") as HTMLFormElement;

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        // Show loading toast
        const loadingToast = toast.loading("Sending message...");

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        })
            .then(async (response) => {
                await response.json();
                if (response.status == 200) {
                    toast.success("Message sent successfully!", {
                        id: loadingToast,
                    });
                    form.reset();
                } else {
                    console.log(response);
                    toast.error("Failed to send message. Please try again.", {
                        id: loadingToast,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something went wrong! Please try again.", {
                    id: loadingToast,
                });
            });
    });
}
