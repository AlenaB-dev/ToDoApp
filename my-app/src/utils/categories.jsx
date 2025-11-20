import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaAward } from "@react-icons/all-files/fa/FaAward";
import { FaAngellist } from "@react-icons/all-files/fa/FaAngellist";
import { FaAppleWhole } from "react-icons/fa6";
import { FaBalanceScale } from "@react-icons/all-files/fa/FaBalanceScale";

export const categories = [
  { id: "home", label: "Home", icon: <FaHome /> },
  { id: "study", label: "Study", icon: <FaAward /> },
  { id: "fun", label: "Fun", icon: <FaAngellist /> },
  { id: "grocery", label: "Grocery", icon: <FaAppleWhole /> },
  { id: "mindset", label: "Mindset", icon: <FaBalanceScale /> },
];
