<!DOCTYPE html>
<html>
<head>
  <title>JavaScript Demo</title>
</head>
<body>
  <h1>JANMITRA AI Demo</h1>
  <button id="greetBtn">Click Me</button>
  <p id="output"></p>

  <script>
    // Simple JavaScript function
    function greetUser(name) {
      return `Hello, ${name}! Welcome to JANMITRA AI.`;
    }

    // Add event listener to button
    document.getElementById("greetBtn").addEventListener("click", function() {
      const message = greetUser("Ayush");
      document.getElementById("output").textContent = message;
    });
  </script>
</body>
</html>
