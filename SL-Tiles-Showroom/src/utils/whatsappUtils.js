import { SITE_CONFIG } from '../config/siteConfig';

export const openWhatsApp = ({
  phone,
  message = "Hello, I am interested in your tiles. Please assist me.",
} = {}) => {
  try {
    const phoneNumber = (phone || SITE_CONFIG.whatsappNumber).replace(/\D/g, "");

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error("WhatsApp redirect failed:", error);
  }
};
