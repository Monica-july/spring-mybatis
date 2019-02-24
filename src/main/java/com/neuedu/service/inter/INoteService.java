package com.neuedu.service.inter;

import com.neuedu.common.JsonResponse;
import com.neuedu.entity.NoteVo;
import com.neuedu.entity.UserVo;

public interface INoteService {
    JsonResponse getRootKids(String userId);

    JsonResponse createNote(NoteVo note);
}
