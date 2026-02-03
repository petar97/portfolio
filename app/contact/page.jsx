"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {FaPhoneAlt, FaEnvelope, FaMapMarkerAlt} from "react-icons/fa";

import emailjs from "emailjs-com";

import { motion } from "framer-motion";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedItem from "@/components/AnimatedItem";

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
    title: "Address",
    description: "Rajka od Rasine 5a, Beograd"
  },
]

const Contact = () => {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
      from_name: formData.get('firstname'),
      from_email: formData.get('email'),
      message: formData.get('message'),
    };
  
    const fields = ['firstname', 'email', 'message'];
    fields.forEach(field => {
      const inputElement = event.target.elements[field];
      if (data[field] === "") {
        inputElement.classList.remove('border-white/10');
        inputElement.classList.add('border-fuchsia-500');
      } else {
        inputElement.classList.remove('border-fuchsia-500');
        inputElement.classList.add('border-white/10');
      }
    });
  
    if (!data.from_name || !data.from_email || !data.message) {
      return;
    }

    setMessageSent(true);
  
    emailjs.send('service_5p7y3ij', 'template_4px3inx', data, 'GEDDaxd28d3Q4i2F9')
      .then((response) => {
        event.target.reset();

        setTimeout(() => {
          setMessageSent(false);
        }, 3000)
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        alert('Failed to send email. Please try again later.');
      });
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1, 
        transition: {delay: 2.4, duration: 0.4, ease: "easeIn"},
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <AnimatedSection stagger={0.08} delay={2.5}>
                <AnimatedItem as="h3" className="text-4xl text-accent">Let&apos;s work together</AnimatedItem>
                <AnimatedItem as="p" className="text-white/60">
                  I&apos;m always excited to collaborate on new projects, whether it&apos;s building a website from the ground up or enhancing an existing one.
                </AnimatedItem>
                <AnimatedItem as="p" className="text-white/60">
                  If you&apos;re looking for a dedicated web developer who can turn your ideas into reality, drop me a message below, and let&apos;s create something amazing together!
                </AnimatedItem>
                <AnimatedItem className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input name="firstname" type="text" placeholder="First name" />
                  <Input name="email" type="email" placeholder="Email address" />
                </AnimatedItem>
                <AnimatedItem>
                  <Textarea
                    name="message"
                    className="h-[200px]"
                    placeholder="Type your message here..."
                  />
                </AnimatedItem>
                <AnimatedItem className="flex justify-between">
                  <Button type="submit" size="md" className="max-w-40 text-black">
                    Send message
                  </Button>
                  <motion.p
                    initial={{opacity: 0}}
                    animate={{
                      opacity: messageSent ? 1 : 0,
                      transition: {duration: 0.5, ease: "easeIn"}
                    }}

                    className={`text-accent text-lg my-auto ${messageSent ? 'block' : 'hidden'}`}>
                    Message sent successfully!
                  </motion.p>
                </AnimatedItem>
              </AnimatedSection>
            </form>
          </div>
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <AnimatedSection stagger={0.12} delay={2.7} as="ul" className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <AnimatedItem key={index} as="li" className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
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
