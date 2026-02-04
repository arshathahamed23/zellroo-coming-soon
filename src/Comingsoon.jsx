import React, { useEffect, useState } from "react";
import Logo from "./assets/logo.png";
import { MessageCircle, ListPlus, MapPin, ShieldCheck } from "lucide-react";
import emailjs from "emailjs-com";

export default function Comingsoon() {
  const launchDate = new Date("2026-03-21T00:00:00+05:30");

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = launchDate.getTime() - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      title: "Easy Listing",
      icon: <ListPlus className="w-7 h-7 text-indigo-600" />,
    },
    {
      title: "Instant Chat",
      icon: <MessageCircle className="w-7 h-7 text-indigo-600" />,
    },
    {
      title: "Local Discovery",
      icon: <MapPin className="w-7 h-7 text-indigo-600" />,
    },
    {
      title: "Safe & Secure",
      icon: <ShieldCheck className="w-7 h-7 text-indigo-600" />,
    },
  ];

  const [email, setEmail] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    // Extract name from email
    const rawName = email.split("@")[0]; // arshathda00

    const cleanName = rawName
      .replace(/[^a-zA-Z]/g, "") // remove numbers & symbols
      .toLowerCase();

    const formattedName =
      cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    emailjs
      .send(
        "service_fdau4tr",
        "template_u8begk1",
        {
          email: email,
          name: formattedName,
        },
        "wq-J9ihoqL46BszlV",
      )
      .then(() => {
        alert("Thanks! We’ll notify you 🚀");
        setEmail("");
      })
      .catch(() => {
        alert("Something went wrong. Try again.");
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#2A3492]/20 via-white to-[#FFC107]/25 flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-10 py-6">
        <img src={Logo} alt="Zellroo" className="h-16 w-auto" />

        <a
          href="mailto:zellroo.new@gmail.com"
          target="_blank"
          className="text-indigo-600 hover:text-gray-700 text-md font-medium"
        >
          Contact
        </a>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 shadow text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          Coming Soon
        </span>

        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900">
          We’re Launching
        </h2>
        <h3 className="mt-2 text-5xl md:text-6xl font-extrabold text-indigo-600">
          Something Amazing
        </h3>

        <p className="mt-6 max-w-2xl text-gray-600 text-lg">
          Your smart local marketplace to buy and sell anything easily, safely,
          and faster.
        </p>

        {/* Countdown */}
        <div className="flex gap-6 mt-10 flex-wrap justify-center">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              className="w-28 p-6 bg-white rounded-2xl shadow text-center"
            >
              <p className="text-3xl font-bold text-indigo-600">
                {timeLeft[unit]}
              </p>
              <p className="text-xs tracking-widest text-gray-500 uppercase">
                {unit}
              </p>
            </div>
          ))}
        </div>

        {/* Email */}
        <form onSubmit={sendEmail} className="flex gap-4 mt-8">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-6 py-4 rounded-full border w-80 focus:outline-none"
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-full text-white bg-[#2A3492] font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Notify Me
          </button>
        </form>

        {/* Features */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-50">
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © 2026 Zellroo. All rights reserved.
      </footer>
    </div>
  );
}
