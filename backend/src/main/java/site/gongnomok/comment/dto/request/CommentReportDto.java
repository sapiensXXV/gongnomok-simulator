package site.gongnomok.comment.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 댓글 삭제 요청 시 클라이언트로부터 요청되는 Json 데이터가 역직렬화 되는 클래스
 */
@AllArgsConstructor
@Getter
public class CommentReportDto {

    private final Long commentId; // 신고할 댓글 ID
}
