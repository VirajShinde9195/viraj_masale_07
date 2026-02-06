/* ===============================
   🔔 GLOBAL NOTIFICATION SYSTEM
================================ */

// let CURRENT_USER = null;

/* 🔑 Keys */
function notifKey() {
  if (!CURRENT_USER) return null;
  return `notifications_${CURRENT_USER.id}`;
}

function unreadKey() {
  if (!CURRENT_USER) return null;
  return `unreadCount_${CURRENT_USER.id}`;
}

/* 🔊 Sound */
function playNotifSound(type) {
  const id =
    type === "accepted"
      ? "soundAccepted"
      : type === "delivered"
      ? "soundDelivered"
      : null;

  if (!id) return;

  const audio = document.getElementById(id);
  if (!audio) return;

  audio.currentTime = 0;
  audio.play().catch(() => {});
}

/* 🔴 Bell dot */
function refreshBell() {
  const dot = document.getElementById("bellDot");
  if (!dot) return;

  const count = Number(localStorage.getItem(unreadKey()) || 0);
  dot.style.display = count > 0 ? "block" : "none";
}

/* ➕ Add notification */
function addNotification(msg, type) {
  const key = notifKey();
  if (!key) return;

  const data = JSON.parse(localStorage.getItem(key) || "{}");

  data[Date.now()] = {
    msg,
    time: new Date().toLocaleString()
  };

  localStorage.setItem(key, JSON.stringify(data));

  const unread = Number(localStorage.getItem(unreadKey()) || 0) + 1;
  localStorage.setItem(unreadKey(), unread);

  refreshBell();
  playNotifSound(type);
}

/* 🔥 Realtime listener (GLOBAL) */
function attachGlobalRealtime() {
  supabaseClient
    .channel("order-status-global")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "orders" },
      payload => {

        if (!CURRENT_USER) return;
        if (payload.new.customer_email !== CURRENT_USER.email) return;

        const orderId = payload.new.id;
        const status = payload.new.status.toLowerCase();

        const dedupeKey = `notified_${orderId}_${status}`;
        if (localStorage.getItem(dedupeKey)) return;

        if (status === "accepted") {
          addNotification(`✅ Order #${orderId} accepted`, "accepted");
        }

        if (status === "delivered") {
          addNotification(`🚚 Order #${orderId} delivered`, "delivered");
        }

        localStorage.setItem(dedupeKey, "1");
      }
    )
    .subscribe();
}
/* ===============================
   🔥 GLOBAL REALTIME ORDER STATUS
   (WORKS ON ALL PAGES)
================================ */
function attachOrderRealtime() {
  if (!window.supabaseClient) return;

  supabaseClient
    .channel("order-status-global")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "orders" },
      payload => {

        if (!window.CURRENT_USER) return;
        if (payload.new.customer_email !== CURRENT_USER.email) return;

        const orderId = payload.new.id;
        const newStatus = payload.new.status;

        if (newStatus === "accepted") {
          addNotification(`✅ Order #${orderId} accepted`, "accepted");
        }

        if (newStatus === "delivered") {
          addNotification(`🚚 Order #${orderId} delivered`, "delivered");
        }
      }
    )
    .subscribe();
}


/* 🚀 INIT (RUN ON EVERY PAGE) */
async function initGlobalNotifications() {
  const { data: { session } } =
    await supabaseClient.auth.getSession();

  if (!session) return;

  CURRENT_USER = session.user;
  refreshBell();
  attachGlobalRealtime();
  attachOrderRealtime();
}

/* 🔓 Unlock sound once */
document.addEventListener("click", () => {
  ["soundAccepted", "soundDelivered"].forEach(id => {
    const a = document.getElementById(id);
    if (a) a.play().then(() => a.pause()).catch(()=>{});
  });
}, { once: true });

document.addEventListener(
  "DOMContentLoaded",
  initGlobalNotifications
);



// if you are adding this to any html file then add this code snippet where ever you want to add audio files
// <!-- bell on index page  -->
// <audio id="soundAccepted" preload="auto">
//   <source src="bell.wav" type="audio/mpeg">
// </audio>

// <audio id="soundDelivered" preload="auto">
//   <source src="bell_2.wav" type="audio/mpeg">
// </audio>


// <script src="notifications.js"></script>
