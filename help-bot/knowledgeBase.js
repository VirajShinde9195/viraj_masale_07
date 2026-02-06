const knowledgeBase = [

  {
    intent: "login",
    keywords: ["login", "signin", "लॉगिन", "प्रवेश"],
    answer: {
      en: "You can login as Guest, Customer, or Admin.",
      mr: "तुम्ही Guest, Customer किंवा Admin म्हणून लॉगिन करू शकता.",
      hi: "आप Guest, Customer या Admin के रूप में लॉगिन कर सकते हैं।"
    }
  },

  {
    intent: "order",
    keywords: ["order", "buy", "purchase", "ऑर्डर", "खरेदी"],
    answer: {
      en: "Select product → Add to cart → Confirm order.",
      mr: "Product निवडा → Cart मध्ये add करा → Order confirm करा.",
      hi: "Product चुनें → Cart में डालें → Order confirm करें।"
    }
  },

  {
    intent: "stock",
    keywords: ["stock", "available", "out of stock", "स्टॉक"],
    answer: {
      en: "Out of stock products are not deleted.",
      mr: "Stock 0 असेल तरी product delete होत नाही.",
      hi: "Stock 0 होने पर product delete नहीं होता।"
    }
  },

  {
    intent: "payment",
    keywords: ["payment", "pay", "upi", "पेमेंट"],
    answer: {
      en: "You can pay using UPI or Cash on Delivery.",
      mr: "तुम्ही UPI किंवा Cash on Delivery वापरू शकता.",
      hi: "आप UPI या Cash on Delivery से भुगतान कर सकते हैं।"
    }
  }

];
