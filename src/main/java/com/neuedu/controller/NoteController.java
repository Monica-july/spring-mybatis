package com.neuedu.controller;

import com.neuedu.common.Const;
import com.neuedu.common.JsonResponse;
import com.neuedu.entity.UserVo;
import com.neuedu.service.inter.INoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/note")
public class NoteController {

    @Autowired
    private INoteService noteService;

}
