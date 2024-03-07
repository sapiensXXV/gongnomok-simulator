package site.gongnomok.domain.comment.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
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
