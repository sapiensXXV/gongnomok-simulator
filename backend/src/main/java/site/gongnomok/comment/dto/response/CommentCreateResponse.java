package site.gongnomok.comment.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentCreateResponse {
    private String name;
    private Long commentId;
    private LocalDateTime createdDate;
}
