<?php
// --------------------
// Database connection
// --------------------
$host = "localhost";
$user = "root";    // your MySQL username
$pass = "";        // your MySQL password
$dbname = "viraj_masale";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// --------------------
// Handle form submission
// --------------------
$message = "";
$customerId = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $mobile = $_POST['mobile'];
    $village = $_POST['village'];
    $taluka = $_POST['taluka'];
    $district = $_POST['district'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Generate customer ID
    $result = $conn->query("SELECT COUNT(*) AS total FROM customers");
    $row = $result->fetch_assoc();
    $customerId = "virajmasale_" . ($row['total'] + 1);

    $sql = "INSERT INTO customers (name, mobile, village, taluka, district, password, customer_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $name, $mobile, $village, $taluka, $district, $password, $customerId);

    if ($stmt->execute()) {
        $message = "✅ Registration successful! Your Customer ID: $customerId";
    } else {
        $message = "❌ Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Viraj Masale Registration</title>
<style>
body { font-family: Arial, sans-serif; background: #f4f4f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
.container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
h2 { text-align: center; margin-bottom: 20px; }
input[type=text], input[type=password], input[type=tel] { width: 100%; padding: 10px; margin: 5px 0 15px 0; border: 1px solid #ccc; border-radius: 5px; }
button { width: 100%; padding: 10px; background: #28a745; border: none; color: white; font-size: 16px; border-radius: 5px; cursor: pointer; margin-bottom: 10px; }
button:hover { background: #218838; }
#message { text-align: center; margin-bottom: 15px; color: green; }
</style>
</head>
<body>

<div class="container">
<h2>Register</h2>

<?php if($message != ""): ?>
    <div id="message"><?= $message ?></div>
<?php endif; ?>

<form method="POST">
    <input type="text" name="name" placeholder="Name" required>
    <input type="tel" name="mobile" placeholder="Mobile" required>
    <input type="text" name="village" placeholder="Village" required>
    <input type="text" name="taluka" placeholder="Taluka" required>
    <input type="text" name="district" placeholder="District" required>
    <input type="password" name="password" placeholder="Password" id="password" required>
    <button type="button" onclick="togglePassword()">Show/Hide Password</button>
    <button type="submit">Register</button>
</form>
</div>

<script>
function togglePassword() {
    const pw = document.getElementById("password");
    pw.type = pw.type === "password" ? "text" : "password";
}
</script>

</body>
</html>
