<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="javax.servlet.http.HttpSession" %>
<%
    HttpSession s = request.getSession(false);
    String username = (s != null) ? (String) s.getAttribute("username") : null;
    if (username == null) {
        response.sendRedirect("login.html?status=logout");
        return;
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Secured Page</title>
<link rel="stylesheet" href="style1.css">
</head>
<body>

<!-- Navbar -->
<header class="navbar">
    <div class="logo">EduLearn</div>
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="LogoutServlet">Logout</a></li>
        </ul>
    </nav>
</header>

<!-- Main Content -->
<section class="welcome-section">
    <h1>Welcome, <%= username %> 🎉</h1>
    <p>You’ve successfully logged in to the secured area of the website.</p>

    <div class="card-container">
        <div class="card">
            <h2>📊 Dashboard</h2>
            <p>View your account activity and track progress.</p>
            <button>Go</button>
        </div>
        <div class="card">
            <h2>👤 Profile</h2>
            <p>Update your personal information and settings.</p>
            <button>Manage</button>
        </div>
        <div class="card">
            <h2>⚙️ Settings</h2>
            <p>Customize your preferences for a better experience.</p>
            <button>Edit</button>
        </div>
    </div>
</section>

<!-- Footer -->
<footer>
    <p>© 2025 EduLearn | Built with ❤️ using Java Servlets & JSP</p>
</footer>

</body>
</html>
