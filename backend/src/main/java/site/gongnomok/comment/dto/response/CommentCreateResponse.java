package site.gongnomok.comment.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.comment.domain.Comment;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentCreateResponse {
    private String name;
    private Long commentId;
    private LocalDateTime createdDate;

    public static CommentCreateResponse from(Comment comment) {
        return CommentCreateResponse.builder()
            .name(comment.getName())
            .commentId(comment.getId())
            .createdDate(comment.getCreatedDate())
            .build();
    }
}
