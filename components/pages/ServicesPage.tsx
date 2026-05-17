"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "../shared/FadeUp";
import Footer from "../Footer";

type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";

interface ServicesPageProps {
  navigate: (p: Page) => void;
  onBook: (serviceName: string) => void;
}

const HERO_BG = "servicecover1.jpeg";

// ── Full sub-item data for each card ──
const categories = [
  {
    icon: "💍",
    title: "Bridal Services",
    items: [
      {
        n: "Bridal Makeup", s: "Classic & HD",
        img: "https://i.pinimg.com/736x/1a/32/b2/1a32b2a4ef0f01b3ce7f0cbf91f3d1bc.jpg",
        subitems: [
          { name: "Bridal Makeup", price: "₹8,000", img: "https://i.pinimg.com/736x/1a/32/b2/1a32b2a4ef0f01b3ce7f0cbf91f3d1bc.jpg" },
          { name: "MAC Bridal Face Makeup", price: "₹10,000", img: "https://i.pinimg.com/736x/ad/06/c8/ad06c801671b636b4a46ca05b561985d.jpg" },
          { name: "Bridal Special Makeup", price: "₹11,000", img: "https://i.pinimg.com/736x/53/97/54/539754ad4096187ce16b098dbc76dbfe.jpg" },
          { name: "Bridal Makeup — Kryolan", price: "₹9,500", img: "https://i.pinimg.com/736x/bb/67/db/bb67dbc7d126f103009a13130fc7350a.jpg" },
          { name: "Bridal Makeup — MAC", price: "₹12,000", img: "https://i.pinimg.com/736x/2d/b2/f8/2db2f8f35a5b405ca9e92aa87cffb196.jpg" },
          { name: "Bridal Royal Makeup", price: "₹15,000", img: "https://i.pinimg.com/736x/bf/e3/d5/bfe3d5b8d50774887532a1df890ea485.jpg" },
          { name: "Crystal Glow Bridal Makeup", price: "₹14,000", img: "https://i.pinimg.com/736x/da/6b/1b/da6b1b3d9cadc5b7e263286e8d40e9fa.jpg" },
          { name: "Bridal Water Proof Makeup", price: "₹10,000", img: "https://i.pinimg.com/736x/bb/67/db/bb67dbc7d126f103009a13130fc7350a.jpg" },
          { name: "Bridal Package", price: "₹18,000", img: "https://i.pinimg.com/736x/f4/00/d7/f400d7375049670968524017b68c3344.jpg" },
          { name: "Make Up — Glossy (Bridal)", price: "₹9,000", img: "https://i.pinimg.com/736x/99/29/f5/9929f525211a780e73668ba7d266f6f2.jpg" },
        ],
      },
      {
        n: "Engagement Makeup", s: "Same Day Service",
        img: "https://i.pinimg.com/736x/94/ea/eb/94eaebfdb7b32dd20d11b337ae3af057.jpg",
        subitems: [
          { name: "Engagement Makeup", price: "₹6,000", img: "https://i.pinimg.com/736x/26/b4/3d/26b43dcf9d2c50d9ffdd4394608ca43a.jpg" },
          { name: "Engagement Makeup — MAC", price: "₹8,000", img: "https://i.pinimg.com/736x/2f/b8/06/2fb8063d84a419c7ee68bc133331de97.jpg" },
          { name: "Sagan Makeup — MAC (Special)", price: "₹10,000", img: "https://i.pinimg.com/736x/0e/5b/65/0e5b65fc72ac349fe283f67604cb2e47.jpg" },
          { name: "Engagement And Fashion Air Brush Makeup", price: "₹9,000", img: "https://i.pinimg.com/1200x/12/a2/00/12a200ee89edcb2b3cdf6bea1581d65d.jpg" },
        ],
      },
      {
        n: "Reception Makeup", s: "Glam Evening Look",
        img: "https://www.brides.com/thmb/_sS4sJ0Y2TXSoaqQibDrv8WlB4Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Wedding-Makeup-Looks-Bruno-Rezza-1a9de729d4df412880800d62259fcfb0.jpg",
        subitems: [
          { name: "Make Up — Reception (Bridal)", price: "₹8,000", img: "https://i.pinimg.com/736x/3e/d4/d6/3ed4d6a9ef874cc57871431fdfc2ae69.jpg" },
          { name: "HD Reception Makeup", price: "₹10,000", img: "https://i.pinimg.com/736x/fd/c1/a5/fdc1a5059048561a1c63e31cefbe2dc9.jpg" },
        ],
      },
      {
        n: "Pre-Bridal Makeup", s: "Trial Sessions",
        img: "https://i.pinimg.com/736x/fd/c1/a5/fdc1a5059048561a1c63e31cefbe2dc9.jpg",
        subitems: [
          { name: "Pre Bridal Makeup", price: "₹5,000", img: "https://i.pinimg.com/736x/c8/ef/76/c8ef76ee079928c9d62026b2946e7584.jpg" },
          { name: "Pre Bridal Golden Glow Makeup", price: "₹6,500", img: "https://i.pinimg.com/736x/53/72/b0/5372b08668a28f45da2c14fde566a4ae.jpg" },
          { name: "Trial Pre Wedding Makeup", price: "₹4,000", img: "https://i.pinimg.com/736x/6a/31/10/6a31100b8c76190ddac49367f77146c0.jpg" },
        ],
      },
    ],
  },
  {
    icon: "✨",
    title: "Makeup Services",
    items: [
      {
        n: "Party Makeup", s: "Any Occasion",
        img: "https://i.pinimg.com/1200x/da/31/74/da317437aa24867801b0f41e64df7315.jpg",
        subitems: [
          { name: "Party Makeup", price: "₹2,500", img: "https://i.pinimg.com/736x/0c/3b/59/0c3b596f2e2553c7227df184e2b49710.jpg" },
          { name: "Party Makeup At Salon", price: "₹2,000", img: "https://i.pinimg.com/736x/30/b0/05/30b0054a89b8d2d8fd1bdb09e02f02d6.jpg" },
          { name: "Basic Party Makeup", price: "₹1,800", img: "https://i.pinimg.com/736x/7d/ce/05/7dce058602c22476b724900b4f13fa26.jpg" },
          { name: "Advanced Party Makeup", price: "₹3,500", img: "https://i.pinimg.com/1200x/53/53/0b/53530be6e0b84b72e65c4cfef8621f1f.jpg" },
          { name: "Night Party Makeup", price: "₹2,800", img: "https://i.pinimg.com/1200x/a2/23/70/a22370138fa677ead8a89ab1fde8e4c2.jpg" },
          { name: "Day Party Makeup", price: "₹2,200", img: "https://i.pinimg.com/736x/52/56/92/525692b7527e369f9f88ba0dd134a17b.jpg" },
          { name: "Party Makeup — Airbrush", price: "₹3,500", img: "https://i.pinimg.com/736x/ab/eb/6f/abeb6f79d841af5143fce9b52ebe212f.jpg" },
          { name: "Party Makeup — Kryolan", price: "₹3,000", img: "https://i.pinimg.com/1200x/f5/33/f4/f533f4d56043e7d09ba6d4c2c7101a0d.jpg" },
          { name: "Cocktail Makeup", price: "₹3,200", img: "https://i.pinimg.com/736x/af/2c/73/af2c7391d39b95dd9cb452f1c3fec109.jpg" },
          { name: "Event Makeup", price: "₹2,500", img: "https://i.pinimg.com/1200x/a9/26/62/a926625488d4c38b8c7b57927d91495a.jpg" },
          { name: "Evening Glam Makeup", price: "₹2,800", img: "https://i.pinimg.com/1200x/c5/5d/93/c55d93288f402192e6a9b43fa313bbcc.jpg" },
        ],
      },
      {
        n: "Eye Makeup", s: "Smokey, Cat-eye",
        img: "https://i.pinimg.com/736x/6a/2a/c2/6a2ac279bb4ac45b4618ada7eacac147.jpg",
        subitems: [
          { name: "Smokey Eye Makeup", price: "₹1,200", img: "https://i.pinimg.com/736x/de/2e/82/de2e8278e96818b4c85d64fbd2ad34f6.jpg" },
          { name: "Eye Makeup With Glitter", price: "₹1,500", img: "https://i.pinimg.com/736x/ac/57/50/ac57503ac3e2f2a374df04bb60a74b9b.jpg" },
          { name: "Eye Makeup And Base Makeup", price: "₹2,000", img: "https://i.pinimg.com/736x/84/ba/a7/84baa7488405b6f9f58ba5ec7985f08f.jpg" },
          { name: "Basic Eye Makeup", price: "₹800", img: "https://i.pinimg.com/1200x/a6/b0/24/a6b024cfbee0b46e83b216e9ecec1d1e.jpg" },
        ],
      },
      {
        n: "Glam / Fashion Makeup", s: "Editorial Looks",
        img: "https://i.pinimg.com/736x/d3/48/83/d348830333ee5ed98762e7a61ff3f0aa.jpg",
        subitems: [
          { name: "Glamorous Look Makeup", price: "₹3,500", img: "https://i.pinimg.com/736x/d3/48/83/d348830333ee5ed98762e7a61ff3f0aa.jpg" },
          { name: "Glam / Fashion Makeup", price: "₹4,000", img: "https://i.pinimg.com/736x/95/58/0d/95580d0d2b21f7566fb274eddfb96521.jpg" },
          { name: "Natural Glam Makeup", price: "₹2,800", img: "https://i.pinimg.com/736x/0a/35/6a/0a356abd09fc41072a0baf8a29872e44.jpg" },
          { name: "Corporate Makeup", price: "₹2,000", img: "https://i.pinimg.com/736x/73/8f/95/738f95ffaf365dbb1b525974d9d07bcb.jpg" },
          { name: "Portfolio Makeup", price: "₹4,500", img: "https://i.pinimg.com/736x/2a/d3/cc/2ad3cc87c449c9f7737f6150bfeb2536.jpg" },
          { name: "Studio Makeup", price: "₹3,500", img: "https://i.pinimg.com/1200x/61/da/fe/61dafe59ffd491c47594c2ab3f71d003.jpg" },
          { name: "Photo Shoot Makeup", price: "₹4,000", img: "https://i.pinimg.com/736x/33/e7/9f/33e79f5d149080d67312842347d39b34.jpg" },
          { name: "Royal Makeup", price: "₹5,000", img: "https://i.pinimg.com/736x/5a/23/ca/5a23ca5b0bbc27ab70962c1d851136e1.jpg" },
          { name: "HD Rokka Makeup", price: "₹6,000", img: "https://i.pinimg.com/1200x/4c/33/7a/4c337a592da533d91ccfc0dbec334e48.jpg" },
          { name: "Night Makeup", price: "₹2,000", img: "https://i.pinimg.com/736x/05/17/07/051707f9f0c2cbd94a14a9298284f4b5.jpg" },
        ],
      },
      {
        n: "HD Airbrush Makeup", s: "Flawless Finish",
        img: "https://i.pinimg.com/1200x/ad/cf/0c/adcf0c8813ca543ee0b4428bc858af4b.jpg",
        subitems: [
          { name: "Air Brush Makeup", price: "₹5,000", img: "https://i.pinimg.com/1200x/12/a2/00/12a200ee89edcb2b3cdf6bea1581d65d.jpg" },
          { name: "Bridal Makeup — HD", price: "₹14,000", img: "https://i.pinimg.com/736x/fe/25/00/fe2500f69fc8108c7edf6bc56d9831f0.jpg" },
          { name: "Bridal Makeup — HD (Air Brush)", price: "₹15,000", img: "https://i.pinimg.com/736x/16/59/10/1659105880f8b4bdd2133170ae3d365b.jpg" },
          { name: "Bridal Makeup — Airbrush Eleganza", price: "₹20,000", img: "https://i.pinimg.com/1200x/f3/a2/64/f3a2640f3dd8028b15e85f2aa1a2fc56.jpg" },
          { name: "HD Makeup", price: "₹4,500", img: "https://i.pinimg.com/1200x/65/c2/e8/65c2e851106cb483afdbbe48294a6b3d.jpg" },
          { name: "Sagan Makeup — High Definition (Special)", price: "₹12,000", img: "https://i.pinimg.com/736x/98/8e/02/988e02403fb91ff8936583f9e2a7038f.jpg" },
        ],
      },
      {
        n: "Basic Casual Makeup", s: "Natural Look",
        img: "https://i.pinimg.com/236x/dd/64/42/dd644200a73cf8fcea1f4d0bf3e2d9fe.jpg",
        subitems: [
          { name: "Basic Makeup", price: "₹800", img: "https://i.pinimg.com/1200x/7f/b1/93/7fb193d1c9aa8f359a2c8cc7088facb1.jpg" },
          { name: "Casual Makeup", price: "₹1,000", img: "https://i.pinimg.com/736x/85/0d/04/850d04e5268a1343b6734b8f473a35a6.jpg" },
          { name: "Light Makeup", price: "₹1,200", img: "https://i.pinimg.com/1200x/da/31/74/da317437aa24867801b0f41e64df7315.jpg" },
          { name: "Natural Glam Makeup", price: "₹1,500", img: "https://i.pinimg.com/736x/ef/41/c5/ef41c548331d0ee3a88e5676a9223f48.jpg" },
          { name: "Day Time Makeup", price: "₹1,500", img: "https://i.pinimg.com/736x/17/6e/b8/176eb872447a7a4f80546151b8c45dd6.jpg" },
        ],
      },
    ],
  },
  {
    icon: "💇",
    title: "Hair Services",
    items: [
      {
        n: "Hair Care", s: "Treatment & Spa",
        img: "https://i.pinimg.com/1200x/27/56/b8/2756b80c36f8a30d0c96946e3b96ae9e.jpg",
        subitems: [
          { name: "Hair Smoothening", price: "₹3,500", img: "https://i.pinimg.com/736x/cd/df/9b/cddf9b2c4c45004dbaf1ee418c5e6f61.jpg" },
          { name: "Hair Spa", price: "₹1,200", img: "https://i.pinimg.com/736x/7e/ce/a3/7ecea3ac6a931c1c172f8b96a5c8b4a0.jpg" },
          { name: "Cysteine Hair Treatment", price: "₹4,000", img: "https://i.pinimg.com/736x/a6/e2/66/a6e266119dc0ca9ea08d4610251e7d75.jpg" },
          { name: "Hair Extension", price: "₹6,000", img: "https://i.pinimg.com/736x/1f/ed/43/1fed43c7f71575a2d9cc87abb0de9b70.jpg" },
          { name: "Hair Oil Massage With Steam", price: "₹800", img: "https://i.pinimg.com/1200x/4c/fc/28/4cfc28962c953de3436a837ca849f48a.jpg" },
          { name: "Hair Rebonding", price: "₹4,500", img: "https://i.pinimg.com/736x/3c/90/7a/3c907a0decd2e109b32064fb29b0313e.jpg" },
          { name: "Hair Straightening", price: "₹3,000", img: "https://i.pinimg.com/736x/dd/e7/ab/dde7ab2d2b7d89def7040cc5d43a1a01.jpg" },
          { name: "Pro Keratin Shine Straight Fringe", price: "₹2,500", img: "https://i.pinimg.com/736x/cd/df/9b/cddf9b2c4c45004dbaf1ee418c5e6f61.jpg" },
        ],
      },
      {
        n: "Hair Styling", s: "All Occasions",
        img: "https://i.pinimg.com/736x/32/a4/6e/32a46e4b26ca7aedad39c198036ffa17.jpg",
        subitems: [
          { name: "Blow Dry", price: "₹500", img: "https://i.pinimg.com/1200x/d0/87/17/d0871727cff2e942ecc72a80c608774b.jpg" },
          { name: "Hair Set", price: "₹800", img: "https://i.pinimg.com/736x/ee/a0/74/eea074e1958ad8abbafa7bc50857781d.jpg" },
          { name: "Bridal Hair Set", price: "₹2,500", img: "https://i.pinimg.com/736x/da/7c/69/da7c6916c32ace6ee144c2fd815dc5da.jpg" },
          { name: "Party Hair Styling", price: "₹1,500", img: "https://i.pinimg.com/736x/24/0d/b6/240db6c5e29295372a8bddb7ac1be6a8.jpg" },
          { name: "Open Hair Styling", price: "₹1,200", img: "https://i.pinimg.com/736x/e9/47/18/e9471896b7c33d01984bb94441b81ac0.jpg" },
          { name: "Hair Curling", price: "₹1,500", img: "https://i.pinimg.com/1200x/a4/0b/94/a40b9412cbfd86f733b2eb9fd50842cc.jpg" },
        ],
      },
      {
        n: "Hair Coloring", s: "Global & Highlights",
        img: "https://i.pinimg.com/736x/96/36/06/9636062d461545f11d4e7c5c510b2481.jpg",
        subitems: [
          { name: "Global Hair Color", price: "₹2,500", img: "https://i.pinimg.com/1200x/d6/bd/2c/d6bd2c0dab7d81cf0a7d80e3847c4f6b.jpg" },
          { name: "Highlights", price: "₹3,000", img: "https://i.pinimg.com/736x/dd/f7/e1/ddf7e104c7f9dd2122fc6e665a1e9618.jpg" },
          { name: "Balayage", price: "₹4,500", img: "https://i.pinimg.com/1200x/67/a6/88/67a688f46111ba9cd69a24f18bf6db6c.jpg" },
          { name: "Root Touch Up", price: "₹1,500", img: "https://i.pinimg.com/736x/18/80/5f/18805f01494d93d6d1434f55cb2b58fe.jpg" },
          { name: "Ombre", price: "₹4,000", img: "https://i.pinimg.com/736x/47/ae/ba/47aebad6dd6dc4497dd4ae9c1893b004.jpg" },
        ],
      },
    ],
  },
  {
    icon: "🌿",
    title: "Skin Care",
    items: [
      {
        n: "Skin Care", s: "Glow & Repair",
        img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
        subitems: [
          { name: "Facial", price: "₹1,200", img: "https://i.pinimg.com/1200x/65/db/2b/65db2b2e5f99d0324b01e8d036bd59cb.jpg" },
          { name: "Gold Facial", price: "₹2,000", img: "https://i.pinimg.com/1200x/86/24/96/86249669d6cb25d9dcc5053a8f22bd78.jpg" },
          { name: "Aroma Gold Facial", price: "₹2,500", img: "https://i.pinimg.com/1200x/4e/9c/9d/4e9c9d5620cae727f9cd4cf995589227.jpg" },
          { name: "Richfeel Anti Ageing Facial", price: "₹3,000", img: "https://i.pinimg.com/736x/6f/e1/96/6fe19679b3eb6433f276487b933ea128.jpg" },
          { name: "Tan Removal Facial", price: "₹1,800", img: "https://i.pinimg.com/736x/04/5d/98/045d98da05f364dce6bfe9855cb6ca93.jpg" },
          { name: "Fresh Fruit Facial", price: "₹1,500", img: "https://i.pinimg.com/736x/82/25/fa/8225fa79e011f484b3063e8b0a713525.jpg" },
          { name: "Skin Treatment", price: "₹2,000", img: "https://i.pinimg.com/1200x/14/0f/f0/140ff07410b143fa89ce087dccba5acd.jpg" },
          { name: "Spa Face Clean Up", price: "₹1,200", img: "https://i.pinimg.com/1200x/34/e4/5b/34e45b6b6158f541b6fa9f70c55fe41a.jpg" },
        ],
      },
      {
        n: "Basic Clean Up", s: "Refresh & Cleanse",
        img: "https://i.pinimg.com/736x/34/e4/5b/34e45b6b6158f541b6fa9f70c55fe41a.jpg",
        subitems: [
          { name: "Clean Up", price: "₹600", img: "https://i.pinimg.com/736x/af/c2/8c/afc28ce1c900505cb47d4d8b4d5e95f0.jpg" },
          { name: "Basic Clean Up", price: "₹800", img: "https://i.pinimg.com/1200x/a5/33/20/a53320a5ee7116651aa067292e734db0.jpg" },
          { name: "Cream Bleach — Feet", price: "₹500", img: "https://i.pinimg.com/736x/d1/b4/4d/d1b44ded1981bb640085de3e1439589a.jpg" },
        ],
      },
      {
        n: "Body Care", s: "Head to Toe",
        img: "https://i.pinimg.com/1200x/7d/81/56/7d8156cfe8588e2447161b620a24eafe.jpg",
        subitems: [
          { name: "Body Scrub", price: "₹1,500", img: "https://i.pinimg.com/736x/77/01/cf/7701cf87763ebb70637db29fab717b8f.jpg" },
          { name: "Fruit Scrub", price: "₹1,200", img: "https://i.pinimg.com/736x/e5/ca/72/e5ca72cfbe85faf64f7a8239931c3559.jpg" },
          { name: "Coffee Body Scrub", price: "₹1,500", img: "https://i.pinimg.com/736x/be/48/f8/be48f8993677ced3d21b1670182626b7.jpg" },
          { name: "Aloe Vera Body Scrub", price: "₹1,300", img: "https://i.pinimg.com/1200x/17/9a/b4/179ab45a15f4a62c47beecc143ff1518.jpg" },
          { name: "Almond With Pure Honey Scrub — Full Body", price: "₹2,500", img: "https://i.pinimg.com/736x/94/59/c4/9459c41c04f7a3b30b17ef31a4aff18e.jpg" },
          { name: "Body Brightening — Full Arms", price: "₹1,500", img: "https://i.pinimg.com/736x/e7/b2/d2/e7b2d2b4f843be7f64fbd9f38d8f96ae.jpg" },
          { name: "Advance Polishing — Arms", price: "₹1,200", img: "https://i.pinimg.com/1200x/ab/67/7f/ab677fc73b56894e6d4f7d6df0c9ec83.jpg" },
          { name: "Advance Polishing — Legs", price: "₹1,200", img: "https://i.pinimg.com/1200x/58/c6/67/58c66718ee823e7fb133298bbd426007.jpg" },
          { name: "Aroma Polishing — Full Legs", price: "₹1,500", img: "https://i.pinimg.com/1200x/de/4a/7f/de4a7fe255b1e33a838e4137ea88c966.jpg" },
        ],
      },
    ],
  },
  {
    icon: "💅",
    title: "Nails & More",
    items: [
      {
        n: "Nails", s: "Art & Extension",
        img: "https://i.pinimg.com/1200x/30/f8/0f/30f80f6ef5b7c1aae84b4cc530ca6702.jpg",
        subitems: [
          { name: "Manicure", price: "₹500", img: "https://i.pinimg.com/736x/30/94/d6/3094d6c9bbde6f4e4964fa3e5a349fc8.jpg" },
          { name: "Pedicure", price: "₹600", img: "https://i.pinimg.com/1200x/02/e3/71/02e371527972487ab49edce6eeb8b383.jpg" },
          { name: "Artificial Nail Extension", price: "₹2,500", img: "https://i.pinimg.com/736x/30/a3/af/30a3af89eb2c8cbd8de2e6d06f9470ce.jpg" },
        ],
      },
      {
        n: "Grooming", s: "Threading & Shaping",
        img: "https://i.pinimg.com/736x/b8/d7/6b/b8d76b7400e94b89e6abfe8fc1c0e176.jpg",
        subitems: [
          { name: "Eyebrow Grooming", price: "₹100", img: "https://i.pinimg.com/1200x/e9/94/80/e99480497a2fbf0d5d50571d94d8448d.jpg" },
          { name: "Threading & Shaping", price: "₹150", img: "https://i.pinimg.com/1200x/96/82/12/968212abc4d41b4b8807896a2772e642.jpg" },
          { name: "Rica Wax", price: "₹300", img: "https://i.pinimg.com/736x/ce/fe/5a/cefe5a4bdb252d548e24ddda3e589c69.jpg" },
          { name: "Honey Wax", price: "₹250", img: "https://i.pinimg.com/1200x/15/c3/d3/15c3d3f16b94702002465150f19f9434.jpg" },
          { name: "Chocolate Wax", price: "₹350", img: "https://i.pinimg.com/736x/78/ae/0a/78ae0ae995e21802532a80b8df67e901.jpg" },
          { name: "Gold Wax", price: "₹400", img: "https://i.pinimg.com/736x/15/74/32/15743284ae22203ad414ac1648fc1962.jpg" },
          { name: "Brazilian Wax", price: "₹500", img: "https://i.pinimg.com/1200x/20/2f/41/202f4120db3333e7a3efd4f477995476.jpg" },
          { name: "Saree Draping", price: "₹500", img: "https://i.pinimg.com/736x/6e/60/c4/6e60c4653198424ddd321e811bc42358.jpg" },
          { name: "Elite Saree Drape", price: "₹800", img: "https://i.pinimg.com/736x/a1/f6/2e/a1f62e873694037821d377e5456b4ca0.jpg" },
          { name: "Bridal Saree Draping", price: "₹1,200", img: "https://i.pinimg.com/736x/f9/d6/2f/f9d62f4fcb17ce672269e0ddce93a62b.jpg" },
          { name: "Tinting — Eyebrows", price: "₹250", img: "https://i.pinimg.com/736x/81/dc/08/81dc08698619df0da1e8bc9ee19a1fea.jpg" },
          { name: "Tinting — Eyelashes", price: "₹300", img: "https://i.pinimg.com/1200x/82/37/0e/82370ed49d396d7772f42441a60b2df5.jpg" },
        ],
      },
    ],
  },
];

type SubItem = { name: string; price: string, img: string };
type SelectedCard = { n: string; img: string; subitems: SubItem[] } | null;

export default function ServicesPage({ navigate, onBook }: ServicesPageProps) {
  const [selected, setSelected] = useState<SelectedCard>(null);

  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden py-[80px] px-[5%] text-center">
        <img src={HERO_BG} alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] pointer-events-none"
          style={{ filter: "blur(0.3px)" }} />
        <div className="absolute inset-0 z-10 bg-white/55" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-playfair text-[clamp(60px,20vw,160px)] font-bold text-gold/5 whitespace-nowrap pointer-events-none z-20 select-none">
          Services
        </span>
        <div className="relative z-30">
          <div className="flex items-center gap-2 justify-center mb-4">
            <span className="text-[12px] text-richbrown-light">Home</span>
            <span className="text-[10px] text-richbrown-light">›</span>
            <span className="text-[12px] text-gold">Services</span>
          </div>
          <h1 className="font-playfair text-[clamp(32px,5.5vw,64px)] font-bold text-richbrown">
            All <em className="italic text-gold">Services</em>
          </h1>
          <p className="text-[clamp(13px,2vw,15px)] text-richbrown-mid max-w-md mx-auto mt-4 leading-relaxed px-4">
            A complete range of beauty and wellness services — crafted for every woman, every occasion.
          </p>
        </div>
      </div>

      {/* ── Service categories ── */}
      <section className="py-[60px] px-[5%]">
        {categories.map((cat) => (
          <div key={cat.title} className="mb-14">
            <FadeUp>
              <div className="flex items-center gap-3 font-playfair text-[clamp(20px,4vw,28px)] font-bold text-richbrown mb-6 after:content-[''] after:flex-1 after:h-px after:bg-gold/15">
                {cat.title}
              </div>
            </FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {cat.items.map((item, ii) => (
                <FadeUp key={item.n} delay={ii * 0.06}>
                  <div
                    className="group relative overflow-hidden rounded-2xl cursor-pointer h-[180px] sm:h-[200px] lg:h-[220px]"
                    onClick={() => setSelected(item)}
                  >
                    <img src={item.img} alt={item.n}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
                    <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
                      <div className="font-playfair text-[13px] sm:text-[15px] font-semibold text-white leading-tight mb-0.5">{item.n}</div>
                      <div className="text-[10px] sm:text-[11px] text-white/70 group-hover:text-gold transition-colors duration-300">{item.s}</div>
                    </div>
                    <div className="absolute top-3 right-3 z-10 bg-white/90 text-richbrown text-[9px] sm:text-[10px] font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      View →
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-10">
          <button onClick={() => navigate("contact")}
            className="bg-gold hover:bg-gold-dark text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-[13px] font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,156,120,0.35)]">
            Book Any Service →
          </button>
        </div>
      </section>

      <Footer mini navigate={navigate} />

      {/* ── Full-screen detail drawer ── */}
      {/* ── Full-screen detail drawer ── */}
<AnimatePresence>
  {selected && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => setSelected(null)}
      />

      {/* Slide-up panel */}
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#f5ede6] rounded-t-3xl max-h-[92vh] flex flex-col shadow-2xl"
      >
        {/* ── Hero banner — dark with image ── */}
        <div className="relative rounded-t-3xl overflow-hidden flex-shrink-0 bg-[#1a0f0a] flex items-center justify-between min-h-[160px] sm:min-h-[200px] px-6 sm:px-8">

          {/* Left: text */}
          <div className="flex-1 z-10 py-6">
            <p className="text-[10px] tracking-[2px] uppercase text-gold/70 mb-2">Womens Point</p>
            <h2 className="font-playfair text-[22px] sm:text-[28px] font-bold text-white leading-tight mb-1">
              {selected.n}
            </h2>
            <p className="text-white/50 text-[12px]">{selected.subitems.length} services available</p>
          </div>

          {/* Right: hero image */}
          <div className="relative w-[130px] sm:w-[170px] h-[160px] sm:h-[200px] flex-shrink-0">
            <img
              src={selected.img}
              alt={selected.n}
              className="w-full h-full object-cover object-center"
            />
            {/* Fade left edge into dark bg */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#1a0f0a] to-transparent" />
          </div>

          {/* Close button */}
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-[14px] transition-all z-20"
          >
            ✕
          </button>
        </div>

        {/* ── Scrollable service list ── */}
        <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4">
          <div className="space-y-3 pb-8">
            {selected.subitems.map((sub, i) => (
              <motion.div
                key={sub.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 bg-[#f0e6dc] hover:bg-white border border-[#d4b49a]/30 hover:border-gold/40 rounded-2xl px-4 py-3.5 transition-all"
              >
                {/* Left: small thumbnail */}
                <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] rounded-xl overflow-hidden flex-shrink-0 border border-gold/20">
                  <img
                    src={sub.img}
                    alt={sub.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Middle: name + price */}
                <div className="flex-1 min-w-0">
                  <p className="font-playfair text-[14px] sm:text-[15px] font-semibold text-richbrown leading-snug">
                    {sub.name}
                  </p>
                  <p className="text-richbrown-mid text-[12px] mt-0.5">
                    From{" "}
                    <span className="font-semibold text-richbrown text-[14px]">{sub.price}</span>
                    {" "}& Book Now
                  </p>
                </div>

                {/* Right: Book Now button */}
                <button
                  onClick={() => {
                    setSelected(null);
                    onBook(sub.name);
                  }}
                  className="flex-shrink-0 bg-gold hover:bg-gold-dark text-white text-[11px] sm:text-[12px] font-medium px-3 sm:px-4 py-2 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(196,156,120,0.4)] whitespace-nowrap"
                >
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </div>
  );
}