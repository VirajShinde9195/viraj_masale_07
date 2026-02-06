
async function checkLowStockGlobal(){
  const { data, error } = await supabaseClient
    .from("products")
    .select("name, stock_quantity")
    .lt("stock_quantity", 1000)
    .gt("stock_quantity", 0);

  if(error) return;

  if(data.length){
    showAdminLowStockAlert(data);
  }
}

function showAdminLowStockAlert(items){
  // prevent multiple alerts
  if(document.getElementById("globalLowStock")) return;

  const div=document.createElement("div");
  div.id="globalLowStock";
  div.style.cssText=`
    position:fixed;
    bottom:20px;
    right:20px;
    background:#fef3c7;
    color:#92400e;
    padding:14px 16px;
    border-radius:12px;
    font-weight:700;
    box-shadow:0 10px 25px rgba(0,0,0,.2);
    z-index:9999;
    cursor:pointer;
  `;

  div.innerHTML=`⚠ ${items.length} product(s) low in stock`;

  div.onclick=()=>location.href="admin_inventory.html";

  document.body.appendChild(div);
}
