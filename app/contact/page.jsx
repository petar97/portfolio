"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {FaPhoneAlt, FaEnvelope, FaMapMarkerAlt} from "react-icons/fa";

import emailjs from "@emailjs/browser";

import { motion } from "framer-motion";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedItem from "@/components/AnimatedItem";
import { ENTRY_DELAY } from "@/lib/animations";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+381) 62 597 627"
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "petar97m@gmail.com"
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    description: "Belgrade, Serbia"
  },
]

const statusMessages = {
  idle: "",
  sending: "",
  sent: "Message sent successfully!",
  error: "Failed to send message. Please try again later.",
};

// Red border only after the user has interacted with an invalid field
const fieldStyles = "[&:user-invalid]:border-fuchsia-500";

const Contact = () => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    try {
      // Public key comes from the environment (see README); it still ships in the browser bundle by design
      await emailjs.send('service_5p7y3ij', 'template_4px3inx', {
        from_name: formData.get('firstname'),
        from_email: formData.get('email'),
        message: formData.get('message'),
      }, { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY });
      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus("error");
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1, 
        transition: {delay: ENTRY_DELAY, duration: 0.4, ease: "easeIn"},
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <AnimatedSection stagger={0.08} delay={ENTRY_DELAY + 0.1} className="flex flex-col gap-6">
                <AnimatedItem as="h1" className="text-4xl text-accent">Let&apos;s work together</AnimatedItem>
                <AnimatedItem as="p" className="text-white/60">
                  I&apos;m always excited to collaborate on new projects, whether it&apos;s building a website from the ground up or enhancing an existing one.
                </AnimatedItem>
                <AnimatedItem as="p" className="text-white/60">
                  If you&apos;re looking for a dedicated web developer who can turn your ideas into reality, drop me a message below, and let&apos;s create something amazing together!
                </AnimatedItem>
                <AnimatedItem className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input name="firstname" type="text" placeholder="First name" aria-label="First name" autoComplete="given-name" required className={fieldStyles} />
                  <Input name="email" type="email" placeholder="Email address" aria-label="Email address" autoComplete="email" required className={fieldStyles} />
                </AnimatedItem>
                <AnimatedItem>
                  <Textarea
                    name="message"
                    className={`h-[200px] ${fieldStyles}`}
                    placeholder="Type your message here..."
                    aria-label="Message"
                    required
                  />
                </AnimatedItem>
                <AnimatedItem className="flex justify-between gap-4">
                  <Button type="submit" size="md" className="max-w-40 text-black" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Send message"}
                  </Button>
                  <p
                    role="status"
                    className={`text-lg my-auto ${status === "error" ? "text-fuchsia-500" : "text-accent"}`}
                  >
                    {statusMessages[status]}
                  </p>
                </AnimatedItem>
              </AnimatedSection>
            </form>
          </div>
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <AnimatedSection stagger={0.12} delay={ENTRY_DELAY + 0.3} as="ul" className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <AnimatedItem key={index} as="li" className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]" aria-hidden="true">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <p className="text-xl">{item.description}</p>
                    </div>
                  </AnimatedItem>
                );
              })}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
