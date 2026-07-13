import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactImage } from "@/assets";

/**
 * Single source of truth for how to reach iBEST Studios.
 *
 * The earlier version of this file read from `common/SiteContent`, which holds
 * Creativerse's details (hello@creativerse.biz, +975 77886666) — and the contact
 * card hardcoded Educare's support address on top of that. Both were leftovers
 * from other projects. The email below is the one the footer, navbar and careers
 * page already use, so the whole site now agrees.
 */
export const ContactContent = {
  eyebrow: "Get in touch",
  email: "infoibeststudios@gmail.com",

  blocks: [
    {
      icon: MapPin,
      title: "Visit our office",
      lines: [{ text: "Changzamtog, Thimphu" }, { text: "Bhutan" }],
    },
    {
      icon: Phone,
      title: "Call us",
      lines: [
        { label: "Toll free", text: "2016", href: "tel:2016" },
        { label: "Mobile", text: "+975 77718721", href: "tel:+97577718721" },
      ],
    },
    {
      icon: Mail,
      title: "Email us",
      lines: [
        {
          text: "infoibeststudios@gmail.com",
          href: "mailto:infoibeststudios@gmail.com",
        },
        { text: "We'll respond as soon as possible.", muted: true },
      ],
    },
    {
      icon: Clock,
      title: "Office hours",
      lines: [
        { label: "Mon – Fri", text: "9:30 AM – 5:30 PM" },
        { label: "Saturday", text: "9:30 AM – 1:00 PM" },
        { label: "Sunday", text: "Closed", muted: true },
      ],
    },
  ],

  image: ContactImage,
  imageAlt: "The iBEST Studios office in Changzamtog, Thimphu",

  /** Google's embed URL for the iBEST STUDIOS place marker. */
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d851.4811904439825!2d89.64393539191603!3d27.46200409817676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e195f48dab3811%3A0xb0f0687044bc78f9!2siBEST%20STUDIOS!5e0!3m2!1sen!2sbt!4v1699282328782!5m2!1sen!2sbt",
};
