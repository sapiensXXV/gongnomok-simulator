package site.gongnomok.common.management.dto.response.comment;

import lombok.Getter;

@Getter
public class ReportCommentDeleteResponse {

    private static final String COMMENT_DELETE_MSG = "댓글이 성공적으로 삭제되었습니다.";
    private static final String COMMENT_DELETE_FROM_LIST_MSG = "댓글이 신고 목록에서 제거되었습니다.";

    private final String message;

    private ReportCommentDeleteResponse(String message) {
        this.message = message;
    }

    public static ReportCommentDeleteResponse comment() {
        return new ReportCommentDeleteResponse(COMMENT_DELETE_MSG);
    }

    public static ReportCommentDeleteResponse fromList() {
        return new ReportCommentDeleteResponse(COMMENT_DELETE_FROM_LIST_MSG);
    }
}
