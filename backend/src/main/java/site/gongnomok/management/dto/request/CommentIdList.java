package site.gongnomok.management.dto.request;

import lombok.Setter;

import java.util.Collections;
import java.util.List;


/**
 * 클라이언트측으로 부터 commentId 목록을 전달받을 때 사용하는 클래스
 * commentId 목록을 저장하고 있는 List를 감싸는 일급 컬렉션이다.
 */
@Setter
public class CommentIdList {

    private final List<Long> commentIdList;

    public CommentIdList(List<Long> commentIdList) {
        this.commentIdList = commentIdList;
    }

    public List<Long> getCommentIdList() {
        return Collections.unmodifiableList(commentIdList);
    }
}
