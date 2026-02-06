document.addEventListener("DOMContentLoaded", () => {
    const shopBtn = document.getElementById("shop-btn");
    if (shopBtn) {
        shopBtn.addEventListener("click", () => {
            alert("Online shopping coming soon!");
        });
    }
});https://script.google.com/macros/s/AKfycbzHMOVbXBx2kRjZyuAbqIYlCbCaKzjICYYQINKMn9bpy6-aa7qj7zEhO0aeUOqIwPzskQ/exec
https://script.google.com/macros/s/AKfycbzHMOVbXBx2kRjZyuAbqIYlCbCaKzjICYYQINKMn9bpy6-aa7qj7zEhO0aeUOqIwPzskQ/exec



https://script.google.com/macros/s/AKfycbzHMOVbXBx2kRjZyuAbqIYlCbCaKzjICYYQINKMn9bpy6-aa7qj7zEhO0aeUOqIwPzskQ/exec


https://script.google.com/macros/s/AKfycbzHMOVbXBx2kRjZyuAbqIYlCbCaKzjICYYQINKMn9bpy6-aa7qj7zEhO0aeUOqIwPzskQ/exec




//    viraj.22310834@Viit.ac.in       viru9195
//    shindeviraj466@gmail.com        viraj9195



// <!-- <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8">
// <title>Admin Dashboard – Orders</title>

// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

// <style>
// body {
//   font-family: Arial, sans-serif;
//   background: #f4f6f8;
//   margin: 0;
//   padding: 20px;
// }

// h1 {
//   text-align: center;
//   margin-bottom: 20px;
// }

// .order-card {
//   background: #fff;
//   border-radius: 14px;
//   padding: 16px;
//   margin-bottom: 18px;
//   box-shadow: 0 6px 14px rgba(0,0,0,0.08);
// }

// .order-top {
//   display: flex;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   margin-bottom: 10px;
// }

// .order-id {
//   font-weight: bold;
// }

// .status-select {
//   padding: 6px 10px;
//   border-radius: 20px;
//   border: none;
//   color: #fff;
//   cursor: pointer;
// }

// .status-pending { background: orange; }
// .status-accepted { background: #007bff; }
// .status-preparing { background: #6f42c1; }
// .status-delivered { background: #28a745; }

// .meta {
//   font-size: 14px;
//   color: #555;
//   margin-bottom: 10px;
// }

// .items {
//   border-top: 1px solid #eee;
//   padding-top: 10px;
// }

// .item {
//   display: flex;
//   justify-content: space-between;
//   font-size: 14px;
//   margin-bottom: 6px;
// }

// .total {
//   text-align: right;
//   font-weight: bold;
//   margin-top: 10px;
// }
// </style>
// </head>

// <body>

// <h1>📦 Admin Orders Dashboard</h1>
// <div id="ordersContainer"></div>

// <script>
// // 🔑 SUPABASE
// const supabaseClient = supabase.createClient(
//   "https://uibdyfebaqabjwkctotg.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpYmR5ZmViYXFhYmp3a2N0b3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4OTEzMTksImV4cCI6MjA4MTQ2NzMxOX0.ye5ZwULTTAxX2eV0xQqY16ghN4Hzy5-9ejQi7lfJ6kI"
// );

// // 👑 ADMIN EMAILS



// // 🔐 ADMIN GUARD
// async function requireAdmin() {
//   const { data: { session } } = await supabaseClient.auth.getSession();

//   if (!session) {
//     location.href = "login_supa.html";
//     return null;
//   }

//   const ADMIN_EMAILS = [
//    "virajmasale07@gmail.com",
//    "owner@virajmasale.com"
//   ];

//   const email = session.user.email.toLowerCase();
//   const isAdmin = ADMIN_EMAILS
//     .map(e => e.toLowerCase())
//     .includes(email);

//   if (!isAdmin) {
//     alert("Access denied");
//     location.href = "welcome1page.html";
//     return null;
//   }

//   return session.user;
// }


// // 📦 LOAD ORDERS
// async function loadOrders() {
//   const admin = await requireAdmin();
//   if (!admin) return;

//   const { data: orders, error } = await supabaseClient
//     .from("orders")
//     .select(`
//       id,
//       customer_name,
//       customer_email,
//       total_amount,
//       status,
//       created_at,
//       order_items (
//         product_name,
//         grams,
//         quantity,
//         price_per_gram
//       )
//     `)
//     .order("created_at", { ascending: false });

//   if (error) {
//     alert("Failed to load orders");
//     console.error(error);
//     return;
//   }

//   const container = document.getElementById("ordersContainer");
//   container.innerHTML = "";

//   orders.forEach(order => {
//     const card = document.createElement("div");
//     card.className = "order-card";

//     const itemsHTML = order.order_items.map(item => `
//       <div class="item">
//         <span>${item.product_name} (${item.grams}g × ${item.quantity})</span>
//         <span>₹${(item.price_per_gram * item.grams * item.quantity).toFixed(2)}</span>
//       </div>
//     `).join("");

//     card.innerHTML = `
//       <div class="order-top">
//         <div class="order-id">Order #${order.id}</div>

//         <select class="status-select status-${order.status}"
//           onchange="updateStatus(${order.id}, this.value)">
//           <option value="pending" ${order.status==="pending"?"selected":""}>Pending</option>
//           <option value="accepted" ${order.status==="accepted"?"selected":""}>Accepted</option>
//           <option value="preparing" ${order.status==="preparing"?"selected":""}>Preparing</option>
//           <option value="delivered" ${order.status==="delivered"?"selected":""}>Delivered</option>
//         </select>
//       </div>

//       <div class="meta">
//         👤 ${order.customer_name} <br>
//         📧 ${order.customer_email} <br>
//         📅 ${new Date(order.created_at).toLocaleString()}
//       </div>

//       <div class="items">${itemsHTML}</div>

//       <div class="total">
//         Total: ₹${Number(order.total_amount).toFixed(2)}
//       </div>
//     `;

//     container.appendChild(card);
//   });
// }

// // 🔄 UPDATE STATUS
// async function updateStatus(orderId, status) {
//   await supabaseClient
//     .from("orders")
//     .update({ status })
//     .eq("id", orderId);

//   loadOrders();
// }

// loadOrders();
// </script>

// </body>
// </html> --></body>