package com.neuedu.service.inter;

import com.neuedu.common.JsonResponse;
import com.neuedu.entity.NoteFo;
import com.neuedu.entity.NoteVo;
import com.neuedu.entity.UserVo;

import java.io.IOException;

public interface INoteService {
    JsonResponse getRootKids(String userId);

    JsonResponse createNote(NoteFo fo) throws IOException;

    JsonResponse getNotes(String userid);

    JsonResponse getContent(String userid);

    JsonResponse reName(NoteFo fo);

    JsonResponse getTree(NoteFo fo);
    /**
     * 点击文件 加载展示笔记内容
     * */
    NoteVo getDetails(NoteFo fo);
}
