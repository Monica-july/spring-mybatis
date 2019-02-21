package com.neuedu.filter;

import com.neuedu.common.Const;
import com.neuedu.entity.UserVo;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter("/*")
public class SessionFilter implements Filter{

    public void init(FilterConfig filterConfig) throws ServletException {

    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest)request;
        HttpServletResponse resp = (HttpServletResponse)response;
        HttpSession session = req.getSession();
        UserVo userVo = (UserVo) session.getAttribute(Const.USERSESSION);
        if (userVo == null){
            System.out.println("filterfilter");
        }
        chain.doFilter(request,response);
        return;
    }

    public void destroy() {

    }
}
