package Register;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;

public class RegisterServlet extends HttpServlet {
    private static Map<String, String> users = new HashMap<>();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
        throws ServletException, IOException {
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if (users.containsKey(username)) {
            // ❌ Already registered
            response.sendRedirect("Register.html?status=exists");
        } else {
            users.put(username, password);
            // ✅ Registration successful
            response.sendRedirect("Register.html?status=success");
        }
    }

    public static Map<String, String> getUsers() {
        return users;
    }
}
