package site.gongnomok.domain.comment.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class CommentCreateServiceDto {

    private String name;
    private String password;
    private String content;

}
