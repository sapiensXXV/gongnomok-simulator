package site.gongnomok.common.comment.dto.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class CommentDeleteDto {

    private Long commentId;
    private String password;

    public CommentDeleteServiceDto toServiceDto() {
        return CommentDeleteServiceDto.builder()
            .commentId(commentId)
            .password(password)
            .build();
    }

}
