package SecuredPage;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class SecuredServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
        throws ServletException, IOException {
        
        HttpSession session = request.getSession(false);
        
        if (session != null && session.getAttribute("username") != null) {
            // forward username to JSP
            request.getRequestDispatcher("secured.jsp").forward(request, response);
        } else {
            response.sendRedirect("Login.html"); // force back to login
        }
    }
}
