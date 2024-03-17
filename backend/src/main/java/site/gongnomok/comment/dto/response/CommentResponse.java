package site.gongnomok.comment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;


@Getter
public class CommentResponse {

    private Long commentId;
    private String name;
    private String content;
    private LocalDateTime createdDate;

}
