"use client";

import { useState } from "react";
import { ContactPageContent } from "@/assets/content/Contact/Contact";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`;
    window.location.href = `mailto:${ContactPageContent.email}?subject=${encodeURIComponent(
      "Website inquiry"
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-medium uppercase tracking-wide text-gray-800 sm:text-3xl md:text-4xl">
            {ContactPageContent.title}
          </h1>
          <span className="mx-auto mt-3 block h-1 w-16 bg-sky-500 sm:w-24" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-sky-500 sm:px-6 md:px-8"
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-sky-500 sm:px-6 md:px-8"
            />
          </div>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-sky-500 sm:px-6 md:px-8"
          />
          <textarea
            required
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            rows={4}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-sky-500 sm:px-6 md:px-8"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-red-500 px-10 py-2 font-semibold text-white transition-colors hover:bg-red-600 sm:w-auto"
          >
            Send Message
          </button>
        </form>
    </>
  );
};

export default ContactPage;
